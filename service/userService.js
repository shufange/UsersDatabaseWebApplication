/**
 * Created by shufange on 15/1/19.
 */
var express = require('express');
var router = express.Router();
var Users = require('../models/Users.js');

router.get('/', function(req, res, next) {
    Users.getUserList(req, function(result) {
        res.send(result);
        console.log(result);
    });
});

router.post('/', function(req, res, next) {
    Users.deleteUserByID(req, function(result) {
        res.send(result);
    });
});

router.post('/createuser', function(req, res, next) {
    Users.createUser(req, function(result) {
        res.send(result);
    });
});

router.post('/edituser', function(req, res, next) {
    Users.editUser(req, function(result) {
        res.send(result);
    });
});





module.exports = router;
