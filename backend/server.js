const exp = require('express')
const mongoClient = require('mongodb').MongoClient
const app = exp()
const cors = require('cors')

const userApp=require('./api/user.js');
app.use(exp.json())
app.use(cors())
app.use(exp.urlencoded({extended:true}))
mongoClient.connect('mongodb://localhost:27017')
.then( client=>{
    const dbobj =   client.db('todo')
     const userCollection = dbobj.collection('users')

    app.set('userCollection',userCollection);
    
    console.log('Database connection successfull');
})
.catch(error=> console.log('error occured at db'));

app.use('/user',userApp);
const port=4000;

app.get('/',(req,res)=>{
    res.send('This is get method')
    
})






app.listen(port,console.log(`server is running at port number: ${port}`))