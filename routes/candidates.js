var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://oktara:oktara@ds133281.mlab.com:33281/mean-job-oktara', ['candidates']);

// to get all candidates
router.get('/candidates', function(req, res, next) {
    db.candidates.find(function(err, candidates) {
        if(err){
            res.send(err);
        }
        else {
            res.json(candidates);
        }
    });
});

// to get a single candidates
router.get('/candidate/:id', function(req, res, next) {
    db.candidates.findOne({ _id: mongojs.ObjectId(req.params.id )}, 
        function(err, candidate) {
            if(err) {
                res.send(err);
            }
            else {
                res.json(candidate);
            }
        });
});

// to save a new candidate
router.post('/candidate', function(req, res, next) {
    var candidate = req.body;
    db.candidates.save(candidate, function(err, cand) {
        if(err){
            res.send(err);
        }
        else {
            res.json(cand);
        }
    });
});

// to update a candidate
router.put('/candidate/:id', function(req, res, next) {
    var candidate = req.body;
    var updObj = {};

    if(candidate.name) {
        updObj.name = candidate.name;
    }

    if(candidate.age) {
        updObj.age = candidate.age;
    }

    if(candidate.country) {
        updObj.country = candidate.country;
    }

    if(!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    }
    else {
        db.candidates.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function(err, result) {
            if(err){
            res.send(err);
        }
        else {
            res.json(result);
        }
        });
    }
});

// Delete a candidate
router.delete('/candidate/:id', function(req, res, next) {
    db.candidates.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result){
        if(err){
            res.send(err);
        }
        else {
            res.json(result);
        }
    });
});

module.exports = router;
