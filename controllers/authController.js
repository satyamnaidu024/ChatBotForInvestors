const User = require('../models/user');
const { use } = require('../routes/product');
const sendToken = require('../utils/jwtToken');

//register a user => /api/v1/register
exports.registerUser = async (req,res,next) => {
    const {name,email,password,avatarimageurl} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatarimageurl
    })

   sendToken(user,200,res)
}

//Login User => /api/v1/login
exports.loginUser = async (req,res,next) =>{
    const {email,password} = req.body;

    //check if email and password is entered by user
    if(!email || !password){
        return res.status(400).json({
            success:true,
            message:"please enter details"
        })
    }

    //finding user in db
    const user = await User.findOne({email}).select('+password')

    if(!user)
    {
        return res.status(401).json({
            success:false,
            message:"Invalid Email or Password"
        })
    }

    //checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched)
    {
        return res.status(401).json({
            success:false,
            message:"Invalid Email or Password"
        })
    }
    sendToken(user,200,res) 
}

//Get currently logged in users details => api/v1/me
exports.getUserProfile = async (req,res,next) =>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    }
    )

}

//Forgot Password => api/v1/password/forgot
exports.forgotPassword = async (req,res,next) =>{
        const user = await User.findOne({email:req.body.email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found with this email"
            })
        }
         //get reset token
         const resetToken = user.getResetPasswordToken();
         
         await user.save({validateBeforeSave:false})

         //create reset password url
         const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/reset/${resetToken}`;


}

//update / change password => api/v1/password/update
exports.updatePassword = async (req,res,next) =>{
    const user = await User.findById(req.user.id).select('+password');

    //check previoususer password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched)
    {
        return res.status(400).json({
            success:false,
            message:"Old Password is incorrect"
        })
    }
    user.password = req.body.password;
    await user.save();

    sendToken(user,200,res)
}


//Logout user => /api/v1/logout
exports.logout = async (req,res,next) =>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success:"true",
        message:"Logged out"
    })
} 

