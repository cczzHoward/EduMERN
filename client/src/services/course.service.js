import axios from 'axios';
const API_URL = 'http://localhost:8080/api/course';

class CourseService {
    post(title, description, price) {
        let token;
        if (localStorage.getItem('user')) {
            token = JSON.parse(localStorage.getItem('user')).token;
        } else {
            token = "";
        }
        return axios.post(API_URL, { 
            title, description, price 
        }, {
            headers: {
                Authorization: token
            }
        });
    }

    // 使用學生的 _id 來取得學生註冊的課程
    getEnrolledCourses(_id) {
        let token;
        if (localStorage.getItem('user')) {
            token = JSON.parse(localStorage.getItem('user')).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + '/student/' + _id, {
            headers: {
                Authorization: token
            }
        })

    }

    // 使用 instructor 的 _id 來取得講師擁有的課程
    get(_id) {
        let token;
        if (localStorage.getItem('user')) {
            token = JSON.parse(localStorage.getItem('user')).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + '/instructor/' + _id, {
            headers: {
                Authorization: token
            }
        })
    }

    getCourseByName(name) {
        let token;
        if (localStorage.getItem('user')) {
            token = JSON.parse(localStorage.getItem('user')).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + '/findByName/' + name, {
            headers: {
                Authorization: token
            }
        })
    }

    enroll(_id) {
        let token;
        if (localStorage.getItem('user')) {
            token = JSON.parse(localStorage.getItem('user')).token;
        } else {
            token = "";
        }
        return axios.post(API_URL + '/enroll/' + _id, {}, {
            headers: {
                Authorization: token
            }
        })
    }
}

export default new CourseService();