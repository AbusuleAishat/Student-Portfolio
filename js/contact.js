// ======================================
// CONTACT FORM
// AISHAT IKPEMOSI ABU-SULE
// ======================================

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const messageError = document.getElementById("messageError");

const successMessage = document.getElementById("successMessage");
const sendButton = document.getElementById("sendButton");


// FULL NAME: ALLOW LETTERS ONLY
nameInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z\s'.-]/g, "");
    nameError.textContent = "";
});


// PHONE: ALLOW NUMBERS ONLY
phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
    phoneError.textContent = "";
});


// CLEAR ERRORS WHILE TYPING
emailInput.addEventListener("input", function () {
    emailError.textContent = "";
});

messageInput.addEventListener("input", function () {
    messageError.textContent = "";
});


// VALIDATE NAME
function validateName() {
    const name = nameInput.value.trim();

    if (name === "") {
        nameError.textContent = "Please enter your full name.";
        return false;
    }

    if (!/^[A-Za-z][A-Za-z\s'.-]*$/.test(name)) {
        nameError.textContent = "Please use letters only.";
        return false;
    }

    if (name.replace(/[^A-Za-z]/g, "").length < 2) {
        nameError.textContent = "Please enter a valid name.";
        return false;
    }

    nameError.textContent = "";
    return true;
}


// VALIDATE EMAIL
function validateEmail() {
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Please enter your email address.";
        return false;
    }

    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        return false;
    }

    emailError.textContent = "";
    return true;
}


// VALIDATE PHONE
function validatePhone() {
    const phone = phoneInput.value.trim();

    if (phone === "") {
        phoneError.textContent = "Please enter your phone number.";
        return false;
    }

    if (!/^[0-9]{7,15}$/.test(phone)) {
        phoneError.textContent = "Enter 7 to 15 digits only.";
        return false;
    }

    phoneError.textContent = "";
    return true;
}


// VALIDATE MESSAGE
function validateMessage() {
    const message = messageInput.value.trim();

    if (message === "") {
        messageError.textContent = "Please write a message.";
        return false;
    }

    if (message.length < 10) {
        messageError.textContent =
            "Your message must contain at least 10 characters.";
        return false;
    }

    messageError.textContent = "";
    return true;
}


// CHECK ALL FIELDS
function validateForm() {
    return (
        validateName() &&
        validateEmail() &&
        validatePhone() &&
        validateMessage()
    );
}


// FORM SUBMISSION
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    successMessage.textContent = "";
    successMessage.style.color = "#c62828";

    if (!validateForm()) {
        successMessage.textContent =
            "Please correct the errors above.";
        return;
    }

    successMessage.style.color = "#287443";
    successMessage.textContent =
        "Your form is valid! Email sending will be connected next.";
});