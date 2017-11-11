var express = require('express');
var path = require('path');
var logger = require('morgan');
var multer = require('multer');
var glob = require('glob');
const fs = require('fs');
const fse = require('fs-extra');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
require('./routes/passport');
var kafka = require('./routes/kafka/client');
var routes = require('./routes/index');
var users = require('./routes/users');
var mongoSessionURL = "mongodb://localhost:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.use(passport.initialize());
app.use(passport.session());

//method to serialize user for storage
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

// method to de-serialize back for auth
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({storage:storage});

app.use('/', routes);
app.use('/users', users);

app.post('/logout', function(req,res) {
    console.log(req.session.user);
    req.session.destroy();
    console.log('Session Destroyed');
    res.status(200).send();
});

app.post('/doGetUser', function (req, res, next) {
    var resArr = [];
    console.log(req.body.username);
    console.log("public/uploads/" + req.body.username + "/*");
    var pathtoFiles = "public/uploads/"+req.body.username+"/*";

    if (pathtoFiles !== "public/uploads//*") {
        glob(pathtoFiles, function (er, files) {
            var resArr = files.map(function (file) {
                var imgJSON = {};
                imgJSON = file.split('/')[3];
                imgJSON.cols = 2;
                return imgJSON;
            });

            console.log(resArr);
            res.status(201).send(resArr);
        });
    }
});
app.post('/login', function(req, res) {
    passport.authenticate('login', function(err, user) {
        if(err) {
            res.status(500).send();
        }

        if(!user) {
            res.status(401).send();
        }
        req.session.user = user.username;
        console.log(req.session.user);
        console.log("session initilized");
        return res.status(201).send({username:"test"});
    })(req, res);
});

app.post('/signup', function(req, res) {

    passport.authenticate('signup', function(err, user) {
        if(err) {
            res.status(500).send();
        }
        if(!user) {
            res.status(401).send();
        }
        /*var newUser = new user();
        newUser.local.username = req.body.email;
        newUser.local.password = req.body.password;
        newUser.local.firstname = req.body.firstname;
        newUser.local.lastname = req.body.lastname;*/
        /*passport.authenticate('signup', function(err, user) {
            if(err) {
                res.status(500).send();
            }

            if(!user) {
                res.status(401).send();
            }
            req.session.user = user.username;*/

        /*newUser.save(function(err){
        	if(err){
        		throw err;
        	}
        })*/
//	console.log(req.session.user);
        else{
            req.session.user = user.username;
            console.log(req.session.user);
            console.log(user);
            console.log(user.firstname);
            console.log(user.lastname);

            console.log("session signup");
            return res.status(201).send({username:"test"});
            //   res.redirect('/');
        }
    })(req, res);
//});
});
app.post('/doGetList', function(req, res) {
    console.log(req.body);
    kafka.make_request('list_topic',req.body.username, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            res.status(500).send();
        }
        else
        {
            if(results.code == 200){
              //  done(null,true,results/*{username: username, password: password}*/);
                console.log(results.value);
                var resarr = [];
                var res1 = results.value;
              //  if(res1.length!== 0)
              //  {
                     resarr = res1.split('<br>');
                     res1.length = res1.length-1;
                     console.log(resarr);
             //   }
                res.status(201).send({file: resarr});
            }
        }
    });
    /*passport.authenticate('list', function(err, user) {
        if(err) {
            res.status(500).send();
        }

        if(!user) {
            res.status(401).send();
        }
     //   req.session.user = user.value;
        console.log(user);
        console.log("session initilized do get user");
        return res.status(201).send({ user });
    })*/;
});
app.post('/upload', upload.any(), function (req, res, next) {
    console.log(req.body);
    console.log(req.file);
    var Ufolder = './public/uploads/*';
    const dir = path.join(__dirname,Ufolder);
    console.log(dir);

   // Ufolder = path.join()

    glob(Ufolder, function (er, files) {
        var resArr = files.map(function (file) {
            var imgJSON = {};
            imgJSON = file.split('/')[3];
            imgJSON.cols = 2  ;
            return imgJSON;
            console.log(resArr);
        });

        // console.log('recent files':resArr[0]);
        for (i=0; i< resArr.length; i++)
        {
            if(resArr[i].search(".com") === -1){
                console.log("in for");
                console.log(resArr[i]);

                var homefolder = path.join(__dirname,'public','uploads', resArr[i]);
                kafka.make_request('upload_topic',{username: req.body.username, path: homefolder, file: resArr[i]}, function(err,results){
                    console.log('in result');
                    console.log(results);
                    if(err){
                        res.status(500).send();
                    }
                    else
                    {
                        if(results.code == 200){
                            //  done(null,true,results/*{username: username, password: password}*/);
                            console.log(results.value);

                            var arr = results.value;
                            res.status(201).json({username: arr});
                        }
                    }
                });

                break;
            }
        }

    });
    /*kafka.make_request('upload_topic',{username: req.body.username, path: dir}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            res.status(500).send();
        }
        else
        {
            if(results.code == 200){
                //  done(null,true,results/!*{username: username, password: password}*!/);
                console.log(results.value);
                var resarr = [];
                var res1 = results.value;
                //  if(res1.length!== 0)
                //  {
                resarr = res1.split('<br>');
                res1.length = res1.length-1;
                console.log(resarr);
                //   }
                res.status(201).send({file: resarr});
            }
        }
    });*/
   // res.status(201).json({username: req.body});
    //  res.status(201).send(body1);
    // res.status(201).end();
});

app.post('/doShare', function (req, res, next) {

    var username = req.body.username;
    var shareuser = req.body.emails;
    console.log(req.body);
    console.log(username);
    console.log(shareuser);
    var usernames = shareuser.split(',');
    //   var userfolder = 'C:/Users/thirt/eclipse-workspace-javascript/LoginAppReactJS/LoginAppReactJS/nodelogin/public/uploads/' + req.body.username + '/' + req.body.activeItemName;
   // var userfolder = path.join(__dirname,'public','uploads',req.body.username,req.body.activeItemName);
    var sharetouser ;

    /*var getUser="insert into shareuser(username, foldername) values ('"+req.param("username")+"','" + req.param("activeItemName")+"')";
                    console.log("Query is:"+getUser);
        var getUser1="insert into shareuser(username, foldername) values ('"+req.param("username1")+"','" + req.param("activeItemName")+"')";
                    console.log("Query is:"+getUser);
                    */
    kafka.make_request('share_topic',{username: req.body.username, item: req.body.activeItemName, shareuser: req.body.emails }, function(err,results){

        console.log('in result');
        console.log(results);
        if(err){
            res.status(500).send();
        }
        else
        {
            if(results.code == 200){
                //  done(null,true,results/*{username: username, password: password}*/);
                console.log(results.value);

                res.status(201).json({message: "Sharing successful"});
            }
        }
        });
    });

app.post('/doStar', function (req, res, next) {

    var username = req.body.username;
    var item = req.body.item;
    console.log(req.body);
    console.log(username);
    console.log(item);

    var sharetouser ;



    kafka.make_request('star_topic',{username: req.body.username, item: req.body.item }, function(err,results){

        console.log('in result');
        console.log(results);
        if(err){
            res.status(500).send();
        }
        else
        {
            if(results.code == 200){
                //  done(null,true,results/*{username: username, password: password}*/);
                console.log(results.value);


                res.status(201).json({message: "Staring successful"});
            }
        }
    });
});

app.post('/doGetStar', function (req, res, next) {

    var username = req.body.username;
    var item = req.body.item;
    console.log(req.body);
    console.log(username);
    console.log(item);

    var sharetouser ;



    kafka.make_request('getstar_topic',{username: req.body.username, item: req.body.item }, function(err,results){

        console.log('in result');
        console.log(results);
        if(err){
            res.status(500).send();
        }
        else
        {
            if(results.code == 200){
                //  done(null,true,results/*{username: username, password: password}*/);
                console.log(results.value);
                var resarr = [];
                var res1 = results.value;
                //  if(res1.length!== 0)
                //  {
                resarr = res1.split('<br>');
                res1.length = res1.length-1;
                console.log(resarr);

                res.status(201).json({file: resarr});
            }
        }
    });
});



app.post('/doDelStar', function (req, res, next) {

    var username = req.body.username;
    var item = req.body.item;
    console.log(req.body);
    console.log(username);
    console.log(item);

    kafka.make_request('delstar_topic',{username: req.body.username, item: req.body.item }, function(err,results){

        console.log('in result');
        console.log(results);
        if(err){
            res.status(500).send();
        }
        else
        {
            if(results.code == 200){
                //  done(null,true,results/*{username: username, password: password}*/);
                console.log(results.value);
                var resarr = [];
                var res1 = results.value;
                //  if(res1.length!== 0)
                //  {
                resarr = res1.split('<br>');
                res1.length = res1.length-1;
                console.log(resarr);

                res.status(201).json({msg: ""});
            }
        }
    });
});


module.exports = app;
