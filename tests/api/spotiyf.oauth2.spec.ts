
import {test, expect, request} from '@playwright/test'

let OAUTH_CONFIG = {
    tokenURL: 'https://accounts.spotify.com/api/token',
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    grantType: process.env.GRANT_TYPE

}

let accessToken: String;

test.beforeEach('POST -- generate the access token', async({request}) => {

    let response = await request.post(OAUTH_CONFIG.tokenURL, {
        form: {
            grant_type: OAUTH_CONFIG.grantType,
            client_id: OAUTH_CONFIG.clientId,
            client_secret: OAUTH_CONFIG.clientSecret
        }
    })

    expect(response.status()).toBe(200)
    let jsonResponse = await response.json();
    console.log('token api response: ', jsonResponse);
    accessToken = jsonResponse.access_token;
    console.log('access token: ', accessToken)

})

test('get albums data test', async({request}) => {
    let baseURL = 'https://api.spotify.com';
    let endPointURL = 'v1/albums/';

    let albumResponse = await request.get(`${baseURL}${endPointURL}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    expect(albumResponse.status()).toBe(200);

    console.log(await albumResponse.json())

    let jsonBody = await albumResponse.json();
    console.log(jsonBody.total_Tracks)
})