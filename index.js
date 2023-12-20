// Importing Express
require("dotenv").config()
const express = require('express')
const cors=require("cors")
//We are creating our server by calling express
const app = express()

//As to be above 1024 
const port = process.env.PORT || 3000
//process.env.PORT
const fruits=require("./fruits.json")

// Middleware-code that is executed between teh request coming in and the response sent
// Authentication-middleware

//express.json
app.use(cors())
app.use(express.json())
//app.use("/",middleware_code)

//  Create route -GET route
//[Server].[method]("<path>",callback)
// req(request) / res (response)

app.get('/', (req, res) => {
    //Authentication
    res.send('Hello Fruity!')  
})


// Route to return all the fruits
app.get('/fruits', (req, res) => {
    res.send(fruits)  
})

// Route to return a specific fruit and its information
// :<property> -> dynamic parameter
app.get('/fruits/:name', (req, res) => {
    console.log(req.params.name)
    const name= req.params.name.toLowerCase()
    // Consider the case of when the fruit is found/ fruit is not found
    //Consider how to deal with capital letters vs no capital letters

    const fruit=fruits.find(fruit => fruit.name.toLowerCase() == name)
    if (fruit ==undefined){
        //send an error]
        res.status(404).send("The fruit doesn't exist.")
    }
    else{
        res.send(fruit)
    }

    // for (const fruit of fruits) {
    //     if (fruit.name === req.params.name) {
    //         console.log("Content of Kiwi Object:", fruit);
    //         return; // Exit the loop once found
    //     }
    // }
    // console.log("Kiwi not found in the dataset");
    
})

// Add a new piece of fruit to the data

app.post("/fruits",(req,res)=>{
    const fruit=req.body

    while(true){
        fruit.Id=Math.floor(Math.random() * 100);
        //fruit.Id=6
        const IDCheck=fruits.find((checkID) => checkID.id == fruit.Id)
        if (IDCheck == undefined) {
            break
        } 
    }

    // Express.json() would pass the req.body into something you can work with in your server
    const fruitName= fruit.name.toLowerCase()
    const fruitObject=fruits.find(fruit => fruit.name.toLowerCase() == fruitName)

    if (fruitObject ==undefined){
        //send an error]
        console.log("Create");
        console.log(fruit);
        fruits.push(fruit)
        //console.log(fruits);

        res.status(201).send("Created new fruit");
    }
    else{
        console.log("Already Exists");
        res.send("This fruit already exists");
    }

})

app.delete("/fruits/:name", (req, res) => {
    // First check if fruit exists
    const name = req.params.name.toLowerCase();
    console.log(name)
    const fruitIndex = fruits.findIndex((fruit) => fruit.name.toLowerCase() == name);

    if (fruitIndex == -1) {
        // Fruit cannot be found, return 404
        res.status(404).send("The fruit doesn't exist.");
    } else {
        // Fruit found. Use the array index found to remove it from the array
        fruits.splice(fruitIndex, 1);

        // Return no content status code
        res.sendStatus(204);
    }
});

app.patch("/fruits/:name", (req, res) => {
    // first check if the fruit exists
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == req.params.name.toLowerCase());
    const newFruitName = req.body.name

    // If fruit doesn't exist, we send a Not found status code
    if (fruit == undefined) {
        res.status(404).send("The fruit doesn't exist.");
    } else {
        // If fruit exists, we update its name with the new data passed from the client (req.body)
        fruit.name = newFruitName
        res.status(200).send(fruit)
    }
})

// app.delete("/fruits",(req,res)=>{
//     const fruit=req.body
//     const fruitName= fruit.name.toLowerCase()
//     const fruitObject=fruits.find(fruit => fruit.name.toLowerCase() == fruitName)
//     if (fruitObject ==undefined) {
//         res.send("The fruit doesn't exist")
//     }     
//     else{
//         const myArray = fruits.filter(({ id }) => id !== req.params.id);
//         console.log(myArray)
//         res.send("Fruit Deleted");
//     }
//     //console.log(fruits);


// })

// app.get('/home', (req, res) => {

//   //Send message/data
//   res.send('Hello World!')

//   //Send Status 
//   res.status(200)

//   //Send Status and  message/data
//   res.status(200).send('Hello World!')
// })

// Bind the server to a port
//app.listen(<port>,() =>{})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})