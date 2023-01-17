# whapparser

##Setup

### Install packages
`npm install`

### Connect to db
`mysql -u root -p`

### Create the schema (given that the db is created)

```
CREATE TABLE expenses(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    description VARCHAR(255),
    name VARCHAR(255),
    type VARCHAR(255),
    bucket VARCHAR(255),
    sum DECIMAL,
    expense_date DATETIME
) COMMENT '';
ALTER TABLE expenses ADD CONSTRAINT unique_expense UNIQUE (description, sum, expense_date, name);

CREATE VIEW monthly_categ_bucket AS
SELECT
  SUBSTRING(expense_date,1,7) as Month,
  SUM(sum) as Total_Out,
  SUM(CASE WHEN type = 'Sanatate' THEN sum ELSE 0 END) AS 'Sanatate',
  SUM(CASE WHEN type = 'Telefoane' THEN sum ELSE 0 END) AS 'Telefoane',
  SUM(CASE WHEN type = 'Cumparaturi' THEN sum ELSE 0 END) AS 'Cumparaturi',
  SUM(CASE WHEN type = 'Rate' THEN sum ELSE 0 END) AS 'Rate',
  SUM(CASE WHEN type = 'Gradinita' THEN sum ELSE 0 END) AS 'Gradinita',
  SUM(CASE WHEN type = 'Eating out' THEN sum ELSE 0 END) AS 'Eating out',
  SUM(CASE WHEN type = 'Electricitate' THEN sum ELSE 0 END) AS 'Electricitate',
  SUM(CASE WHEN type = 'Gaz' THEN sum ELSE 0 END) AS 'Gaz',
  SUM(CASE WHEN type = 'Digi' THEN sum ELSE 0 END) AS 'Digi',
  SUM(CASE WHEN type = 'Gunoi' THEN sum ELSE 0 END) AS 'Gunoi',
  SUM(CASE WHEN type = 'Apa' THEN sum ELSE 0 END) AS 'Apa',
  SUM(CASE WHEN type = 'Masini-Transport' THEN sum ELSE 0 END) AS 'Masini-Transport',
  SUM(CASE WHEN type = 'Oana' THEN sum ELSE 0 END) AS 'Oana',
  SUM(CASE WHEN type = 'Jucarii' THEN sum ELSE 0 END) AS 'Jucarii',
  SUM(CASE WHEN type = 'Sala' THEN sum ELSE 0 END) AS 'Sala',
  SUM(CASE WHEN type = 'Unghii-Epilat' THEN sum ELSE 0 END) AS 'Unghii-Epilat',
  SUM(CASE WHEN type = 'Masaj' THEN sum ELSE 0 END) AS 'Masaj',
  SUM(CASE WHEN type = 'Tuns' THEN sum ELSE 0 END) AS 'Tuns',
  SUM(CASE WHEN type = 'Home projects' THEN sum ELSE 0 END) AS 'Home projects',
  SUM(CASE WHEN type = 'Haine' THEN sum ELSE 0 END) AS 'Haine',
  SUM(CASE WHEN type = 'Entertainment' THEN sum ELSE 0 END) AS 'Entertainment',
  SUM(CASE WHEN type = 'Misc' THEN sum ELSE 0 END) AS 'Misc',
  SUM(CASE WHEN type = 'Education' THEN sum ELSE 0 END) AS 'Education',
  SUM(CASE WHEN type = 'Economii' THEN sum ELSE 0 END) AS 'Economii',
  SUM(CASE WHEN type = 'Other investments' THEN sum ELSE 0 END) AS 'Other investments',
  SUM(CASE WHEN type = 'Stocks' THEN sum ELSE 0 END) AS 'Stocks',
  SUM(CASE WHEN type = 'Vacations' THEN sum ELSE 0 END) AS 'Vacations',
  SUM(CASE WHEN type = 'Charity' THEN sum ELSE 0 END) AS 'Charity',
  SUM(CASE WHEN bucket = 'Total Cheltuieli' THEN sum ELSE 0 END) AS 'Total Cheltuieli',
  SUM(CASE WHEN bucket = 'Total Ed Vac Char' THEN sum ELSE 0 END) AS 'Total Ed Vac Char',
  SUM(CASE WHEN bucket = 'Total Investitii' THEN sum ELSE 0 END) AS 'Total Investitii',
FROM
  expenses
GROUP BY
  Month
ORDER BY
  Month;
```
### Start server
`npm run serverstart`

### Use the app
`http://localhost:3000`
