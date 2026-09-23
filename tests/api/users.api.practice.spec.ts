

import {test, expect, request, APIResponse} from '@playwright/test'

let AUTH_TOKEN = {
    Authorization: 'Bearer',
}

test('get user api test', async({request}) => {
    

    
    let response: APIResponse = await request.get('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN
    })
    //console.log(response)

    let jsonBody = await response.json()
    console.log(jsonBody)
    console.log(response.status())
    console.log(response.statusText())

    expect(response.status()).toBe(200)
})

test('create a user POST api test', async({request}) => {
    
        //User JS Object
    let userData = {
        name: 'sid',
        email: 'sidauto@open.com',
        gender: 'male',
        status: 'active'
    }
    
    //JS object >convert to JSON(Serialization) JSON.stringify()

    let response: APIResponse = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    })
    //console.log(response)

    let jsonBody = await response.json()
    console.log(jsonBody)
    console.log(response.status()) //201
    console.log(response.statusText()) //created

    expect(response.status()).toBe(201)
})

test('update a user POST api test', async({request}) => {
    
        //User JS Object
    let userData = {
        name: 'manish sharma',
        email: 'sidauto@open.com',
        gender: 'male',
        status: 'inactive'
    }
    
    //JS object >convert to JSON(Serialization) JSON.stringify()

    let response: APIResponse = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    })
    //console.log(response)

    let jsonBody = await response.json()
    console.log(jsonBody)
    console.log(response.status()) //200
    console.log(response.statusText()) //OK

    expect(response.status()).toBe(200)
})

test('delete a user POST api test', async({request}) => {
    
    let response: APIResponse = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN
    })
    //console.log(response)

    //Below two lines are not needed sicne deleted account won't have any JSON

    // let jsonBody = await response.json()
    // console.log(jsonBody)
    console.log(response.status()) //204
    console.log(response.statusText()) //No content

    expect(response.status()).toBe(204)
})