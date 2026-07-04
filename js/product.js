const productsGrid = document.getElementById("products-grid");
const productCount = document.getElementById("product-count");
const searchInput = document.getElementById("search-products");
const suggestions = document.getElementById("search-suggestions");

const categoryFilters = document.querySelectorAll(".category-filter");
const priceFilter = document.getElementById("price-filter");
const ratingFilter = document.getElementById("rating-filter");
const sortDropdown = document.getElementById("sort-products");

function renderProducts(productList) {
    if (!productsGrid) return;
    productsGrid.innerHTML = "";
    productCount.innerText = productList.length;
    productList.forEach(product => {
        const inWishlist = wishlist.some(item => item.id === product.id);
        productsGrid.innerHTML += `
            <div class="col-lg-4 col-md-6">
                <div class="card h-100 shadow-sm position-relative">
                    <button
                        class="btn btn-light position-absolute top-0 end-0 m-2 wishlist-btn"
                        data-id="${product.id}">
                        <i class="bi ${inWishlist ? "bi-heart-fill text-danger" : "bi-heart"}"></i>
                    </button>
                    <a
                        href="${product.link}"
                        target="_blank"
                        onclick="saveRecentlyViewed(${product.id})">
                        <img
                            src="${product.image}"
                            class="card-img-top"
                            style="height:300px; object-fit:cover;">
                    </a>
                    <div class="card-body">
                        <h5>${product.name}</h5>
                        <p class="product-brand">${product.brand}</p>
                        <span class="badge bg-success">
                            ★ ${product.rating}
                        </span>
                        <h5 class="mt-2">
                            ₹${product.price}
                        </h5>
                        <button
                            class="btn cart-btn w-100 mt-2 add-cart-btn"
                            data-id="${product.id}">
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
            `;
        document.querySelectorAll(".wishlist-btn").forEach(button => {

    const id = parseInt(button.dataset.id);

    const icon = button.querySelector("i");

    if (wishlist.some(item => item.id === id)) {

        icon.classList.remove("bi-heart");

        icon.classList.add("bi-heart-fill");

        icon.style.color = "red";

    }

});
    });
    // document.querySelectorAll(".product-link").forEach(link => {
    //     link.addEventListener("click", () => {
    //         saveRecentlyViewed(
    //             parseInt(link.dataset.id)
    //         );
    //     });
    // });
    attachProductEvents();
}
function attachProductEvents() {
    document.querySelectorAll(".wishlist-btn").forEach(button => {
        button.onclick = () => {
            console.log("wishlist clicked");
            const id = parseInt(button.dataset.id);
            const product = products.find(p => p.id === id);
            const icon = button.querySelector("i");
            const exists = wishlist.some(item => item.id === id);
            if (exists) {
                wishlist = wishlist.filter(item => item.id !== id);
                icon.classList.remove("bi-heart-fill","text-danger");
                icon.classList.add("bi-heart");
            }
            else {
                wishlist.push(product);
                icon.classList.remove("bi-heart");
                icon.classList.add("bi-heart-fill","text-danger");
            }
            localStorage.setItem(
                "wishlist",
                JSON.stringify(wishlist)
            );
            wishlistCounter.innerText = wishlist.length;
        };
    });
    document.querySelectorAll(".add-cart-btn").forEach(button => {
        button.onclick = () => {
            console.log("Cart clicked");
            const id = parseInt(button.dataset.id);
            const product = products.find(p => p.id === id);
            if (!cart.some(item => item.id === id)) {
                cart.push(product);
                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );
                cartCounter.innerText = cart.length;
                updateCartPreview();
            }
            button.innerHTML = "✓ Added";
            setTimeout(() => {
                button.innerHTML = "Add To Cart";
            },1500);
        };
    });
}

const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");
if (selectedCategory) {
    const checkbox = [...categoryFilters].find(
        filter => filter.value === selectedCategory
    );
    if (checkbox) {
        checkbox.checked = true;
    }
}
categoryFilters.forEach(filter => {
    filter.addEventListener("change", applyFilters);
});
suggestions.addEventListener("click", e => {
    const button = e.target.closest(".suggestion-item");
    if (!button) return;
    searchInput.value = button.dataset.name;
    suggestions.style.display = "none";
    applyFilters();
});
function showSuggestions(search) {
    suggestions.innerHTML = "";
    if (search === "") {
        suggestions.style.display = "none";
        return;
    }
    const matches = products.filter(product =>
        product.name.toLowerCase().includes(search) ||
        product.brand.toLowerCase().includes(search)
    );
    if (matches.length === 0) {
        suggestions.style.display = "none";
        return;
    }
    matches.slice(0,5).forEach(product => {
        suggestions.innerHTML += `
        <button
            class="list-group-item list-group-item-action suggestion-item"
            data-name="${product.name}">
            <strong>${product.name}</strong><br>
            <small style="color:#7c5f24">${product.brand}</small>
        </button>`;
    });
    suggestions.style.display = "block";
}
document.addEventListener("click", e => {
    if (!searchInput.contains(e.target) &&
        !suggestions.contains(e.target)) {
        suggestions.style.display = "none";
    }
});
function applyFilters() {
    let filteredProducts = [...products];
    // Search
    // const search = document
    //     .getElementById("search-products")
    //     .value
    //     .toLowerCase();
    const search = searchInput.value.toLowerCase();
    showSuggestions(search);
    if (search !== "") {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(search) ||
            product.brand.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        );
    }
    // Category
    const selectedCategories = [];
    categoryFilters.forEach(filter => {
        if (filter.checked) {
            selectedCategories.push(filter.value);
        }
    });
    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            selectedCategories.includes(product.category)
        );
    }
    // Price
    const price = priceFilter.value;
    if (price === "500") {
        filteredProducts = filteredProducts.filter(p => p.price < 500);
    }
    else if (price === "1500") {
        filteredProducts = filteredProducts.filter(
            p => p.price >= 500 && p.price <= 1500
        );
    }
    else if (price === "1501") {
        filteredProducts = filteredProducts.filter(
            p => p.price > 1500
        );
    }
    // Rating
    const rating = ratingFilter.value;
    if (rating !== "") {
        filteredProducts = filteredProducts.filter(
            p => p.rating >= Number(rating)
        );
    }
    // Sorting
    const sort = sortDropdown.value;
    switch (sort) {
        case "low":
            filteredProducts.sort((a,b)=>a.price-b.price);
            break;
        case "high":
            filteredProducts.sort((a,b)=>b.price-a.price);
            break;
        case "rating":
            filteredProducts.sort((a,b)=>b.rating-a.rating);
            break;
        case "popular":
            filteredProducts.sort((a,b)=>b.reviews-a.reviews);
            break;
        case "newest":
            filteredProducts.reverse();
            break;
        case "discount":
            filteredProducts.sort((a,b)=>b.discount-a.discount);
            break;
        case "trending":
            filteredProducts.sort((a,b)=>b.popularity-a.popularity);
            break;
        case "bestseller":
            filteredProducts.sort((a,b)=>b.popularity-a.popularity);
            break;    
    }
    renderProducts(filteredProducts);
}
applyFilters();   

function attachEvents(){
    document
        .getElementById("search-products")
        .addEventListener("input", applyFilters);
    document
        .getElementById("price-filter")
        .addEventListener("change", applyFilters);
    document
        .getElementById("rating-filter")
        .addEventListener("change", applyFilters);
    document
        .getElementById("sort-products")
        .addEventListener("change", applyFilters);
}
attachEvents();