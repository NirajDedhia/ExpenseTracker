let router = require('express').Router();
let mongojs = require('mongojs');

var db = mongojs('mongodb://admin:admin123@ds163689.mlab.com:63689/expensetracker',['expense']);

// Get specific Expense
// Accept expense id
// Return expense object
router.get('/:expenseId', function(req, res, next){
    db.expense.findOne({_id: mongojs.ObjectId(req.params.expenseId)}, function(err, expns){
        if(err){
            res.send(err);
        }
        else if(!expns){
            res.status(400);
            res.json({
                "errorMessage": "Expense not found"
            });
        } else {
            res.json(expns);
        }
    });
});

// Get all Expenses for particular user for the given cycle
// Accept userId and cycle
// return expenses for that user during that cycle else error
router.post('/getAllExpenses', function(req, res, next){
    reqBody = req.body;

    if(!reqBody.userId || !reqBody.cycle){
        res.status(400); 
        res.json({
            "errorMessage": "Missing attributes in the request"
        });
    }
    db.expense.find({userId: reqBody.userId, cycle: reqBody.cycle},function(err, expenses){
        if(err){
            res.send(err);
        } else {
            res.json(expenses);
        }
    });
});

// Get all Expenses by type
// Accept userId, cycle and type
// return expenses of specific type for that user during that cycle else error
router.post('/getAllExpensesByCategory', function(req, res, next){
    reqBody = req.body;
    if(!reqBody.userId || !reqBody.cycle || !reqBody.category){
        res.status(400); 
        res.json({
            "errorMessage": "Missing attributes in the request"
        });
    }
    db.expense.find({userId: reqBody.userId, cycle: reqBody.cycle, category: reqBody.category},function(err, expenses){
        if(err){
            res.send(err);
        } else {
            res.json(expenses);
        }
    });
});

// Create expense
// Accept expense object contains userId, category, amount, date, cycle, description (Optional)
// Return expense if created else error 
router.post('/', function(req, res, next){
    var expenseDetail = req.body;
    if(!expenseDetail || !expenseDetail.userId || !expenseDetail.category || !expenseDetail.amount || !expenseDetail.date || !expenseDetail.cycle)
    {   res.status(400); 
        res.json({
            "errorMessage": "Missing attribute in the request body"
        });
    } else {
        db.expense.save(expenseDetail, function(err, expens){
            if(err){
                res.send(err);
            }
            res.json(expens);
        });
    }
});

// Delete Expense
// Accept expense id
// Return success if found else error 
router.delete('/', function(req, res, next){
    var expenseId = req.body.expenseId;
    if(!expenseId)
    {   res.status(400); 
        res.json({
            "errorMessage": "ExpenseId is missing in the request"
        });
    } else {
        db.expense.findOne({_id: mongojs.ObjectId(expenseId)}, function(err, expens){
            if(err){
                res.send(err);
            } else if(!expens){
                res.status(400);
                res.json({
                    "errorMessage": "Expense not found"
                });
            } else {
                db.expense.remove({_id: mongojs.ObjectId(expenseId)}, function(err, resp){
                    if(err){
                        res.send(err);
                    }
                    res.json(resp);
                });
            }
        });
    }
});

router.get('/getTotalPerCategory/:userId/:cycle', function(req, res, next){
    var userId = req.params.userId;
    var cycle = req.params.cycle;

    if(!userId || !cycle) {
        res.status(400);
        res.json({
            "errorMessage": "Missing attribute in the request body"
        });
    } else {
        db.expense.aggregate([{"$group" : {_id:{ category:"$category", userId:userId, cycle:cycle}, amount:{$sum:"$amount"}}}], function(err, resp){
            if(err) {
                res.send(err);
            }
            res.json(resp);
        });
    }
});

module.exports = router;