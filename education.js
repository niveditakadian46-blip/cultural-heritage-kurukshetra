/*find all education feature cards*/
const educationCards = document.querySelectorAll(".educationCard");

/* open the correct pop-up when each is clicked*/
educationCards.forEach(function (card){
    card.addEventListener("click",function(){
        const modalID = card.getAttribute("data-modal");
        const modal = document.getElementById(modalID);

        if (modal) {
            modal.classList.add("isOpen");
            modal.setAttribute("aria-hidden", "false");

            /*move keyboard focus to the close button*/
            modal.querySelector(".modalClose").focus();
        }
    });
});

/*close one pop-up */
/* Close one pop-up */
function closeModal(modal) {
    /* Reset the quiz only when the Quiz Zone pop-up closes */
    if (modal.id === "quizModal") {
        const quiz = document.getElementById("heritageQuiz");
        const quizResult = document.getElementById("quizResult");

        if (quiz) {
            quiz.reset();

            quiz.querySelectorAll("label").forEach(function (label) {
                label.classList.remove(
                    "answerCorrect",
                    "answerIncorrect"
                );
            });
        }

        if (quizResult) {
            quizResult.textContent = "";
        }
    }

    modal.classList.remove("isOpen");
    modal.setAttribute("aria-hidden", "true");
}

/* Close a pop-up using its X button */
const closeButtons = document.querySelectorAll(".modalClose");

closeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const modal = button.closest(".educationModal");

        if (modal) {
            closeModal(modal);
        }
    });
});

/* close pop-up by clicking outside the pop-up*/
const educationModals = document.querySelectorAll(".educationModal");

educationModals.forEach(function(modal) {
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
});

/* close an pop-up using the escape key*/
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        const openModal = document.querySelector(".educationModal.isOpen");

        if (openModal) {
            closeModal(openModal);
        }
    }
});

/* check the quiz score */
const checkQuizButton = document.getElementById("checkQuiz");
const quizResult = document.getElementById("quizResult");

if (checkQuizButton) {
    checkQuizButton.addEventListener("click", function(){
        const questions = document.querySelectorAll(
            "#heritageQuiz fieldset"
        );

        const allAnswered = Array.from(questions).every(function (question) {
            return question.querySelector("input:checked");
        });

        if (!allAnswered) {
            quizResult.textContent =
                "Please answer all questions before checking your score.";
            return;
        }
    
        let score =0;
        let answeredQuestions = 0;

        questions.forEach(function (question) {
            const selectedAnswer = question.querySelector("input:checked");
            const correctAnswer = question.querySelector(
                'input[value="correct"]'
            );

            /* Remove old colours before checking again */
            question.querySelectorAll("label").forEach(function (label) {
                label.classList.remove("answerCorrect", "answerIncorrect");
            });

            if (selectedAnswer) {
                answeredQuestions++;

                if (selectedAnswer.value === "correct") {
                    score++;
                    selectedAnswer.closest("label").classList.add("answerCorrect");
                } else {
                    selectedAnswer.closest("label").classList.add("answerIncorrect");
                    correctAnswer.closest("label").classList.add("answerCorrect");
                }
            }
        });

        if (answeredQuestions < questions.length) {
            quizResult.textContent =
                "Please answer all questions before checking your score.";
        } else {
            quizResult.textContent =
                "You scored " + score + " out of " + questions.length + "!";
        }
    });
}

/* Smoothly change the four Education hero pictures */
const educationHeroImages = [
    "images/kuk1.jpg",
    "images/nit.jpg",
    "images/ayush.jpg",
    "images/education.jpeg"
];

let educationImageNumber = 0;

let activeEducationSlide =
    document.getElementById("educationHeroImage");

let hiddenEducationSlide =
    document.getElementById("nextEducationHeroImage");

if (activeEducationSlide && hiddenEducationSlide) {
    setInterval(function () {
        educationImageNumber =
            (educationImageNumber + 1) % educationHeroImages.length;

        hiddenEducationSlide.src =
            educationHeroImages[educationImageNumber];

        hiddenEducationSlide.classList.add("isVisible");
        activeEducationSlide.classList.remove("isVisible");

        const previousSlide = activeEducationSlide;
        activeEducationSlide = hiddenEducationSlide;
        hiddenEducationSlide = previousSlide;

    }, 2500);
}