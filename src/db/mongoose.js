const mongoose = require("mongoose");
const Task = require("../models/task");
const User = require("../models/user");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager-RESTFul";

mongoose.connect(connectionURL + "/" + databaseName, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// const me = new User({
//   name: "     Mike    ",
//   password: " PassWord     ",
//   email: "ADSFER@adsf.com     " 
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch(error => {
//     console.log("Error!", error);
//   });

// const Book = mongoose.model("Books", {
//   name: {
//     type: String
//   },
//   author: {
//     type: String
//   },
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// });

// const myBook = new Book({
//   name: "Pianist",
//   author: "Alessandro Baricco",
//   description:
//     "      A story of a pianist called Novecento who was born in a ship and stayed for more than 30years "
// });

// myBook
//   .save()
//   .then(() => {
//     console.log(myBook);
//   })
//   .catch(error => {
//     console.log("Error!", error);
//   });

// const task = new Task({
//   name: "work",
//   description: "finish node.js course"
// });

// task
//   .save()
//   .then(() => {
//     console.log(task);
//   })
//   .catch(error => {
//     console.log("Error!", error);
//   });
