// REQ the validate 
const {validationResult} = require('express-validator');

// require DB from models
const dataBase = require("../models/product_model");

const get_all_products = async (req, res) => {
    const querying = req.query
    
    console.log(querying)

    const LIMIT = querying.limit;
    const PAGE = querying.page;
    const SKIP = (PAGE - 1) * LIMIT;

    try 
    {
        // Use the Mongoose model to find all products in the database
        const products = await dataBase.find({},{"__v" : false}).limit(LIMIT).skip(SKIP);

        // Send products as response
        res.json(products);
    }
    catch (error) 
    {
        // Send an error response if there's an error querying the database
        res.status(500).json({ error: error.message });
    }
}
const get_single_product =  async (req, res) => {
    
    const product_id = req.params.id
    const product = await dataBase.findById(product_id , {"__v":false})
    if(!product)
    {
        return res.status(404).send({message : "The product with the given ID was not found."})
    }
    res.json(product);
}

const add_new_product = async (req,res)=>{

    const new_product = new dataBase(req.body)    

    // Check for any errors on the request fields
    const errors = validationResult(req);
    if (!errors.isEmpty())  
    {
        // If there are errors send a bad request status and JSON of errors
        return res.status(400).json({ errors: errors.array() })
    }
    else 
    {
        // Otherwise save the new product to the database
        try
        {
            await new_product.save();
            res.status(201).json(new_product);
        }
        catch(err){
            // If there is an error while trying to create the new product send a conflict status and JSON of the error
            return res.status(402).json({ errors: errors.array() })
        }
    }    
}

const update_product = async (req,res) =>{
    let product_id= req.params.id;
 
    // find the index of this product 
    const product = await dataBase.findById(product_id)
 
    if(!product)
    {
        return res.status(404).send({message : "The product with the given ID was not found."})
    }
    // merge the old data with the new data that the user want to change    
    const result = await dataBase.updateOne({ _id: product_id }, { $set: { ...req.body } });
    
    const new_product = await dataBase.findById(product_id)
    res.json(new_product);
}
const delete_product = async (req, res) => {
    try {
        const product_id = req.params.id;
        const result = await dataBase.findByIdAndDelete(product_id);
        if (result) {
            console.log("Product deleted successfully:", result);
            res.send('The Product has been deleted Successfully');
        } else {
            console.error("Product not found");
            res.status(404).send("This product does not exist");
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Internal Server Error");
    }
};



module.exports =
{
    get_all_products,
    get_single_product,
    add_new_product,
    delete_product,
    update_product
}