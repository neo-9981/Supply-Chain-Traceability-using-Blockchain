var express = require("express");
var router = express.Router();
var User = require("../models/user");

//local

// initiateMultichain = function () {
//   var multichain = require("multichain-node")({
//     port: 2672,
//     host: "127.0.0.1",
//     user: "multichainrpc",
//     pass: "38avbzDndriTRb7BRUbencMyhUzC9u2vz3DfrTVZno6P",
//   });
//   return multichain;
// };

//AWS->
initiateMultichain = function () {
  var multichain = require("multichain-node")({
          port: 7442,
    host: "127.0.0.1",
    user: "multichainrpc",
    pass: "5j6sv7pXr3SqfBwAdnFTEMiAGm9BnKEPu2HDRfy9b3pS",
  });
  return multichain;
};
///////APIS 

//Ayush's Local
// initiateMultichain = function() {
// 	let multichain = require("multichain-node")({
// 	  port: 4766,
// 	  host: '127.0.0.1',
// 	  user: "multichainrpc",
// 	  pass: "H87M1DQXy7cEXcvztUVYh1gYMW8sBLkGrq9wuzR9PGd1"
// 	 });
// 			return multichain;
// 	}

router.get("/", (req, res, next) => {
  return res.render("index.ejs");
});

router.get("/register", (req, res, next) => {
  return res.render("register.ejs");
});

router.post("/reg", (req, res, next) => {
  console.log(req.body);
  var personInfo = req.body;

  if (personInfo.phoneno < 999999999 || personInfo.phoneno > 9999999999)
    res.send({ Success: "Invalid Phone No!" });
  else {
    if (
      !personInfo.name ||
      !personInfo.email ||
      !personInfo.phoneno ||
      !personInfo.password ||
      !personInfo.passwordConf ||
      !personInfo.roles
    ) {
      res.send({ Success: " Enter all details!" });
    } else {
      if (personInfo.password == personInfo.passwordConf) {
        User.findOne({ email: personInfo.email }, (err, data) => {
          if (!data) {
            var c;
            User.findOne({}, (err, data) => {
              if (data) {
                console.log("if");
                c = data.unique_id + 1;
              } else {
                c = 1;
              }

              var newPerson = new User({
                unique_id: personInfo.email,
                name: personInfo.name,
                email: personInfo.email,
                phoneno: personInfo.phoneno,
                role: personInfo.roles,
                address: "",
                altphoneno: "",
                password: personInfo.password,
                passwordConf: personInfo.passwordConf,
              });

              newPerson.save((err, Person) => {
                if (err) console.log(err);
                else console.log("Success");
              });
            })
              .sort({ _id: -1 })
              .limit(1);
            res.send({ Success: "You are registered,You can login now." });
          } else {
            res.send({ Success: "Email is already used." });
          }
        });
      } else {
        res.send({ Success: "Password is not matched" });
      }
    }
  }
});

router.get("/login", (req, res, next) => {
  return res.render("login.ejs");
});

router.post("/login", (req, res, next) => {
  // console.log(req.body);
  User.findOne({ email: req.body.email }, (err, data) => {
    if (data) {
      if (data.password == req.body.password) {
        // console.log("Done Login");
        req.session.userId = data.unique_id;
        //console.log(req.session.userId);
        res.send({ Success: "Success!" });
      } else {
        res.send({ Success: "Wrong password!" });
      }
    } else {
      res.send({ Success: "This Email Is not registered!" });
    }
  });
});

router.get("/dashboard", (req, res, next) => {
  // console.log("profile");
  User.findOne({ unique_id: req.session.userId }, (err, data) => {
    console.log("data");
    console.log(data);
    if (!data) {
      res.redirect("/");
    } else {
      //console.log("found");
      return res.render("dashboard.ejs", {
        name: data.name,
        email: data.email,
        role: data.role,
        access: 0,
      });
    }
  });
});

router.get("/aboutus", (req, res, next) => {
  // console.log("profile");
  User.findOne({ unique_id: req.session.userId }, (err, data) => {
    console.log("data");
    console.log(data);
    if (!data) {
      res.redirect("/");
    } else {
      //console.log("found");
      return res.render("aboutus.ejs", {
        name: data.name,
        email: data.email,
        role: data.role,
        access: 0,
      });
    }
  });
});

router.get("/updateprofile", (req, res, next) => {
  // console.log("profile");
  User.findOne({ unique_id: req.session.userId }, (err, data) => {
    // console.log("UPDATE PROFILE DATA ");
    // console.log(data);
    if (!data) {
      res.redirect("/dashboard");
    } else {
      //console.log("found");
      return res.render("updateprofile.ejs", {
        phoneno: Number(data.phoneno),
        altphoneno: Number(data.altphoneno),
        email: data.email,
        name: data.name,
        role: data.role,
        add: data.address
      });
    }
  });
});

router.post("/updateprofile", (req, res, next) => {
  console.log("req.body");
  console.log(req.body);
  if (req.body.phoneno < 999999999 || req.body.phoneno > 9999999999) {
    res.send({ Success: "Invalid Phone No!" });
  }
  else if (req.body.altphoneno < 999999999 || req.body.altphoneno > 9999999999) {
    res.send({ Success: "Invalid Alternate Phone No!" });
  }
  else {
    User.findOne({ email: req.body.email }, (err, data) => {
      data.phoneno = req.body.phoneno;
      data.altphoneno = req.body.altphoneno;
      data.address = req.body.address;

      data.save((err, Person) => {
        if (err) console.log(err);
        else console.log("Success");
        res.send({ Success: "Details Updated!" });
      });
    });
  }
});

router.get("/logout", (req, res, next) => {
  console.log("logout");
  if (req.session) {
    // delete session object
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});

router.get("/forgetpass", (req, res, next) => {
  res.render("forget.ejs");
});

router.post("/forgetpass", (req, res, next) => {
  //console.log('req.body');
  //console.log(req.body);
  User.findOne({ email: req.body.email }, (err, data) => {
    console.log(data);
    if (!data) {
      res.send({ Success: "This Email Is not regestered!" });
    } else {
      // res.send({"Success":"Success!"});
      if (req.body.password == req.body.passwordConf) {
        data.password = req.body.password;
        data.passwordConf = req.body.passwordConf;

        data.save((err, Person) => {
          if (err) console.log(err);
          else console.log("Success");
          res.send({ Success: "Password changed!" });
        });
      } else {
        res.send({
          Success: "Password does not matched! Both Password should be same.",
        });
      }
    }
  });
});

router.get("/addproduct", (req, res) => {
  // console.log("profile");
  User.findOne({ unique_id: req.session.userId }, (err, data) => {
    // console.log("UPDATE PROFILE DATA ");
    // console.log(data);
    if (!data || data.role != "Manufacturer") {
      console.log("api ");
      // alert("hii");
      // res.send({"Success":"Only Manufacturer can add Product! "});
      return res.render("dashboard.ejs", {
        name: data.name,
        email: data.email,
        access: 3,
        role: data.role
      });
    } else {
      return res.render("addproduct.ejs", {
        phoneno: Number(data.phoneno),
        altphoneno: Number(data.altphoneno),
        email: data.email,
        name: data.name,
        add: data.address,
        role: data.role,
        access: 1,
      });
    }
  });
});

router.post("/addproduct", (req, res, next) => {
  var multichain = initiateMultichain();
  var p = req.body;
  //console.log(p);
  var k = p.data.json.ID;
  return multichain
    .listStreamKeyItems({ stream: p.stream, key: k })
    .then((streamKeyItems) => {
      if (streamKeyItems.length == 0) {
        multichain.publish(p, (err, info) => {
          if (err) {
            throw err;
          }
        });
        //res.send( "No such product found !!" );
        res.send({ Success: "Product Added !!" });
      } else {
        res.send({ Success: "Product Already Exists !!" });
      }
    });
});

router.post("/updatestatus", (req, res, next) => {
  //console.log('UpdateStatus Post');
  var multichain = initiateMultichain();
  var p = req.body;
  //console.log(p);
  var k = p.data.json.ID;
  return multichain
    .listStreamKeyItems({ stream: p.stream, key: k })
    .then((streamKeyItems) => {
      if (streamKeyItems.length == 0) {
        res.send({ Success: "Product Doesn't Exists" });
      } else {
        //console.log('Item already exists');
        var summary;
        for (var i = 0; i < streamKeyItems.length; i++) {
          var obj = streamKeyItems[i].data.json;
          //console.log(streamKeyItems[i].data.json)
          summary = {
            ...summary,
            ...obj,
          };
        }
        //console.log("Summary is ",summary);
        // console.log(summary);
        console.log(req.session.userId);
        if (summary.Owner === req.session.userId) {
          multichain.publish(p, (err, info) => {
            if (err) {
              throw err;
            }
            res.send({ Success: "Product Details Updated !!" });
          });
        } else {
          res.send({ Success: "Not Allowed !!" });
        }
      }
    });
});

router.post("/fetchdata", (req, res, next) => {

  console.log(req.body.email);
  User.findOne({ email: req.body.email }, (err, data) => {
    if (data) {
      res.send({ Success: { Name: data.name, phoneno: data.phoneno, role: data.role } });
    } else {
      res.send({ Success: "This Email Is not registered!" });
    }
  });
});

router.get("/updatestatus", (req, res, next) => {
  // console.log("profile");
  User.findOne({ unique_id: req.session.userId }, (err, data) => {
    console.log("data");
    console.log(data);

    if (!data) {
      res.redirect("/dashboard");
    } else {
      //console.log("found");
      return res.render("updateproduct.ejs", {
        name: data.name,
        email: data.email,
        access: 1,
        role: data.role,
      });
    }
  });
});

router.get("/traceproduct", (req, res, next) => {
  // console.log("profile");
  User.findOne({ unique_id: req.session.userId }, (err, data) => {
    console.log("data");
    console.log(data);
    if (!data) {
      res.redirect("/dashboard");
    } else {
      //console.log("found");
      return res.render("traceproduct.ejs", {
        name: data.name,
        email: data.email,
        role: data.role,
        view: 0
      });
    }
  });
});

router.get('/traceproduct1', (req, res, next) => {
  // console.log("profile");
  //Added by Ayush for testing
  //console.log("found");
  //console.log("Returned traceproduct page");
  return res.render('tracehome.ejs');
});

router.post("/traceproduct", (req, res, next) => {
  console.log("Traceproduct Post");
  var multichain = initiateMultichain();
  var p = req.body;
  //console.log(p);
  var k = p.data.json.ID;
  let summary = {};
  return multichain
    .listStreamKeyItems({ stream: p.stream, key: k })
    .then((streamKeyItems) => {
      if (streamKeyItems.length == 0) {
        //console.log('No such item exist');
        res.send("No such product found !!");
      } else {
        //console.log(streamKeyItems);
        for (var i = 0; i < streamKeyItems.length; i++) {
          var obj = streamKeyItems[i].data.json;
          //console.log(streamKeyItems[i].data.json)
          summary = {
            ...summary,
            ...obj,
          };
        }
        //console.log("Summary is ",summary);
        // console.log(summary);
        res.json(summary);
      }
    });
});

router.get("/allproducts", (req, res, next) => {
  var ans = [];
  var summary = {};
  var keys = {}
  var multichain = initiateMultichain();

  multichain
    .listStreamKeys({ stream: "product" })
    .then((KEY) => {
      keys = KEY;
      console.log(keys);


      User.findOne({ unique_id: req.session.userId }, (err, data) => {
        console.log("data");
        console.log(data);
        if (!data || data.role != "Manufacturer") {
          res.redirect("/");
        } else {
          //console.log("found");

          return res.render("allproducts.ejs", {
            name: data.name,
            email: data.email,
            role: data.role,
            Data: keys,
            access: 0,
          });
        }
      });



      // res.render("allproducts.ejs", {
      //   name: "sid",
      //   // email: "ss@ss.com",
      //   Data: keys,
      //   role:"Manufacturer"
      // });
    });

  // for(var j=0;j<keys.length;j++){          

  //   var k=keys[j].key;  

  //     // console.log(k);
  //     multichain
  //     .listStreamKeyItems({ stream: "product", key: k })
  //     .then((streamKeyItems) => {
  //         // console.log(streamKeyItems);


  //         for (var  i= 0; i < streamKeyItems.length; i++) {
  //           var obj = streamKeyItems[i].data.json;

  //           summary = {
  //             ...summary,
  //             ...obj,
  //           };                         
  //         }
  //         var abc=JSON.parse(JSON.stringify(summary));
  //         summary={};
  //         ans.push(abc);
  //         console.log(abc);
  //         // console.log("array =="+ans);                              
  //       });
  //     }
  // res.render("allproducts.ejs", {
  //   name: "sid",
  //   email: "ss@ss.com",
  //   Data: ans,
  //   role:"Manufacturer"
  // });

});


router.post("/getkeyproducts", (req, res, next) => {
  // console.log("Traceproduct Post");
  var multichain = initiateMultichain();
  var p = req.body.key;
  console.log(p);
  // var k = p.data.json.ID;
  let summary = {};
  return multichain
    .listStreamKeyItems({ stream: "product", key: p })
    .then((streamKeyItems) => {

      for (var i = 0; i < streamKeyItems.length; i++) {
        var obj = streamKeyItems[i].data.json;
        summary = {
          ...summary,
          ...obj,
        };
      }
      console.log(summary);
      res.json(summary);
    });
});
module.exports = router;
