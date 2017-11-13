var http = require('http');
var assert = require('assert');
var should = require('should');

var expect = require('chai').expect;
//var server = require('./server');
var request = require('supertest');

var server = require('./bin/www');

const userCredentials = {
    username: 'y@y.com',
    password: '2'
}

var authenticatedUser = request.agent(server);

describe('Server test', function() {

    /*before(function(){
        server.listen(3001);
    })*/

    describe('Get User Files', function () {
        it('Get User files successfully', function (done) {
            const newUser = {
                username: 'y@y.com'
            }
            authenticatedUser
                .post('/doGetList')
                .send(newUser)
                .end(function (err, response) {
                    if(err){
                        console.log('error');
                    }
                    expect(response.statusCode).to.equal(201);
                    expect('Location', '/home');
                    done();
                });


        });

        describe('Log in', function () {
            it('Should log in the user successfully', function (done) {

                authenticatedUser
                    .post('/login')
                    .send(userCredentials)
                    .end(function (err, response) {
                        expect(response.statusCode).to.equal(201);
                        expect('Location', '/home');
                        done();
                    });


            });
        });

        describe('Sign up', function () {
            it('Should register the user successfully', function (done) {
                const newUser = {
                    firstname: 'first',
                    lastname: 'last',
                    username: 'first@last.com',
                    password: 'password'
                }
                authenticatedUser
                    .post('/signup')
                    .send(newUser)
                    .end(function (err, response) {
                        expect(response.statusCode).to.equal(401);
                        expect('Location', '/login');
                        done();
                    });


            });
        });

        describe('Share feature', function () {
            it('Files should be shared successfully', function (done) {
                const newUser = {
                    emails: 'q@a.com',
                    username: 'y@y.com',
                    activeItemName: 'shared file.txt'
                }
                authenticatedUser
                    .post('/doShare')
                    .send(newUser)
                    .end(function (err, response) {
                        expect(response.statusCode).to.equal(201);
                        expect('Location', '/Welcome');
                        done();
                    });


            });
        });
        describe('File Download', function () {
            it('Files should be downloaded successfully', function (done) {
                const newUser = {
                    username: 'y@y.com',
                    activeItemName: 'shared file.txt'
                }
                authenticatedUser
                    .post('http://localhost:3001/download/y@y.com/shared file.txt')
                    .send(newUser)
                    .end(function (err, response) {
                        //expect(response.statusCode).to.equal(201);
                        expect('Location', '/Welcome');
                        done();
                    });


            });
        });
        describe('Create Folder', function () {
            it('Folder should be created successfully', function (done) {
                const newUser = {
                    username: 'y@y.com',
                    folder: 'TestFolder'
                }
                authenticatedUser
                    .post('http://localhost:3001/createFolder')
                    .send(newUser)
                    .end(function (err, response) {
                        expect(response.statusCode).to.equal(201);
                        //expect('Location', '/Welcome');
                        done();
                    });


            });
        });
    });
})