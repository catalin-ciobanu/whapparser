const async = require('async');
const expenseRepo = require('./expenseRepo');

console.log("creating")
console.log(expenseRepo.createExpense({
    description: "Something", name: "SOmeone",
    type: "Cumparaturi", bucket: "Cheltuieli", sum: 12, expense_date: "01.01.2021"
}));
