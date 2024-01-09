import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { EventContentArg } from '@fullcalendar/core/index.js'

export type Event = {
    title: string,
    color: string,
    start: Date | string,
    end: Date | string,
    allDay: boolean,
}

export default function Calendar(props: { events: Event[] }) {
    return (
        <div className='w-full h-full p-4'>
            <FullCalendar
                height={"100%"}
                expandRows={true}
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                headerToolbar={false}
                nowIndicator={true}
                firstDay={1}
                scrollTime={"13:00:00"}
                events={props.events}
                eventContent={renderEventContent}
            />
        </div>
    )
}


function renderEventContent(eventInfo: EventContentArg) {
    return (
        <div className="flex flex-col text-xs">
            <p className='font-semibold'>{eventInfo.event.title}</p>
            <p>{eventInfo.timeText}</p>
        </div>
    )
}