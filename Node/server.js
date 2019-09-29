const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const http = require('http');
const path = require('path');

const app = express(); 
app.use(express.json());

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'Root@123',
    database: 'EMPLOYEEDB',
    multipleStatements: true
});

mysqlConnection.connect();

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
    mysqlConnection.query('SELECT * FROM EMPLOYEE',(err, rows, fields) => {
        if(!err)
        res.send(rows)
        else
        res.send(err)
    })
})

app.get('/api/employees/:id',(req,res) =>{
    mysqlConnection.query('SELECT * FROM EMPLOYEE WHERE EmpId = ?',[req.params.id],(err, rows,fields) => {
        if(!err)
        res.send(rows)
        else
        res.status(404).send(err)
    })
})

app.delete('/api/employees/:id',(req, res) => {
    mysqlConnection.query('DELETE FROM EMPLOYEE WHERE EmpId = ?', [req.params.id],(err, rows, fields) =>{
        if(!err)
        res.send('Deleted'+req.params.id)
        else
        res.send(err)
    })
})

app.post('/api/employees',(req, res) =>{
    const emp = req.body;
    const sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary)";
    mysqlConnection.query(sql, [emp.EmpID,emp.Name,emp.EmpCode,emp.Salary], (err, rows, fields) =>{
        if(!err)
        //res.send(rows)
        rows.forEach(element => {
            if(element.constructor == Array){
                mysqlConnection.query('select * from employee',(err, rows, fields)=>{
                    if(!err)
                    res.send(rows)
                    else
                    res.send(err)
                })
            }
        });
        else
        res.send(err)
    })
});


app.listen(port,()=> console.log('Server is running @ 2233....'));