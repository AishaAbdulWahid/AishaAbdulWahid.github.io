// Importing products data from products.js
import products from "./products.js";

// Define a function for the shopping cart
const cart = () => {
    // Get DOM elements
    let listCartHTML = document.querySelector('.listCart'); // The HTML element for the list of items in the cart
    let iconCart = document.querySelector('.icon-cart'); // The cart icon
    let iconCartSpan = iconCart.querySelector('span'); // The span inside the cart icon
    let body = document.querySelector('body'); // The body of the document
    let closeCart = document.querySelector('.close'); // The close button for the cart
    let cart = []; // An array to store the items in the cart

    // open and close tab
    iconCart.addEventListener('click', () => {
        body.classList.toggle('activeTabCart'); // Toggle the 'activeTabCart' class on the body
    })
    closeCart.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    })
    // Function to add or remove products in the cart
    const setProductInCart = (idProduct, value) => {
        // Find the index of the product in the cart
        let positionThisProductInCart = cart.findIndex((value) => value.product_id == idProduct);
        if(value <= 0){
             // If the quantity is 0 or less, remove the product from the cart
            cart.splice(positionThisProductInCart, 1);
        }else if(positionThisProductInCart < 0){
            // If the product is not in the cart, add it
            cart.push({
                product_id: idProduct,
                quantity: 1
            });
        }else{
            cart[positionThisProductInCart].quantity = value;
        }
        // Store the cart in local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        // Update the HTML for the cart
        addCartToHTML();
    }
    // Function to add the cart to the HTML
    const addCartToHTML = () => {
        // Clear the HTML for the cart
        listCartHTML.innerHTML = '';
        let totalQuantity = 0; // Variable to store the total quantity of items in the cart
        if(cart.length > 0){
            // If there are items in the cart, loop through them
            cart.forEach(item => {
                totalQuantity = totalQuantity +  item.quantity;
                // Add the quantity of the current item to the total quantity
                let newItem = document.createElement('div');
                newItem.classList.add('item'); // Add the 'item' class to the div
                newItem.dataset.id = item.product_id; // Add the product id to the div's dataset
    
                // Find the index of the product in the products data
                let positionProduct = products.findIndex((value) => value.id == item.product_id);
                let info = products[positionProduct]; // Get the product info
                listCartHTML.appendChild(newItem); // Add the new item div to the cart HTML
                // Set the inner HTML of the new item div
                newItem.innerHTML = `
                <div class="image">
                        <img src="${info.image}">
                    </div>
                    <div class="name">
                    ${info.name}
                    </div>
                    <div class="totalPrice">$${info.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus" data-id="${info.id}"><</span>
                        <span>${item.quantity}</span>
                        <span class="plus" data-id="${info.id}">></span>
                    </div>
                `;
            })
        }
        // Set the text of the span in the cart icon to the total quantity
        iconCartSpan.innerText = totalQuantity;
    }

    document.addEventListener('click', (event) => {
         // Get the element that was clicked
        let buttonClick = event.target;
        // Get the id of the product from the clicked element's dataset
        let idProduct = buttonClick.dataset.id;
        let quantity = null; // Variable to store the quantity of the product
        // Find the index of the product in the cart
        let positionProductInCart = cart.findIndex((value) => value.product_id == idProduct);
        // Check which button was clicked and update the cart accordingly
        switch (true) {
            case (buttonClick.classList.contains('addCart')):
                // If the 'add to cart' button was clicked, increase the quantity of the product in the cart
                quantity = (positionProductInCart < 0) ? 1 : cart[positionProductInCart].quantity+1;
                setProductInCart(idProduct, quantity);
                break;
            case (buttonClick.classList.contains('minus')):
                 // If the 'minus' button was clicked, decrease the quantity of the product in the cart
                quantity = cart[positionProductInCart].quantity-1;
                setProductInCart(idProduct, quantity);
                break;
            case (buttonClick.classList.contains('plus')):
                // If the 'plus' button was clicked, increase the quantity of the product in the cart
                quantity = cart[positionProductInCart].quantity+1;
                setProductInCart(idProduct, quantity);
                break;
            default:
                break;
        }
    })

    // Function to initialize the app
    const initApp = () => { 
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
    }
    }
     // Call the initApp function to initialize the app
    initApp();
}
// Export the cart function as the default export
export default cart;