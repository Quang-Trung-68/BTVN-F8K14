import { questions, prizeMap, allOptions } from "./const.js";
import {
  questionRef,
  prizeLevelAll,
  titleRef,
  expertResultElement,
  phoneResultElement,
  modal,
  overlay,
  halfAnswer,
  askAudienceBtn,
  endGame,
  titleModal,
  modalMoney,
  modalLevel,
  timeLeftElement,
  checkBtn,
  callPeople,
  callExpert,
  buttonRestart,
  helpBlock,
} from "./references.js";
import { resultPlayer, resultPlayerStart } from "./result.js";

// todo: need to get next question / first question
let countCurQuestion = 0;
let curQuestion = questions[countCurQuestion];

// in question
let isAnswer = false;
let isSelected = false;
let isNext = false;

// Timer variables
let timeLeft = 30;
let countdownInterval = null;

// Store function handlers to be able to remove them later
let optionHandlers = {};

const onShowQuestion = () => {
  // Clear ask audience
  clearAskAudience();
  // Clear call
  clearCall();
  // Check for show help block
  showHelpForPlayer();
  // Follow prize got
  prizeLevelAll.forEach((prz) => {
    prz.classList.remove("active");
    prz.classList.remove("active-safe");
  });
  const prizeActiveSafe = document.querySelector(
    `.prize-level-${resultPlayer.levelSafe}`
  );
  if (prizeActiveSafe) {
    prizeActiveSafe.classList.add("active-safe");
  }
  const prizeActive = document.querySelector(
    `.prize-level-${resultPlayer.level + 1}`
  );
  prizeActive.classList.add("active");
  // Show info about current prize
  showMoney.innerText = `Money: ${resultPlayer.money}`;
  showLevel.innerText = `Level:---${resultPlayer.level}---`;
  showMoneySafe.innerText = `Money: ${prizeMap[resultPlayer.levelSafe]}`;
  showLevelSafe.innerText = `Level:---${resultPlayer.levelSafe}---`;

  titleRef.innerText = curQuestion.question;

  for (const key of allOptions) {
    questionRef.querySelector(
      `.question-option[value="${key}"]`
    ).innerText = `${key.toUpperCase()}: ${curQuestion[key]}`;
  }
};

// Show help

const showHelpForPlayer = () => {
  if (resultPlayer.level >= 5) {
    helpBlock.classList.remove("hidden");
  } else helpBlock.classList.add("hidden");
};

const resetBackground = () => {
  questionRef.querySelectorAll(".question-option").forEach((ref) => {
    ref.style.backgroundColor = "#fff";
  });
};

// Create separate handler function for each option
const createOptionHandler = (key) => {
  return () => {
    isSelected = true;
    console.log("click", key);
    // set userAns
    curQuestion.userAns = key;
    curQuestion.isCorrect = curQuestion.userAns === curQuestion.correctAns;

    // set background
    resetBackground();
    const answerRef = questionRef.querySelector(
      `.question-option[value="${key}"]`
    );
    answerRef.style.backgroundColor = "#ccc";
  };
};

const addEvent = () => {
  for (const key of allOptions) {
    const answerRef = questionRef.querySelector(
      `.question-option[value="${key}"]`
    );

    // Create and store handler function
    optionHandlers[key] = createOptionHandler(key);

    // Add event listener
    answerRef.addEventListener("click", optionHandlers[key]);
  }
};

// Remove event listener for a specific option
const removeOptionEvent = (key) => {
  const answerRef = questionRef.querySelector(
    `.question-option[value="${key}"]`
  );
  if (optionHandlers[key]) {
    answerRef.removeEventListener("click", optionHandlers[key]);
    // Delete handler from object
    delete optionHandlers[key];
    console.log(`Removed event listener for option ${key}`);
  }
};

// Disable option (deactivate and change interface)
const disableOption = (key) => {
  const answerRef = questionRef.querySelector(
    `.question-option[value="${key}"]`
  );
  answerRef.style.backgroundColor = "#ddd";
  answerRef.style.color = "#999";
  answerRef.style.cursor = "not-allowed";
  answerRef.style.opacity = "0.5";

  // Remove event listener
  removeOptionEvent(key);
};

// Re-enable option
const enableOption = (key) => {
  const answerRef = questionRef.querySelector(
    `.question-option[value="${key}"]`
  );
  answerRef.style.backgroundColor = "#fff";
  answerRef.style.color = "#000";
  answerRef.style.cursor = "pointer";
  answerRef.style.opacity = "1";

  // Add back event listener if not exists
  if (!optionHandlers[key]) {
    optionHandlers[key] = createOptionHandler(key);
    answerRef.addEventListener("click", optionHandlers[key]);
  }
};

// Reset all options to initial state
const resetAllOptions = () => {
  for (const key of allOptions) {
    enableOption(key);
  }
  resetBackground();
};

// 50:50 feature - remove 2 wrong answers
const use5050 = () => {
  const correctAnswer = curQuestion.correctAns;
  const wrongOptions = allOptions.filter((option) => option !== correctAnswer);

  // Randomly choose 2 wrong answers to remove
  const optionsToRemove = [];
  while (optionsToRemove.length < 2 && wrongOptions.length > 0) {
    const randomIndex = Math.floor(Math.random() * wrongOptions.length);
    const selectedOption = wrongOptions.splice(randomIndex, 1)[0];
    optionsToRemove.push(selectedOption);
  }

  // Disable 2 wrong answers
  optionsToRemove.forEach((option) => {
    disableOption(option);
  });

  console.log(`50:50 used! Removed options: ${optionsToRemove.join(", ")}`);
};

// Ask the audience feature
const askAudience = () => {
  const correctAnswer = curQuestion.correctAns;
  const wrongOptions = allOptions.filter((option) => option !== correctAnswer);

  // Create percentage for correct answer (41-51%)
  let percentCorrect = Math.floor(Math.random() * 11) + 41; // 41–51
  let remain = 100 - percentCorrect;

  // Create random weights for wrong answers
  let r1 = Math.random();
  let r2 = Math.random();
  let r3 = Math.random();
  let total = r1 + r2 + r3;

  let percentWrong1 = Math.floor((r1 / total) * remain);
  let percentWrong2 = Math.floor((r2 / total) * remain);
  let percentWrong3 = Math.floor((r3 / total) * remain);

  // total = 100%
  let totalCalculated =
    percentCorrect + percentWrong1 + percentWrong2 + percentWrong3;
  if (totalCalculated !== 100) {
    percentWrong1 += 100 - totalCalculated;
  }

  // Update percentage for correct answer
  const quesTruePercent = document.querySelector(
    `.question-percent[value="${correctAnswer}"]`
  );
  if (quesTruePercent) {
    quesTruePercent.innerText = percentCorrect + "%";
  }

  // Update percentage for wrong answers
  const wrongPercentages = [percentWrong1, percentWrong2, percentWrong3];
  for (let [index, key] of wrongOptions.entries()) {
    const quesWrongPercent = document.querySelector(
      `.question-percent[value="${key}"]`
    );
    if (quesWrongPercent) {
      quesWrongPercent.innerText = wrongPercentages[index] + "%";
    }
  }
};

// Clear ask audience
const clearAskAudience = () => {
  for (let key of allOptions) {
    const quesPercent = document.querySelector(
      `.question-percent[value="${key}"]`
    );
    quesPercent.innerText = "";
  }
};

// Clear call
const clearCall = () => {
  expertResultElement.innerHTML = "";
  phoneResultElement.innerHTML = "";
};

const showResult = () => {
  const answerRef = questionRef.querySelector(
    `.question-option[value="${curQuestion.userAns}"]`
  );
  const curCorrectAns = questionRef.querySelector(
    `.question-option[value="${curQuestion.correctAns}"]`
  );

  resetBackground();
  if (curQuestion.isCorrect) answerRef.style.backgroundColor = "blue";
  else {
    answerRef.style.backgroundColor = "red";
    curCorrectAns.style.backgroundColor = "blue";
  }
};

const checkAnswer = () => {
  if (!isAnswer) {
    isAnswer = true;
    stopTimer();
    showResult();
    if (curQuestion.isCorrect) {
      console.log("Correct Answer!!");
      resultPlayer.level += 1;
      console.log(prizeMap[curQuestion.id]);
      resultPlayer.money = prizeMap[curQuestion.id];
      if (resultPlayer.level < 5) resultPlayer.levelSafe = 0;
      if (resultPlayer.level >= 5 && resultPlayer.level <= 9) {
        resultPlayer.levelSafe = 5;
      } else if (resultPlayer.level >= 10 && resultPlayer.level <= 14) {
        resultPlayer.levelSafe = 10;
      } else if (resultPlayer.level === 15) resultPlayer.levelSafe = 15;
    } else {
      console.log("Wrong answer");
      loseModal();
      isAnswer = false;
      isNext = true;
    }

    console.log(resultPlayer.levelSafe);
  }
};

const loseModal = () => {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
  titleModal.innerText = `YOU LOSE!!!`;
  modalMoney.innerText = `Money get: ${prizeMap[resultPlayer.levelSafe]}$`;
  modalLevel.innerText = `Level at: ${resultPlayer.levelSafe}`;
};

// Button start

buttonRestart.addEventListener("click", () => {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");

  resetGame();
  resetAllOptions(); // Reset all options
  // Reset button 50:50

  halfAnswer.disabled = false;
  callExpert.disabled = false;
  callPeople.disabled = false;
  // Reset button ask audience

  askAudienceBtn.disabled = false;

  onShowQuestion();
  startTimer();
  isNext = false;
});

const resetGame = () => {
  countCurQuestion = 0;
  curQuestion = questions[countCurQuestion];
  resultPlayer.money = resultPlayerStart.money;
  resultPlayer.level = resultPlayerStart.level;
  resultPlayer.levelSafe = resultPlayerStart.levelSafe;
};

// End game
endGame.addEventListener("click", () => {
  loseModal();
  if (resultPlayer.levelSafe >= 5) {
    titleModal.innerText = `YOU WIN!!!`;
  } else titleModal.innerText = `YOU LOSE!!!`;

  modalMoney.innerText = `Money get: ${resultPlayer.money}$`;

  modalLevel.innerText = `Level at: ${resultPlayer.level}`;
  stopTimer();
});

// Timer functions

const stopTimer = () => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
};

const startTimer = () => {
  stopTimer();
  timeLeft = 30;
  updateTimeDisplay();

  countdownInterval = setInterval(() => {
    timeLeft--;
    updateTimeDisplay();

    if (timeLeft <= 10) {
      timeLeftElement.style.color = "red";
      timeLeftElement.style.fontWeight = "bold";
    } else if (timeLeft <= 20) {
      timeLeftElement.style.color = "orange";
    } else {
      timeLeftElement.style.color = "black";
      timeLeftElement.style.fontWeight = "normal";
    }

    console.log(`Time remaining: ${timeLeft}s`);

    if (timeLeft < 1) {
      stopTimer();
      console.log("Time's up! You lose.");
      loseModal();
      isAnswer = false;
      isNext = true;
    }

    if (isNext) {
      stopTimer();
      console.log("Moving to next question before time runs out.");
    }
  }, 1000);
};

const updateTimeDisplay = () => {
  if (timeLeftElement) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeLeftElement.innerText = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
};

// Initialize
addEvent();
onShowQuestion();

checkBtn.addEventListener("click", () => {
  if (!isAnswer && isSelected) {
    isSelected = false;
    checkAnswer();
  }
  if (isAnswer && curQuestion.isCorrect) {
    isAnswer = false;
    isNext = true;
    setTimeout(() => {
      console.log("Next to question");
      countCurQuestion++;
      if (countCurQuestion >= questions.length) {
        console.log("Game completed!");
        loseModal();
        titleModal.innerText = `YOU WIN!!!`;
        return;
      }
      curQuestion = questions[countCurQuestion];
      resetAllOptions(); // Reset all options for new question
      onShowQuestion();
      startTimer();

      isNext = false;
    }, 1000);
  }
});

// Add event listener for 50:50 button
if (halfAnswer) {
  halfAnswer.addEventListener("click", () => {
    if (!isAnswer) {
      // Only allow use when not answered yet
      use5050();
      halfAnswer.disabled = true; // Disable button after use
    }
  });
}

// Add event for ask audience
if (askAudienceBtn) {
  askAudienceBtn.addEventListener("click", () => {
    if (!isAnswer) {
      askAudience();
      askAudienceBtn.disabled = true;
    }
  });
}

// Call friend or get advice
// Phone call: Random suggest 1 answer (high accuracy rate 80-90%)
const phoneCall = () => {
  const correctAnswer = curQuestion.correctAns;

  // High accuracy rate (80-90%)
  const isCorrect = Math.random() < 0.85; // 85% chance of being correct

  let suggestedAnswer;
  if (isCorrect) {
    suggestedAnswer = correctAnswer;
  } else {
    // Random 1 wrong answer
    const wrongOptions = allOptions.filter(
      (option) => option !== correctAnswer
    );
    suggestedAnswer =
      wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
  }

  // Display suggestion with random message
  const messages = [
    `I think the answer is ${suggestedAnswer.toUpperCase()}`,
    `In my opinion, choose ${suggestedAnswer.toUpperCase()}`,
    `I'm quite sure it's ${suggestedAnswer.toUpperCase()}`,
    `${suggestedAnswer.toUpperCase()} is the correct answer`,
    `I would choose ${suggestedAnswer.toUpperCase()}`,
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  // Display result (can be changed according to your UI)
  displayPhoneResult(randomMessage, suggestedAnswer);

  return {
    suggestion: suggestedAnswer,
    isCorrect: suggestedAnswer === correctAnswer,
    message: randomMessage,
  };
};

// Expert advice: Suggest 1 answer (random, can be correct or wrong 50-60%)
const expertAdvice = () => {
  const correctAnswer = curQuestion.correctAns;

  // Average accuracy rate (50-60%)
  const isCorrect = Math.random() < 0.55; // 55% chance of being correct

  let suggestedAnswer;
  if (isCorrect) {
    suggestedAnswer = correctAnswer;
  } else {
    // Random 1 wrong answer
    const wrongOptions = allOptions.filter(
      (option) => option !== correctAnswer
    );
    suggestedAnswer =
      wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
  }

  // Expert messages (more professional)
  const expertMessages = [
    `Based on my knowledge, I recommend you choose ${suggestedAnswer.toUpperCase()}`,
    `According to analysis, answer ${suggestedAnswer.toUpperCase()} has the highest probability`,
    `I would go with ${suggestedAnswer.toUpperCase()} in this case`,
    `${suggestedAnswer.toUpperCase()} is the most reasonable choice`,
    `With my experience, I choose ${suggestedAnswer.toUpperCase()}`,
  ];

  const randomMessage =
    expertMessages[Math.floor(Math.random() * expertMessages.length)];

  // Display result
  displayExpertResult(randomMessage, suggestedAnswer);

  return {
    suggestion: suggestedAnswer,
    isCorrect: suggestedAnswer === correctAnswer,
    message: randomMessage,
  };
};

// Function to display phone call result
const displayPhoneResult = (message, suggestion) => {
  if (phoneResultElement) {
    phoneResultElement.innerHTML = `
      <div class="lifeline-result">
        <h3>📞 Call a Friend</h3>
        <p>Rate: 85%</p>
        <p>"${message}"</p>
        <div class="suggestion-highlight">Suggested answer: <strong>${suggestion.toUpperCase()}</strong></div>
        <br>
        <p>Correct answer to check: ${curQuestion.correctAns.toUpperCase()}</p>
         <br>
      </div>
    `;
    phoneResultElement.style.display = "block";
  }
};

// Function to display expert advice result
const displayExpertResult = (message, suggestion) => {
  // Update UI - change according to your design
  if (expertResultElement) {
    expertResultElement.innerHTML = `
      <div class="lifeline-result">
        <h3>👨‍🎓 Expert Advice</h3>
        <p>"${message}"</p>
        <div class="suggestion-highlight">Suggested answer: <strong>${suggestion.toUpperCase()}</strong></div>
         <br>
        <p>Correct answer to check: ${curQuestion.correctAns.toUpperCase()}</p>
        <br>
      </div>
    `;
    expertResultElement.style.display = "block";
  }
};

// Add event call

callPeople.addEventListener("click", () => {
  if (callPeople) {
    phoneCall();
    callPeople.disabled = true;
  }
});

callExpert.addEventListener("click", () => {
  if (callExpert) {
    expertAdvice();
    callExpert.disabled = true;
  }
});
