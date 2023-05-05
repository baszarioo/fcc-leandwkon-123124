require('dotenv').config();

/** 1) Install & Set up mongoose */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true 
});

/** 2) Create a 'Person' Model */
var personSchema = new mongoose.Schema({
	name: String,
	age: Number,
	favoriteFoods: [String]
});

/** 3) Create and Save a Person */
var Person = mongoose.model('Person', personSchema);

var createAndSavePerson = function(done) {
	var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
	janeFonda.save(function(err, data) {
		if(err) return console.error(err);
		done(null, data)
	});
};

/** 4) Create many People with `Model.create()` */
var arrayOfPeople = [
	{name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
	{name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
	{name: "Robert", age: 78, favoriteFoods: ["wine"]},
];

var createManyPeople = function(arrayOfPeople, done) {
	/**Person.create(arrayOfPeople, function(err, people){ */
  Person.create(arrayOfPeople, (err, people) => {
   		if(err) return console.log(err);
		done(null, people);
	});
};
/** const createManyPeople = (arrayOfPeople, done) => {
  done(null /*, data*/ /*);
};
*/

/** 5) Use Model.find() to Search your database. */
/** var findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function(error, peopleFound) {
    if(error) return console.log(error);
    done(null, peopleFound);
  });
}; // it works., but better one will be below. 
*/
var findPeopleByName = function(personName, done) {
  Person.find({name: personName}, (error, peopleFound) => {
    if(error) return console.log(error);
    done(null, peopleFound);
  });
};

/** 6) Use `Model.findOne() to Return Single Matching doc.. */
var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function(err,data){
    if(err) return console.log(err);
    done(null, data);
  });
}; //does work.

/** 7)Use Model.findById() */
var findPersonById = function(personId, done) {
  Person.findById(personId, function(err, data) { 
    if(err) return console.log(err);
    done(null, data);
  });
};

/** 8)Perform Classic Updates By running find,edit than save. */

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  // .findById() 0 method to find a prsn, by _id with the personId as a search key.
  Person.findById(personId, (err, person)=>{
    if(err) return console.log(err);
     //Array.push()...
    person.favoriteFoods.push(foodToAdd);
     // save()...
    person.save((err, updatedPerson) =>{
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
  //done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
