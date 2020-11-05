const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.insertMany(data)
  })
  .then((manyRecipes) => {
    console.log('Many recipes created', manyRecipes);
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration:100}, {new: true})
  })
  .then(updatedRigatoni => {
    console.log(`Updated the Rigatoni alla Genovese ${updatedRigatoni}`);
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then((resultFromDeleteOne) => {
    console.log(`Carrot Cake got deleted ${resultFromDeleteOne}`)
    return mongoose.connection.close();
  }) 
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  /*
  Recipe.create({
    title: "Ramen",
    cuisine: "Asian"
  }).then((createdRecipe) => {
    console.log("Recipe created", createdRecipe);
  }).catch((err) => {
    console.log("error occurred", err)
  });




  .then((createdManyRecipes) => {
  console.log("Many recipes created", createdManyRecipes);

  .then((updatedRigatoni) => {
    console.log(`Updated the Rigatoni alla Genovese ${updatedRigatoni}`);

    Recipe.deleteOne({title: "Carrot Cake"})
    .then((resultFromDeleteOne) => {
        console.log(`Carrot Cake got deleted ${resultFromDeleteOne}`)
        mongoose.connection.close();

    })
  })
})
  .catch((err) => {
    console.log("error", err);
  })
 
*/



 






