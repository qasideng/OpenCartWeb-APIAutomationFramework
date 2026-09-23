import {test, expect} from '../../src/fixtures/apifixtures'

const TOKEN = process.env.API_TOKEN

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
}

//helper - generic function -- create a user (POST CALL)

async function createUser(apiHelper: any) {
    //User JS objects
    let userData = {
        name: 'apiautomation',
        email: 'apiautomation_${Date.now()}@open.com',
        gender: 'male',
        status: 'active'
    }

    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER)
    expect(response.status).toBe(201)

}

//Test 1: Create a user test + verify AAA
//POST > userID > GET > /userID > verify

test('create a user test', async ({apiHelper}) => {
    //create a user:
    let userResponse = await createUser(apiHelper);

    //get user: 
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.}`, AUTH_HEADER)
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation')

})

//Test 2: Update a user test + verify: AAA
//POST > userID > GET /userID > PUT /userID > verify

test('Update a user test', async ({apiHelper}) => {
    //1. create a user:
    let userResponse = await createUser(apiHelper);

    //2. get user: 
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER)
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation')

    //3. update a user
    let userUpdatedData = {
        name: 'apiautomation-update',
        status: 'inactive'
    }


    let updateResponse = await apiHelper.put(`/public/v2/users/${userResponse.id}, userUpdatedData, AUTH_HEADER)

    expect(updateResponse.status).toBe(200);
    expect.soft(updateResponse.body.name).toBe(userUpdatedData.name)
    expect.soft(updateResponse.body.status).toBe(userUpdatedData.status)

    //4. get a user
    getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
     expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(userUpdatedData.name);
    expect.soft(getResponse.body.status).toBe(userUpdatedData.status)

})

//Test 3: Delete a user

