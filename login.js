// LOGIN PAGE LOGIC
document.addEventListener("DOMContentLoaded", function () {
    const loginbtn = document.getElementById("loginBtn");

    loginbtn.addEventListener("click", function (e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        if (!email || !password) {
            toastr.warning("Please fill in all fields");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find(user => user.email === email && user.password === password);

        if (existingUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(existingUser));
            toastr.success("Login successful!");
            setTimeout(() => window.location.href = "home.html", 1000);
        } else {
            toastr.error("Invalid email or password");
        }
    });
});
