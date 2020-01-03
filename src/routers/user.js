const express = require("express");
const User = require("../models/user");
const sharp = require("sharp");
const router = new express.Router();
const auth = require("../middleware/auth");
const { sendWelcomeEmail, sendCancelEmail } = require("../emails/account");
const multer = require("multer");

//Test
// router.get("/test", (req, res) => {
//   res.send("From a new file");
// });

//Create
router.post("/users", async (req, res) => {
  // await User.init();
  const user = new User(req.body); // take user data through http request
  console.log(user, "when user sign up");

  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      // console.log(token);

      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//Check user profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//Needed for Dev ONLY
// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);

//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

//Update
router.patch("/users/me", auth, async (req, res) => {
  // console.log(req.body, "req.body");

  const updates = Object.keys(req.body);

  const allowedUpdates = ["name", "email", "age", "password"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  //  const IsValids = updates.every((update) => {  return allowedUpdates.includes(update) })

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findById(req.user._id);

    updates.forEach(update => (user[update] = req.body[update]));

    await user.save();

    //this snippet dosen't run middleware
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    //   const user = await User.findByIdAndDelete(req.user._id);

    //   if (!user) {
    //     return res.status(404).send();
    //   }

    //same as above

    await req.user.remove();
    sendCancelEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

//Before Profile created
// router.delete("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(500).send();
//   }
// });

const upload = multer({
  // dest: "avatar",
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Plese upload jpg, jpeg or png"));
    }
    cb(undefined, true);
  }
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({
      error: error.message
    });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
