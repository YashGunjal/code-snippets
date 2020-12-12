const mongoose = require('mongoose');
const { match } = require('assert');
const { MaxKey } = require('bson');

mongoose.connect("mongodb://localhost:27017/fruitsDB",{ useNewUrlParser:true});

const fruitSchema = new mongoose.Schema({
    name:String,
    rating:Number,
    review: String
});

const Fruits = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruits({
    name:"Apple",
    rating:7,
    review:"pretty solid as fruit."
});

fruit.save(); // to enter this document in fruits collection

const kiwi = new Fruits({
    name:"kiwi",
    rating:10,
    review:" the best fruit"
});

//  similarly for orange and banana


// to insert many make multiple Fruits object of differnet fruits then
Fruits.insertMany([kiwi, orange, banana], function(err){
    if (err){
        console.log(err);
    }
    else{
        console.log(" successfully saved all the fruits fo fruitsDB");
    }
    
});


 

const peopleSchema = new mongoose.Schema({
    name:String,
    hometown:String,
    education:String
});

const Person = mongoose.model("Person", peopleSchema);

const john = new Person({ 
    name:"John",
    hometown:"Nagda",
    education:"Graduation"
});

john.save();



//  reading from database through mongoose

Fruits.find(function(err,fruits){
    if (err){
        console.log(err)
    }
    else{
        // console.log(fruits);
        fruits.forEach(element => {
            console.log(element.name);
        });
    }
});
//  returns an array of all the documnets in fruits

mongoose.connection.close();




// ----------------validation on the data

// we can add data validation  while defining the schema

//  like

const fruitSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, " please check your data entry no name sapecified"]
    },
    rating:{
        type: Number,
        min:1,
        max: 10
    },
    review: {
        type:String,
        maxlength:140
    }
});


//  one more example

const breakfastSchema = new Schema({
    eggs: {
      type: Number,
      min: [6, 'Too few eggs'],
      max: 12
    },
    bacon: {
      type: Number,
      required: [true, 'Why no bacon?']
    },
    drink: {
      type: String,
      enum: ['Coffee', 'Tea'],
      required: function() {
        return this.bacon > 3;
      }
    }
  });



//   ----------------------- update and delete with mongoose
// there are three option to update
// we have

// update, updateOne , updateMany
//  goes as model.updateOne, parameters as
//  condition, doc, callback

// Fruits.updateOne(condtion to match, updates we have to Make, callback)

Fruits.updateOne({_id:"uique id fromdb"}, {name:"Peach"}, function(err){
    if (err){
        console.log(err)
    }
    else{
        console.log("successfully updated the documnent");
    }
});


// -- for deletion we have deleteOne and deleteMany
//  detles first document that matchesthe condition
Fruits.deleteOne({name:"Peach"},(err)=>{
    if (err){
        console.log(err)
    }
    else{
        console.log("successfully deleted the record");
    }
});

// usage will be like
await Person.deleteOne({name:"Justin", age:{$gte: 18}});


// ------------- establishing realtionship and embeding documents


const peopleSchema = new mongoose.Schema({
    name:String,
    hometown:String,
    favoriteFruit:fruitSchema
});

const pineApple = new fruitSchema({
    name:"pineApple",
    rating:7,
    review:" decent fruit"
});

pineApple.save();
const amy = new peopleSchema({
    name:"Amy",
    hometown:"NewYork",
    favoriteFruit: pineApple
})

amy.save()

john.updateOne({name:"John"},{favoriteFruit:pineApple},(err) => {
    if (err){
        console.log(err)
    }
    else{
        console.log("successfully updated the record");
    }
})