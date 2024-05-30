// Import products from 'products.js'
import products from '/products.js';
// Import products from 'cart.js'
import cart from './cart.js';

// Get the element with id 'app'
let app = document.getElementById('app');
//Get the element with the id 'temporaryContent'
let temporaryContent = document.getElementById('temporaryContent');

// Define a function to load the layout file
const loadTemplate = () => {
    // Fetch the template from '/template.html'
    fetch('/template.html')
    .then(response => response.text()) // Parse the response as text
    .then(html => { // Process the HTML
        app.innerHTML = html; // Set the inner HTML of the app element
        let contentTab = document.getElementById('contentTab'); // Get the element with id 'contentTab'
        contentTab.innerHTML = temporaryContent.innerHTML; // Set the inner HTML of the contentTab element
        temporaryContent.innerHTML = null;
        cart(); // Call the cart function
        initApp(); // Call the initApp function
    })
}
loadTemplate(); // Call the loadTemplate function

// Define a function to initialize the app
const initApp = () => {
     // load list product
     let listProductHTML = document.querySelector('.listProduct');
     listProductHTML.innerHTML = null;
     
     // For each product
     products.forEach(product => {
        // Create a new div element
         let newProduct = document.createElement('div');
         // Add the class 'item' to the new div element
         newProduct.classList.add('item');
         // Set the inner HTML of the new div element
         newProduct.innerHTML = 
         `<a href="/detail.html?id=${product.id}">
             <img src="${product.image}">
         </a>
         <h2>${product.name}</h2>
         <div class="price">$${product.price}</div>
         <button 
             class="addCart" 
             data-id='${product.id}'>
                 Add To Cart
         </button>`;
         // Append the new div element to the listProductHTML element
         listProductHTML.appendChild(newProduct);
    });
}