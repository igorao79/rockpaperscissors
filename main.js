let userScore = 0;
let computerScore = 0;

// Функция выбора компьютера
const getComputerChoice = () => {
    const number = Math.floor(Math.random() * 3);
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[number];
  
    // Удаляем выделение со всех кнопок
    document.querySelectorAll(".buttonsblock button").forEach((btn) => {
      btn.classList.remove("selected");
    });
  
    // Добавляем класс 'selected' к выбранной кнопке
    const computerButton = document.getElementById(computerChoice);
    if (computerButton) {
      computerButton.classList.add("selected");
    }
  
    return computerChoice;
  };
  

// Функция определения победителя
const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return "Ничья";
  }

  const winConditions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  return winConditions[userChoice] === computerChoice
    ? "Пользователь выиграл"
    : "Компьютер выиграл";
};

// Функция обновления результата
const updateResult = (userChoice, computerChoice, result) => {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <p>Ваш выбор: <strong>${userChoice}</strong></p>
    <p>Выбор компьютера: <strong>${computerChoice}</strong></p>
    <p><strong>${result}</strong></p>
  `;

  if (result === "Пользователь выиграл") {
    userScore++;
  } else if (result === "Компьютер выиграл") {
    computerScore++;
  }

  document.querySelector(".user-result").textContent = userScore;
  document.querySelector(".computer-result").textContent = computerScore;

  checkGameOver();
};

// Проверка конца игры
const toggleButtons = (disable) => {
    document.querySelectorAll("button").forEach((button) => {
      button.disabled = disable;
    });
  };
  
  const checkGameOver = () => {
    if (userScore >= 3 || computerScore >= 3) {
      document.getElementById("result").innerHTML = `
        <h4>${userScore >= 3 ? "Победа за вами!" : "Вы проиграли!"}</h4>
      `;
      toggleButtons(true); // Отключаем кнопки
      document.querySelectorAll(".buttonsblock button").forEach((btn) => {
        btn.classList.remove("selected");
        btn.classList.add("no-hover")
      });
      setTimeout(() => {
        resetGame();
        toggleButtons(false); // Включаем кнопки
        document.querySelectorAll(".buttonsblock button").forEach((btn) => {
          btn.classList.remove("no-hover")
        })
      }, 3000);
    }
  };


// Сброс игры
const resetGame = () => {
  userScore = 0;
  computerScore = 0;
  document.querySelector(".user-result").textContent = userScore;
  document.querySelector(".computer-result").textContent = computerScore;
  document.getElementById("result").innerHTML = `
  <p>Ваш выбор:</p>
  <p>Выбор компьютера:</p>
  `;
};

// Привязка событий к кнопкам
document.getElementById("rock").addEventListener("click", () => playGame("rock"));
document.getElementById("paper").addEventListener("click", () => playGame("paper"));
document.getElementById("scissors").addEventListener("click", () => playGame("scissors"));

// Основная функция игры
const playGame = (userChoice) => {
  const computerChoice = getComputerChoice();
  const result = determineWinner(userChoice, computerChoice);
  updateResult(userChoice, computerChoice, result);
};
