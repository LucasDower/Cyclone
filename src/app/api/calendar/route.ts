import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { oauth2Client } from '../auth/route';
require('dotenv').config()


export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get('c');
    console.log('Code', code);

    if (code === null) {
        return new Response(`Bad request, expected code`, {
            status: 400,
        });
    }

    const calendar = google.calendar({
        version: 'v3',
        auth: oauth2Client,
    });

    oauth2Client.setCredentials({ access_token: code });

    const events = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(), // Optional: filter by start time
        showDeleted: false,               // Optional: exclude deleted events
        singleEvents: true,              // Optional: only single events
        orderBy: 'startTime',            // Optional: order by start time
    });

    if (events.status !== 200) {
        return new Response(`Something went wrong: ${events.statusText}`, {
            status: 500,
        });
    }

    return Response.json(events.data.items ?? []);
}