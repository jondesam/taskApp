const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

// app.use((req, res, next) => {
//   // console.log(req.method, req.path);

//   if (req.method === "GET") {
//     res.send("Get requsts are disabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send("Server is being maintained");
//   // next();
// });

//File upload
// const multer = require("multer");
// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000
//   },
//   fileFilter(req, file, cb) {
//     // if (!file.originalname.endsWith(".pdf")) {
//     //   return cb(new Error("Please upload a PDF"));
//     // }
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error("Please upload a Word document"));
//     }
//     cb(undefined, true);
//   }
// });

// const errorMiddleware = (req, res, next) => {
//   throw new Error("From my middleware");
// };

// app.post(
//   "/upload",
//   upload.single("upload"),
//   (req, res) => {
//     res.send();
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// //How to create Router
// const router = new express.Router();//create
// router.get("/test", (req, res) => {
//   res.send("This is form other router");
// }); //set up the router
// app.use(router); //register it

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// const bcrypt = require("bcryptjs");

// const jwt = require("jsonwebtoken");

// const myF = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
//     expiresIn: "7 days"
//   });
//   // console.log(token);

//   const data = jwt.verify(token, "thisismynewcourse");
//   console.log(data);

//   // Before using jsonwebtoken
//   // const password = "Red12345!"
//   // const hashedPassword = await bcrypt.hash(password, 8)
//   // console.log(password);
//   // console.log(hashedPassword);
//   // const isMatch = await bcrypt.compare('red12345!', hashedPassword)
//   // console.log(isMatch);
// };

// myF();

// const pet = {
//   name: "Hal"
// };

// pet.toJSON = function() {
//   console.log(this, "this");
//   this.name = "kal"
//   return this;
// };

// console.log(pet,"just pet");

// console.log(JSON.stringify(pet), "stringify");

// console.log("      ");

// alert(user);

const Task = require("./models/task");
const User = require("./models/user");

// const main = async () => {
//   // const task = await Task.findById("5e09271d3a706b0d75c0d561");

//   // await task.populate("owner").execPopulate();
//   // console.log(task);

//   const user = await User.findById("5e091e4072c7500caa851ccc");
//   await user.populate("tasks").execPopulate();

//   console.log(user.tasks);
// };

// main();
