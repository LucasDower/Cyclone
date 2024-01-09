import { NextRequest } from "next/server";
import { oauth2Client } from "../route";
import { uuidToToken } from "../map";

export async function GET(request: NextRequest) {
    const uuid = request.nextUrl.searchParams.get('state');
    const code = request.nextUrl.searchParams.get('code');

    if (code === null || uuid === null) {
        return new Response(`Bad request, expected code`, {
            status: 400,
        });
    }

    const { tokens } = await oauth2Client.getToken(code);
    const access_token = tokens.access_token;
    
    if (access_token === null || access_token === undefined) {
        return new Response(`Could not retrieve access token`, {
            status: 500,
        });
    }

    uuidToToken.set(uuid, { accessToken: access_token, lastAccessed: Date.now() });
    console.log('Adding', uuid);

    return Response.redirect(`${process.env.BASE_URL}/complete`);
}