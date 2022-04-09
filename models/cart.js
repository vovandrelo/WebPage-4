/* <================================================================================================================> */
/* <============================================== ИМПОРТ НЕОБХОДИМЫХ МОДУЛЕЙ ======================================> */
/* <================================================================================================================> */

import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import path  from 'path';
import { readFile, writeFile } from "fs";
import e from 'express';
const __filename = fileURLToPath(import.meta.url);      // jshint ignore:line
const __dirname = path.dirname(__filename);             // jshint ignore:line


class Cart {
    // Метод реализует запись переданной в качестве аргумента корзины в БД:
    static writeCart(cart) {
        return new Promise((resolve, reject) => {
            writeFile(path.resolve(__dirname, "../data/cart.json"), cart, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Метод реализует получение корзины из БД:
    static readCart() {
        return new Promise((resolve, reject) => {
            readFile(path.resolve(__dirname, "../data/cart.json"), "utf-8", (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }

    // Метод реализует добавление переданного в качестве параметра курса в корзину:
    static async addCart(course) {
        const cart = await Cart.readCart();
        const indx = cart.courses.findIndex(curCourse => curCourse.id === course.id);
        if (indx === -1) {
            course.number = 1;
            cart.courses.push(course);
        } else {
            cart.courses[indx].number++;
        }
        cart.price += course.price;
        await Cart.writeCart(JSON.stringify(cart));
    }


    // Метод реализует удаление переданного в качестве параметра курса из корзины:
    static async deleteCart(course) {
        const cart = await Cart.readCart();
        const indx = cart.courses.findIndex(curCourse => curCourse.id === course.id);
        cart.courses[indx].number--;
        cart.price -= cart.courses[indx].price;
        cart.courses = cart.courses.filter(curCourse => curCourse.number >= 1);
        await Cart.writeCart(JSON.stringify(cart));
    }
}

export default Cart;