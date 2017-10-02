
var express = require('express');
var passport= require('passport');
var flash = require('connect-flash');
var localStorage = require('localStorage')
var LocalStrategy = require('passport-local').Strategy;
var  FacebookStrategy = require('passport-facebook').Strategy;
var  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var  TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../app/models/user');
var configAuth = require('./auth');
var app = express();

   module.exports = function(passport){
    
  passport.serializeUser(function(user, done){
      
      done(null, user.id);
  });
    
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });
    
       
       app.use(flash()); 
       
    passport.use('local-signup',new LocalStrategy({
        usernameField: 'email',
         //emailField: 'email',
       //profileFields: [ "username","email", "lastname"],
        passwordField:'password',
        //confirmpasswordField:'confirmpassword',
        passReqToCallback: true
    },
                                                   
 function(req, email,password, done){
        process.nextTick(function(){
            User.findOne({'local.email':email }, function(err, user){
                
                if(err)
                    return done(err);
                if(user) {
     return done(null, false, req.flash('signupMessage','That email already taken'));
            } 
        else {
            var newUser = new User();
            newUser.local.username =req.param('username');
            newUser.local.lastname = req.param('lastname');
            newUser.local.email = req.param('email');
            newUser.local.address1 = req.param('address1');
            newUser.local.address2 = req.param ('address2');
            newUser.local.countries = req.param('countries');
            newUser.local.states = req.param('states');
            newUser.local.city = req.param('city');
            newUser.local.zipcode = req.param('zipcode');
            newUser.local.nonprofit = req.param('non-profit');
            newUser.local.organization = req.param('organization');
            newUser.local.check = req.param('check');
            newUser.local.nameoforganisation = req.param('nameoforganisation');
            newUser.local.title=req.param('title');
            //console.log(req.param('organization'));
            //console.log(req.param('nameoforganization'));
            
            /*
            
            email:String,
        address1:String,
        address2:String,
        zipcode:String,
        organization:String,
        nameoforganisation:String,
        password:String,
        confirmpassword:String
            
            
            
            
            */
            newUser.local.password = newUser.generateHash(password);
            newUser.local.url1 = req.param('url1');
            newUser.local.url2 = req.param('url2');
            //newUser.local.confirmpassword = newUser.generateHash(confirmpassword);
            newUser.save(function(err){
                if(err)
                    throw err;
                return done(null, newUser);
            });
            
            
            //res.redirect('/login');
                       
        
        }
                         
            })
        });
    
    }
        
));
     
      passport.use('local-login', new LocalStrategy({
           usernameField: 'email',
           passwordField: 'password',
           passReqToCallback: true
       },
            function(req, email, password, done){
           
           process.nextTick(function(){
               User.findOne({'local.email': email},function(err, user){
                if(err)
                   return done(err);
                 
                   if(!user){
                       return done(null, false, req.flash('loginMessage', 'No User found'));
                   }
                   if(!user.validPassword(password))
                       
                       return done(null, false, req.flash('loginMessage', 'invalid password'));
                    //localStorage.setItem('uname', JSON.stringify(username));
				    /* Storing the username into server local storage - Start */
					
					var LocalStorage = require('node-localstorage').LocalStorage,
					localStorage = new LocalStorage('./public/js/');
					localStorage.setItem('uname.js', email);
					
					/* 
					global.localStorage = require('localStorage')
					var store = require('store')
					store.set('uname', username) */
					
					/* Storing the username into server local storage - Start */
					return done(null, user);
                   
                   
               

           })
                           
       });
                            }
                                                    ))
                    
   };



passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,
    profileFields: ["emails", "displayName", "name"]
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
        User.findOne({'google.id': profile.id}, function(err, user){
            if(err)
                return done(err);
            if(user)
                return done(null, user);
            else
                {
                    var newUser = new User();
                    newUser.google.id = profile.id;
                    newUser.google.token = accessToken;
                   newUser.google.name = profile.displayName;
       // newUser.facebook.name = profile.name.givenName +' ' + profile.name.familyName;
                    newUser.google.email = profile.emails[0].value;
                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    })
                   console.log(profile); 
                }
        });
    });
  //  });
  }
));
    
passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ["emails", "displayName", "name"],
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
        //user is not logged in yet
        if(!req.user){
             User.findOne({'facebook.id': profile.id}, function(err, user){
            if(err)
                return done(err);
            if(user)
                return done(null, user);
            else
                {
                    var newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                   // newUser.facebook.name = profile.displayName;
        newUser.facebook.name = profile.name.givenName +' ' + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;
                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    })
                  console.log(profile);  
                }
        });
   // });
  //  });
  }

        
        //user is logged in already, and needs to be merged
        else{
            var user = req.user;
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;
            user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
            user.facebook.email = profile.emails[0].value;
            user.save(function(err){
                if(err)
                    throw err ;
                    return done(null, user);
            })
        }
       
    });
  //  });
  }
));

passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL,
    profileFields: [ "displayName", "username"]
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
        User.findOne({'twitter.id': profile.id}, function(err, user){
            if(err)
                return done(err);
            if(user)
                return done(null, user);
            else
                {
                    var newUser = new User();
                    newUser.twitter.id = profile.id;
                    newUser.twitter.token = accessToken;
                  newUser.twitter.username = profile.username;
                    newUser.twitter.displayName = profile.displayName;
       // newUser.facebook.name = profile.name.givenName +' ' + profile.name.familyName;
                   // newUser.facebook.email = profile.emails[0].value;
                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    })
                    
                }
        });
    });
  //  });
  }
));

