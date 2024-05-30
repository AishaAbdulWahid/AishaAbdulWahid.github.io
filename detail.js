// Import products from 'products.js'
import products from '/products.js';
// Import cart from 'cart.js'
import cart from './cart.js';

// Get the element with id 'listProduct'
let listProduct = document.getElementById('listProduct');
// Get the element with id 'app'
let app = document.getElementById('app');
// Get the element with id 'temporaryContent'
let temporaryContent = document.getElementById('temporaryContent');

// Define a function to load the template
const loadTemplate = () => {
    // Fetch the template from '/template.html'
    fetch('/template.html')
    .then(response => response.text()) // Parse the response as text
    .then(html => { // Process the HTML
        app.innerHTML = html; // Set the inner HTML of the app element
        let contentTab = document.getElementById('contentTab'); // Get the element with id 'contentTab'
        contentTab.innerHTML = temporaryContent.innerHTML; // Set the inner HTML of the contentTab element
        temporaryContent.innerHTML = null; // Clear the inner HTML of the temporaryContent element
        cart(); // Call the cart function
        initApp(); // Call the initApp function
    })
}
loadTemplate(); // Call the loadTemplate function
// Define a function to initialize the app
const initApp = () => {
    // Get the product id from the URL parameters
    let productId = new URLSearchParams(window.location.search).get('id');
    // Find the product with the matching id
    let thisProduct = products.filter(value => value.id == productId)[0];
    // If the product is not found, redirect to the home page
    if(!thisProduct){
        window.location.href = "/";
    }

    // Get the element with class 'detail'
    let detail = document.querySelector('.detail');
    // Set the source of the image in the detail element
    detail.querySelector('.image img').src = thisProduct.image;
    // Set the text of the name in the detail element
    detail.querySelector('.name').innerText = thisProduct.name;
    // Set the text of the price in the detail element
    detail.querySelector('.price').innerText = '$' + thisProduct.price;
    // Set the text of the description in the detail element
    detail.querySelector('.description').innerText = '$' + thisProduct.description;
     // Set the data-id attribute of the addCart button in the detail element
    detail.querySelector('.addCart').dataset.id = thisProduct.id;


    let listProductHTML = document.querySelector('.listProduct');
    // For each product
    products.forEach(product => {
        // Create a new div element
        let newProduct = document.createElement('div');
        // Add the class 'item' to the new div element
        newProduct.classList.add('item');
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