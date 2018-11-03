const express = require('express');
const bodyParser = require('body-parser').json();
const StudentService = require('./student.service');
const Repository = require('./respository');

const app = express();
app.use(bodyParser);
const repository = new Repository();
const service = new StudentService(repository);

app.all('*', service.setHeaders);

app.post('/students/:id', service.addStudent);

app.get('/students', service.getStudents);

app.get('/students/:id', service.getStudent);

server = app.listen(7002, () => console.log('listening on 7002...'));

module.exports = { serverClose: server.close.bind(server), repository };