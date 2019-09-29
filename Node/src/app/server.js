const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const path = require('path');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'Root@123',
    database: 'EmployeeDB',
    multipleStatements: true
});

mysqlConnection.connect();

const app = express(); 

const port = process.env.PORT || 2345;

app.use(express.static(__dirname + '/dist/nodeIntegration'));

app.get('/*', (req, res) => 
    res.sendFile(path.join(__dirname))    
);

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.get('/api/employees',(req, res) => {
    mysqlConnection.query('SELECT * FROM EMPLOYEEDB',(err,rows,fields) => {
        if(!err)
        res.send(rows)
        else
        res.send(err)
    })
})

app.listen(2345, ()=>console.log('Running'));

//app.listen(port,()=> console.log('Server is running2345 @'+port+'....'));