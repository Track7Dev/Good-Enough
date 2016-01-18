var server = require('../server.js');
var request = require('superagent');
var chai = require('chai');
var expect = chai.expect;
var db = require('../db_config.js');
var mongoose = require('mongoose');
var User = db.Users;
var Messages = db.Messages;


describe('Homepage', function(){

  it("should respond to GET request", function(done){
    request.get('localhost:4000/')
      .end(function(err,res){
        expect(res).to.exist;
        expect(res.status).to.equal(200);
        done();
      })
  });
})

describe('User', function(){
 
  var testUser = { 
    "firstName": "Test",
    "lastName": "User",
    "email": "user@test.com",
    "password": "test",
    "age": 29,
    "gender": "mixed",
    "type": "ISTP",
    "personality": "{\"ie\":24,\"sn\":24,\"ft\":24,\"jp\":24}",
    "picture": "testdata.jpeg",
    "places": ["Test Facility"],
    "matches": [],
    "interests": ["{\"discussion\":[\"testing\"],\"activity\":[\"testing\"]}"]
  };

  it("should be able to register", function(done){
    request.post('localhost:4000/app/users/signup')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(testUser))
      .end(function(err,res){
        expect(res).to.exist;
        expect(res.status).to.equal(201);
        done();
      })
  });

  it("should be able to sign in", function(done){
    request.post('localhost:4000/app/users/signin')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({"email": "user@test.com" , "password": "test"}))
      .end(function(err,res){
        expect(res).to.exist;
        expect(res.status).to.equal(200);
        expect(res.body.firstName).to.equal('Test');
        expect(res.body.lastName).to.equal('User');
        done();
      })
  });

  it("should be able to be deleted", function(done){
    User.find({ email:"user@test.com" }).remove(function(err, res){
      expect(res).to.exist;
      expect(res.result.ok).to.equal(1);
      done();
    });
  });

  var message = { 
    to: "bob",
    from: "frank",
    message : "test"
  };

  it("should be able to start a new conversation", function(done){
    request.post('localhost:4000/app/messages/new')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(message))
      .end(function(err,res){
        message.id = res.body._id;
        expect(res).to.exist;
        expect(res.status).to.equal(201);
        done();
      })
  });

  it("should be able to get a list of convos", function(done){
    request.post('localhost:4000/app/messages/list')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({"user": "frank"}))
      .end(function(err,res){
        expect(res).to.exist;
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(1);
        done();
      })
  });

  it("should be able to reply to a message", function(done){
    request.post('localhost:4000/app/messages/reply')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(message))
      .end(function(err,res){
        expect(res).to.exist;
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('test');
        done();
      })
  });

  it("should be able to delete message", function(done){
    Messages.find({ users:"frank" }).remove(function(err, res){
      expect(res).to.exist;
      expect(res.result.ok).to.equal(1);
      done();
    });
  });

})

