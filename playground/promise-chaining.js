require("../src/db/mongoose");
const User = require("../src/models/user");

//5dfd2890fc17af336628877b task

//5dfd1bd68c52112fe85f11c5 user

// User.findByIdAndUpdate("5dfbee0802a33628c94a1b85", { age: 1 })
//   .then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("5dfd1bd68c52112fe85f11c5", 93)
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
