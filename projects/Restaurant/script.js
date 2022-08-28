// Script for toggling through photos in the image carousel on clicking left or right

const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button
            .closest("[data-carousel]")
            .querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
})

// Script for displaying the nav links in mobile mode when the hamburger menu is pressed

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    });
}

navSlide();

// Search input on and off

const searchIcon = document.querySelector(".search-icon");
const searchBar = document.querySelector(".search-bar");

searchIcon.addEventListener('click', () => {
    searchBar.classList.toggle('search-active');
});

// Script for searching the website

try {
    const queryStart = document.getElementById('query');
    const query = document.createElement('span');
    const noResults = document.getElementById('no-results');
    query.setAttribute("class","query");
    const search = window.location.search.split('=')[1].split('+').join(' ').toLowerCase();
    query.innerHTML = search;
    queryStart.append(query);
    const results = document.getElementsByClassName("search-results");
    searchArray = search.split(' ');

    for (i = 0; i < searchArray.length; i++) {
        for (j = 0; j < results.length; j++) {
            if (results[j].innerHTML.toLowerCase().includes(searchArray[i])) {
                results[j].style.display='block';
                noResults.style.display='none';
            }
        }
    }
}
catch(err) {
}

// Take away app, creating an input for quantity when user presses add next to a menu item

const addButtons = document.querySelectorAll(".add");
const foodName = document.querySelectorAll(".name");
const foodPrice = document.querySelectorAll(".price");

console.log();

for (i = 0; i < addButtons.length; i++) {
    const add = addButtons[i];
    const food = foodName[i].innerHTML;
    add.addEventListener("click", () => {
        const howMany = document.createElement('input');
        howMany.setAttribute("name",food);
        howMany.setAttribute("type","number");
        howMany.setAttribute("min","0");
        howMany.setAttribute("max","9");
        howMany.setAttribute("value","0");
        add.after(howMany);
    }, {once: true});
}

// Shopping cart, taking items and quantity from the URL and adding to local storage. Then, adding to the Cart page and a hidden form.

try {
    const order = new URLSearchParams(window.location.search);
    const list = document.getElementById("cart");
    const submit = document.getElementById("submit-order");
    var totalPrice = 0;
    for (const [key, value] of order) {
        localStorage.setItem(`${key}`, `${value}`);
    }
    for (i = 0; i < localStorage.length; i++) {
        const food = localStorage.key(i);
        const quantity = parseInt(localStorage.getItem(food));
        for (j = 0; j < foodName.length; j++) {
            if (food == foodName[j].innerText) {
                const price = foodPrice[j].innerText;
                const priceNum = parseFloat(price.replace("$",""));
                newItem = document.createElement("tr");
                newItem.innerHTML = (`<th>${food}</th><td>${quantity}</td><td>${price}</td>`);
                orderItem = document.createElement("input");
                orderItem.innerHTML = (`<input type="text" id="${food}" name="${food}" value="${quantity}">`);
                list.append(newItem);
                submit.append(orderItem);
                totalPrice = totalPrice + quantity*priceNum;
            }
        }
    }
    orderPrice = document.createElement("input");
    orderPrice.innerHTML = (`<input type="text" id="price" name="Total Price" value="$${totalPrice.toFixed(2)}">`);
    submit.append(orderPrice);
    total = document.createElement("tr");
    total.setAttribute("id","total-price");
    total.innerHTML = (`<th>Total Price</th><td></td><td>$${totalPrice.toFixed(2)}</td>`);
    list.append(total);
}
catch(err) {
}

// Clearing the shopping cart

try {
    const clear = document.getElementById("clear");
    clear.addEventListener('click', () => {
    localStorage.clear();
    window.location = window.location.pathname;
    });
}
catch(err) {
}




