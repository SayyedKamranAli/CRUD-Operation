'use strict'

const express = require('express');
const pgp = require('pg-promise')(/* options */);
const bodyParser = require('body-parser');
const cors = require('cors')


const app = module.exports = express();
app.use(cors());
const db = pgp('postgres://postgres:root@localhost:5432/postgres');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


app.get('/', function(req, res){
    db.any('SELECT * from employee order by id asc')
        .then((data) => {
            //console.log('DATA:', data)
            res.send(data);
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
    //res.send('Hello World');
});


const cs=new pgp.helpers.ColumnSet(['firstname','lastname','email','mobile'],{table:'employee'})

app.post('/search', function(req, res){
    console.log("search"+req.body);

    db.any('SELECT * from employee where upper(firstname) like upper($1) or upper(lastname) like upper($1)', '%' + req.body.name + '%')
        .then((data) => {
            //console.log('DATA:', data)
            res.send(data);
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
});

app.post('/add', async function(req, res){
    console.log("add"+JSON.stringify(req.body));
    const query = pgp.helpers.insert(req.body,cs);
    const result = await db.none(query);
    res.send(result);
        /*.then((data) => {
            //console.log('DATA:', data)
            res.send(data);
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })*/
});

app.post('/delete', function(req, res){
    console.log("delete"+req.body.id);
    db.result('delete from employee where id =$1', req.body.id, a => a.rowCount)
        .then((data) => {
            //console.log('DATA:', data)
            res.send(data);
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
});

app.put('/update', function(req, res){
    console.log("update "+req.body.lastname);
    //db.result('UPDATE public.employee SET firstname='+req.body.firstname+', lastname='+req.body.lastname+', email='+req.body.email+', mobile='+req.body.mobile+' WHERE  id='+req.body.id+'', a => a.rowCount)
    db.result('UPDATE public.employee SET firstname=$2, lastname=$3, email=$4, mobile=$5 WHERE  id=$1',[req.body.id, req.body.firstname, req.body.lastname, req.body.email, req.body.mobile], a => a.rowCount)    
        .then((data) => {
            //console.log('DATA:', data)
            res.sendStatus(data);
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(5000);
    console.log('Express started on port 5000');
}