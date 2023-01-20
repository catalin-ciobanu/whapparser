# Ordered backlog
~~1. in the monthly view bar chart I want to show currenet month vs last month for each category~~
~~2. in the monthly view I need to be able to see IN vs OUT - This means I need to be able to specify for each month what is the INCOME~~

3. in the monthly view I need a way to add, remove and edit (sum, category and bucket of) expenses
    - This will be a challenge since I need to find a way to persist this data somewhere and it needs to stay in the DB even if I erase all data. The problem is it will not be re-inserted when the file will be loaded. It needs to be a different mechanism - a different data source for the tables and charts.
    - All the chards need to be updated accordingly after operations on the expenses in that month

~~4. in the category view I need to be able to see the Totals <<bucket>> as sum of the proper categories~~

5. in the category view I need to see charts per year and per category
    - a line chart showing IN/OUT from month to month
    - on click on a category, display a line chart showing expenses for that cagegory from month to month
6. a dashboard to check Current-Year + Year-over-Year statistics, probably charts
7. refactor for code reusability, design patterns/code cleanness - make code easily testable
8. implement tests
    - unit tests for logic
    - integration tests for db repos
    - consider test database
