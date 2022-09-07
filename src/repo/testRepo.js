const async = require('async');
const expenseRepo = require('./expenseRepo');

console.log("creating")
console.log(expenseRepo.createExpense({
    description: "Something", name: "Catalin",
    type: "Farmacie", bucket: "Cheltuieli", sum: 12, expense_date: "01.01.2021"
}));

// console.log("deleting with id 1")
// console.log(expenseRepo.deleteExpenseById(2));

// console.log("update with id 3");
// console.log(expenseRepo.updateExpense(3, {
//     description: "Something Back", name: "Elena",
//     type: "Farmacie", bucket: "Cheltuieli", sum: 10, expense_date: "01.01.2021"
// }));