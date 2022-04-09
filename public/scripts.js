"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const cart = document.querySelector(".cart");
    const price = document.querySelector(".price");
    cart.addEventListener("click", event => {
        if (event.target.classList.contains("btnDelete")) {
            fetch(`/cart/delete/${event.target.dataset.idcourse}`, {
                method: "DELETE"
            }).then(res => {
                if (+event.target.previousElementSibling.innerHTML <= 1) {
                    event.target.parentElement.remove();
                } else {
                    event.target.previousElementSibling.innerHTML = +event.target.previousElementSibling.innerHTML - 1;
                }

            });
        }
    });
});