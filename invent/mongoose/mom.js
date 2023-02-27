const mongoose = require("mongoose")
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://0.0.0.0:27017/pracdb", { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true })
    .then(() => console.log("connection succesfull"))
    .catch((err) => console.log("failed"));

const Employeesschema = new mongoose.Schema({    //defining structure of a document 
    name: {
        type: String,
        required: true
    },
    mobile: Number,
    age: Number,
    bla: String,
    date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
})

//creating collection
const Employees = new mongoose.model("Employees", Employeesschema)

//adding data to collection
// const employeedata=new Employees({
//     name:"Madhuri",
//     mobile:8367428322,
//     age:22
// })

// const create=async()=>{
//     const employee1=new Employees({
//         name:"Madhuri",
//         mobile:8367428322,
//         age:21
//     })
//     const employee2=new Employees({
//         name:"lolly",
//         mobile:836742,
//         age:19
//     })
//     // const data=await employeedata.save();
//     // console.log(data);
//     await Employees.insertMany([employee1,employee2],(err,data)=>{
//         if(err)console.log(`error:${err}`);
//         else{
//             console.log(`data successfully sent:${data}`)
//         }
//     })

// };
// create();


//READ DOCUMENT

// const readdocument = async () => {
//     //  const res=Employees.updateMany({name:"Madhuri"},{$set:{age:2}},useFindAndModify=true);
//     const res = await Employees.find({ name: "Madhuri" }).sort({ date: -1 })
//     // const res=await Employees.find({name:"Madhuri"}).countDocuments();
//     // const res=await Employees.find({count:{$gt :2}})
//     // await Employees.insertMany([{name:"vamsi",age:22},{name:"gayathri",age:16}])
//     // const res=await Employees.find({name:{$nin :["lolly","Madhuri"]}}).select({name:1})
//     // const res=await Employees.find({$and :[ {name:"lolly"} , {count:{$gt :0}} ]}).select({name:1,count:1,_id:0})

//     // const res=await Employees.find({$or:[{name:"lolly"},{count:1}]}).countDocuments()
//     // const res=await Employees.find({}).select({name:1,_id:0}).sort("name:1")
//     console.log(res);
//     // const result=await Employees.find({name:"lolly"},{_id:0,name:1}).limit(1).skip(1);
// }
// readdocument();


//UPDATE DOCUMENT

// const updatedoc=async(_id)=>{
//   const res=await Employees.findByIdAndUpdate({_id},{$set:{status:"waste"}},{new:true,useSetAndModify:true,useFindAndModify:true});
//   console.log(res);
// }

// updatedoc("63fafb2e803104c3f42efe1b")

const updatedoc=async()=>{    //existing fields modifying
    Employees.findOneAndUpdate({name:"Bhanu"},{bla:42},{new:true},(err,doc)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(doc);
        }
    });
  }
  updatedoc()


  DELETE DOCUMENT  //findByIdDelete ,deleteMany
  const deletedoc=async()=>{
    const res=await Employees.deleteOne({name:"gayathri"});
    console.log(await Employees.find());  
  }
  deletedoc();


