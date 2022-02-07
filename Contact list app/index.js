const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose'); //database
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'view'));

app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',function(req, res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Erroe in fetching contacts!');
            return;
        }
        
        return res.render('home', {
         title:"My contacts!",
         contacts_list : contacts
     });
    });


});


app.post('/create-contact', function(req,res){

    // contactList.push(req.body);
    // name: req.body.name,
    // phone: req.body.phone
    Contact.create({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email
    }, function(err, newContact){
        if(err){
            console.log('error in creating the contact'); 
            return;
        }

        console.log('********', newContact);
        return res.redirect('back');
    });
    // return res.redirect('/');
});
var contactList = [
    {
    name:"ABC",
    phone:"1231231234",
    email:"abx@gmail.com",
    },
    {
    name:"Spideman",
    phone:"0438259101",
    email:"webhead@gmail.com",
    },
    {
    name:"Batman",
    phone:"5511990304",
    email:"iambatman@gmail.com",
    }
]

app.listen(port, function(err){
    if(err)
    {
        console.log("ERROR in server")
    }
    console.log("Express server works!");
})

app.get('/delete-contact/',function(req,res){
    // get query from url
    let id = req.query.id;
    //find contact in the database using ID
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting the contacr');
            return;
        }
        return res.redirect('back');
    });
});