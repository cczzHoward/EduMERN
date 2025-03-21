const router = require('express').Router();
const registerValidation = require('../utils/validation').registerValidation;
const loginValidation = require('../utils/validation').loginValidation;
const userModel = require('../models').user;
const jwt = require('jsonwebtoken');

router.use((req, res, next) => {
    console.log('Auth router is working');
    next();
})

router.get("/test", (req, res) => {
    return res.send("Auth router test");
});

router.post("/register", async (req, res) => {
    // 確認使用者輸入的資料是否符合規定
    let { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // 確認信箱是否已經被註冊
    const emailExist = await userModel.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("此信箱已經被註冊過了");

    // 製作新用戶
    let { username, email, password, role } = req.body;
    let newUser = new userModel({ username, email, password, role });
    try {
        let savedUser = await newUser.save();
        return res.send({
            msg: "使用者註冊成功",
            savedUser,
        });
    } catch(err) {
        return res.status(500).send("無法儲存使用者");
    }
})

router.post("/login", async (req, res) => {
    // 確認使用者輸入的資料是否符合規定
    let { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // 確認信箱是否已經被註冊
    const foundUser = await userModel.findOne({ email: req.body.email });
    if (!foundUser) return res.status(400).send("無法找到此使用者，請確認信箱是否正確");

    const isMatch = await foundUser.comparePassword(req.body.password);
    if (isMatch) {
        // 製作 json web token
        const tokenObject = { _id: foundUser._id, email: foundUser.email };
        const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
        return res.send({
            msg: "登入成功",
            token: "Bearer " + token,
            user: foundUser,
        });
    } else {
        return res.status(400).send("密碼比對錯誤");
    }
});

module.exports = router;