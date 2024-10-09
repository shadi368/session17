let randomWord = ''; // Declare randomWord globally to access it later

async function getRandomWord() {
    try {
        const response = await fetch("https://random-word-api.herokuapp.com/word?number=1");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const wordArray = await response.json();
        return wordArray[0]; // Returns the first word
    } catch (error) {
        console.error("Error fetching the random word:", error);
        alert("Could not fetch a random word. Please try again later.");
    }
}

async function startgame() {
    // Get a random word
    randomWord = await getRandomWord();
    // Wait for the promise to resolve
    const wordLength = randomWord.length; // Get the length of the word

    // Create input fields based on the word length
    const inputContainer = document.querySelector('.input-container');
    inputContainer.innerHTML = ''; // Clear previous inputs

    // Create input fields for each letter in the word
    for (let i = 0; i < wordLength; i++) {
        const input = document.createElement('input');
        input.type = "text";
        input.maxLength = "1";
        input.classList.add(`input${i}`); // Unique class for each input
        
        // Add event listener to check inputs on input event (not keypress)
        input.addEventListener('input', () => {
            const userInput = input.value; // Get the value from the input field

            // Compare user input with the corresponding letter in the randomWord
            if (userInput.toLowerCase() === randomWord[i].toLowerCase()) {
                alert(`Correct letter: ${userInput}!`); // Alert correct letter
                input.style.borderColor = 'green'; // Change border color to indicate correct input
            } else if (userInput) { // Check only if there's an input
                alert(`Incorrect letter: ${userInput}. Try again!`); // Alert incorrect letter
                input.style.borderColor = 'red'; // Change border color to indicate incorrect input
            } else {
                input.style.borderColor = ''; // Reset border color if input is empty
            }

            // Optional: Check if the entire word is guessed correctly
            checkAllInputs(); // Call this function to check all inputs together
        });

        inputContainer.appendChild(input); // Add the input to the container
    }

    console.log("Game started");
    // Optionally, you can display the random word in the console for debugging
    console.log(`Random Word: ${randomWord}`);
}

function checkAllInputs() {
    const inputs = document.querySelectorAll('.input-container input'); // Select all input fields

    // Check if the entire word is guessed correctly
    let allCorrect = true;
    inputs.forEach((input, index) => {
        if (input.value.toLowerCase() !== randomWord[index].toLowerCase()) {
            allCorrect = false; // If any input is incorrect, set the flag to false
        }
    });

    if (allCorrect) {
        alert("You've guessed the word correctly!");
    }
}
