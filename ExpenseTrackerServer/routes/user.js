let router = require('express').Router();
let mongojs = require('mongojs');

var db = mongojs('mongodb://admin:admin123@ds163689.mlab.com:63689/expensetracker',['user']);

// Gets all users
router.get('/users', function(req, res, next){
    db.user.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});

// Get a user 
// Accept username and password
// Return user if found else error 
router.post('/getUser', function(req, res, next){
    var userDetail = req.body;
    db.user.findOne({username: userDetail.username, password: userDetail.password}, function(err, resUser){
        if(err){
            res.send(err);
        }
        else if(!resUser){
            res.status(400);
            res.json({
                "errorMessage": "User not found"
            });
        } else {
            res.json(resUser);
        }
    });
});

// Create new user
// Accept user object contains name, username, password, emailId, phoneNo (Optional)
// Return user if found else error 
router.post('/', function(req, res, next){
    var userDetail = req.body;
    if(!userDetail.name || !userDetail.username || !userDetail.password || !userDetail.emailId)
    {   res.status(400); 
        res.json({
            "errorMessage": "Missing attribute in the request body"
        });
    }else {
        db.user.findOne({emailId: userDetail.emailId}, function(err, usr){
            if(err){
                res.send(err);
            } else if(!usr){
                db.user.save(userDetail, function(err, usr){
                    if(err){
                        res.send(err);
                    }
                    res.json(usr);
                });
            } else {
                res.status(400);
                res.json({
                    "errorMessage": "User already exist"
                });
            }
        });
    }
});

// Delete
// Accept user user id
// Return user if found else error 
router.delete('/', function(req, res, next){
    var userId = req.body.userId;
    if(!userId)
    {   res.status(400); 
        res.json({
            "errorMessage": "UserId is missing in the request"
        });
    } else {
        db.user.findOne({_id: mongojs.ObjectId(userId)}, function(err, usr){
            if(err){
                res.send(err);
            } else if(!usr){
                res.status(400);
                res.json({
                    "errorMessage": "User not found"
                });
            } else {
                db.user.remove({_id: mongojs.ObjectId(userId)}, function(err, resp){
                    if(err){
                        res.send(err);
                    }
                    res.json(resp);
                });
            }
        });
    }
});

module.exports = router;