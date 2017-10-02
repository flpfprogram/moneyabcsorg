var express = require('express');
var passport = require('passport');
var User = require('./models/user');

module.exports = function(app){

    app.post('/contact',function(req,res){
        res.sendFile('../public/contactus.html',{user: req.user });
    });

    app.get('/profile',function(req,res){
        res.render('temp.ejs',{user: req.user});
    });
    app.get('/loadEmail/:id',function(req,res){
        res.render('tempEmail.ejs',{fromEmailArticle: req.params.id});
        
    });
    app.get('/login',function(req, res)
           {
        res.render('login.ejs',{message: req.flash('loginMessage') });
    });
    
    app.post('/login', passport.authenticate('local-login',{
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));
      app.get('/auth/login', passport.authenticate('local-login',{scope: ['local', 'email']}));

app.get('/index', function(req, res){
        res.render('../public/index.html',{user: req.user });
    });
app.post('/index', passport.authenticate('local-login',{
        successRedirect: '/index',
        failureRedirect: '/login',
        failureFlash: true
    }));

/*app.post('/dashboard', passport.authenticate('local-login',{
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }));

app.get('/dashboard', passport.authenticate('local-login',{
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }));*/


app.get('/auth/login/callback',
  passport.authenticate('local-login', { successRedirect: '/',
                                      failureRedirect: '/login' }));
    
    
    app.get('/signup',function(req,res)
           {
        res.render('signup.ejs',{message: req.flash('signupMessage')});
    });
    
    app.post('/signup',passport.authenticate('local-signup',{
        
        successRedirect: '/login', 
        failureRedirect: '/signup',
        failureFlash: true
    
    }));


app.post('/register', function(req, res) {
        verifyRecaptcha(req.body["recaptcha"], function(success) {
                if (success) {
                        res.end(JSON.stringify({ registeredSuccessfully: true }));
                        // TODO: do registration using params in req.body
                } else {
                        res.end(JSON.stringify({ registeredSuccessfully: false, reason: "Captcha failed, try again." }));
                        // TODO: take them back to the previous page
                        // and for the love of everyone, restore their inputs
                }
        });
});

var SECRET = "secret from webpage here";

// Helper function to make API call to recatpcha and check response
function verifyRecaptcha(key, callback) {
        https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET + "&response=" + key, function(res) {
                var data = "";
                res.on('data', function (chunk) {
                        data += chunk.toString();
                });
                res.on('end', function() {
                        try {
                                var parsedData = JSON.parse(data);
                                console.log(parsedData);
                                callback(parsedData.success);
                        } catch (e) {
                                callback(false);
                        }
                });
        });
}

app.get('/dashboard', loggedIn, function(req, res, next) {
        // req.user - will exist
        // load user orders and render them
    res.render('../public/dashboard.html',{user: req.user });
    });

function loggedIn(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }
     

app.get('/auth/facebook', passport.authenticate('facebook',{scope: ['email']}));


app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/profile',
                                      failureRedirect: '/' }));
    
    app.get('/auth/google', passport.authenticate('google',{scope: ['profile', 'email']}));


app.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: '/profile',
                                      failureRedirect: '/' }));
    
     app.get('/auth/twitter', passport.authenticate('twitter',{scope: ['email']}));


app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/profile',
                                      failureRedirect: '/' })); 
    
   
    app.get('/:username/:password',function(req,res){
       
        var newUser = new User();
        newUser.local.username = req.params.username;
        
        
        newUser.local.password = req.params.password;
        
        console.log(newUser.local.username + " " +newUser.local.password);
        
        
        res.send("Success!");

    });
    
   
 app.get('/connect/facebook',passport.authorize('facebook', { scope: 'email' }));
    
   app.get('/connect/twitter',passport.authorize('twitter', { scope: 'email' }));
 
app.get('/connect/google',passport.authorize('google', { scope: [ 'profile','email' ]}));
    
    
    app.get('connect/local', function(req, res){
        res.render('connect-local.ejs',{message: req.flash('signupMessage')});
    });
    
    
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/connect/local',
        failureFlash: true
    }));
    
    
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    } )
};

        
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
       return next();
        }
   
    res.redirect('/');
  

}

