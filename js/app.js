let wishlistCount = 0;

const wishlistButtons =
document.querySelectorAll(".wishlist-btn");

const counter =
document.getElementById("wishlist-count");

wishlistButtons.forEach(button => {

    button.addEventListener("click", () => {

        const icon = button.querySelector("i");

        if(icon.classList.contains("bi-heart")) {

            icon.classList.remove("bi-heart");
            icon.classList.add("bi-heart-fill");
            icon.style.color = "red";

            wishlistCount++;

        }

        else {

            icon.classList.remove("bi-heart-fill");
            icon.classList.add("bi-heart");
            icon.style.color = "black";

            wishlistCount--;

        }

        counter.innerText = wishlistCount;

    });

});