const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
app.use(bodyParser.json());
app.use(pino);

app.post('/api/newTest', (req, res) => {
  const questions = req.body;
  console.log(questions);
  // for (q in questions) {
  //   let sql = 'call ADD_QUESTION( ?, ? , ?)';
  //   let query = db.query(sql, ...)
  // }

  res.status(200).send({
    "text": "New Test added successfully"
  });
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);