import { NextRequest, NextResponse } from "next/server";
import { oauth2Client } from "../route";

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get('code');

    if (code === null) {
        return new Response(`Bad request, expected code`, {
            status: 400,
        });
    }

    const { tokens } = await oauth2Client.getToken(code);
    const access_token = tokens.access_token;

    return Response.redirect(`${process.env.BASE_URL}/?c=${access_token}`);
}