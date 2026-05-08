const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    
    name: 
      {
       type: String,
      required: [true, "name is required"],
      },
    

   
   email: {
      type: String,
      required: [true, "Email is required"],
    unique: true,
    lowercase: true
    },

    password: {
    type: String,
     required: [true, "password is required"],
  },

    

    

  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);


/**
 * User model
 */
const UserModel = mongoose.model("user", userSchema)

module.exports = UserModel