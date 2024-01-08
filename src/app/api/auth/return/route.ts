import { NextRequest, NextResponse } from "next/server";
import { oauth2Client } from "../route";
import { NextApiRequest } from "next";
import { google } from 'googleapis';

const calendar = google.calendar({
    version: 'v3',
    auth: oauth2Client,
});

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get('code')!;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

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

    return Response.json(events.data.items);
}