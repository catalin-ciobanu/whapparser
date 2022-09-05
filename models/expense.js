const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema(
  {
    description: {type: String, required: true, maxLength: 100},
    name: {type: String, required: true, maxLength: 100},
    type: {type: String, required: true, maxLength: 100}, //Cumparaturi, Oana, Rate
    bucket: {type: String, required: true, maxLength: 100}, //Education, Economii, Stocks, Vacations, Charity, Other investments
    expense_date: {type: Date, required: true},
    sum: {type: Number, required: true}
  }
);

//Export model
module.exports = mongoose.model('ExpenseSchema', ExpenseSchema);
