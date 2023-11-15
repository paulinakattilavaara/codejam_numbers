// Datorn genererar ett slumpmässigt nummer mellan 0 och 100 (använd Math.random()).
// Math.floor(Math.random() * 101); ska ge random nr mellan 0-100.
const randomNr = Math.floor(Math.random() * 101);
console.log(randomNr);

// Spelaren matar in ett tal i en input-ruta, sin gissning. Få kontakt med input.
const guessInput = document.getElementById("guess-input");
// Spelaren trycker på en knapp: få kontakt med knapp o adda event listener.
const guessBtn = document.getElementById("guess-btn");
//få kontakt med refresh-button för att ladda om sidan.
const refreshBtn = document.getElementById("refresh-btn");

refreshBtn.addEventListener("click", function () {
  location.reload();
});

// max antal gissningar.
let attempts = 5;

guessBtn.addEventListener("click", function () {
  // Spara spelarens inputvärde.
  let guessValue = guessInput.value;

  //skapa koppling till guess-answer p i html så jag kan skriva ut grejer
  const guessAnswer = document.getElementById("guess-answer");

  //skapa previous-guesses p i html så jag kan skriva ut tidigare gissningar
  const previousGuesses = document.body.appendChild(
    document.createElement("p")
  );

  // ta bort ett attempt
  attempts--;

  // Jämför det sparade talet med datorns slumpade nummer:
  // Är talet samma som datorns får man ett meddelande att man vunnit.
  // Är talet lägre får spelaren ett meddelande att numret är för lågt.
  // Är talet högre får spelaren ett meddelande att numret är för högt.
  if (guessValue < randomNr && guessValue < 101 && guessValue >= 0) {
    guessAnswer.textContent = "The number is too low. ⬇️";
  } else if (guessValue > randomNr && guessValue < 101 && guessValue >= 0) {
    guessAnswer.textContent = "The number is too high. ⬆️";
  } else if (guessValue < 0 || guessValue > 100) {
    guessAnswer.textContent =
      "Are you sure that your number is between 0-100? 🤔";
  } else if (guessValue == randomNr) {
    guessAnswer.textContent = "Correct answer! YOU WIN!! 🍾🎉";
    disableGuesses();
  } else {
    guessAnswer.textContent = "Something went wrong. 🛑";
  }
  //skriva ut tidigare gissningar i p element på sidan
  // alla gissningar ska sparas på sidan tills spelet är slut.
  // om det inte är rätt får spelaren ett nytt försök och försöken minskas.
  if (guessValue != randomNr && attempts > 0) {
    previousGuesses.textContent = `You guessed ${guessValue}. You have ${attempts} guesses left.`;
  } else if (guessValue == randomNr && attempts >= 0) {
    previousGuesses.textContent = `Congratulations! You had ${attempts} guesses left.`;
    disableGuesses();
  } else {
    guessAnswer.textContent = `You've run out of guesses! 🛑 The correct number was ${randomNr}.`;
    disableGuesses();
  }

  //tömma input på tidigare gissning.
  guessInput.value = "";

  // Spelaren har 5 chanser på sig att gissa rätt tal. om den gissar fler gånger avbryts spelet
});

function disableGuesses() {
  guessInput.disabled = true;
  guessBtn.disabled = true;
}
