import { google } from 'googleapis';
import { NextResponse } from 'next/server';
require('dotenv').config()

export const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URL
);

export async function GET() {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/calendar'
        ],
    })

    return NextResponse.redirect(url);
}