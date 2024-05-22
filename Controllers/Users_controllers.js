// require DB from models
const dataBase = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt  = require('jsonwebtoken');
const get_all_users = async (req, res) => {
    const querying = req.query
    
    console.log(querying)

    const LIMIT = querying.limit;
    const PAGE = querying.page;
    const SKIP = (PAGE - 1) * LIMIT;

    try 
    {
        // Use the Mongoose model to find all products in the database
        const users = await dataBase.find({},{"__v" : false}).limit(LIMIT).skip(SKIP);

        // Send products as response
        res.json(users);
    }
    catch (error) 
    {
        // Send an error response if there's an error querying the database
        res.status(500).json({ error: error.message });
    }
}
const get_single_user =  async (req, res) => {
    
    const user_id = req.params.id
    const user = await dataBase.findById(user_id , {"__v":false})
    if(!user)
    {
        return res.status(404).send({message : "The user with the given ID was not found."})
    }
    res.json(user);
}

const register = async (req,res)=>{

    const {first_name , last_name , email , role , password} = req.body
        
    // console.log('This is the request body file:- ',req.body);
    // prevent duplicate email
    const  user_exist = await dataBase.findOne({email : email});
    if(user_exist)
    {
        return res.status(400).send("User already exist")    
    }    

    const hashedPassword = await bcrypt.hash(password,4)

    const new_user = new  dataBase ({
        first_name,
        last_name,
        email ,
        role, 
        password : hashedPassword,
        avatar:req.file.filename
    })   

    // generate jwt token
    const  accessToken = jwt.sign(
        {
            _id:new_user._id,
            email:new_user.email,
            role:new_user.role
        }, 
        process.env.JWT_SECRET,
        { expiresIn:'1h'})    

     console.log("Token:- " + accessToken)
     
     new_user.token = accessToken;

    await  new_user.save()
    .then(()=>{
        res.status(201).json(new_user)
    })
    .catch((error)=> {
        console.log(`${error}`)
        res.status(400).json({ message : 'There are '+ error})
    })    
}

const login = async (req,res)=>{
    const {email, password} = req.body;
    if( !email || !password ) {return res.status(400).json({ message :'Missing fields'})}

    const user = await dataBase.findOne({email : email})
    if(!user)
    {
        return res.status(401).json({message:'This is email is not exist'})
    }

    const isValidPass = await bcrypt.compare(password,user.password);
    if (!isValidPass) 
    {
      return res.status(401).json({ message : "Invalid Password" });
    }
    
    if(isValidPass && email)
    {
        const accessToken = jwt.sign(
        {
            _id:user._id,
            email:user.email,            
            role:user.role
        }, 
        process.env.JWT_SECRET,
        { expiresIn:'1h'})            

        const rege = /[^0-9]/ig
        return res.status(200).json({message : user.email + " is Logged in Successfully." , token:accessToken});
    } 
}


module.exports =
{
    get_all_users,
    get_single_user,
    register,
    login
}