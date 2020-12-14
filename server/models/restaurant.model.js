const mongoose = require("mongoose");
const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must be 3 characters or longer"]
    },
    yearEstablished: {
        type: Date, 
        required: [true, "Due Date is required"],
    }, 
    status : {
        type : String ,
    },
}, {timestamps: true});
module.exports = mongoose.model("Restaurant", RestaurantSchema);