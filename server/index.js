const { Connection, Request, TYPES } = require("tedious");
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


    const request = new Request(
        `Select * from questions where ID=@id`,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`);
            }
        }
    );

    request.addParameter("id", TYPES.Int, 2);

    await connection.execSql(request);
    var questions = []
    await request.on("row", columns => {
        columns.forEach(column => {
            console.log("%s\t%s", column.metadata.colName, column.value);
            if (column.metadata.colName == "question")
                questions.push(column.value);
        });
    });


    request.on('done', function (rowCount, more) {
        console.log("done");



    });

    request.on("requestCompleted", function (rowCount, more) {

        console.log(questions);

        res.send({ questions: questions });

    });


})
