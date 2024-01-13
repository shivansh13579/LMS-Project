import { Schema,model } from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
      fullName: {
        type: 'String',
        required: [true,'Name is required'],
        minLength: [5,'Name must be at least 5 charachter'],
        maxLength: [50,'Name should be less than 50 character'],
        lowercase: true,
        trim: true
      },
      email: {
        type: 'String',
        required: [true,'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,'Please fill in a valid email address']
      },
      password: {
        type: 'String',
        required: [true,'Password is required'],
        minLength: [8,'Password must be at least 8 character'],
        select: false
      }, 
      avatar: {
        public_id: {
            type: 'String'
        },
        secure_url: {
            type: 'String'
        }
      },
      role: {
        type: 'String',
        enum: ['USER','ADMIN'],
        default: 'USER'
      },
      forgotPasswordToken: String, 

      forgotPasswordExpiry: Date         
},{
    timestamps: true
});

userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    return next();
  }
  this.password =await bcrypt.hash(this.password,10);
});

userSchema.methods = {
  generateJWTToken: function(){
    return jwt.sign(
      {
        id: this._id,
        email: this.email,
        subscription: this.subscription,
        role: this.role
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
    )
  }
}

const User = model('User',userSchema);

export default User;