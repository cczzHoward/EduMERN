const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
require('./config/passport')(passport);
const cors = require('cors');

const authRouter = require('./router').auth;
const courseRouter = require('./router').course;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRouter);
app.use("/api/course", passport.authenticate("jwt", {session: false}), courseRouter);

app.listen(8080, () => {
    console.log("Backend server is running on port 8080");
});