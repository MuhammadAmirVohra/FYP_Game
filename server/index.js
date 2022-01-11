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

app.get("/api/:id/questions", async (req, res) => {
    console.log("Reading rows from the Table...");

    // req.body.level

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

    request.addParameter("id", TYPES.Int, req.params.id);
    // request.addParameter("id", TYPES.NVarChar, "Hello");



    await connection.execSql(request);
    var questions = []
    var images = []
    var answers = []

    await request.on("row", columns => {
        columns.forEach(column => {
            // console.log("%s\t%s", column.metadata.colName, column.value);
            if (column.metadata.colName == "question")
                questions.push(column.value);
            if (column.metadata.colName == "image")
                images.push(column.value);
            if (column.metadata.colName == "correct_answer")
                answers.push(column.value);

        });
    });



    request.on("requestCompleted", function (rowCount, more) {

        console.log(questions);
        console.log(images);
        console.log(answers);

        res.send({ questions: questions, images: images, answers: answers });

    });


})

app.post('/api/save_answers', async (req, res) => {

    const request = new Request(
        `insert into results(Score,Penalties,Minutes,Seconds,Module_ID) values(@Score,@Penalties,@Minutes,@Seconds,@Module_ID);`,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`${rowCount} row(s) returned`);
            }
        }
    );

    request.addParameter("Score", TYPES.Int, req.body.scores);
    request.addParameter("Penalties", TYPES.Int, req.body.penalty);
    request.addParameter("Minutes", TYPES.Int, req.body.minutes);
    request.addParameter("Seconds", TYPES.Int, req.body.seconds);
    request.addParameter("Module_ID", TYPES.Int, req.body.moduleId);





    await connection.execSql(request);
    // var questions = []
    // var images = []
    // var answers = []

    // await request.on("row", columns => {
    //     columns.forEach(column => {
    //         // console.log("%s\t%s", column.metadata.colName, column.value);
    //         if (column.metadata.colName == "question")
    //             questions.push(column.value);
    //         if (column.metadata.colName == "image")
    //             images.push(column.value);
    //         if (column.metadata.colName == "correct_answer")
    //             answers.push(column.value);

    //     });
    // });



    request.on("requestCompleted", function (rowCount, more) {

        // console.log(questions);
        // console.log(images);

        res.send({ code: 200 });

    });
})
