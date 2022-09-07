#! /usr/bin/env node
let mysql = require('mysql2');
var async = require('async')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'waparser'
});

connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});


function create(expense) {
    const result = connection.query(
        "INSERT INTO expenses (description, name, type, bucket, sum, expense_date) VALUES(?,?,?,?,?,?)",
        [expense.description, expense.name, expense.type, expense.bucket, expense.sum, expense.expense_date]
    );
    let message = 'Error in creating expense';
    if (result.affectedRows) {
        message = 'Expense created successfully';
    }
    return { message };
}


create({
    description: "Something", name: "Catalin",
    type: "Farmacie", bucket: "Cheltuieli", sum: 12, expense_date: "01.01.2021"
});