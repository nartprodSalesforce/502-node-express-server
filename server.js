const express = require('express');
const hbs = require('hbs'); //handbars backage for formating templates on the page
const fs = require('fs');

var app = express();
//middleware configures how express app works
//create a static directory called public

hbs.registerPartials(__dirname + '/views/partials')

app.use((req, res, next) => {
    var now = new Date().toString();
    var log  = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) => {
        if (err){
            console.log('error. cannot write to log');
        }
    } );
    next();
});
/*
app.use((req, res)=>{
    res.render('maintenance.hbs',{
        pageTitle: 'Maintenance Page',
        welcomeMsg: 'We are down for maintenance but we will be back soon, Sparky'

    }); 
});*/
app.use(express.static(__dirname + '/public'));

app.set('view engine','hbs'); //add hbs to express framework
//handle response to a get request
//default route
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screenIt',(Text)=>{
    return Text.toUpperCase();
});
app.get('/',(req,res)=> {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMsg: 'You are so here, Sparky'

    });

});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page'

    });
    
});
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Bad request'

    });
});
app.listen(3000,()=>{
    console.log('server is up on pport 3000');
}); //port on localhost for listenning