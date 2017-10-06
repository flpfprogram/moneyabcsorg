var express = require('express');
var fs = require('fs');
var readline = require('readline');
var googleAuth = require('google-auth-library');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongodb = require('mongodb');
var passport = require('passport');
var flash = require('connect-flash');
var engines = require('consolidate');
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var configDB = require('./config/database.js');
var open = require('open');

//app.use(express.static(__dirname + '/public'));




var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
        mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
        mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
        mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
        mongoPassword = process.env[mongoServiceName + '_PASSWORD']
    mongoUser = process.env[mongoServiceName + '_USER'];

    if (mongoHost && mongoPort && mongoDatabase) {
        mongoURLLabel = mongoURL = 'mongodb://';
        if (mongoUser && mongoPassword) {
            mongoURL += mongoUser + ':' + mongoPassword + '@';
        }
        // Provide UI label that excludes user id and pw
        mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
        mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

    }
}

var initDb = function() {
    if (mongoURL == null) return;


    mongoose.connect(mongoURL, function(err, conn) {
        if (err) {
            callback(err);
            return;
        }

        db = conn;
        dbDetails.databaseName = db.databaseName;
        dbDetails.url = mongoURLLabel;
        dbDetails.type = 'MongoDB';

        console.log('Connected to MongoDB at: %s', mongoURL);
    });
};

//var connectionString = "mongodb://localhost/test";
var connectionString = mongoURL;

var app = express();
app.use(express.static(__dirname + '/public'));                // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


initDb();
//mongoose.connect(connectionString); //connects to local DB
/* var ArticleSchema = new mongoose.Schema({
	title : String,
	iframeLink : String,
	date:String,
	snippet : String,
	imgUrl : String,
	displayLink:String, //domain
	rank : String,
	globalRank : String,
	index : "",
	indexTopic :"",
	topicRank : ""
},{collection : 'articleFeaturedResult'});
var ArticleFeaturedResult = mongoose.model('ArticleFeaturedResult',ArticleSchema); */
var ArticleSchema = new mongoose.Schema({
	title : String,
	iframeLink : String,
	date:String,
	snippet : String,
	imgUrl : String,
	displayLink:String, //domain
	rank : String,
	globalRank : String,
	index : "",
	indexTopic :"",
	topicRank : "",
	daysInLead : ""
},{collection : 'articleFeaturedRes'}); //  restaurants
var ArticleFeaturedResult = mongoose.model('ArticleFeaturedResult',ArticleSchema);

var ArticleSchemaFake = new mongoose.Schema({
	title : String,
	iframeLink : String,
	date:String,
	snippet : String,
	imgUrl : String,
	displayLink:String,
	rank : String,
	globalRank : String,
	index : ""

},{collection : 'articleResFake'}); //override default collection name as web
var ArticleFakeResult = mongoose.model('ArticleFakeResult',ArticleSchemaFake);

var profile2 = new mongoose.Schema({
		emailId:String,
		title:[{}]

},{collection:'profile2'});
var profileRes = mongoose.model('profileRes',profile2);

app.post('/api/profile',function(req,res){
	console.log("inside post cal");
    console.log(req.body.newObj[0].emailId);
    console.log(req.body.newObj[0].title)

	profileRes.find({ emailId:req.body.newObj[0].emailId }).remove().exec(function(err, data) {
		var newData = new profileRes({
			emailId:req.body.newObj[0].emailId,
			title:req.body.newObj[0].title
		});
		newData.save();
	});
	/*profileRes.findOne({ emailId:req.body.newObj[0].emailId },function(err,data){
		data.remove();
		var newData = new profileRes({
			emailId:req.body.newObj[0].emailId,
			title:req.body.newObj[0].title
		});
		newData.save();
	});*/

	// data.update({re})
	/*new profileRes.update({emailId : req.body.newObj[0].emailId},
	{
		title:req.body.newObj[0].title
	})*/

});

app.post("/api/getProfile", function (req,res){
	console.log(req.body.emailId);
	var data = profileRes.find({"emailId": req.body.emailId},function(err,data){
		console.log(data);
		res.json(data);
	});
});

app.post("/api/deleteProfile", function (req,res){
    console.log(req.body.emailId);
    profileRes.find({"emailId": req.body.emailId},function(err,data){
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        var ans = data[0];
        //console.log(ans.title.length);
        for(i in ans.title)
        {
            //console.log(i);
            // console.log(ans.title[i]);
            if(ans.title[i]._id == req.body.id)
            {
                //console.log("found");
                ans.title.splice(i, 1)
            }
        }
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        //console.log(ans.title.length);
        ans.save();
        res.json(ans);
    });

});

var profile = new mongoose.Schema({

},{collection:'users'});
var userProfile = mongoose.model('userProfile',profile);

app.post("/api/getUserProfile", function (req,res){
    console.log("============================");
    console.log(req.body.username);
    var data = userProfile.find({"local.username": req.body.username},'local.title local.nameoforganisation local..organization local.nonprofit local.address1 local.address2 local.city local.states local.zipcode local.countries local.email local.lastname local.username local.selectedlayout local.selectedtopics',function(err,prof){
        console.log(prof);
        console.log(prof[0]);
        console.log("============================");
        res.json(prof[0]);
    });
});

app.post("/api/editUserProfile", function (req,res){
    console.log("============================");
    console.log(req.body.username);
    var data = userProfile.find({"local.username": req.body.username},'local.title local.nameoforganisation local..organization local.nonprofit local.address1 local.address2 local.city local.states local.zipcode local.countries local.email local.lastname local.username local.selectedlayout local.selectedtopics',function(err,prof){
        console.log(prof);
        console.log(prof[0]);
        console.log("============================");
        res.json(prof[0]);
    });
});

app.get("/article/featured", function (req,res){
	ArticleFeaturedResult.find(function(err,data){
		res.json(data);
	});
});

app.get("/article/loadMore", function (req,res){
	ArticleFeaturedResult.find(function(err,data){
		res.json(data);
	});
});
app.get("/clearFile", function (req,res){
	var LocalStorage = require('node-localstorage').LocalStorage,
	localStorage = new LocalStorage('./public/js/');
	localStorage.setItem('uname.js', "");
	/* global.localStorage = require('localStorage')
	var store = require('store')
	store.set('uname', '');
	var a = store.get('uname');
	console.log("-------------------------------------------------------------------------");
	console.log(a);
	console.log("-------------------------------------------------------------------------"); */
	res.json("cleared")
})

app.get("/localVal", function (req,res){
	global.localStorage = require('localStorage')
	var store = require('store')
	var a = store.get('uname');
	console.log("-------------------------------------------------------------------------");
	console.log(a);
	console.log("-------------------------------------------------------------------------");
	res.json(a)
})




app.get("/process", function (req,res){
	res.json(process.env);
});
/**end getting article ****/
var ArticleSearchFake = new mongoose.Schema({
	_id : { '$oid' : ''},
	title : String,
	iframeLink : String,
	date:String,
	snippet : String,
	imgUrl : String,
	displayLink:String,
	topicRank : String, //found using fetchcomponent
	topicName :  String,
	topicArrIndex :String,
	'__v' : ''

},{collection : 'articleSearchRes'}); //override default collection name as web
var ArticleSearchResult = mongoose.model('ArticleSearchResult',ArticleSearchFake);

var searchSampleBackup = function(searchKeyword,res){
	var srcKey = searchKeyword;
	searchKeyword = searchKeyword.trim();//.replace(/ /g,"%20");
	var arr = searchKeyword.split(" ");
	var finalData = [];
	var i=0;
	var myVar  = setInterval(function () {
		if(i < arr.length) {
			var data = ArticleSearchResult.find({"title": new RegExp('^' + arr[i])},function(err,data){
				console.log(data)
				if(data.length > 0){
					for(var l =0 ;l < data.length;l++){
						finalData.push(data[l]);
					}
				}
				i++;
			});
		} else {
			srcKey = srcKey.trim().replace(/ /g,"%20");
			console.log("------------------------------------------")
			var data = ArticleSearchResult.find({"topicName": new RegExp('^' + srcKey)},function(err,data){
				console.log(data)
				if(data.length > 0){
					for(var l =0 ;l < data.length;l++){
						finalData.push(data[l]);
					}
				}
				clearInterval(myVar);
				if(finalData.length > 0){
					var result = {
						"data" : finalData,
						"status" : 500
					}
				} else {
					var result = {
						"data" : [],
						"status" : 404,
						"errMsg" : "No search results found."
					}
				}
				clearInterval(myVar);
				res.json(result);
			});

		}
	},50);

}

var searchSample = function(searchKeyword,res){
	var srcKey = searchKeyword;
	searchKeyword = searchKeyword.trim();//.replace(/ /g,"%20");
	var arr = searchKeyword.split(" ");
	var finalData = [];
	var i=0;

	var myVar  = setInterval(function () {
		if(i < arr.length) {
			var data = ArticleSearchResult.find({"title": new RegExp('^' + arr[i])},function(err,data){
				if(data.length > 0){
					for(var l = 0 ;l < data.length;l++){
						finalData.push(data[l]);
					}
				}
				var data = ArticleSearchResult.find({"topicName": new RegExp('^' + arr[i])},function(err,data){
					if(data.length > 0){
						for(var l = 0 ;l < data.length;l++){
							johnRemoved = finalData.filter(function(el) {
								return el.title !== data[l].title;
							});
							johnRemoved.push(data[l])
							finalData = johnRemoved;
						}
					}
				});
			});
			i++;
		} else {
			var data = ArticleSearchResult.find({"title": new RegExp('^' + searchKeyword)},function(err,data){
				if(data.length > 0){
					for(var l = 0 ;l < data.length;l++){
						johnRemoved = finalData.filter(function(el) {
							return el.title !== data[l].title;
						});
						johnRemoved.push(data[l])
						finalData = johnRemoved;
					}
				}
				srcKey = srcKey.trim().replace(/ /g,"%20");;
				var data = ArticleSearchResult.find({"topicName": new RegExp('^' + srcKey)},function(err,data){
					if(data.length > 0){
						for(var l = 0 ;l < data.length;l++){
							johnRemoved = finalData.filter(function(el) {
								return el.title !== data[l].title;
							});
							johnRemoved.push(data[l])
							finalData = johnRemoved;
						}
					}
					clearInterval(myVar);
					if(finalData.length > 0){
						var result = {
							"data" : finalData,
							"status" : 500
						}
					} else {
						var result = {
							"data" : [],
							"status" : 404,
							"errMsg" : "No search results found."
						}
					}
					clearInterval(myVar);
					res.json(result);
				});
			});
		}
	},50);

}

//this is for email
var searchArticle = function(searchKeyword,res){
	searchKeyword = searchKeyword.trim();//.replace(/ /g,"%20");
	console.log(searchKeyword)
	console.log("-----------------------------------------------")
	var data = ArticleSearchResult.find({"title": searchKeyword},function(err,data){
		console.log(data)
		if(data.length > 0){
			var result = {
				"data" : data,
				"status" : 500
			}
			res.json(result);
		} else {
			var data = ArticleFeaturedResult.find({"title": searchKeyword},function(err,data){
				console.log("inside 2nd")
				console.log(data)
				if(data.length > 0){
					var result = {
						"data" : data,
						"status" : 500
					}
				} else {
					var result = {
						"data" : [],
						"status" : 404,
						"errMsg" : "No search results found."
					}
				}
				res.json(result);
			});
		}

	});
}

app.post("/searchArticle", function (req,res){
	console.log(req.body.name);
	searchArticle(req.body.name,res);
});

var searchChosenArticles = function(searchKeyword,res){
	var arr = searchKeyword.split(",");
	console.log(arr);
	for(var i=0;i<arr.length;i++){
		arr[i] = arr[i].trim();
		arr[i] = arr[i].replace(/ /g,"%20");
	}
	var data = ArticleSearchResult.find({topicName : { $in:arr}},function(err,data){
		res.json(data);
	});
}

app.post("/searchSample", function (req,res){
	console.log(req.body.name);
	searchSample(req.body.name,res);
});

app.post("/article/chosenTopics", function (req,res){
	console.log(req.body.articleTopics);
	searchChosenArticles(req.body.articleTopics,res);
});


/** Processing comment **/

var Todo = mongoose.model('Todo', {
		name: String,
		email: String,
        text : String,
         timestamp: { type: Date, default: Date.now }
    });
        // routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            name : req.body.name,
			email : req.body.email,
			text : req.body.text,
            timestamp:new Date(),
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

/** End Processing comment **/
var Finance = mongoose.model('Finance', {
		name: String,
		email: String,
        text : String,
         timestamp: { type: Date, default: Date.now }
    });
	app.post('/api/finance', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Finance.create({
            name : req.body.name,
			email : req.body.email,
			text : req.body.text,
            timestamp:new Date(),
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });



	require('./config/passport.js')(passport);

app.use(cookieParser());
app.use(session({secret: 'anystringoftext',
                  saveUninitialized:true,
                resave: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.set('view engine','ejs');
require('./app/routes.js')(app, passport);

//mailer

var smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    XOAuth2: {
      user: "moneyabcsorg@gmail.com", //"shilpa.chander.99@gmail.com", // Your gmail address.
                                            // Not @developer.gserviceaccount.com
      clientId: "360054163394-5h68g7au3m6brbnbivj8ku24mhb44gs6.apps.googleusercontent.com", //"367932091928-ul3am3l02ui4qgjm6qn85ivahm38qosn.apps.googleusercontent.com",
      clientSecret: "T5EXEJ2otKsSrP_zOYCP3HlD", //"8P5yAO6BzvjNSYQv_nHpdcKV",
      refreshToken: "1/qVA9ImbETMCB2x1TVKb0JVVW_lOqhy4YwKRdqfhR0to" //"1/-3GRc5EoeWWmd5w4FJmYjviZH9TmH0z8yrOEPUwYA71VUgYXBMzP8hrsXVOGMPuO"
    }
  }
});
/*
var smtpTransport = nodemailer.createTransport(smtpTransport({
    host : "smtp.gmail.com",
    secureConnection : false,
    port: 587,
    auth : {
        user : "moneyabcsorg@gmail.com",
        pass : "coba123@"
    }
}));
*/

app.post('/send',function(req,res){
	var emailArticle = req.body.emailArticle
	var mailOptions = {
		from: "moneyabcsorg@gmail.com",
		to: req.body.receiver,
		subject: "Hi, Your friend" + req.body.sender + " has sent you an intersting article from MoneyABCs. ",
		generateTextFromHTML: true,
		html: "<html xmlns='http://www.w3.org/1999/xhtml'> <head> <title>Internal_email-29</title> <meta http-equiv='Content-Type' content='text/html; charset=utf-8' /> <meta name='viewport' content='width=device-width, initial-scale=1.0' /> <style type='text/css'> * { -ms-text-size-adjust:100%; -webkit-text-size-adjust:none; -webkit-text-resize:100%; text-resize:100%; } a{ outline:none; color:#40aceb; text-decoration:underline; } a:hover{text-decoration:none !important;} .nav a:hover{text-decoration:underline !important;} .title a:hover{text-decoration:underline !important;} .title-2 a:hover{text-decoration:underline !important;} .btn:hover{opacity:0.8;} .btn a:hover{text-decoration:none !important;} .btn{ -webkit-transition:all 0.3s ease; -moz-transition:all 0.3s ease; -ms-transition:all 0.3s ease; transition:all 0.3s ease; } table td {border-collapse: collapse !important;} .ExternalClass, .ExternalClass a, .ExternalClass span, .ExternalClass b, .ExternalClass br, .ExternalClass p, .ExternalClass div{line-height:inherit;} @media only screen and (max-width:500px) { table[class='flexible']{width:100% !important;} table[class='center']{ float:none !important; margin:0 auto !important; } *[class='hide']{ display:none !important; width:0 !important; height:0 !important; padding:0 !important; font-size:0 !important; line-height:0 !important; } td[class='img-flex'] img{ width:100% !important; height:auto !important; } td[class='aligncenter']{text-align:center !important;} th[class='flex']{ display:block !important; width:100% !important; } td[class='wrapper']{padding:0 !important;} td[class='holder']{padding:30px 15px 20px !important;} td[class='nav']{ padding:20px 0 0 !important; text-align:center !important; } td[class='h-auto']{height:auto !important;} td[class='description']{padding:30px 20px !important;} td[class='i-120'] img{ width:120px !important; height:auto !important; } td[class='footer']{padding:5px 20px 20px !important;} td[class='footer'] td[class='aligncenter']{ line-height:25px !important; padding:20px 0 0 !important; } tr[class='table-holder']{ display:table !important; width:100% !important; } th[class='thead']{display:table-header-group !important; width:100% !important;} th[class='tfoot']{display:table-footer-group !important; width:100% !important;} } </style> </head>"+
		" <body style='margin:0; padding:0;' bgcolor='#eaeced'> <table style='min-width:320px;' width='100%' cellspacing='0' cellpadding='0' bgcolor='#eaeced'> <!-- fix for gmail --> <tr> <td class='hide'> <table width='600' cellpadding='0' cellspacing='0' style='width:600px !important;'> <tr> <td style='min-width:600px; font-size:0; line-height:0;'> </td> </tr> </table> </td> </tr> <tr> <td class='wrapper' style='padding:0 10px;'> <!-- module 1 --> <table data-module='module-1' data-thumb='thumbnails/01.png' width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-module' bgcolor='#eaeced'> <table class='flexible' width='600' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td style='padding:29px 0 30px;'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <th class='flex' width='113' align='left' style='padding:0;'> <table class='center' cellpadding='0' cellspacing='0'> <tr> <td style='line-height:0;'> <a target='_blank' style='text-decoration:none;' href='https://www.psd2html.com/'>MoneyABCs</a> </td> </tr> </table> </th> <th class='flex' align='left' style='padding:0;'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-color='text' data-size='size navigation' data-min='10' data-max='22' data-link-style='text-decoration:none; color:#888;' class='nav' align='right' style='font:bold 13px/15px Arial, Helvetica, sans-serif; color:#888;'> </td> </tr> </table> </th> </tr> </table> </td> </tr> </table> </td> </tr> </table> <!-- module 2 --> <table data-module='module-2' data-thumb='thumbnails/02.png' width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-module' bgcolor='#eaeced'> <table class='flexible' width='600' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td class='img-flex'>"+
		"<a href=http://www.moneyabcs.org/loadEmail/" + emailArticle.title.replace(/ /g,"%20") + " target='_blank'>"+
		"<img src='"+ emailArticle.imgUrl + "' style='vertical-align:top;' width='600' height='306' alt='' /></a></td> </tr> <tr> <td data-bgcolor='bg-block' class='holder' style='padding:58px 60px 52px;' bgcolor='#f9f9f9'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-color='title' data-size='size title' data-min='25' data-max='45' data-link-color='link title color' data-link-style='text-decoration:none; color:#292c34;' class='title' align='center' style='font:35px/38px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 24px;'>"+
		 emailArticle.title +"</td> </tr> <tr> <td data-color='text' data-size='size text' data-min='10' data-max='26' data-link-color='link text color' data-link-style='font-weight:bold; text-decoration:underline; color:#40aceb;' align='center' style='font:bold 16px/25px Arial, Helvetica, sans-serif; color:#888; padding:0 0 23px;'>"+
		emailArticle.snippet + "</td> </tr> <tr> <td style='padding:0 0 20px;'> <table width='134' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-button' data-size='size button' data-min='10' data-max='16' class='btn' align='center' style='font:12px/14px Arial, Helvetica, sans-serif; color:#f8f9fb; text-transform:uppercase; mso-padding-alt:12px 10px 10px; border-radius:2px;' bgcolor='#7bb84f'> <a target='_blank' style='text-decoration:none; color:#f8f9fb; display:block; padding:12px 10px 10px;' href='#'>Learn More</a> </td> </tr> </table> </td> </tr> </table> </td> </tr> <tr><td height='28'></td></tr> </table> </td> </tr> </table> <!-- module 6 --> <table data-module='module-6' data-thumb='thumbnails/06.png' width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-module' bgcolor='#eaeced'> <table class='flexible' width='600' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-block' class='holder' style='padding:64px 60px 50px;' bgcolor='#f9f9f9'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-color='title' data-size='size title' data-min='20' data-max='40' data-link-color='link title color' data-link-style='text-decoration:none; color:#292c34;' class='title' align='center' style='font:30px/33px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 23px;'> Be a part of our Team </td> </tr> <tr> <td data-color='text' data-size='size text' data-min='10' data-max='26' data-link-color='link text color' data-link-style='font-weight:bold; text-decoration:underline; color:#40aceb;' align='center' style='font:16px/29px Arial, Helvetica, sans-serif; color:#888; padding:0 0 21px;'> Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy </td> </tr> <tr> <td style='padding:0 0 20px;'> <table width='232' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-button' data-size='size button' data-min='10' data-max='20' class='btn' align='center' style='font:bold 16px/18px Arial, Helvetica, sans-serif; color:#f9f9f9; text-transform:uppercase; mso-padding-alt:22px 10px; border-radius:3px;' bgcolor='#e02d74'> <a target='_blank' style='text-decoration:none; color:#f9f9f9; display:block; padding:22px 10px;' href='http://www.moneyabcs.org/'>Sign up now on MoneyABCs</a> </td> </tr> </table> </td> </tr> </table> </td> </tr> <tr><td height='28'></td></tr> </table> </td> </tr> </table> <!-- module 7 --> <table data-module='module-7' data-thumb='thumbnails/07.png' width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-module' bgcolor='#eaeced'> <table class='flexible' width='600' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td class='footer' style='padding:0 0 10px;'> <table width='100%' cellpadding='0' cellspacing='0'> <tr class='table-holder'> <th class='tfoot' width='400' align='left' style='vertical-align:top; padding:0;'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-color='text' data-link-color='link text color' data-link-style='text-decoration:underline; color:#797c82;' class='aligncenter' style='font:12px/16px Arial, Helvetica, sans-serif; color:#797c82; padding:0 0 10px;'> MoneyABCs 2016.   All Rights Reserved. <a target='_blank' style='text-decoration:underline; color:#797c82;' href='sr_unsubscribe'>Unsubscribe.</a> </td> </tr> </table> </th> <th class='thead' width='200' align='left' style='vertical-align:top; padding:0;'> <table class='center' align='right' cellpadding='0' cellspacing='0'> <tr> <td class='btn' valign='top' style='line-height:0; padding:3px 0 0;'> <a target='_blank' style='text-decoration:none;' href='#'><img src='images/ico-facebook.png' border='0' style='font:12px/15px Arial, Helvetica, sans-serif; color:#797c82;' align='left' vspace='0' hspace='0' width='6' height='13' alt='fb' /></a> </td> <td width='20'></td> <td class='btn' valign='top' style='line-height:0; padding:3px 0 0;'> <a target='_blank' style='text-decoration:none;' href='#'><img src='images/ico-twitter.png' border='0' style='font:12px/15px Arial, Helvetica, sans-serif; color:#797c82;' align='left' vspace='0' hspace='0' width='13' height='11' alt='tw' /></a> </td> <td width='19'></td> <td class='btn' valign='top' style='line-height:0; padding:3px 0 0;'> <a target='_blank' style='text-decoration:none;' href='#'><img src='images/ico-google-plus.png' border='0' style='font:12px/15px Arial, Helvetica, sans-serif; color:#797c82;' align='left' vspace='0' hspace='0' width='19' height='15' alt='g+' /></a> </td> <td width='20'></td> <td class='btn' valign='top' style='line-height:0; padding:3px 0 0;'> <a target='_blank' style='text-decoration:none;' href='#'><img src='images/ico-linkedin.png' border='0' style='font:12px/15px Arial, Helvetica, sans-serif; color:#797c82;' align='left' vspace='0' hspace='0' width='13' height='11' alt='in' /></a> </td> </tr> </table> </th> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> <!-- fix for gmail --> <tr> <td style='line-height:0;'><div style='display:none; white-space:nowrap; font:15px/1px courier;'>                                                                 </div></td> </tr> </table> </body> </html>"

	};

    smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
		} else {
			console.log(response);
		}
		smtpTransport.close();
	});
});
//mailer end
//contact mail
app.post('/send1',function(req,res){
	//var emailArticle = req.body.emailArticle
	var name = req.body.name
	var email = req.body.email
	var message = req.body.message
	var subject = req.body.subject

    /*var mailOptions={
        from : "moneyabcsorg@gmail.com",
        to : req.body.receiver, //"shilpa.chander.99@gmail.com",
        subject : "Hi, Your friend" + req.body.sender + " has sent you an intersting article from MoneyABCs. ",
        text : "http://www.forbes.com/sites/williampbarrett/2016/04/04/the-best-places-to-retire-in-2016/#51245abf703e",
        html : "<html xmlns='http://www.w3.org/1999/xhtml'> <head> <title>Internal_email-29</title> <meta http-equiv='Content-Type' content='text/html; charset=utf-8' /> <meta name='viewport' content='width=device-width, initial-scale=1.0' /> <style type='text/css'> * { -ms-text-size-adjust:100%; -webkit-text-size-adjust:none; -webkit-text-resize:100%; text-resize:100%; } a{ outline:none; color:#40aceb; text-decoration:underline; } a:hover{text-decoration:none !important;} .nav a:hover{text-decoration:underline !important;} .title a:hover{text-decoration:underline !important;} .title-2 a:hover{text-decoration:underline !important;} .btn:hover{opacity:0.8;} .btn a:hover{text-decoration:none !important;} .btn{ -webkit-transition:all 0.3s ease; -moz-transition:all 0.3s ease; -ms-transition:all 0.3s ease; transition:all 0.3s ease; } table td {border-collapse: collapse !important;} .ExternalClass, .ExternalClass a, .ExternalClass span, .ExternalClass b, .ExternalClass br, .ExternalClass p, .ExternalClass div{line-height:inherit;} @media only screen and (max-width:500px) { table[class='flexible']{width:100% !important;} table[class='center']{ float:none !important; margin:0 auto !important; } *[class='hide']{ display:none !important; width:0 !important; height:0 !important; padding:0 !important; font-size:0 !important; line-height:0 !important; } td[class='img-flex'] img{ width:100% !important; height:auto !important; } td[class='aligncenter']{text-align:center !important;} th[class='flex']{ display:block !important; width:100% !important; } td[class='wrapper']{padding:0 !important;} td[class='holder']{padding:30px 15px 20px !important;} td[class='nav']{ padding:20px 0 0 !important; text-align:center !important; } td[class='h-auto']{height:auto !important;} td[class='description']{padding:30px 20px !important;} td[class='i-120'] img{ width:120px !important; height:auto !important; } td[class='footer']{padding:5px 20px 20px !important;} td[class='footer'] td[class='aligncenter']{ line-height:25px !important; padding:20px 0 0 !important; } tr[class='table-holder']{ display:table !important; width:100% !important; } th[class='thead']{display:table-header-group !important; width:100% !important;} th[class='tfoot']{display:table-footer-group !important; width:100% !important;} } </style> </head>"+
		" <body style='margin:0; padding:0;' bgcolor='#eaeced'> <table style='min-width:320px;' width='100%' cellspacing='0' cellpadding='0' bgcolor='#eaeced'> <!-- fix for gmail --> <tr> <td class='hide'> <table width='600' cellpadding='0' cellspacing='0' style='width:600px !important;'> <tr> <td style='min-width:600px; font-size:0; line-height:0;'> </td> </tr> </table> </td> </tr> <tr> <td class='wrapper' style='padding:0 10px;'> <!-- module 1 --> <table data-module='module-1' data-thumb='thumbnails/01.png' width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-module' bgcolor='#eaeced'> <table class='flexible' width='600' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td style='padding:29px 0 30px;'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <th class='flex' width='113' align='left' style='padding:0;'> <table class='center' cellpadding='0' cellspacing='0'> <tr> <td style='line-height:0;'> <a target='_blank' style='text-decoration:none;' href='https://www.psd2html.com/'>MoneyABCs</a> </td> </tr> </table> </th> <th class='flex' align='left' style='padding:0;'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-color='text' data-size='size navigation' data-min='10' data-max='22' data-link-style='text-decoration:none; color:#888;' class='nav' align='right' style='font:bold 13px/15px Arial, Helvetica, sans-serif; color:#888;'> </td> </tr> </table> </th> </tr> </table> </td> </tr> </table> </td> </tr> </table> <!-- module 2 --> <table data-module='module-2' data-thumb='thumbnails/02.png' width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-module' bgcolor='#eaeced'> <table class='flexible' width='600' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td class='img-flex'>"+
		"<a href=http://www.moneyabcs.org/loadEmail/" + emailArticle.title.replace(/ /g,"%20") + " target='_blank'>"+
		"<img src='"+ emailArticle.imgUrl + "' style='vertical-align:top;' width='600' height='306' alt='' /></a></td> </tr> <tr> <td data-bgcolor='bg-block' class='holder' style='padding:58px 60px 52px;' bgcolor='#f9f9f9'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-color='title' data-size='size title' data-min='25' data-max='45' data-link-color='link title color' data-link-style='text-decoration:none; color:#292c34;' class='title' align='center' style='font:35px/38px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 24px;'>"+
		 emailArticle.title +"</td> </tr> <tr> <td data-color='text' data-size='size text' data-min='10' data-max='26' data-link-color='link text color' data-link-style='font-weight:bold; text-decoration:underline; color:#40aceb;' align='center' style='font:bold 16px/25px Arial, Helvetica, sans-serif; color:#888; padding:0 0 23px;'>"+
		emailArticle.snippet + "</td> </tr> <tr> <td style='padding:0 0 20px;'> <table width='134' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-button' data-size='size button' data-min='10' data-max='16' class='btn' align='center' style='font:12px/14px Arial, Helvetica, sans-serif; color:#f8f9fb; text-transform:uppercase; mso-padding-alt:12px 10px 10px; border-radius:2px;' bgcolor='#7bb84f'> <a target='_blank' style='text-decoration:none; color:#f8f9fb; display:block; padding:12px 10px 10px;' href='#'>Learn More</a> </td> </tr> </table> </td> </tr> </table> </td> </tr> <tr><td height='28'></td></tr> </table> </td> </tr> </table> <!-- module 6 --> <table data-module='module-6' data-thumb='thumbnails/06.png' width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-module' bgcolor='#eaeced'> <table class='flexible' width='600' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-block' class='holder' style='padding:64px 60px 50px;' bgcolor='#f9f9f9'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-color='title' data-size='size title' data-min='20' data-max='40' data-link-color='link title color' data-link-style='text-decoration:none; color:#292c34;' class='title' align='center' style='font:30px/33px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 23px;'> Be a part of our Team </td> </tr> <tr> <td data-color='text' data-size='size text' data-min='10' data-max='26' data-link-color='link text color' data-link-style='font-weight:bold; text-decoration:underline; color:#40aceb;' align='center' style='font:16px/29px Arial, Helvetica, sans-serif; color:#888; padding:0 0 21px;'> Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy </td> </tr> <tr> <td style='padding:0 0 20px;'> <table width='232' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-button' data-size='size button' data-min='10' data-max='20' class='btn' align='center' style='font:bold 16px/18px Arial, Helvetica, sans-serif; color:#f9f9f9; text-transform:uppercase; mso-padding-alt:22px 10px; border-radius:3px;' bgcolor='#e02d74'> <a target='_blank' style='text-decoration:none; color:#f9f9f9; display:block; padding:22px 10px;' href='http://www.moneyabcs.org/'>Sign up now on MoneyABCs</a> </td> </tr> </table> </td> </tr> </table> </td> </tr> <tr><td height='28'></td></tr> </table> </td> </tr> </table> <!-- module 7 --> <table data-module='module-7' data-thumb='thumbnails/07.png' width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-module' bgcolor='#eaeced'> <table class='flexible' width='600' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td class='footer' style='padding:0 0 10px;'> <table width='100%' cellpadding='0' cellspacing='0'> <tr class='table-holder'> <th class='tfoot' width='400' align='left' style='vertical-align:top; padding:0;'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-color='text' data-link-color='link text color' data-link-style='text-decoration:underline; color:#797c82;' class='aligncenter' style='font:12px/16px Arial, Helvetica, sans-serif; color:#797c82; padding:0 0 10px;'> MoneyABCs 2016.   All Rights Reserved. <a target='_blank' style='text-decoration:underline; color:#797c82;' href='sr_unsubscribe'>Unsubscribe.</a> </td> </tr> </table> </th> <th class='thead' width='200' align='left' style='vertical-align:top; padding:0;'> <table class='center' align='right' cellpadding='0' cellspacing='0'> <tr> <td class='btn' valign='top' style='line-height:0; padding:3px 0 0;'> <a target='_blank' style='text-decoration:none;' href='#'><img src='images/ico-facebook.png' border='0' style='font:12px/15px Arial, Helvetica, sans-serif; color:#797c82;' align='left' vspace='0' hspace='0' width='6' height='13' alt='fb' /></a> </td> <td width='20'></td> <td class='btn' valign='top' style='line-height:0; padding:3px 0 0;'> <a target='_blank' style='text-decoration:none;' href='#'><img src='images/ico-twitter.png' border='0' style='font:12px/15px Arial, Helvetica, sans-serif; color:#797c82;' align='left' vspace='0' hspace='0' width='13' height='11' alt='tw' /></a> </td> <td width='19'></td> <td class='btn' valign='top' style='line-height:0; padding:3px 0 0;'> <a target='_blank' style='text-decoration:none;' href='#'><img src='images/ico-google-plus.png' border='0' style='font:12px/15px Arial, Helvetica, sans-serif; color:#797c82;' align='left' vspace='0' hspace='0' width='19' height='15' alt='g+' /></a> </td> <td width='20'></td> <td class='btn' valign='top' style='line-height:0; padding:3px 0 0;'> <a target='_blank' style='text-decoration:none;' href='#'><img src='images/ico-linkedin.png' border='0' style='font:12px/15px Arial, Helvetica, sans-serif; color:#797c82;' align='left' vspace='0' hspace='0' width='13' height='11' alt='in' /></a> </td> </tr> </table> </th> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> <!-- fix for gmail --> <tr> <td style='line-height:0;'><div style='display:none; white-space:nowrap; font:15px/1px courier;'>                                                                 </div></td> </tr> </table> </body> </html>"
    }*/
	var mailOptions = {
		from: "moneyabcsorg@gmail.com",
		to: "moneyabcsorg@gmail.com",
		subject: "Hi, Your user " + req.body.name + " has sent you a message regarding subject: "+req.body.subject+" ",
		generateTextFromHTML: true,
		html: "<html><head><title></title></head><body>"+req.body.message+"</body></html>"
	};



	smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
		} else {
			console.log(response);
		}
		smtpTransport.close();
	});
});

/*contactMailer - End */
/* google drive - Start */


/**app.get("/googleDrive", function (req,res){

var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
/* var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/'; */
/**var TOKEN_PATH = 'auth.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Drive API.
  authorize(JSON.parse(content), listFiles);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
/**function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
	//token = {"access_token":"ya29.Ci-KA2EV0ICQtGtbO63dVFDyXFEvF8jj4Dg3_6OBsRmev9db1jvMH5ESCv8IDmktnA","refresh_token":"1/bmRW7svuOskUSPdWb1jTAnepTEfOHHP4ubE25OhvXk8","token_type":"Bearer","expiry_date":1478021005005};
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
		console.log("hi")
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
/**function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  //rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
	code = "4/Z0AMRs8SrSRCsJCeuk5U4QnQ6eIHiH1EBuSGUcgwQUs";
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  //});
} **/

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
/** function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
/** function listFiles(auth) {
  var service = google.drive('v3');
  service.files.list({
    auth: auth,
	pageSize: 10,
    fields: "nextPageToken, files(id, name)"
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var files = response.files;
    if (files.length == 0) {
      console.log('No files found.');
    } else {
      console.log('Files:');
	  var arrFiles = [];
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log('%s (%s)', file.name, file.id);
		service.files.get({
			auth: auth,
			fileId : file.id,
			fields : "appProperties,capabilities,contentHints,createdTime,description,explicitlyTrashed,fileExtension,folderColorRgb,fullFileExtension,headRevisionId,iconLink,id,imageMediaMetadata,isAppAuthorized,kind,lastModifyingUser,md5Checksum,mimeType,modifiedByMeTime,modifiedTime,name,originalFilename,ownedByMe,owners,parents,permissions,properties,quotaBytesUsed,shared,sharedWithMeTime,sharingUser,size,spaces,starred,thumbnailLink,trashed,version,videoMediaMetadata,viewedByMe,viewedByMeTime,viewersCanCopyContent,webContentLink,webViewLink,writersCanShare"
			}, function(err, response) {
			if (err) {
				console.log('The API returned an error: ' + err);
				return;
				}
				var files = response;
				arrFiles.push(response);
                console.log(files.name);
				console.log(files.thumbnailLink);
				console.log(files.webViewLink);
                console.log(files.id);
		});
      }

	  var mySearchVar  = setInterval(function () {
          clearInterval(mySearchVar);
		res.json(arrFiles);
          clearInterval(mySearchVar);
	}, 9000); //9 seconds
    }
  });
}

})
**/

/* google drive - End */


var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3002;
app.listen(port,ip);
//require('node-monkey').start({host: ip, port:3002});
