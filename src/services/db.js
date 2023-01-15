let mysql = require('mysql2');

/** -- script de creare a tabelului
 * CREATE TABLE expenses(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    description VARCHAR(255),
    name VARCHAR(255),
    type VARCHAR(255),
    bucket VARCHAR(255),
    sum INT,
    expense_date DATETIME
) COMMENT '';
ALTER TABLE expenses ADD CONSTRAINT unique_expense UNIQUE (description, sum, expense_date, name);
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
            connection.metadata.current = { selectedMonth: month, selectedYear: year }
            callback();
        }
    );
}

module.exports = connection;