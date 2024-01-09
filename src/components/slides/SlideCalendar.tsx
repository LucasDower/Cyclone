"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import Calendar, { Event } from "../Calendar";
import moment from 'moment';
import { Cyclone, ONE_MINUTE } from "@/app/lib/util";
import { v4 as uuidv4 } from 'uuid';
import QRCode from "react-qr-code";

const colours = [
    '#7986cb',
    '#039be5',
    '#33b679',
    '#8e24aa',
    '#e67c73',
    '#f6c026',
    '#f5511d',
    '#039be5',
    '#616161',
    '#3f51b5',
    '#0b8043',
    '#d60000',
];

export default function SlideCalendar() {
    const uuid = useId();

    const params = useSearchParams();
    const code = params.get('c');

    const [state, setState] = useState<'signed-out' | 'signed-in' | 'error'>('signed-out');
    const [items, setItems] = useState<Event[]>([]);

    Cyclone.React.repeatEvery(4 * 1000, () => {
        fetch(`/api/calendar?c=${uuid}`)
            .then(async (res) => {
                if (res.ok) {
                    const json = await res.json() as any[];

                    const newItems: Event[] = [];

                    json.forEach((event) => {
                        let start, end;

                        if (event.start.dateTime) {
                            start = new Date(event.start.dateTime);
                        } else if (event.start.date) {
                            start = moment(event.start.date, "YYYY-MM-DD").toDate();
                        }

                        if (event.end.dateTime) {
                            end = new Date(event.end.dateTime);
                        } else if (event.end.date) {
                            end = moment(event.end.date, "YYYY-MM-DD").toDate();
                        }

                        if (start && end) {
                            newItems.push({
                                title: event.summary,
                                color: colours[event.colorId ?? 0],
                                start: start,
                                end: end,
                                allDay: start.getHours() === 0 && end.getHours() === 0,
                            });
                        }
                    });

                    setItems(newItems);
                    setState('signed-in');
                }
            })
            .catch(err => {
                console.error(err);
                setState('error');
            });
    });

    if (state === 'signed-in') {
        return (
            <Calendar events={items} />
        );
    } else if (state === 'signed-out') {
        const url = `http://192.168.0.52:3000/api/auth?c=${uuid}`;

        return (
            <div className="flex flex-col flex-grow min-h-screen items-center justify-center bg-black">
                <Link target='_blank' className="underline" href={url} prefetch={true}>
                    {url}
                </Link>
                <div className="mt-4 p-4 bg-white">
                    <QRCode
                        value={url}
                    ></QRCode>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col flex-grow min-h-screen items-center justify-center bg-black">
                Something went wrong...
            </div>
        );
    }
}