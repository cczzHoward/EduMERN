const router = require('express').Router();
const Course = require('../models').course;
const courseValidation = require('../utils/validation').courseValidation;

router.use((req, res, next) => {
    console.log("Course router is working");
    next();
});

// 獲得系統中所有的課程
router.get("/", async(req, res) => {
    try {
        let courseFound = await Course.find({}).populate("instructor", ["username", "email"]).exec();
        return res.send(courseFound);
    } catch(e) {
        return res.status(500).send(e);
    }
});

// 用講師 ID 尋找課程
router.get("/instructor/:_instructor_id", async(req, res) => {
    let { _instructor_id } = req.params;
    try {
        let courseFound = await Course.find({instructor: _instructor_id}).populate("instructor", ["username", "email"]).exec();
        return res.send(courseFound);
    } catch(e) {
        return res.status(500).send(e);
    }
});

// 用課程名稱尋找課程
router.get("/findByName/:name", async(req, res) => {
    let { name } = req.params;
    try {
        let courseFound = await Course.find({title: name}).populate("instructor", ["username", "email"]).exec();
        return res.send(courseFound);
    } catch(e) {
        return res.status(500).send(e);
    }    
});

// 用學生 ID 尋找註冊過的課程
router.get("/student/:student_id", async(req, res) => {
    let { student_id } = req.params;
    try {
        let courseFound = await Course.find({students: student_id}).populate("instructor", ["username", "email"]).exec();
        return res.send(courseFound);
    } catch(e) {
        return res.status(500).send(e);
    }
});

// 用課程 ID 獲取單一課程
router.get("/:_id", async(req, res) => {
    let { _id } = req.params;
    try {
        let courseFound = await Course.findOne({_id}).populate("instructor", ["username", "email"]).exec();
        return res.send(courseFound);
    } catch(e) {
        return res.status(500).send(e);
    }
});

// 新增課程
router.post("/", async(req, res) => {
    let { error } = courseValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.user.isStudent()) return res.status(400).send("您無法新增課程，只有講師才能發布新課程");
    let {title, description, price} = req.body;
    try {
        let newCourse = new Course({
            title, 
            description, 
            price, 
            instructor: req.user._id
        });
        let savedCourse = await newCourse.save();
        return res.send({msg: "新課程已經保存",});
    } catch(e) {
        return res.status(500).send("無法新增課程");
    }
});

// 讓學生透過課程 id 來註冊新課程
router.post("/enroll/:_id", async(req, res) => {
    let { _id } = req.params;
    let courseFound = await Course.findOne({_id});
    courseFound.students.push(req.user._id);
    await courseFound.save();
    return res.send("註冊成功");
});

// 修改課程
router.patch("/:_id", async(req, res) => {
    // 驗證數據是否符合規定
    let { error } = courseValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let { _id } = req.params;
    try {
        // 確認課程存在
        let courseFound = await Course.findOne({_id}).exec();
        if (!courseFound) return res.status(400).send("找不到此課程，無法更新");

        // 確認使用者是否有權限修改此課程 (只有講師可以修改)
        if (courseFound.instructor.equals(req.user._id)) {
            let updatedCourse = await Course.findOneAndUpdate({_id}, req.body, {
                new: true,
                runValidators: true,
            });
            return res.send({
                message: "課程已經更新",
                updatedCourse,
            })
        } else {
            return res.status(403).send("只有此課程的講師可以修改此課程");
        }


    } catch(e) {
        return res.status(500).send(e);
    }

});

// 刪除課程
router.delete("/:_id", async(req, res) => {
    let { _id } = req.params;
    try {
        // 確認課程存在
        let courseFound = await Course.findOne({_id}).exec();
        if (!courseFound) return res.status(400).send("找不到此課程，無法刪除");

        // 確認使用者是否有權限刪除此課程 (只有講師可以刪除)
        if (courseFound.instructor.equals(req.user._id)) {
            await Course.deleteOne({ _id }).exec();
            res.send("課程已經刪除");
        } else {
            return res.status(403).send("只有此課程的講師可以刪除此課程");
        }
    } catch(e) {
        return res.status(500).send(e);
    }

});

module.exports = router;