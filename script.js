let cart = {};

const foodItems = {
    "McDonald's": [
        { name: "Big Mac", price: 250, img: "photos/Big Mac.jpeg"},
        { name: "Fries", price: 120, img: "photos/Fries.jpeg" },
        { name: "Chicken Nuggets", price: 180, img: "photos/Chicken Nuggets.jpeg" }
    ],
    "Domino's": [
        { name: "Margherita Pizza", price: 350, img: "photos/Margherita Pizza.jpeg" },
        { name: "Garlic Bread", price: 150, img: "photos/Garlic Bread.jpeg" },
        { name: "Cheesy Sticks", price: 160, img: "photos/Cheesy Sticks.jpeg" }
    ],
    "KFC": [
        { name: "Zinger Burger", price: 200, img: "photos/Zinger Burger.jpeg" },
        { name: "Chicken Popcorn", price: 180, img: "photos/Chicken Popcorn.jpeg" },
        { name: "Spicy Chicken Wings", price: 220, img: "photos/Spicy Chicken Wings.jpeg" }
    ],
    "Starbucks": [
        { name: "Cappuccino", price: 180, img: "photos/Cappuccino.jpeg" },
        { name: "Latte", price: 160, img: "photos/Latte.jpeg" },
        { name: "Mocha Frappe", price: 190, img: "photos/Mocha Frappe.jpeg" }
    ]
};

// Load menu when a shop is selected
document.querySelectorAll(".shop-btn").forEach(button => {
    button.addEventListener("click", function() {
        let shop = this.parentElement.getAttribute("data-shop");
        document.getElementById("menu-heading").textContent = `${shop} Menu`;
        loadMenu(shop);
    });
});

function loadMenu(shop) {
    let menuContainer = document.getElementById("food-items");
    menuContainer.innerHTML = "";

    foodItems[shop].forEach(item => {
        let div = document.createElement("div");
        div.classList.add("food-item");
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>Price: ₹${item.price}</p>
            <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
        `;
        menuContainer.appendChild(div);
    });
}

function addToCart(name, price) {
    if (cart[name]) {
        cart[name].quantity++;
    } else {
        cart[name] = { price, quantity: 1 };
    }
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let totalElement = document.getElementById("total-price");
    let cartCount = document.getElementById("cart-count");

    cartList.innerHTML = "";
    let totalPrice = 0;
    let itemCount = 0;

    for (let item in cart) {
        let li = document.createElement("li");
        let totalItemPrice = cart[item].price * cart[item].quantity;
        li.innerHTML = `${item} (x${cart[item].quantity}) - ₹${totalItemPrice}
            <button class="remove-btn" onclick="removeFromCart('${item}')">❌</button>`;
        cartList.appendChild(li);

        totalPrice += totalItemPrice;
        itemCount += cart[item].quantity;
    }

    totalElement.textContent = totalPrice;
    cartCount.textContent = itemCount;
}

function removeFromCart(name) {
    if (cart[name].quantity > 1) {
        cart[name].quantity--;
    } else {
        delete cart[name];
    }
    updateCart();
}

document.getElementById("clear-cart-btn").addEventListener("click", function() {
    cart = {};
    updateCart();
});

document.getElementById("checkout-btn").addEventListener("click", function() {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Order placed successfully!");
        cart = {};
        updateCart();
    }
});

function toggleCart() {
    let cartSection = document.getElementById("cart-section");
    cartSection.style.display = cartSection.style.display === "none" ? "block" : "none";
}
