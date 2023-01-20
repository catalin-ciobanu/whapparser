let mysql = require('mysql2');

/** -- script de creare a tabelului
 * CREATE TABLE expenses(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    description VARCHAR(255),
    name VARCHAR(255),
    type VARCHAR(255),
    bucket VARCHAR(255),
    sum DECIMAL,
    expense_date DATETIME
) COMMENT '';
ALTER TABLE expenses ADD CONSTRAINT unique_expense UNIQUE (description, sum, expense_date, name);

CREATE TABLE monthly_data (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    month VARCHAR(5) NOT NULL UNIQUE,
    sum DECIMAL
);

create view monthly_categ_bucket as
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
  SUM(CASE WHEN bucket = 'Total Investitii' THEN sum ELSE 0 END) AS 'Total Investitii'
FROM
  expenses
GROUP BY
  Month
ORDER BY
  Month;
 */

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
    //initializez months si years ca sa le folosesc in view
    connection.metadata = {
        months: [],
        years: []
    }
    console.log('Connected to the MySQL server.');
    connection.refreshMetadata(null, null, function () {
        console.log("Metadata refreshed!");
    });

});

/**
 * Metoda asta o folosesc pentru a ma asigura ca intotdeauna am disponibile de selectat toate lunile pentru care am cheltuieli.
 * Ar trebui apelata de fiecare data cand adaug/sterg cheltuieli (file upload) pentru ca doar atunci pot aparea/disparea luni sau ani noi
 * @param {Luna selectata pentru a arata in view pentru ce data aratam cheltuielile} month 
 * @param {Luna selectata pentru a arata in view pentru ce data aratam cheltuielile} year 
 * @param {Callback} callback 
 */
connection.refreshMetadata = function (month, year, callback) {
    connection.query("SELECT MONTH(expense_date) as months, YEAR(expense_date) as years from expenses group by months, years",
        function (err, rows) {
            if (err) {
                return console.error('error: ' + err.message);
            }
            //folosesc Set-uri ca imi vin duplicate din baza de date (poate merita sa mai imbunatatesc scriptul)
            let monthSet = new Set();
            let yearSet = new Set();
            for (var v in rows) {
                monthSet.add(rows[v].months);
                yearSet.add(rows[v].years);
            }
            //pe metadata nu pot pune Set pentru ca PUG nu stie sa itereze pe ele.
            connection.metadata.months = Array.from(monthSet);
            connection.metadata.years = Array.from(yearSet);
            //tot pe metadata trimit si luna+an selectate
            if (month) {
                month = month.length == 1 ? "0" + month : month;
                connection.metadata.current = { selectedMonth: month, selectedYear: year }
            }
            callback();
        }
    );
}

module.exports = connection;