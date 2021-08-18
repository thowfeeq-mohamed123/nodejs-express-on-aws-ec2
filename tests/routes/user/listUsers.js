const expect = require('chai').expect;
const request = require('request');
const { TESTING_URL } = require('../../../config/config');

describe('get user list API', () => {

    it('No users list', done => {
        request.get(`${TESTING_URL}/user/users`, {}, (_, response) => {
            const body = JSON.parse(response.body);
            expect(body.message.length).to.greaterThan(0);
            done();
        })
    })

    it('Actual users lists', done => {
        request.get(`${TESTING_URL}/user/users`, {}, (_, response) => {
            expect(response.statusCode).to.equal(200);
            done();
        })
    })

})


describe('User API', () => {
    describe('CREATE USER', () => {
        describe('Create user validation ERROR', () => {
            describe('Create user missing field', () => {
                const payload = {
                    firstName: '',
                    lastName: 'thowfeeq 111',
                    email: 'mohamed123@gmail.com',
                    password: 'mohamed@123',
                    employeeNo: '456'
                }

                it('Status', done => {
                    request.post(`${TESTING_URL}/user/users`, {
                        json: payload
                    }, (_, response) => {
                        expect(response.statusCode).to.equal(404)
                        done()
                    })
                })

                it('Message', done => {
                    request.post(`${TESTING_URL}/user/users`, {
                        json: payload
                    }, (_, response) => {
                        expect(response.body.errors.firstName[0]).to.equal('First Name is required')
                        done()
                    })
                })
            })

            describe('Create user invalid email field', () => {
                const payload = {
                    firstName: 'Mohamed 111',
                    lastName: 'thowfeeq 111',
                    email: 'mohamed1',
                    password: 'mohamed@123',
                    employeeNo: '456'
                }

                it('Status', done => {
                    request.post(`${TESTING_URL}/user/users`, {
                        json: payload
                    }, (_, response) => {
                        expect(response.statusCode).to.equal(404)
                        done()
                    })
                })

                it('Message', done => {
                    request.post(`${TESTING_URL}/user/users`, {
                        json: payload
                    }, (_, response) => {
                        expect(response.body.errors.email[0]).to.equal('Email is invalid')
                        done()
                    })
                })
            })


            describe('Create user duplicate', () => {
                const payload = {
                    firstName: 'Mohamed 111',
                    lastName: 'thowfeeq 111',
                    email: 'mohamed123@gmail.com',
                    password: 'mohamed@123',
                    employeeNo: '456'
                }

                it('Status', done => {
                    request.post(`${TESTING_URL}/user/users`, {
                        json: payload
                    }, (_, response) => {
                        expect(response.statusCode).to.equal(404)
                        done()
                    })
                })

                it('Message', done => {
                    request.post(`${TESTING_URL}/user/users`, {
                        json: payload
                    }, (_, response) => {
                        expect(response.body.errors.duplicate[0]).to.equal('User with this email id already exist')
                        done()
                    })
                })
            })
        })

        it('Create user SUCCESS', done => {
            request.post(`${TESTING_URL}/user/users`, {
                json: {
                    firstName: 'Mohamed 111',
                    lastName: 'thowfeeq 111',
                    email: 'mohame36412@gmail.com',
                    password: 'mohamed@123',
                    employeeNo: '456'
                }
            }, (_, response) => {
                expect(response.statusCode).to.equal(200)
                done()
            })
        })
    })
})