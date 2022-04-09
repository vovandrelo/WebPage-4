import express from 'express';
import Course from "../models/course.js";
import Cart from "../models/cart.js";

const cartRoutes = express.Router();

cartRoutes.get("/", async (req, res) => {
    const cart = await Cart.readCart();
    res.status(200).render("pages/cart.pug", {
        title: "Корзина",
        courses: cart.courses,
        price: cart.price
    });
});

cartRoutes.post("/add", async (req, res) => {
    const course = await Course.getCourseById(req.body.courseId);
    await Cart.addCart(course);
    res.redirect("/cart");
});

cartRoutes.delete("/delete/:idCourse", async (req, res) => {
    const course = await Course.getCourseById(req.params.idCourse);
    await Cart.deleteCart(course);
    res.status(202).send("The deletion was successful");

});

export default cartRoutes;