import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { uuidToToken } from '../auth/map';
import { oauth2Client } from '../auth/client';
require('dotenv').config()

export async function GET(request: NextRequest) {
    const uuid = request.nextUrl.searchParams.get('c');

    if (uuid === null) {
        return new Response(`Missing UUID`, {
            status: 400,
        });
    }

    const data = uuidToToken.get(uuid);

    if (data === undefined) {
        return new Response(`Invalid UUID`, {
            status: 400,
        });
    }

    const calendar = google.calendar({
        version: 'v3',
        auth: oauth2Client,
    });

    uuidToToken.set(uuid, { accessToken: data.accessToken, lastAccessed: Date.now() });
    console.log('Refreshing', uuid);

    oauth2Client.setCredentials({ access_token: data.accessToken });

    const min = new Date();
    const max = new Date();
    min.setDate(min.getDate() - 7);
    max.setDate(max.getDate() + 7);
    console.log('minmax', min, max);

    const events = await calendar.events.list({
        calendarId: 'primary',
        timeMin: min.toISOString(),
        timeMax: max.toISOString(),
        showDeleted: false,
        singleEvents: false,
    });

    if (events.status !== 200) {
        return new Response(`Something went wrong: ${events.statusText}`, {
            status: 500,
        });
    }

    return Response.json(events.data.items ?? []);
}