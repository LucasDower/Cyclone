import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
require('dotenv').config()

export const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.BASE_URL + '/api/auth/return'
);

export async function GET(request: NextRequest) {
    const uuid = request.nextUrl.searchParams.get('c');

    if (uuid === null) {
        return NextResponse.redirect(process.env.BASE_URL!);
    }

    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/calendar'
        ],
        state: uuid,
    });

    console.log('Auth', uuid);

    return NextResponse.redirect(url);
}