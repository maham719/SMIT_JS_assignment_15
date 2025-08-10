
if(window.location.href.includes("home.html")) {
     const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if(user){
var username=document.getElementById("username");
username.innerText=user.name;
    }
}

if(window.location.href.includes("quiz.html")) {
     const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if(user){
var username=document.getElementById("username");
username.innerText=user.name;
    }
}
function showLogin(){
    window.location.href="login.html";
}
function showHome(){
    window.location.href="home.html";
}
function showSignup(){
    window.location.href="signup.html";
}
const logout = document.getElementById("Logout");
if (logout) {
    logout.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.replace("login.html");
    });
}


document.addEventListener("DOMContentLoaded", function () {
var createAccount=document.getElementById("createAccount")
createAccount.addEventListener("click", function (e) {
  e.preventDefault();


  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
    toastr.options = {
  "closeButton": false,
  "debug": true,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

  if (!name || !email || !password || !confirmPassword) {
    toastr.error("please fill in all fileds ");
    return;
  }

  if (password !== confirmPassword) {
    toastr.error("password does not match");
    return;
  }


  let users = JSON.parse(localStorage.getItem("users")) || [];


  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    alert("This email is already registered.");
    return;
  }else{
       toastr.error("user doesn't exist!");
  }

  const newUser = {
    name,
    email,
    password
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  toastr.success("Account created successfully! You can now log in")

  setTimeout(() => {
  window.location.href = "login.html"; 
    
  }, 1000);
 
});
})
// login page logic
document.addEventListener("DOMContentLoaded", function () {
var loginbtn = document.getElementById("loginBtn");
loginbtn.addEventListener("click", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };

  if (!email || !password) {
    toastr.warning("Please fill in all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find(user => user.email === email && user.password === password);
  if (existingUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(existingUser));
    toastr.success("Login successful!");
    setTimeout(() => {


      window.location.href = "home.html";
    }, 1000);
  } else {
    toastr.error("Invalid email or password");
  }
});
});



// quiz page logic
let questions = [];
function startQuiz(category) {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    if (!loggedInUser.quizCategory) {
        loggedInUser.quizCategory = category;
    }
  localStorage.setItem("quizCategory", category);
  window.location.href = "quiz.html";
}
const category = localStorage.getItem("quizCategory");

fetch(`questions/${category}.json`)
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadQuiz(questions);
    return questions;
  });


  let currentQuestionIndex = 0;

function loadQuiz(questions) {
  const questionElement = document.getElementById("questioon");
  const optionA = document.querySelector("#optionA p:last-child");
  const optionB = document.querySelector("#optionB p:last-child");
  const optionC = document.querySelector("#optionC p:last-child");
  const optionD = document.querySelector("#optionD p:last-child");

  // Get the current question object
  const currentQuestion = questions[currentQuestionIndex];

  // Update question text
  questionElement.textContent = currentQuestion.question;

  // Update options
  optionA.textContent = currentQuestion.options[0];
  optionB.textContent = currentQuestion.options[1];
  optionC.textContent = currentQuestion.options[2];
  optionD.textContent = currentQuestion.options[3];
}

// Buttons
var nextbtn= document.getElementById("nextBtn")

nextbtn.addEventListener("click", function () {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuiz(questions);
  }else if (currentQuestionIndex === questions.length - 1) {
    nextbtn.disabled = true;
 
    var answers=localStorage.getItem("loggedInUser.answers");

 
  }
});
   var compl=document.getElementById("complete");
    compl.addEventListener("click",function(){
      window.location.href="home.html";
    })
document.getElementById("prevBtn").addEventListener("click", function () {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuiz(questions);
  }
});

// Load first question on page load
document.addEventListener("DOMContentLoaded", function () {
  loadQuiz(questions);
});



// timer setting
if (window.location.href.includes("quiz.html")) {
  let timer;
const startTimer = (duration) => {
  let time = duration;
  timer = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById("time").innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    if (time <= 0) {
      clearInterval(timer);
      toastr.error("Time's up! Submitting your answers.");
      // Submit the quiz or show results
      let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
      var answers = loggedInUser.answers;
   
    }
    time--;
  }, 1000);
};

  startTimer(1800);
}

// saving answers to local Storage 
document.addEventListener("DOMContentLoaded", function () {
     let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    
    if (!loggedInUser.answers) {
        loggedInUser.answers = {};
    }
    if (!loggedInUser.answers[category]) {
        loggedInUser.answers[category] = []; 
    }

    // Select all option containers
    const optionDivs = document.querySelectorAll(".options > div");

    optionDivs.forEach((div) => {
        div.addEventListener("click", function () {
            optionDivs.forEach(d => d.classList.remove("selected"));

      
            div.classList.add("selected");


            const selectedAnswer = div.querySelectorAll("p")[1].innerText.trim();


              loggedInUser.answers[category].push(selectedAnswer);

            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            


            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            
          nextbtn.disabled=false;
        });
    });
      if (nextbtn) {
        nextbtn.addEventListener("click", function () {

            optionDivs.forEach(d => d.classList.remove("selected"));
             nextbtn.disabled = true;
        });
    }
});
let finish = document.getElementById("finish");

finish.addEventListener("click", function () {
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  let userAnswers = loggedInUser.answers || {};
  let uanswers = userAnswers[category] || [];

  console.log("User answers for category:", uanswers);

  if (category) {
    console.log("Category:", category);

    fetch(`questions/${category}.json`)
      .then(res => res.json())
      .then(data => {
        let correctCount = 0;
        let questions = data;

        for (let i = 0; i < questions.length; i++) {
          const correctAnswer = questions[i].answer;
          const userAnswer = uanswers[i] || null;

          if (correctAnswer === userAnswer) {
            correctCount++;
          }

          console.log(`Correct answer: ${correctAnswer}`);
          console.log(`Your answer: ${userAnswer}`);
        }

    
        const scoreElement = document.getElementById("score");
        const percentageElement = document.getElementById("percentage");

        let percentage = ((correctCount / questions.length) * 100).toFixed(2);

        if (scoreElement && percentageElement) {
          scoreElement.innerText = correctCount;
          percentageElement.innerText = `${percentage}%`;
        }

    
        if (!loggedInUser.pastAttempts) {
          loggedInUser.pastAttempts = [];
        }

        let newAttempt = {
          category: category,
          date: new Date().toLocaleString(),
          score: correctCount,
          percentage: percentage
        };

        loggedInUser.pastAttempts.push(newAttempt);
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    
        let pastAttempts = JSON.parse(localStorage.getItem("pastAttempts")) || [];
        pastAttempts.push(newAttempt);
        localStorage.setItem("pastAttempts", JSON.stringify(pastAttempts));

      
        let resultcontainer=document.getElementById("resultContainer");
        resultcontainer.innerHTML="<h1 class='mb-4'>Past attempts:</h1>";
        astAttempts.forEach(attempt => {
  resultcontainer.innerHTML += ` 
    <div class="col ms-auto bg-body-tertiary shadow-lg p-3">
      <span><h4>Category:</h4><p>${attempt.category}</p></span>
      <span><h4>Score:</h4> <p>${attempt.score}</p></span>
      <span><h4>Percentage</h4> <p>${attempt.percentage}</p></span>
      <span><h4>Date:</h4> <p>${attempt.date}</p></span>
    </div>`;
});
       
        console.log(`You answered ${correctCount} out of ${questions.length} questions correctly.`);
      })
      .catch(error => {
        console.error("Error loading questions:", error);
      });
  }
});
