const productsGrid = document.getElementById("products-grid");
const productCount = document.getElementById("product-count");

function renderProducts(productList) {

    if (!productsGrid) return;

    productsGrid.innerHTML = "";

    productCount.innerText = productList.length;

    productList.forEach(product => {

        productsGrid.innerHTML += `

        <div class="col-lg-4 col-md-6">

            <div class="card h-100 shadow-sm position-relative">

                <button
                    class="btn btn-light position-absolute top-0 end-0 m-2 wishlist-btn"
                    data-id="${product.id}">

                    <i class="bi bi-heart"></i>

                </button>

                <img
                    src="${product.image}"
                    class="card-img-top"
                    style="height:300px; object-fit:cover;">

                <div class="card-body">

                    <h5>${product.name}</h5>

                    <p class="product-brand">

                        ${product.brand}

                    </p>

                    <div class="mb-2">

                        <span class="badge bg-success">

                            ★ ${product.rating}

                        </span>

                    </div>

                    <h5>

                        ₹${product.price}

                    </h5>

                    <button
                        class="btn cart-btn w-100 mt-2">

                        Add To Cart

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

renderProducts(products);