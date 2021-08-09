const expect = require('chai').expect;
const request = require('request');
const { TESTING_URL } = require('../../../config/config');

describe('get user list API', () => {
    describe('No users found error', () => {

        it('Status', done => {
            request.get(`${TESTING_URL}/user/users`, {}, (_, response) => {
                expect(response.statusCode).to.equal(400)
                done()
            })
        })

        it('Content', done => {
            request.get(`${TESTING_URL}/user/users`, {}, (_, response) => {
                const body = JSON.parse(response.body)
                expect(body.errors).to.equal('Users not found')
                done()
            })
        })
    })


    describe('Actual users lists', () => {

        it('Status & Content', done => {
            request.get(`${TESTING_URL}/user/users`, {}, (_, response) => {
                expect(response.statusCode).to.equal(200)
                done()
            })
        })
    })
})