// REQ the validate 
const {validationResult} = require('express-validator');

// require DB from models
const dataBase = require("../models/person_model");



const get_all_persons = async (req, res) => {
    const querying = req.query
    
    console.log(querying)

    const LIMIT = querying.limit;
    const PAGE = querying.page;
    const SKIP = (PAGE - 1) * LIMIT;

    try 
    {
        // Use the Mongoose model to find all products in the database
        const persons = await dataBase.find({},{"__v" : false}).limit(LIMIT).skip(SKIP);

        // Send products as response
        res.json(persons);
    }
    catch (error) 
    {
        // Send an error response if there's an error querying the database
        res.status(500).json({ error: error.message });
    }
}

const add_new_person = async (req,res)=>{

    const {Name , Age , National_id , birthDate} = req.body
        
    // console.log('This is the request body file:- ',req.body);
    // prevent duplicate email
    const  user_exist = await dataBase.findOne({National_id : National_id});
    if(user_exist)
    {
        return res.status(400).send("User already exist")    
    }    

    // const hashedPassword = await bcrypt.hash(password,4)

    const new_person = new  dataBase ({
        Name,
        Age,
        National_id,
        birthDate,         
    })   

    // generate jwt token
    // const  accessToken = jwt.sign(
    //     {
    //         _id:new_user._id,
    //         email:new_user.email,
    //         role:new_user.role
    //     }, 
    //     process.env.JWT_SECRET,
    //     { expiresIn:'1h'})    

    //  console.log("Token:- " + accessToken)
     
    //  new_user.token = accessToken;

    await  new_person.save()
    .then(()=>{
        res.status(201).json(new_person)
    })
    .catch((error)=> {
        console.log(`${error}`)
        res.status(400).json({ message : 'There are '+ error})
    })    
}

const update_person = async (req,res) =>{
    let person_id= req.params.id;
 
    // find the index of this product 
    const person = await dataBase.findById(person_id)
 
    if(!person)
    {
        return res.status(404).send({message : "The product with the given ID was not found."})
    }
    // merge the old data with the new data that the user want to change    
    const result = await dataBase.updateOne({ _id: person_id }, { $set: { ...req.body } });
    
    const new_person = await dataBase.findById(person_id)
    res.json(new_person);
}

const delete_person = async (req, res) => {
    try {
        const person_id = req.params.id;
        const result = await dataBase.findByIdAndDelete(person_id);
        if (result) {
            console.log("Person deleted successfully:", result);
            res.send('The Person has been deleted Successfully');
        } else {
            console.error("Product not found");
            res.status(404).send("This person does not exist");
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Internal Server Error");
    }
};


module.exports =
{
    get_all_persons,
    // get_single_product,
    add_new_person,
    delete_person,
    update_person
}