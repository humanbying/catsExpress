const fs = require('fs');
const path = require('path');
const uuid = require('uuid');


const dataFilePath = path.join(__dirname,'./cats.json');


exports.getOne = function(id, cb) {
  exports.getAll(function(err, cats){
    if(err) return cb(err);
    const chosenCat = cats.find(function(cat){
      if(id === cat.id) return true;
      else return false;
    })
    return cb(null, chosenCat);
  });
}

exports.update = function(id, updateObj, cb){
  exports.getAll(function(err, cats) {
    if(err) return cb(err);

    let cat = cats.filter(cat => cat.id === id)[0];

    // if(cat === undefined)
    if(!cat) {
      return cb({error: "Cat not found."});
    }

    let index = cats.indexOf(cat);

    for(let key in updateObj) {
      cat[key] = updateObj[key];
    }



    cats[index] = cat;

    fs.writeFile(dataFilePath, JSON.stringify(cats), function(err) {
        if(err) return cb(err);

        cb(null, cat);
    });
  })
}


// exports.modifyOne = function(id, cat, cb) {
// exports.getAll(function(err, cats) {
//   if (err) return cb(err)
//     else {
//       cats.map((val, index) => {
//         if (val.id === id) {
//           cat.id = id
//           cats.splice(index , 1)
//           cats.push(cat);
//         }
//       });
//       fs.writeFile(dataFilePath, JSON.stringify(cats), (err) => {
//         cb(err)
//       })
//     }
//   });
// }

// exports.modifyOne = function(id, cb) {
//   exports.getAll(function(err, cats){
//     // console.log(cats);
//     if(err) return cb(err);
//
//     let modifiedCat = cats.find(function(cat){
//       if(id === cat.id) return true;
//       else return false;
//     // modifiedCat = x
//
//     // cats.push()
//     })
//     return cb(null, chosenCat);
//   });
//
//     // return cb(null, cats);
//   });
// });
// }


exports.deleteOne = function(id, cb) {
  // exports.getAll('cat1')
  exports.getAll(function(err, cats){
    // console.log(cats);
    if(err) return cb(err);
    let index = cats.findIndex(cats => cats.id === id);
    cats.splice(index, 1);
    console.log(cats);
    fs.writeFile(dataFilePath, JSON.stringify(cats), function(err) {
      cb(err);
      return cb(null, cats);
    });
  });
}


exports.getAll = function(cb) {
  fs.readFile(dataFilePath, (err, buffer) => {
    if(err) {
      return cb(err);
    }
    let cats;

    try {
      cats = JSON.parse(buffer);
    } catch(err) {
      return cb(err);
    }

    return cb(null, cats);
  });
}

exports.create = function(catObj, cb) {
  exports.getAll(function(err, cats) {
    if(err) return cb(err);

    catObj.id = uuid.v4();

    cats.push(catObj);

    fs.writeFile(dataFilePath, JSON.stringify(cats), function(err) {
      cb(err);
    });
  });
}
