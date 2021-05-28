const startupDebuger = require('debug')('app:startup');//Node PACKAGE FOR DEBUGGING
const dbDebugger = require('debug')('app:db')//Turned on with export DEBUG=app:startup
//DEBUG=app:startup,app:db for both debugs
const config = require('config');
const Joi = require('joi');//Class so we name it with a capital
const logger = require('./middleware/logger');//Our logging function in the other file
const authenticator = require('./authentication')
const express = require('express');
const helmet = require('helmet');//3rd party middlewear for securing http headers
const morgan = require('morgan')//3rd party middlewear for logging http requests, can configure it to log file
const app = express();
const courses = require ('./routes/courses')
const home = require('./routes/home')
//View Engine
app.set('view engine', 'pug')//EXPRESS LOADS THIS FOR YOU SO YOU DO NOT NEED A REQUIRE TO RUN PUG
app.set('views','./views')//NODE PACKAGE FOR VIEWS LIKE MVC
//THE FOLLOWING CHECK THE DEVELOPMENT ENVIRONMENT
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
//APP DEFAULTS TO DEVELOPMENT
console.log(`APP: ${app.get('env')}`)
//CONFIGURATION USING CONIG NODE PACKAGE
console.log('Application Name:'+ config.get('name'))
console.log('Application MailServer:'+ config.get('mail.host'))

console.log('Application MailPassword:'+ config.get('mail.password'))
//Reading a global variable from custom-environment file, set via export app_password=1234

//LOGGED ONLY IN DEVELOPMENT
if(app.get('env')=== 'development'){
    app.use(morgan('tiny'));
    startupDebuger('Morgan enabled...');

}
//debug
dbDebugger('connected to database...');
//SET ENVIRONMENT WITH export NODE_ENV=production
app.use(express.json());//Allows EXPRESS TO USE JSON
app.use(express.urlencoded({extended:true}));//Allows EXPRESS TO USE JSON
app.use(express.static('public'))//THIS allows access to the readme in public folder 
//find it through http://localhost:3000/readme.txt
app.use(logger);
app.use(authenticator)//HIDES KEY/VALUE
app.use(helmet());
app.use('/api/courses', courses)//ANY ROUTES THAT HAVE THAT BEGINING USE THE ROUTER
app.use('/',home)
// app.use(function(req, res, next){
//     console.log('Authenticating....')
//     next();
//     }) FUNCTION MOVED< THIS IS HOW YOU WRITE IT IN LINE





//PORT: environment variable set OUTSIDE applciation
const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening on port ${port}`)) //Listen indicates the prot being listend to, there is an option to exicute a function, in this case the consle log
//3000 is an arbitrary route

//IN TERMINAL SET ENVIRONMENT VARIABLE: THE PORT BUMBER
//Mac: export (currently set to 5000) 
//Windows set
