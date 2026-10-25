function toggleLoginPassword() {
    const password = document.getElementById("loginPassword");
    if (!password) return;

    password.type = password.type === "password" ? "text" : "password";
}

function toggleRegisterPassword() {
    const password = document.getElementById("registerPassword");
    if (!password) return;

    password.type = password.type === "password" ? "text" : "password";
}

function setFieldError(input, message) {
    const errorMessage = input.parentElement?.querySelector(".error-message") || input.closest(".input-group")?.querySelector(".error-message");

    if (errorMessage) {
        errorMessage.textContent = message;
    }

    input.classList.add("input-error");
    input.setAttribute("aria-invalid", "true");
}

function clearFieldError(input) {
    const errorMessage = input.parentElement?.querySelector(".error-message") || input.closest(".input-group")?.querySelector(".error-message");

    if (errorMessage) {
        errorMessage.textContent = "";
    }

    input.classList.remove("input-error");
    input.setAttribute("aria-invalid", "false");
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function getPasswordStrength(value) {
    let score = 0;

    if (value.length >= 8) score += 25;
    if (/[A-Z]/.test(value)) score += 25;
    if (/[0-9]/.test(value)) score += 25;
    if (/[^A-Za-z0-9]/.test(value)) score += 25;

    return score;
}

function updatePasswordStrength(value) {
    const bar = document.getElementById("strengthBar");
    const text = document.getElementById("strengthText");

    if (!bar || !text) return;

    const score = getPasswordStrength(value);
    const labels = [
        { min: 0, text: "Password strength: none", color: "#ef4444" },
        { min: 25, text: "Password strength: weak", color: "#ef4444" },
        { min: 50, text: "Password strength: fair", color: "#f59e0b" },
        { min: 75, text: "Password strength: good", color: "#facc15" },
        { min: 100, text: "Password strength: strong", color: "#22c55e" }
    ];

    const matched = labels.filter((item) => score >= item.min).at(-1) || labels[0];

    bar.style.width = score + "%";
    bar.style.background = matched.color;
    text.textContent = matched.text;
}

const registerPassword = document.getElementById("registerPassword");
if (registerPassword) {
    registerPassword.addEventListener("input", function () {
        const value = registerPassword.value;
        updatePasswordStrength(value);

        if (value.trim() === "") {
            clearFieldError(registerPassword);
            return;
        }

        if (value.length < 8 || !/[A-Z]/.test(value) || !/[0-9]/.test(value) || !/[^A-Za-z0-9]/.test(value)) {
            setFieldError(registerPassword, "Use 8+ chars, one uppercase letter, one number, and one symbol.");
        } else {
            clearFieldError(registerPassword);
        }
    });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = true;
        const email = document.getElementById("loginEmail");
        const password = document.getElementById("loginPassword");

        if (!email || !password) return;

        if (!email.value.trim()) {
            setFieldError(email, "Email is required.");
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            setFieldError(email, "Please enter a valid email address.");
            isValid = false;
        } else {
            clearFieldError(email);
        }

        if (!password.value.trim()) {
            setFieldError(password, "Password is required.");
            isValid = false;
        } else if (password.value.length < 8) {
            setFieldError(password, "Password must be at least 8 characters.");
            isValid = false;
        } else {
            clearFieldError(password);
        }

        if (isValid) {
            alert("✅ Login successful!");
            loginForm.reset();
        }
    });
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = true;
        const fullName = document.getElementById("fullName");
        const email = document.getElementById("registerEmail");
        const password = document.getElementById("registerPassword");

        if (!fullName) return;

        if (!fullName.value.trim()) {
            setFieldError(fullName, "Full name is required.");
            isValid = false;
        } else if (fullName.value.trim().length < 2) {
            setFieldError(fullName, "Full name must contain at least 2 characters.");
            isValid = false;
        } else {
            clearFieldError(fullName);
        }

        if (!email || !password) return;

        if (!email.value.trim()) {
            setFieldError(email, "Email is required.");
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            setFieldError(email, "Please enter a valid email address.");
            isValid = false;
        } else {
            clearFieldError(email);
        }

        if (!password.value.trim()) {
            setFieldError(password, "Password is required.");
            isValid = false;
        } else if (getPasswordStrength(password.value) < 100) {
            setFieldError(password, "Use 8+ characters with uppercase, number, and symbol.");
            isValid = false;
        } else {
            clearFieldError(password);
        }

        if (isValid) {
            alert("✅ Registration successful!");
            registerForm.reset();
            updatePasswordStrength("");
        }
    });
}

const loginEmailInput = document.getElementById("loginEmail");
if (loginEmailInput) {
    loginEmailInput.addEventListener("input", function () {
        if (loginEmailInput.value.trim() === "") {
            clearFieldError(loginEmailInput);
            return;
        }

        if (!isValidEmail(loginEmailInput.value)) {
            setFieldError(loginEmailInput, "Please enter a valid email address.");
        } else {
            clearFieldError(loginEmailInput);
        }
    });
}

const loginPasswordInput = document.getElementById("loginPassword");
if (loginPasswordInput) {
    loginPasswordInput.addEventListener("input", function () {
        if (loginPasswordInput.value.trim() === "") {
            clearFieldError(loginPasswordInput);
            return;
        }

        if (loginPasswordInput.value.length < 8) {
            setFieldError(loginPasswordInput, "Password must be at least 8 characters.");
        } else {
            clearFieldError(loginPasswordInput);
        }
    });
}

const fullNameInput = document.getElementById("fullName");
if (fullNameInput) {
    fullNameInput.addEventListener("input", function () {
        if (fullNameInput.value.trim() === "") {
            clearFieldError(fullNameInput);
            return;
        }

        if (fullNameInput.value.trim().length < 2) {
            setFieldError(fullNameInput, "Full name must contain at least 2 characters.");
        } else {
            clearFieldError(fullNameInput);
        }
    });
}

const registerEmailInput = document.getElementById("registerEmail");
if (registerEmailInput) {
    registerEmailInput.addEventListener("input", function () {
        if (registerEmailInput.value.trim() === "") {
            clearFieldError(registerEmailInput);
            return;
        }

        if (!isValidEmail(registerEmailInput.value)) {
            setFieldError(registerEmailInput, "Please enter a valid email address.");
        } else {
            clearFieldError(registerEmailInput);
        }
    });
}

if (registerPassword) {
    updatePasswordStrength(registerPassword.value);
}
