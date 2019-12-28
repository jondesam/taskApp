const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

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

const jwt = require("jsonwebtoken");

const myF = async () => {
  const token = jwt.sign({ _id: "abc123" }, "thisisodejsbackend", {
    expiresIn: "7 days"
  });
  // console.log(token);

  const data = jwt.verify(token, "thisisodejsbackend");
  // console.log(data);

  // Before using jsonwebtoken
  // const password = "Red12345!"
  // const hashedPassword = await bcrypt.hash(password, 8)
  // console.log(password);
  // console.log(hashedPassword);
  // const isMatch = await bcrypt.compare('red12345!', hashedPassword)
  // console.log(isMatch);
};

myF();
