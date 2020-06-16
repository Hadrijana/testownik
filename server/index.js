const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
  host: 'serwer1428795.home.pl',
  user: '16229168_testownik',
  password: 'testownik1',
  database: '16229168_testownik'
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected...');
});

const app = express();
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
app.use(bodyParser.json());
app.use(pino);

function logError(err) {
  console.log(err);
}

app.post('/api/newTest', (req, res) => {
  const test = req.body;
  const questions = test.questions;
  const testName = test.testName;
  const availability = test.availability;
  const description = test.description;

  db.beginTransaction(function(err) {
    if (err) {
      logError(err);
    }
    // DODANIE TESTU
    let paramsTest = [
      testName,
      description,
      availability
    ];
    let sqlTest = 'CALL ADD_TEST(?, ?, ?)';
    db.query(sqlTest, paramsTest, (error, result) => {
      if (error) {
        return db.rollback(function() {
          logError(error);
        });
      }
      console.log('Test added');

      //DODANIE PYTAN
      for (const q of questions) {
        let paramsQuestion = [
          q.questionText, q.questionType, q.weight, testName
        ];
        let sqlQuestion = 'CALL ADD_QUESTION(?, ?, ?, ?)';
        db.query(sqlQuestion, paramsQuestion, (error, result) => {
          if (error) {
            return db.rollback(function() {
              logError(error);
            });
          }
          console.log('Question added');
        });

        //DODANIE ODPOWIEDZI
        for (const a of q.answers) {
          console.log("qtxt: " + q.questionText);
          let paramsAnswer = [q.questionText, a.text, a.valid];
          let sqlAnswer = 'CALL ADD_ANSWER(?, ?, ?)';
          db.query(sqlAnswer, paramsAnswer, (error, result) => {
            if (error) {
              return db.rollback(function() {
                logError(error);
              });
              return;
            }
            console.log('Answer added');
          });
        }
      }

      // db.rollback(function() {});
      db.commit(function(err) {
        if (err) {
          return db.rollback(function() {
            logError(error);
          });
        }
      });

      res.status(200).send({
        "text": "New Test added successfully"
      });

    });
  });
});

// Insert post 1
app.get('/addpost1', (req, res) => {
  let test = {
    name: 'TestKM',
    description: 'New test Krzychu',
    availability: 0
  };
  let sql = 'ADD_TEST(?)';
  let query = db.query(sql, test, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('New Test added');
  });
});

// Select posts
app.get('/gettests', (req, res) => {
  let sql = 'SELECT * FROM tests';
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    // res.send('Posts fetched...');
    res.send(results);
  });
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);