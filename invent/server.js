const express = require('express')
const app = express();
//db connection
require("./db/conn.js");

const fs = require('fs')
const R = require("ramda");
app.use(express.json());
const ejs = require("ejs")
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static('public'))  //for all common files(css)
app.listen(9000, () => {
  console.log("server listening at 9000")
})
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getdata', (req, res) => {
  fs.readFile("./items.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    temp1 = JSON.parse(jsonString);
    res.send(temp1);
  });
})


let newarr;

app.use('/adminpage', express.static('PROJECT'))  //displays html file


app.get("/data", (req, res) => {
  res.send(JSON.parse(fs.readFileSync("./items.json")))
})

app.get("/addingcategory", (req, res) => {
  res.send(JSON.parse(fs.readFileSync("./delete.json")))
})

app.post('/inventory', (req, res) => {
  var temp2;
   console.log(req.body.data);
  fs.readFile("./items.json", "utf8", (err, jsonString) => {

    if (err) {
      console.log("File read failed:", err);
      return;
    }
    else {
      temp2 = JSON.parse(jsonString);
     
      if (req.body.data.id) {
        for (var i in temp2["inventory"]) {
          if (temp2["inventory"][i].id == req.body.data.id.trim()) {
            temp2["inventory"][i].userid = req.body.data.userid;
            temp2["inventory"][i].model = req.body.data.model;
            temp2["inventory"][i].serial = req.body.data.serial;
            temp2["inventory"][i].date = req.body.data.date;
          }
        }

        var newData = JSON.stringify(temp2); //convert it back to json
        fs.writeFile("./items.json", newData, (err) => {
          // write it back
          if (err) throw err;
        });

      }

      else {
        fs.readFile("./delete.json", "utf8", (err, dataid) => {
          if (err) {
            console.log("File read failed:", err);
            return;
          }
          else {
            temp = JSON.parse(dataid); 
           //now it an object
            const count = temp["deleted-invent"]
            if (req.body.data.category == "other") {
              if(temp["deleted-invent"].length >0)
              {
              //   var newobj={}
              // newobj[req.body.data.newcategory]=1
              temp["deleted-invent"][0][req.body.data.newcategory]=1
              }
              else{
              var newobj={}
              newobj[req.body.data.newcategory]=1
              temp["deleted-invent"].push(newobj);
              }
              req.body.data.category = req.body.data.newcategory;
              var newData = JSON.stringify(temp); //convert it back to json
              fs.writeFile("./delete.json", newData, (err) => {
                // write it back
                if (err) throw err;
              });

              console.log(temp);
              }
               var id=req.body.data.category.substring(0,2).toUpperCase()
               req.body.data.id = id+"_" + temp["deleted-invent"][0][req.body.data.category];
               temp["deleted-invent"][0][req.body.data.category]=temp["deleted-invent"][0][req.body.data.category]+1;
               delete req.body.data.newcategory;
               temp2.inventory.push(req.body.data)

            
            var newData = JSON.stringify(temp); //convert it back to json

            fs.writeFile("./delete.json", newData, (err) => {

              if (err) throw err;

              // });
           
              var newData = JSON.stringify(temp2); //convert it back to json
              fs.writeFile("./items.json", newData, (err) => {
                // write it back
                if (err) throw err;
                console.log("New data added");
              });
            });


          }
        });

      }

      res.send("received");
    };

  });

});
//delete
app.post('/delete', (req, res) => {
  let data = JSON.parse(fs.readFileSync(__dirname + "/items.json"));
  let counter = 0;
  let index = null;
  data["inventory"].forEach((ele) => {
    if (ele.id != req.body.data.trim()) {
      counter++;
    }
    else {
      index = counter;
    }
  })
  if (index != null) {
    data['inventory'].splice(index, 1)
    fs.writeFileSync(__dirname + "/items.json", JSON.stringify(data))
  }
  else {
    res.send("No Data Found")
  }
});


app.get("/userView", (req, res) => {
  res.render("userdata", {
    filtereduser: newarr,
  })
})
//verify user
app.post('/verify', (req, res) => {

  fs.readFile("./users.json", "utf8", (err, userdetails) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    temp = JSON.parse(userdetails);
    const user = temp.users.find(user => user.id === req.body.data.username);

    // If the user is not found, display an error message
    if (!user) {

      res.send('User not found');
      return;
    }

    // If the password is incorrect, display an error message
    if (user.password !== req.body.data.password) {

      res.send("incorrect password")
      return;
    }
    newarr = []
    const items = JSON.parse(fs.readFileSync("./items.json"))
    const itemsdata = items["inventory"]
    itemsdata.forEach(user => {
      if (user.userid === req.body.data.username) {
        newarr.push(user)
      }
      else {

      }
    })
    res.redirect('http://localhost:9000/userView')


  });

});

app.use('/login', express.static('LOGIN'));


//COMMENT POST
app.post('/comment', (req, res) => {
  console.log(req.body.data);
  fs.readFile("./items.json", "utf8", (err, userdetails) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    temp2 = JSON.parse(userdetails);
    for (var i in temp2["inventory"]) {
      if (temp2["inventory"][i].id == req.body.data.commentid.trim() || temp2["inventory"][i].serial == req.body.data.commentserial.trim()) {
        if (temp2["inventory"][i].comments == " ") {
          temp2["inventory"][i].comments = req.body.data.comment.trim();
        }
        else {
          temp2["inventory"][i].comments = temp2["inventory"][i].comments + `<br>` + req.body.data.comment.trim();
        }

      }
    }
  var newData = JSON.stringify(temp2); //convert it back to json
    fs.writeFile("./items.json", newData, (err) => {
      // write it back
      if (err) throw err;
    });

  })
  res.send("comments added");
})



//USER ENTERED PROBLEM TO ADMIN SIDE

app.post('/problem', (req, res) => {
  fs.readFile("./items.json", "utf8", (err, details) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    var items = JSON.parse(details)
    for (var i in items["inventory"]) {
      if (items["inventory"][i]["problems"] == undefined) {
        items["inventory"][i]["problems"] = " "
      }

      else {
        if (items["inventory"][i].id == req.body.data.id) {
          items["inventory"][i]["problems"] = items["inventory"][i]["problems"] + `<br>` + req.body.data.problem.trim();
        }

      }
    }
    var tempData = JSON.stringify(items)
    fs.writeFile("./items.json", tempData, (err) => {
      // write it back
      if (err) throw err;
    });
    //res.redirect('http://localhost:9000/userView')
  });
  res.send("problems added")
})


//ADMIN VERIFY
app.use('/admin', express.static('ADMIN'));

app.post('/adminlogin', (req, res) => {

  fs.readFile("./admin.json", "utf8", (err, userdetails) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    temp = JSON.parse(userdetails);
    const admin = temp.admins.find(admin => admin.id === req.body.data.username);

    // If the user is not found, display an error message
    if (!admin) {

      res.send('Admin not found');
      return;
    }

    // If the password is incorrect, display an error message
    if (admin.password !== req.body.data.password) {

      res.send("incorrect password")
      return;
    }
    // res.sendFile(__dirname+"/dashboard.html")
   res.redirect("http://localhost:9000/adminpage")

  });

});
// app.get("/admin",(req,res)=>{
//   res.render('dashboard');
// })

