
//schema: type of response data
//ajv -- node lib for the schema validation
//npm install ajv

import Ajv from 'ajv';
import {test, expect} from '../../src/fixtures/apifixtures'

const TOKEN = process.env.API_TOKEN

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
}

let userSchema = {
    
}

let userArraySchema = {
    "type": "array",
    "items": userSchema
}

//set up AJV library

let ajv = new Ajv();

test('get a user - schema test', async({apiHelper}) => {
    let userData = {
        name: 'apiautomation',
        email: 'apiautomation_${Date.now()}@open.com',
        gender: 'male',
        status: 'active'
    }

    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER)
        expect(response.status).toBe(201)
    let userId = response.body.id
    console.log('created user id: ', userId)

    let getUserResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER)
    expect(getUserResponse.status).toBe(200)

    //verify response schema:
    let validate = ajv.compile(userSchema);
    let isSchemaValid = validate(getUserResponse.body)

    if(!isSchemaValid) {
        console.log("SCHEMA ERRORS: ", validate.errors)
    }

    expect(isSchemaValid).toBeTruthy();
})