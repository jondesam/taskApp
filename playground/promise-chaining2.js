require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndRemove("5dfd2cbe69aab0340c9d7c34")
//   .then(task => {
//     return Task.countDocuments({ completed: false });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => {
//     console.log(e);
//   });

const deleteAndCount = async id => {
  const task = await Task.findByIdAndRemove(id);
  const count = await Task.countDocuments();
  return count;
};

deleteAndCount("5dfd284b4c836b334980f25a")
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
