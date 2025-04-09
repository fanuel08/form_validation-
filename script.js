// Handle form submission
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Reset error messages and success message
    let errors = false;
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
    document.getElementById("successMessage").textContent = "";

    // Get form input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const termsChecked = document.getElementById("terms").checked;

    // Validate Name (minimum 3 characters)
    if (name.length < 3) {
        document.getElementById("nameError").textContent = "Name must be at least 3 characters long.";
        errors = true;
    }

    // Validate Email using regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Enter a valid email address.";
        errors = true;
    }

    // Validate Password using regex (min 8 chars, uppercase, lowercase, number)
    const passwordPattern = /^(?=.[a-z])(?=.[A-Z])(?=.*\d).{8,}$/;
    if (!passwordPattern.test(password)) {
        document.getElementById("passwordError").textContent = "Password must be at least 8 characters long and include uppercase, lowercase, and a number.";
        errors = true;
    }

    // Check if Confirm Password matches Password
    if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
        errors = true;
    }

    // Validate that Terms & Conditions are checked
    if (!termsChecked) {
        document.getElementById("termsError").textContent = "You must agree to the terms and conditions.";
        errors = true;
    }

    // If all validations pass
    if (!errors) {
        // Display success message
        document.getElementById("successMessage").textContent = "Form submitted successfully!";
        
        // Store name and email in localStorage
        localStorage.setItem("formData", JSON.stringify({ name, email }));
        
        // You can optionally submit the form here if needed
        // this.submit();
    }
});

// Function to add show/hide toggle to password fields
function addPasswordToggle(fieldId) {
    const input = document.getElementById(fieldId);

    // Create toggle span
    const toggle = document.createElement("span");
    toggle.textContent = "Show";
    toggle.style.cursor = "pointer";
    toggle.style.marginLeft = "10px";

    // Append the toggle next to the input
    input.parentNode.appendChild(toggle);

    // Toggle password visibility
    toggle.addEventListener("click", () => {
        if (input.type === "password") {
            input.type = "text";
            toggle.textContent = "Hide";
        } else {
            input.type = "password";
            toggle.textContent = "Show";
        }
    });
}

// Add toggles to both password fields
addPasswordToggle("password");
addPasswordToggle("confirmPassword");

// Create and add a Clear Form button
const clearButton = document.createElement("button");
clearButton.textContent = "Clear Form";
clearButton.type = "button";
clearButton.style.marginTop = "10px";

// When clicked, reset the form and clear messages
clearButton.addEventListener("click", () => {
    document.getElementById("registrationForm").reset(); // Clear form inputs
    document.querySelectorAll(".error").forEach(e => e.textContent = ""); // Clear error messages
    document.getElementById("successMessage").textContent = ""; // Clear success message
});

// Add the button to the form
document.getElementById("registrationForm").appendChild(clearButton);