"use strict";

/* <================================================================================================================> */
/* <============================================== ИМПОРТ НЕОБХОДИМЫХ МОДУЛЕЙ ======================================> */
/* <================================================================================================================> */

import express from 'express';
import Course from "../models/course.js";

/* <================================================================================================================> */
/* <=========================================== ОБРАБОТКА РОУТОВ СТРАНИЦЫ КУРСОВ ===================================> */
/* <================================================================================================================> */

// Экспортируем роутер:
const coursesRoutes = express.Router();

// Запрос на получение страницы с курсами:
coursesRoutes.get("/", async (req, res) => {
    const courses = await Course.getCourses();
    // Ответом является страница с курсами
    res.status(200).render("pages/courses.pug", {
        title: "Курсы",
        courses
    });
});

coursesRoutes.get("/:idCourse", async (req, res) => {
    const course = await Course.getCourseById(req.params.idCourse);
    console.log(course);
    res.status(200).render("pages/course.pug", {
        title: `Курс ${course.title}`,
        course
    });
});

coursesRoutes.post("/edit", async (req, res) => {
    const course = new Course(req.body.courseName, req.body.coursePrice, req.body.courseImg);
    course.editCourse(req.body.courseId);
    res.redirect("/courses");
});

coursesRoutes.get("/:idCourse/edit", async (req, res) => {
    const course = await Course.getCourseById(req.params.idCourse);
    res.status(200).render("pages/editCourse.pug", {
        title: `Редактировать ${course.title}`,
        course
    });
});

export default coursesRoutes;