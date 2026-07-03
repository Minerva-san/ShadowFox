let cart =JSON.parse(localStorage.getItem("cart")) || [];
const items =document.getElementById("checkout-items");
const subtotal =document.getElementById("subtotal");
const total =document.getElementById("grand-total");

let sum = 0;
cart.forEach(product=>{
sum += product.price;
items.innerHTML += `
<div class="d-flex mb-3">
<img src="${product.image}" width="70" class="rounded me-3">
<div>
    <div class="fw-semibold">${product.name}</div>
    <small style="color:#7c5f24">${product.brand}</small>
    <div>₹${product.price}</div>
</div>
</div>
`;
});

subtotal.innerHTML = "₹"+sum;
total.innerHTML = "₹"+(sum+20);

document
.getElementById("place-order")
.addEventListener("click",()=>{

Swal.fire({
    icon: "success",
    title: "Order Placed!",
    text: "Thank you for shopping with AJIO UX.",
    confirmButtonColor: "#7c5f24"
}).then(() => {
    localStorage.removeItem("cart");
    window.location.href = "index.html";
});

localStorage.removeItem("cart");

window.location.href="index.html";

});