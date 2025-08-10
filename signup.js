// SIGNUP PAGE LOGIC
document.addEventListener("DOMContentLoaded", function () {
    const createAccount = document.getElementById("createAccount");

    createAccount.addEventListener("click", function (e) {
        e.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(user => user.email === email)) {
            alert("This email is already registered.");
            return;
        }

        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        toastr.success("Account created successfully! You can now log in");
        setTimeout(() => window.location.href = "login.html", 1000);
    });
});
