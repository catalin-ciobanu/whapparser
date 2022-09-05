#! /usr/bin/env node

console.log('This script populates expenses to the database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async')
var Expense = require('../../models/expense')


var mongoose = require('mongoose');
var mongoDB = "mongodb://localhost:27017/?readPreference=primary&ssl=false";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var expenses = []

function expenseCreate(description, type, bucket, expense_date, sum, cb) {
    var expensedetail = {}
    expensedetail.description = description
    expensedetail.type = type
    expensedetail.bucket = bucket
    expensedetail.expense_date = expense_date
    expensedetail.sum = sum

    var expense = new Expense(expensedetail);

    expense.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Expense: ' + expense);
        expenses.push(expense)
        cb(null, expense)
    });
}



function createExpenses(cb) {
    async.series([
        function (callback) {
            expenseCreate('Auchan cumparaturi', 'Cumparaturi', 'Cheltuieli', '2022-08-28', 320, callback);
        },
        function (callback) {
            expenseCreate('Lidl cumparaturi', 'Cumparaturi', 'Cheltuieli', '2022-08-26', 111, callback);
        },
        function (callback) {
            expenseCreate('Oana', 'Oana', 'Cheltuieli', '2022-08-28', 75, callback);
        },
        function (callback) {
            expenseCreate('Rate', 'Rate', 'Cheltuieli', '2022-08-28', 3500, callback);
        },
        function (callback) {
            expenseCreate('Carti', 'Cumparaturi', 'Educatie', '2022-07-28', 55.9, callback);
        },
        function (callback) {
            expenseCreate('XTB', 'Investitii', 'Investitii', '2022-08-28', 2000, callback);
        }
    ],
        // optional callback
        cb);
}

async.series([
    createExpenses
],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('ExpenseInstances: ' + expenses);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });



