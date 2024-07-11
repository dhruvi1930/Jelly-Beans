document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.querySelector(".play-btn");
  const startButton = document.querySelector(".start-btn");
  const submitButton = document.querySelector(".submit-btn");
  const dataContainer = document.querySelector(".data-container");
  const discoverButton = document.querySelector(".discover-btn");

  const playerSection = document.querySelector(".player-section");
  const playerNumberInput = document.getElementById("playerNumberInput");

  const userNameInput = document.getElementById("nameInput");
  const guessInput = document.getElementById("guessInput");

  const feedbackModal = document.getElementById("feedbackModal");
  const feedbackMessage = document.getElementById("feedbackMessage");
  const closeFeedbackBtn = document.getElementById("closeFeedback");

  const winnerModal = document.getElementById("winnerModal");
  const winnerMessage = document.getElementById("winnerMessage");
  const closeWinnerBtn = document.getElementById("closeWinner");

  let jellyBeanNumber = Math.floor(Math.random() * 100) + 1;

  let numberOfPlayers;
  let users = [];

  function showPlayerSection() {
    playButton.style.display = "none";
    playerSection.classList.add("active");
  }

  function startGame() {
    const playerCount = parseInt(playerNumberInput.value, 10);
    if (isNaN(playerCount) || playerCount <= 0) {
      showModal(feedbackModal, "Please enter a valid number of players.");
      return;
    }
    numberOfPlayers = playerCount;
    playerSection.classList.remove("active");
    dataContainer.classList.add("active");
    discoverButton.disabled = true; // Disable the discover button initially
  }

  function handleSubmit() {
    const playerName = userNameInput.value.trim();
    const playerGuess = parseInt(guessInput.value, 10);

    if (
      playerName === "" ||
      isNaN(playerGuess) ||
      playerGuess < 1 ||
      playerGuess > 100
    ) {
      showModal(
        feedbackModal,
        "Please enter a valid name and guess between 1 and 100."
      );
      return;
    }

    if (users.some((user) => user.guess === playerGuess)) {
      showModal(
        feedbackModal,
        "This number has already been guessed. Please choose a different number."
      );
      return;
    }

    if (numberOfPlayers === 0) {
      showModal(feedbackModal, "No more players are allowed.");
      discoverButton.classList.add("active");
      return;
    }

    numberOfPlayers--;
    users.push({ name: playerName, guess: playerGuess });

    userNameInput.value = "";
    guessInput.value = "";

    displayPlayers();
    giveFeedback(playerGuess);

    if (numberOfPlayers === 0) {
      dataContainer.classList.remove("active");
      discoverButton.classList.add("active");
      discoverButton.disabled = false; // Enable the discover button when ready
    }
  }

  function displayPlayers() {
    const displayDiv = document.querySelector(".display");
    displayDiv.innerHTML = "";

    users.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.classList.add("user-entry");

      const userNameHeading = document.createElement("h3");
      userNameHeading.textContent = "Name:";
      const userNameValue = document.createElement("p");
      userNameValue.textContent = user.name;

      const userGuessHeading = document.createElement("h3");
      userGuessHeading.textContent = "Guess:";
      const userGuessValue = document.createElement("p");
      userGuessValue.textContent = user.guess;

      userDiv.appendChild(userNameHeading);
      userDiv.appendChild(userNameValue);
      userDiv.appendChild(userGuessHeading);
      userDiv.appendChild(userGuessValue);

      displayDiv.appendChild(userDiv);
    });
  }

  function giveFeedback(guess) {
    const difference = Math.abs(guess - jellyBeanNumber);
    let message;
    if (difference === 0) {
      message = "Congratulations! You guessed the exact number!";
    } else if (difference <= 5) {
      message = "Very close! You're within 5 numbers.";
    } else if (difference <= 10) {
      message = "Close! You're within 10 numbers.";
    } else if (difference <= 20) {
      message = "Not too far! You're within 20 numbers.";
    } else {
      message = "Way off! You're more than 20 numbers away.";
    }
    showModal(feedbackModal, message);
  }

  function discoverWinner() {
    const winner = users.find((user) => user.guess === jellyBeanNumber);
    if (winner) {
      showModal(
        winnerModal,
        `${winner.name} is the winner! The correct number of jelly beans was ${jellyBeanNumber}. 🎉🎊`
      );
    } else {
      showModal(
        winnerModal,
        `No one guessed the correct number. The correct number of jelly beans was ${jellyBeanNumber}.`
      );
    }
  }

  function showModal(modal, message) {
    const messageElement = modal.querySelector(".modal-message");
    messageElement.textContent = message;
    modal.style.display = "block";
  }

  function closeModal(modal) {
    modal.style.display = "none";
  }

  playButton.addEventListener("click", showPlayerSection);
  startButton.addEventListener("click", startGame);
  submitButton.addEventListener("click", handleSubmit);
  discoverButton.addEventListener("click", discoverWinner);

  closeFeedbackBtn.addEventListener("click", () => closeModal(feedbackModal));
  closeWinnerBtn.addEventListener("click", () => closeModal(winnerModal));

  window.addEventListener("click", (event) => {
    if (event.target === feedbackModal) {
      closeModal(feedbackModal);
    }
    if (event.target === winnerModal) {
      closeModal(winnerModal);
    }
  });
});
