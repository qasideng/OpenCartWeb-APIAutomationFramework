

import {test, expect} from '../../src/fixtures/apifixtures'

const TOKEN = process.env.API_TOKEN

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
}

test.describe.serial('running e2e go rest crud apis tests', () => {

    //GET Test:

    test('GET API - get all users', async ({apiHelper}) => {
        
    })

}) 