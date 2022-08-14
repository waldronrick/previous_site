// Creating dynamic question for how many adults/children if user selects yes.

function onYesA() {
    const adultsyes = document.getElementById('adultsyes');
    const options = document.createElement('div');
    options.setAttribute("id","adultsnum");
    options.innerHTML = "<label for='adultsnum'>How many other adults?</label><input type='number' name='adultsnum' id='adultsnum'>"
    adultsyes.after(options);
}

function onNoA() {
    const options = document.getElementById("adultsnum");
    options.remove();
}

function onYesC() {
    const childrenyes = document.getElementById('childrenyes');
    const options = document.createElement('div');
    options.setAttribute("id","childrennum");
    options.innerHTML = "<label for='childrennum'>How many children?</label><input type='number' name='childrennum' id='childrennum'>"
    childrenyes.after(options);
}

function onNoC() {
    const options = document.getElementById("childrennum");
    options.remove();
}

// Validating

// Navigation constants

const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const pages = document.querySelectorAll(".page");
const progressSteps = document.querySelectorAll(".progress-step");
const error = document.querySelectorAll(".error-message");

// Input constants

const button = document.querySelector("button");
const personal = document.querySelectorAll(".personal > div");
const travel = document.querySelectorAll(".travel > div");
const preferences = document.querySelectorAll(".preferences > div");
const allQuestions = document.querySelectorAll(".personal > div, .travel > div, .preferences > div");

// Event listener for clicking submit, prevents default if all fields are not valid

button.addEventListener("click", (e) => {
    if (!check()) {
        e.preventDefault();
        for (var i = 0; i < allQuestions.length; i++) {
            const input = allQuestions[i].querySelectorAll("input, select, textarea");
            if (!input[0].checkValidity()) {
                allQuestions[i].classList.add("error");
                }
            }
        }
})

// Check if valid as user enters input, displays success or error symbol and message

for(var i = 0; i < personal.length; i++) {
    personal[i].addEventListener("input", function() {
        const input = this.querySelectorAll("input, select, textarea");
        const question = this;
        if (input[0].checkValidity()) {
            question.classList.add("success");
            question.classList.remove("error");
        }
        else {
            question.classList.add("error");
            question.classList.remove("success");
        }
    }, false);
}

for(var i = 0; i < travel.length; i++) {
    travel[i].addEventListener("input", function() {
        const input = this.querySelectorAll("input, select, textarea");
        const question = this;
        if (input[0].checkValidity()) {
            question.classList.add("success");
            question.classList.remove("error");
        }
        else {
            question.classList.add("error");
            question.classList.remove("success");
        }
    }, false);
}

for(var i = 0; i < preferences.length; i++) {
    preferences[i].addEventListener("input", function() {
        const input = this.querySelectorAll("input, select, textarea");
        const question = this;
        if (input[0].checkValidity()) {
            question.classList.add("success");
            question.classList.remove("error");
        }
        else {
            question.classList.add("error");
            question.classList.remove("success");
        }
    }, false);
}

// Check if valid for progressing the page

function check() {
    let current = personal;
    if (pageNum == 1) {
        current = travel;
    };
    if (pageNum == 2) {
        current = preferences;
    };
    var n = 0;
    for(var i = 0; i < current.length; i++) {
        const input = current[i].querySelectorAll("input, select, textarea");
        if (input[0].checkValidity()) {
            n++;
        }
    }
    if (n == current.length) {
        error.forEach(element => element.classList.remove("error-display"));
        return true;
    }
    else {
        error.forEach(element => element.classList.add("error-display"));
        return false;
    }
}

// Navigation

// Start first page at 0

let pageNum = 0;

// Next button, runs check() and if successful will move to next page

nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (check()) {
            pageNum++;
            updatePage();
            updateProgressBar();
            for (var i = 0; i < allQuestions.length; i++) {
                const input = allQuestions[i].querySelectorAll("input, select, textarea");
                if (!input[0].checkValidity()) {
                    allQuestions[i].classList.remove("error");
                    }
                }
        }
        else {
            for (var i = 0; i < allQuestions.length; i++) {
                const input = allQuestions[i].querySelectorAll("input, select, textarea");
                if (!input[0].checkValidity()) {
                    allQuestions[i].classList.add("error");
                    }
                }
        }
    }, false);      
})

// Previous button

prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        pageNum--;
        updatePage();
        updateProgressBar();
        error.forEach(element => element.classList.remove("error-display"));
    })
})

// Toggles active page

function updatePage() {
    pages.forEach(page => {
        page.classList.contains("active") &&
        page.classList.remove("active")
    })
    pages[pageNum].classList.add("active");
}

// Updates progress bar when the page changes

function updateProgressBar() {
    progressSteps.forEach((progressStep, idx) => {
        if (idx < pageNum + 1) {
            progressStep.classList.add("progress-step-active")
        }
        else {
            progressStep.classList.remove("progress-step-active")
        }
    });
    const progressActive = document.querySelectorAll(".progress-step-active");
    progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 +'%';
}

