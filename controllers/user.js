const User = require('../models/user');


exports.getUserById = (req,res,next,id)=>{

    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error :"No User Found In The Database."
            })
        }
        req.profile = user;
        next();
    })

}

exports.getUser = (req,res) =>{

    
    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    req.profile.createdAt=undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile)
}


exports.updateUser = (req,res) =>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true ,useFindAndModify:false},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"You Are Not Authorized To Update"
                })
            }
            user.salt=undefined;
            user.encry_password=undefined;
            user.createdAt=undefined;
            user.updatedAt = undefined;
            res.json(user)
        }
    )
}



