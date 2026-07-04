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
    link: "https://www.ajio.com/shein-shein-medium-length-short-sleeve-self-design-polo-tshirt/p/443397620_green?",
    discount:40,
    popularity:96,
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
    link:"https://www.ajio.com/u-s-polo-assn-men-checked-tailored-fit-shirt-with-patch-pocket/p/469738496_navy?",
    discount:40,
    popularity:96,
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
    link:"https://www.ajio.com/kisah-men-regular-fit-3-piece-kurta-pyjama-set-with-printed-nehru-jacket-/p/702611922_multi?",
    discount:40,
    popularity:96,
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
    link:"https://www.ajio.com/kb-team-spirit-boys-quilted-sweatshirt-with-flap-pocket/p/443090063_blue?",
    discount:40,
    popularity:96,
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
    link:"https://www.ajio.com/myrie-women-floral-print-kurta-with-palazzo-co-ord-set/p/702936716_blue?",
    discount:40,
    popularity:96,
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
    link:"https://www.ajio.com/inf-frendz-seer-sucker-crab-all-over-dress/p/443107629_blue?",
    discount:40,
    popularity:96,
},
{
    id: 7,
    brand: "PARI",
    name: "Pack of 2 Silver Studded Bangles",
    price: 423,
    rating: 3.7,
    reviews: 96,
    image: "images/bangles.avif",
    description: "Avoid contact with water & perfume.",
    category: "Accessories",
    link:"https://www.ajio.com/the-pari-pack-of-2-women-silver-plated-stone-studded-bangles/p/702241674_multi?",
    discount:40,
    popularity:96,
},
{
    id: 8,
    brand: "ASICS",
    name: "Men Novablast Running Shoes",
    price: 10499,
    rating: 4.9,
    reviews: 412,
    image: "images/shoes.avif",
    description: "Wipe with a clean, dry cloth when needed. 3 months warranty.",
    category: "Footwear",
    link:"https://www.ajio.com/asics-men-novablast-5-running-shoes/p/469798961_blue?",
    discount:40,
    popularity:96,
},
{
    id: 9,
    brand: "SNITCH",
    name: "Men Sneaker with PU upper",
    price: 2299,
    rating: 4.3,
    reviews: 300,
    image: "images/sneaker.avif",
    description: "Engineered with a rugged TPR outsole and cushioned padding, these comfortable TPR sole sneakers guarantee exceptional traction.",
    category: "Footwear",
    link:"https://www.ajio.com/snitch-men-sneaker-with-pu-upper/p/703225029_beige",
    discount:30,
    popularity:94,
},
{
    id: 10,
    brand: "MIRAGGIO",
    name: "Bella Shoulder Bag Detachable Strap",
    price: 2099,
    rating: 4.5,
    reviews: 500,
    image: "images/shoulderbag.avif",
    description: "Length- 27cm, height- 14cm, depth- 5cm, shoulder drop- 25cm, crossbody drop- 61cm (max), 53cm (min).",
    category: "Accessories",
    link:"https://www.ajio.com/miraggio-bella-shoulder-bag-with-detachable-sling-strap/p/466306469_tan?",
    discount:45,
    popularity:98,
},
];
let wishlist =JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentProduct = null;

const wishlistButtons = document.querySelectorAll(".wishlist-btn");
const wishlistCounter = document.getElementById("wishlist-count");
const quickViewButtons = document.querySelectorAll(".quick-view-btn");
const modalCartBtn = document.getElementById("modal-add-cart");
const modalWishlistBtn = document.querySelector(".modal-wishlist-btn");
const cartButtons = document.querySelectorAll(".add-cart-btn");
const cartCounter = document.getElementById("cart-count");

quickViewButtons.forEach(button => {
    button.addEventListener("click", () => {
        const id = parseInt(button.dataset.id);
        const product = products.find(p => p.id === id);
        currentProduct = product;
        const heart = modalWishlistBtn.querySelector("i");
        const exists = wishlist.some(item => item.id === currentProduct.id);
        if (exists) {
            heart.classList.remove("bi-heart");
            heart.classList.add("bi-heart-fill");
            heart.style.color = "red";
        }
        else{
            heart.classList.remove("bi-heart-fill");
            heart.classList.add("bi-heart");
            heart.style.color = "black";
        }
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
        const id = parseInt(button.dataset.id);
        const product = products.find(p => p.id === id);

        if (icon.classList.contains("bi-heart")) {
            icon.classList.remove("bi-heart");
            icon.classList.add("bi-heart-fill");
            icon.style.color = "red";
            wishlist.push(product);
            localStorage.setItem(
                "wishlist",
                JSON.stringify(wishlist)
            );
        }
        else {
            icon.classList.remove("bi-heart-fill");
            icon.classList.add("bi-heart");
            icon.style.color = "black";
            wishlist = wishlist.filter(item => item.id !== product.id);
            localStorage.setItem("wishlist",JSON.stringify(wishlist));
        }
        wishlistCounter.innerText = wishlist.length;
        console.log(wishlist);
    });
});
cartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const id = parseInt(button.closest(".card").dataset.id);
        const product = products.find(p => p.id === id);
        const exists = cart.some(item => item.id === product.id);
        if (!exists) {
            cart.push(product);
            localStorage.setItem("cart",JSON.stringify(cart));
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
if (modalCartBtn) {
    modalCartBtn.onclick = () => {
        if (!currentProduct) return;
        const exists = cart.some(item => item.id === currentProduct.id);
        if (!exists) {
            cart.push(currentProduct);
            localStorage.setItem("cart",JSON.stringify(cart));
            cartCounter.innerText = cart.length;
            updateCartPreview();
        }
        modalCartBtn.innerHTML ='<i class="bi bi-check-lg"></i> Added';
        setTimeout(() => {
            modalCartBtn.innerHTML ='<i class="bi bi-cart"></i> Add To Cart';
        }, 1500);
        console.log(cart);
    };
}
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
            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );
            cartCounter.innerText = cart.length;
            updateCartPreview();
        });
    });
}

const cartIcon = document.getElementById("cart-icon");
const cartPreview = document.getElementById("cart-preview");
if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
        e.preventDefault();
        if (cartPreview.style.display === "block") {
            cartPreview.style.display = "none";
        }
        else {
            cartPreview.style.display = "block";
        }
    });
}
document.addEventListener("click", (e) => {
    if (!document.getElementById("cart-container").contains(e.target)) {
        cartPreview.style.display = "none";
    }
});
if (modalWishlistBtn) {
    modalWishlistBtn.addEventListener("click", () => {
        if (!currentProduct) return;
        const heart = modalWishlistBtn.querySelector("i");
        const exists = wishlist.some(item => item.id === currentProduct.id);
        if (exists) {
            wishlist = wishlist.filter(item => item.id !== currentProduct.id);
            localStorage.setItem(
                "wishlist",
                JSON.stringify(wishlist)
            );
            heart.classList.remove("bi-heart-fill");
            heart.classList.add("bi-heart");
            heart.style.color = "black";
        }
        else {
            wishlist.push(currentProduct);
            localStorage.setItem(
                "wishlist",
                JSON.stringify(wishlist)
            );
            heart.classList.remove("bi-heart");
            heart.classList.add("bi-heart-fill");
            heart.style.color = "red";
        }
        wishlistCounter.innerText = wishlist.length;
        const cardHeart = document.querySelector(
        `.wishlist-btn[data-id="${currentProduct.id}"] i`
        );
        if (cardHeart) {
            if (wishlist.some(item => item.id === currentProduct.id)) {
                cardHeart.classList.remove("bi-heart");
                cardHeart.classList.add("bi-heart-fill");
                cardHeart.style.color = "red";
            } else {
                cardHeart.classList.remove("bi-heart-fill");
                cardHeart.classList.add("bi-heart");
                cardHeart.style.color = "black";
            }
        }
    });
}
refreshWishlistIcons();
wishlistCounter.innerText = wishlist.length;
cartCounter.innerText = cart.length;
updateCartPreview();

const wishlistContainer = document.getElementById("wishlist-container");
const emptyWishlist = document.getElementById("empty-wishlist");

function renderWishlist() {
    if (!wishlistContainer) return;
    wishlistContainer.innerHTML = "";
    if (wishlist.length === 0) {
        emptyWishlist.style.display = "block";
        return;
    }
    emptyWishlist.style.display = "none";
    wishlist.forEach(product => {
        wishlistContainer.innerHTML += `
        <div class="card shadow-sm mb-4">
            <div class="row g-0 align-items-center">
                <div class="col-md-3 text-center">
                    <img src="${product.image}"class="img-fluid p-3"style="max-height:220px">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <p class="product-brand">${product.brand}</p>
                        <h4>${product.name}</h4>
                        <p>⭐ ${product.rating}</p>
                        <h3>₹${product.price}</h3>
                        <span class="badge bg-success">In Stock</span>
                    </div>
                </div>
                <div class="col-md-3 text-center">
                    <button
                        class="btn btn-dark w-75 mb-2 move-cart"
                        data-id="${product.id}">
                        Move To Cart
                    </button>
                    <button
                        class="btn btn-outline-danger w-75 remove-wishlist"
                        data-id="${product.id}">
                        Remove
                    </button>
                </div>
            </div>
        </div>
        `;
    });
    attachWishlistEvents();
}
function attachWishlistEvents() {
    document.querySelectorAll(".remove-wishlist").forEach(button => {
        button.addEventListener("click", () => {
            const id = parseInt(button.dataset.id);
            wishlist = wishlist.filter(item => item.id !== id);
            localStorage.setItem(
                "wishlist",
                JSON.stringify(wishlist)
            );
            refreshWishlistIcons();
            wishlistCounter.innerText = wishlist.length;
            renderWishlist();
        });
    });
    document.querySelectorAll(".move-cart").forEach(button => {
        button.addEventListener("click", () => {
            const id = parseInt(button.dataset.id);
            const product = wishlist.find(item => item.id === id);
            if (!cart.some(item => item.id === id)) {
                cart.push(product);
                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );
            }
            cartCounter.innerText = cart.length;
            updateCartPreview();
            alert("Moved to cart.");
        });
    });
}
renderWishlist();
function refreshWishlistIcons() {
    wishlistButtons.forEach(button => {
        const id = parseInt(button.dataset.id);
        const icon = button.querySelector("i");
        if (wishlist.some(item => item.id === id)) {
            icon.classList.remove("bi-heart");
            icon.classList.add("bi-heart-fill");
            icon.style.color = "red";
        } else {
            icon.classList.remove("bi-heart-fill");
            icon.classList.add("bi-heart");
            icon.style.color = "black";
        }
    });
}

//rrecently viwed
let currentIndex = 0;

function renderRecentlyViewed(){
    const container = document.getElementById("recently-viewed");
    if(!container) return;
    const recent = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    container.innerHTML="";
    recent.slice(currentIndex,currentIndex+5).forEach(product=>{
        container.innerHTML += `
        <div class="card shadow-sm" style="min-width:220px">
            <a href="${product.link}" target="_blank">
                <img
                    src="${product.image}"
                    class="card-img-top"
                    style="height:220px;object-fit:cover;">
            </a>
            <div class="card-body">
                <p class="product-brand">${product.brand}</p>
                <h6>${product.name}</h6>
                <h5>₹${product.price}</h5>
            </div>
        </div>
        `;
    });
}
function saveRecentlyViewed(id){
    const product = products.find(p=>p.id===id);
    let recent = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    recent = recent.filter(item=>item.id!==id);
    recent.unshift(product);
    recent = recent.slice(0,5);
    localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(recent)
    );
}
document.querySelectorAll(".product-link").forEach(link=>{
    link.addEventListener("click",()=>{
        saveRecentlyViewed(
            parseInt(link.dataset.id)
        );
    });
});
document
.getElementById("recent-prev")
?.addEventListener("click",()=>{
    if(currentIndex>0){
        currentIndex--;
        renderRecentlyViewed();
    }
});
document
.getElementById("recent-next")
?.addEventListener("click",()=>{
    const recent = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    if(currentIndex<recent.length-5){
        currentIndex++;
        renderRecentlyViewed();
    }
});
renderRecentlyViewed();