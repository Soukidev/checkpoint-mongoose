require('dotenv').config(); 

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.error("Connection Error ❌", err));

//Creating the Person Schema
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    favoriteFoods: { type: [String] } // An array of strings
  });
  
  const Person = mongoose.model('Person', personSchema);

  //Creating and Saving a Record  
const createPerson = async () => {
  const person = new Person({
    name: 'souki',
    age: 18,
    favoriteFoods: ['Pizza', 'Taccos']
  });

  try {
    const savedPerson = await person.save();
    console.log('Person saved:', savedPerson);
  } catch (err) {
    console.error('Error saving person:', err);
  }
};

createPerson();

//Creating Many Records

const createManyPeople = async () => {
    const people = [
      { name: 'Alice', age: 30, favoriteFoods: ['Burger', 'Fries'] },
      { name: 'Bob', age: 40, favoriteFoods: ['Pizza', 'Sushi'] }
    ];
  
    try {
      const savedPeople = await Person.create(people);
      console.log('People saved:', savedPeople);
    } catch (err) {
      console.error('Error saving people:', err);
    }
  };
  
  createManyPeople();
//Using find() to Search on Database 
const findPeopleByName = async () => {
    try {
      const people = await Person.find({ name: 'John' });
      console.log('Found people:', people);
    } catch (err) {
      console.error('Error finding people:', err);
    }
  };
  
  findPeopleByName();

  //Using findOne() to Search for a Single Document

  const findPersonByFood = async (food) => {
    try {
      const person = await Person.findOne({ favoriteFoods: food });
      console.log('Found person:', person);
    } catch (err) {
      console.error('Error finding person by food:', err);
    }
  };
  
  findPersonByFood('Pizza');

 // Using findById() to Search by _id  

 const findPersonById = async (personId) => {
    try {
      const person = await Person.findById(personId);
      console.log('Found person by ID:', person);
    } catch (err) {
      console.error('Error finding person by ID:', err);
    }
  };
  
  findPersonById('your_person_id_here');

  //Updating a Person's Favorite Food
  const updatePersonFavoriteFoods = async (personId) => {
    try {
      const person = await Person.findById(personId);
      person.favoriteFoods.push('Hamburger');
      await person.save();
      console.log('Updated person:', person);
    } catch (err) {
      console.error('Error updating favorite foods:', err);
    }
  };
  
  updatePersonFavoriteFoods('your_person_id_here');
  
  //Using findOneAndUpdate() to Update a Person

  const updatePersonAge = async (personName) => {
    try {
      const updatedPerson = await Person.findOneAndUpdate(
        { name: personName },
        { age: 20 },
        { new: true }
      );
      console.log('Updated person:', updatedPerson);
    } catch (err) {
      console.error('Error updating person:', err);
    }
  };
  
  updatePersonAge('John');
  
  //Deleting a Document

  const deletePersonById = async (personId) => {
    try {
      const deletedPerson = await Person.findByIdAndRemove(personId);
      console.log('Deleted person:', deletedPerson);
    } catch (err) {
      console.error('Error deleting person:', err);
    }
  };
  
  deletePersonById('your_person_id_here');

  //Deleting Many Documents
  const deletePeopleByName = async () => {
    try {
      const result = await Person.remove({ name: 'Mary' });
      console.log('Delete result:', result);
    } catch (err) {
      console.error('Error deleting people:', err);
    }
  };
  
  deletePeopleByName();

  //Chaining Search Queries

  const findPeopleWhoLikeBurritos = async () => {
    try {
      const people = await Person.find({ favoriteFoods: 'Burrito' })
        .sort('name')
        .limit(2)
        .select('-age')
        .exec();
      console.log('Found people:', people);
    } catch (err) {
      console.error('Error finding people who like burritos:', err);
    }
  };
  
  findPeopleWhoLikeBurritos();
  
