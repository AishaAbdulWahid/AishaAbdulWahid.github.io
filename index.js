// Step 1: Get DOM elements
let nextDom = document.getElementById('next'); // Get the 'next' button
let prevDom = document.getElementById('prev'); // Get the 'previous' button

let carouselDom = document.querySelector('.grid-layout'); // Get the carousel container
let SliderDom = carouselDom.querySelector('.list'); // Get the list of slides
let thumbnailBorderDom = carouselDom.querySelector('.thumbnail'); // Get the thumbnail border
let timeDom = carouselDom.querySelector('.time'); // Get the time element

let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item'); // Get all the thumbnail items

// Move the first thumbnail to the end initially
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

// Transition timing
let timeRunning = 3000; // Time for running the transition
let timeAutoNext = 7000; // Time for auto moving to the next slide

// Function to show the slider
function showSlider(type){
    let SliderItemsDom = SliderDom.querySelectorAll('.item'); // Get all the slide items

    if(type === 'next'){ // If the type is 'next'
        SliderDom.appendChild(SliderItemsDom[0]); // Move the first slide to the end
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0].cloneNode(true)); // Move the first thumbnail to the end
        carouselDom.classList.add('next'); // Add the 'next' class to the carousel
    }else{ // If the type is 'prev'
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]); // Move the last slide to the start
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1].cloneNode(true)); // Move the last thumbnail to the start
        carouselDom.classList.add('prev'); // Add the 'prev' class to the carousel
    }

    clearTimeout(runTimeOut); // Clear the timeout for the transition
    runTimeOut = setTimeout(() => { // Set a timeout to remove the 'next' and 'prev' classes
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto); // Clear the timeout for auto moving to the next slide
    runNextAuto = setTimeout(() => { // Set a timeout to automatically move to the next slide
        nextDom.click();
    }, timeAutoNext);
}

// Event handler for the 'next' button
nextDom.onclick = function(){
    showSlider('next');    
}

// Event handler for the 'previous' button
prevDom.onclick = function(){
    showSlider('prev');    
}

let runTimeOut; // Variable to hold the timeout for the transition
let runNextAuto = setTimeout(() => { // Set a timeout to automatically move to the next slide
    nextDom.click();
}, timeAutoNext);


