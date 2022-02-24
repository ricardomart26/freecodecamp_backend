require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, 
{useNewUrlParser: true, useUnifiedTopology: true});

const { Schema } = mongoose;

const personSchema = new Schema ( {
  name : {type: String, required: true},
  age : Number,
  favoriteFoods : [String]
});

const Person = mongoose.model('Person', personSchema); // Criar um modelo

const createAndSavePerson = (done) => {
  const doc = new Person({
    name: "Ricardo",
    age: 22,
    favoriteFoods: "Bifinhos com natas"
  });
  doc.save(function(err, data) {
    if (err) {
      done(err);
    }
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      done(err);
    }
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name : personName}, function(err, data) {
    if (err)
      done(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err)
      done(err);
    done(null, data);
  })
};


const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, data) {
    if (err)
      done(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, function(err, data) {
    if (err)
      done(err);
    data.favoriteFoods.push(foodToAdd);
    data.save(function(err, data) {
      if (err)
        done(err);
      done(null, data);  
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  let doc = Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true},
  function(err, data) {
    if (err)
      done(err);
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, data) {
    if (err)
      done(err);
    done(null, data);
  });

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, data) {
    if (err)
      done(err);
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.
    find({favoriteFoods : foodToSearch})
    .sort('name')
    .limit(2)
    .select(['name', 'favoriteFoods'])
    .exec(function (err, data) {
      if (err)
        done(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
