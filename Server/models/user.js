const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("./db");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
    },
    role: {
        type: String,
        required: true,
        enum: ["student", "instructor"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

userSchema.methods.isStudent = function () {
    return this.role === "student";
};

userSchema.methods.isInstructor = function () {
    return this.role === "instructor";
};

// userSchema.methods.comparePassword  = async function (password, cb) {
//     let result
//     try {
//         result = await bcrypt.compare(password, this.password);
//         return cb(null, result);
//     } catch(e) {
//         return cb(e, result);
//     }
// };

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


// 若使用者為新用戶，或者是用戶修改密碼時，將密碼進行加密
userSchema.pre("save", async function (next) {
    // this 代表 mongoDB 內的文件
    if (this.isNew || this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    };
    next();
});

userModel = db.model("User", userSchema);

module.exports = userModel;