const express = require('express')
const app = express();
const fs = require('fs')
const R = require("ramda");
app.use(express.json());

app.use(express.urlencoded({ extended: true }))
app.listen(8090, () => {
  console.log("server listening at 8000")
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
    // console.log(temp);
    res.send(temp1);
  });
})


app.use('/', express.static('PROJECT'))  //displays html file

app.post('/inventory', (req, res) => {
  var temp2;
  
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
      
      else{
      
      fs.readFile("./delete.json", "utf8", (err, dataid) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        else {
          temp = JSON.parse(dataid); //now it an object
          const count = temp["deleted-invent"]

          if (req.body.data.category == "laptop") {
          
            req.body.data.id = temp["deleted-invent"][0]["laptop"];
            temp["deleted-invent"][0]["laptop"] = temp["deleted-invent"][0]["laptop"] + 1;
            temp2.inventory.push(req.body.data)

          }
          if (req.body.data.category == "mobile") {
          
            req.body.data.id = temp["deleted-invent"][0]["laptop"];
            temp["deleted-invent"][0]["laptop"] = temp["deleted-invent"][0]["laptop"] + 1;
            temp2.inventory.push(req.body.data)

          }if (req.body.data.category == "extension-box") {
          
            req.body.data.id = temp["deleted-invent"][0]["laptop"];
            temp["deleted-invent"][0]["laptop"] = temp["deleted-invent"][0]["laptop"] + 1;
            temp2.inventory.push(req.body.data)

          }if (req.body.data.category == "chairs") {
          
            req.body.data.id = temp["deleted-invent"][0]["laptop"];
            temp["deleted-invent"][0]["laptop"] = temp["deleted-invent"][0]["laptop"] + 1;
            temp2.inventory.push(req.body.data)

          }
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



var jsonfile = require('jsonfile');































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


