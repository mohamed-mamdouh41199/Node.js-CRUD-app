const JWT = require('jsonwebtoken')

const verifyToken = (req , res , next) =>
{
    const authHeader = req.header('Authorization') || req.header('authorization')
    if (!authHeader)
    {
        return res.status(401).json("Token is req.")
    }

    const token = authHeader.split(' ')[1]    
    try
    {
        const currentUser = JWT.verify(token , process.env.JWT_SECRET)
        req.currentUser = currentUser
        console.log("Decoded Token :- " + JSON.stringify(currentUser))
        next();
    }
    catch(err)
    {
        console.log(err);        
        res.status(401).json({ message: "Invalid Token" })
    }    
}

module.exports = 
{
    verifyToken
}