// Get cart from local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Get cart counter
const cartCount = document.getElementById("cart-count");


// Update cart number
function updateCartCount() {

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

}


// Add item to cart
const addButtons = document.querySelectorAll(".add-to-cart");


addButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Find the food card
        const foodCard = button.closest(".food-card");


        // Get selected option
        const optionSelect = foodCard.querySelector(".food-option");

        let selectedOption = "";

        if (optionSelect) {
            selectedOption = optionSelect.value;
        }


        // Create cart item
        const item = {

            name: button.dataset.name,

            price: parseFloat(button.dataset.price),

            option: selectedOption

        };


        // Add item to cart
        cart.push(item);


        // Save cart
        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        // Update number
        updateCartCount();


        // Go to cart page
        window.location.href = "cart.html";

    });

});


// Run when page loads
updateCartCount();