const mongoose = require("mongoose");
const db = require("./db");

const courseSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId, // primary key of User
        ref: "User",
    },
    students: {
        type: [String],
        default: [],
    }
});

courseModel = db.model("Course", courseSchema);

module.exports = courseModel;