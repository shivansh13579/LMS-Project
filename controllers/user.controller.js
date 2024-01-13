import AppError from "../utils/error.util";
import userSchema from "../models/user.model.js"

const register = async (req,res,next) => {
    const {fullName,email,password} = req.body;

    if(!fullName || !email || !password){
        return next(new AppError('All fields are required',400));
    }

    const userExists = await User

    if(userExists){
        return next(new AppError('Email already exists',400));
    } 

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: 
        }
    })
};

const login = (req,res) => {

};

const logout = (req,res) =>{

};

const getProfile = (req,res) => {

}

export {
    register,
    login,
    logout,
    getProfile
}