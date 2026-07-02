const products = [
{
    id: 1,
    brand: "SHEIN",
    name: "Short Sleeve Polo Tshirt",
    price: 699,
    rating: 4.5,
    reviews: 218,
    image: "images/tshirt.avif",
    description: "Comfortable casual polo t-shirt for everyday wear.",
    category: "Men",
    link: "https://www.ajio.com/shein-shein-medium-length-short-sleeve-self-design-polo-tshirt/p/443397620_green?"
},
{
    id: 2,
    brand: "U.S.POLO",
    name: "Checked Tailored Fit Shirt",
    price: 1040,
    rating: 4.0,
    reviews: 185,
    image: "images/checkered.avif",
    description: "Comfortable formal shirt for everyday wear.",
    category: "Men",
    link:"https://www.ajio.com/u-s-polo-assn-men-checked-tailored-fit-shirt-with-patch-pocket/p/469738496_navy?"
},
{
    id: 3,
    brand: "KISAH",
    name: "Kurta Set Printed Nehru Jacket",
    price: 5999,
    rating: 4.8,
    reviews: 152,
    image: "images/sherwani.avif",
    description: "Comfortable casuals for everyday wear.",
    category: "Men",
    link:"https://www.ajio.com/kisah-men-regular-fit-3-piece-kurta-pyjama-set-with-printed-nehru-jacket-/p/702611922_multi?"
},
{
    id: 4,
    brand: "TEAM SPIRIT",
    name: "Quilted Sweatshirt with Pocket",
    price: 175,
    rating: 4.3,
    reviews: 138,
    image: "images/quilted-sweats.avif",
    description: "Comfortable casuals for everyday wear.",
    category: "Kids",
    link:"https://www.ajio.com/kb-team-spirit-boys-quilted-sweatshirt-with-flap-pocket/p/443090063_blue?"
},
{
    id: 5,
    brand: "MYRIE",
    name: "Floral Print Kurta with Palazzo",
    price: 400,
    rating: 4.4,
    reviews: 134,
    image: "images/coordset.avif",
    description: "Comfortable casuals for everyday wear.",
    category: "Women",
    link:"https://www.ajio.com/myrie-women-floral-print-kurta-with-palazzo-co-ord-set/p/702936716_blue?"
},
{
    id: 6,
    brand: "FRENDZ",
    name: "Crab All-Over Dress",
    price: 305,
    rating: 4.2,
    reviews: 67,
    image: "images/crab-kids-dress.avif",
    description: "Comfortable casuals for everyday wear.",
    category: "Kids",
    link:"https://www.ajio.com/inf-frendz-seer-sucker-crab-all-over-dress/p/443107629_blue?"
},
{
    id: 7,
    brand: "PARI",
    name: "Pack of 2 Silver Studded Bangles",
    price: 423,
    rating: 3.7,
    reviews: 96,
    image: "images/bangles.avif",
    description: "Ethnic Accessories for everyday wear.",
    category: "Accessories",
    link:"https://www.ajio.com/the-pari-pack-of-2-women-silver-plated-stone-studded-bangles/p/702241674_multi?"
},
{
    id: 8,
    brand: "ASICS",
    name: "Men Novablast Running Shoes",
    price: 10499,
    rating: 4.9,
    reviews: 412,
    image: "images/shoes.avif",
    description: "Comfortable sporties for everyday wear.",
    category: "Footwear",
    link:"https://www.ajio.com/asics-men-novablast-5-running-shoes/p/469798961_blue?"
}
];
let wishlist = [];
let cart = [];
let currentProduct = null;

const wishlistButtons = document.querySelectorAll(".wishlist-btn");
const wishlistCounter = document.getElementById("wishlist-count");
const quickViewButtons = document.querySelectorAll(".quick-view-btn");
const modalCartBtn = document.getElementById("modal-add-cart");
const cartButtons = document.querySelectorAll(".add-cart-btn");
const cartCounter = document.getElementById("cart-count");

quickViewButtons.forEach(button => {
    button.addEventListener("click", () => {
        const id = parseInt(button.dataset.id);
        const product = products.find(p => p.id === id);
        currentProduct = product;
        document.getElementById("modal-name").innerText =
        product.name;
        document.getElementById("modal-brand").innerText =
        product.brand;
        document.getElementById("modal-price").innerText =
        "₹" + product.price;
        document.getElementById("modal-description").innerText =
        product.description;
        document.getElementById("modal-rating").innerText =
        product.rating;
        document.getElementById("modal-reviews").innerText =
        product.reviews + " Ratings";
        document.getElementById("modal-image").src =
        product.image;
        document.getElementById("modal-link").href =
        product.link;
    });
});

wishlistButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const icon = button.querySelector("i");
        const product = products[index];

        if (icon.classList.contains("bi-heart")) {
            icon.classList.remove("bi-heart");
            icon.classList.add("bi-heart-fill");
            icon.style.color = "red";
            wishlist.push(product);
        }
        else {
            icon.classList.remove("bi-heart-fill");
            icon.classList.add("bi-heart");
            icon.style.color = "black";
            wishlist = wishlist.filter(item => item.id !== product.id);
        }
        wishlistCounter.innerText = wishlist.length;
        console.log(wishlist);
    });
});
cartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const product = products[index];
        const exists = cart.some(item => item.id === product.id);

        if (!exists) {
            cart.push(product);
        }
        button.innerHTML ='<i class="bi bi-check-lg"></i> Added';
        setTimeout(() => {
            button.innerHTML = '<i class="bi bi-cart"></i> Add To Cart';
        }, 1500);

        cartCounter.innerText = cart.length;
        updateCartPreview();
        console.log(cart);
    });
});
modalCartBtn.onclick = () => {
    if (!currentProduct) return;
    const exists = cart.some(item => item.id === currentProduct.id);
    if (!exists) {
        cart.push(currentProduct);
        cartCounter.innerText = cart.length;
        updateCartPreview();
    }
    modalCartBtn.innerHTML ='<i class="bi bi-check-lg"></i> Added';
    setTimeout(() => {
        modalCartBtn.innerHTML ='<i class="bi bi-cart"></i> Add To Cart';
    }, 1500);
    console.log(cart);
};
function updateCartPreview() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="text-muted">Your cart is empty.</p>
        `;
        cartTotal.innerText = "0";
        return;
    }
    let total = 0;
    let html = "";

    cart.forEach(product => {
        total += product.price;
        html += `
            <div class="d-flex align-items-center mb-3">
                <img src="${product.image}" width="60" height="60" class="rounded me-3">
                <div>
                    <div class="fw-semibold">${product.name}</div>
                    <small style="color:#7c5f24;">${product.brand}</small>
                    <small class="text-muted">₹${product.price}</small>
                </div>
                <button
                    class="btn btn-sm btn-outline-danger remove-cart"
                    data-id="${product.id}">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
    });
    cartItems.innerHTML = html;
    cartTotal.innerText = total;

    document.querySelectorAll(".remove-cart").forEach(button => {
        button.addEventListener("click", () => {
            const id = parseInt(button.dataset.id);
            cart = cart.filter(item => item.id !== id);
            cartCounter.innerText = cart.length;
            updateCartPreview();
        });
    });
}

const cartIcon = document.getElementById("cart-icon");
const cartPreview = document.getElementById("cart-preview");
cartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    if (cartPreview.style.display === "block") {
        cartPreview.style.display = "none";
    }
    else {
        cartPreview.style.display = "block";
    }
});
document.addEventListener("click", (e) => {
    if (!document.getElementById("cart-container").contains(e.target)) {
        cartPreview.style.display = "none";
    }
});