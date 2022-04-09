/* <================================================================================================================> */
/* <============================================== ИМПОРТ НЕОБХОДИМЫХ МОДУЛЕЙ ======================================> */
/* <================================================================================================================> */

import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import path, { resolve } from 'path';
import { readFile, writeFile } from "fs";
const __filename = fileURLToPath(import.meta.url);      // jshint ignore:line
const __dirname = path.dirname(__filename);             // jshint ignore:line

/* <================================================================================================================> */
/* <================================================ РЕАЛИЗАЦИЯ МОДЕЛИ КУРСА =======================================> */
/* <================================================================================================================> */

class Course {
    constructor(title, price, url) {
        this._title = title;
        this._price = price;
        this._url = url;
        this._id = uuidv4();
    }
    createCourse() {
        const newCourse = {
            title: this._title,
            price: +this._price,
            url: this._url,
            id: this._id,
        };
        return newCourse;
    }

    saveCourse() {
        const course = this.createCourse();
        Course.getCourses()
        .then(courses => {
            courses.push(course);
            courses = JSON.stringify(courses);
            return new Promise((resolve, reject) => {
                writeFile(path.resolve(__dirname, "../data/courses.json"), courses, err => {
                    if (err) {
                        reject(err);
                    }
                });
            });
        });
    }

    async editCourse(idCourse) {
        const courses = await Course.getCourses();
        const index = courses.findIndex(course => course.id === idCourse);
        const course = this.createCourse();
        courses[index] = course;
        writeFile(path.resolve(__dirname, "../data/courses.json"), JSON.stringify(courses), err => {
            if (err) {
                console.log(err);
            }
        });
    }

    static async getCourseById(idCourse) {
        const courses = await Course.getCourses();
        return courses.find(course => course.id === idCourse);
    }

    static getCourses() {
        return new Promise((resolve, reject) => {
            readFile(path.resolve(__dirname, "../data/courses.json"), "utf-8", (err, courses) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(courses));
                }
            });
        });
    }
}


export default Course;