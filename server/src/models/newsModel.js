const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema(
  {
    
    title: 
      {
       type: String,
      required: [true, "title is required"],
      },
    

   
   content: {
      type: String,
      required: [true, "content is required"],
    },

    category: {
      type: String,
      required: [
        true,
        "category is required",
      ],
       enum: ["General", "Tech","Business","Sports","Entertainment","Politics","Health"],
      default: "General",
    },

    image: {
      type: String,
      
    },

    
    status: {
      type: String,
      required: [true, "status is required"],
      enum: ["draft", "published","scheduled","in-review"],
      default: "draft",
    },

    

  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);


/**
 * News model
 */
const NewsModel = mongoose.model("news", newsSchema)

module.exports = NewsModel