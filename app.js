const http = require('http');
const fs = require('fs');
const _ = require('lodash');
const express = require('express');
const ejs = require('ejs');
//const {createPool} = require('mysql');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const db = mysql.createConnection({
  host: 'win-orra8uamjek',
  user: 'root',
  password: 'Silvherstained99'
});

db.connect( (err) => {
  if(err){
    console.log(err);
  }else {
    console.log('MYSQL Connected')
  }
});
// const pool =createPool({
//   host: "win-orra8uamjek",
//   user: "root",
//   password: "Silvherstained99"
// });

// pool.query('SELECT * from hrsupport.payroll_2022 limit 10', (err, res) => {
//   if (err) 
//   { 
//     console.log(err);
//   } else {
//     return console.log(res);
//   }
//     pool.release();
  
// });


app.set('view engine', 'ejs');
app.listen(5000);

app.use(express.static( __dirname + '/public'));
app.use(express.urlencoded( { extended: true } ));

app.get('/', (req, res) => {
  //res.sendFile('./views/login.html', {root: __dirname});
  res.render('index', {title: 'Login'});
});

app.post('/', (req, res) => {
  const userLogin = req.body;
  //console.log('testing');
  //const userLogin = req.body;
  //const salt = bcrypt.genSalt(10);
  console.log('Password: ', userLogin.password, userLogin.username);
    let loginQuery = `select * from 201file.kuser where klogin = "${userLogin.username}" and kpassword = "${userLogin.password}"`;
  db.query(loginQuery, (error, results) => {
    if (error){
      console.log(error);
    } else {
      if(results)
      res.render('search', {title: 'Search', employees: results});
    }
  });
  
  console.log(loginQuery);
});

app.get('/search', (req, res) => {
  let queryString = "select   employeeid as idno,   employeelname as lastName,  employeefname AS firstName,  employeemi AS middleName,  (select regionname from 201file.region where regionid = employeeregion) as region,   DATE_FORMAT(employeedateemp, '%m/%d/%Y') AS dateHired,   employeedesignation as status from 201file.master order by REGION, employeelname, employeefname limit 100 ;";
  // const employees = [
  //   {idno: '17090721', firstName: 'Ariel', lastName: 'Cueva', middleName: 'Tebajo', office: 'VisMin', region: 'HRMD', dateHired: '07/01/2017', status: 'Regular'},
  //   {idno: '18080333', firstName: 'Sweet Ivy Lou', lastName: 'Espanol', middleName: 'Billa', office: 'Luzon', region: 'HRMD', dateHired: '08/05/2014', status: 'Regular'}
  // ];
  db.query(queryString, (error, results) => {
    if (error){
      console.log(error);
    }else {
      res.render('search', {title: 'Search', employees: results});    
    }
  })
  
});

app.post('/search', (req, res) => {
  const employeeName = req.body;
  let queryString = `select   employeeid as idno,   employeelname as lastName,  employeefname AS firstName,  employeemi AS middleName,  (select regionname from 201file.region where regionid = employeeregion) as region,   DATE_FORMAT(employeedateemp, '%m/%d/%Y') AS dateHired,   employeedesignation as status from 201file.master where employeelname like '%${employeeName.name}%' or employeefname like '%${employeeName.name}%' order by employeelname, employeefname limit 100;`;
console.log(employeeName.name, queryString);
db.query(queryString, (error, results) => {
  if (error){
    console.log(error);
  }else {
    res.render('search', {title: 'Search', employees: results});    
  }
})
});


app.get('/employeeinfo', (req, res) => {
  let queryString = "select   employeeid as idno,   employeelname as lastName,  employeefname AS firstName,  employeemi AS middleName,  (select regionname from 201file.region where regionid = employeeregion) as region,   DATE_FORMAT(employeedateemp, '%m/%d/%Y') AS dateHired,   employeedesignation as status from 201file.master order by REGION, employeelname, employeefname limit 100 ;";
  // const employees = [
  //   {idno: '17090721', firstName: 'Ariel', lastName: 'Cueva', middleName: 'Tebajo', office: 'VisMin', region: 'HRMD', dateHired: '07/01/2017', status: 'Regular'},
  //   {idno: '18080333', firstName: 'Sweet Ivy Lou', lastName: 'Espanol', middleName: 'Billa', office: 'Luzon', region: 'HRMD', dateHired: '08/05/2014', status: 'Regular'}
  // ];
  db.query(queryString, (error, results) => {
    if (error){
      console.log(error);
    }else {
      res.render('employeeinfo', {title: 'Employee Info'});    
    }
  })
  
});

app.get('/test', (req, res) => {
  let queryString = "select   employeeid as idno,   employeelname as lastName,  employeefname AS firstName,  employeemi AS middleName,  (select regionname from 201file.region where regionid = employeeregion) as region,   DATE_FORMAT(employeedateemp, '%m/%d/%Y') AS dateHired,   employeedesignation as status from 201file.master order by REGION, employeelname, employeefname limit 100 ;";
  // const employees = [
  //   {idno: '17090721', firstName: 'Ariel', lastName: 'Cueva', middleName: 'Tebajo', office: 'VisMin', region: 'HRMD', dateHired: '07/01/2017', status: 'Regular'},
  //   {idno: '18080333', firstName: 'Sweet Ivy Lou', lastName: 'Espanol', middleName: 'Billa', office: 'Luzon', region: 'HRMD', dateHired: '08/05/2014', status: 'Regular'}
  // ];
  db.query(queryString, (error, results) => {
    if (error){
      console.log(error);
    }else {
      res.render('test', {title: 'Test'});    
    }
  })
  
});