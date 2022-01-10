const { Connection, Request } = require("tedious");
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);



// Create connection to database
const config = {
    authentication: {
        options: {
            userName: "amirvohra",
            password: "Amir123."
        },
        type: "default"
    },
    server: "amirvohra.database.windows.net",
    options: {
        database: "project",
        encrypt: true
    }
};



const connection = new Connection(config);

connection.on("connect", err => {
    if (err) {
        console.error(err.message);
    } else {

        console.log("Database Connected");
        // queryDatabase();
    }
});




app.listen(5000, () => {
    console.log("Server Started at 5000");
    connection.connect();

});

app.get("/api/questions", async (req, res) => {
    console.log("Reading rows from the Table...");

    var q = 'What_is_your_name'
    var i = 'one'
    var level = 'beginners'
    // Read all rows from table
    const request = new Request(
        `Select * from questions where ID=2`,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`);
            }
        }
    );

    await connection.execSql(request);
    var questions = []
    await request.on("row", columns => {
        columns.forEach(column => {
            console.log("%s\t%s", column.metadata.colName, column.value);
            if (column.metadata.colName == "question")
                console.log('true')
            questions.push(column.value);
        });
    });

    console.log(questions);


    res.send({ questions: questions });

})
