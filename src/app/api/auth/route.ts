import { NextRequest, NextResponse } from 'next/server';
import { oauth2Client } from './client';
require('dotenv').config()

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