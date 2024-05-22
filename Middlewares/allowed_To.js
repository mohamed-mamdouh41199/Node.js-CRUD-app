
const allowedTo = (...roles) =>
{
    console.log("roles:- " , roles)
    return (req , res , next) =>
    {
        if(!roles.includes(req.currentUser.role))
        {
            // user is not logged in or does not have a role
            return res.status(401).json({message : 'You are not authorized'})
        }           
        next()
    }
}

module.exports = 
{
    allowedTo
}