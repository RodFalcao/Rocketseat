const numberTotals = document.getElementById("number-totals");
const minNumber = document.getElementById("start-numbers");
const maxNumber = document.getElementById("end-numbers");
const repeatNumbersCheckbox = document.getElementById("repeat-numbers");
const firstDrawn = document.getElementById("number-draw");

const drawButton = document.querySelector(".draw");
const drawButtonAgain = document.querySelector(".draw-again");

const numberDrawResults = document.getElementById("number-draw-results");
const drawNumbersContainer = document.getElementById("number-results-container");

// Limpa caracteres não numéricos
function removeNonNumeric(inputElement) {
    inputElement.oninput = () => {
        let value = inputElement.value.replace(/\D/g, '');
        inputElement.value = value;
    };
}

removeNonNumeric(maxNumber);
removeNonNumeric(minNumber);
removeNonNumeric(numberTotals);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Função para construir o resultado numerico
function buildNumberResult(min, max, isNotRepeatNumber, uniqueNumbers) {
    const numberContainer = document.createElement("div");
    const resultNumber = document.createElement("span");

    resultNumber.classList.add("result-style");
    numberDrawResults.classList.add("show-totals");
    numberDrawResults.classList.remove("hide-totals");

    let randomNumber;

    if (isNotRepeatNumber) {
        let isDuplicate;
        do {
            randomNumber = getRandomIntInclusive(min, max);
            isDuplicate = uniqueNumbers.includes(randomNumber);
        } while (isDuplicate);
        uniqueNumbers.push(randomNumber);
    } else {
        randomNumber = getRandomIntInclusive(min, max);
    }

    resultNumber.innerText = String(randomNumber);
    numberContainer.appendChild(resultNumber);
    drawNumbersContainer.appendChild(numberContainer);
}
//Função para realizar o sorteio
function drawnNumber() {
    drawNumbersContainer.innerHTML = ""; // limpa resultados anteriores

    const min = Number(minNumber.value);
    const max = Number(maxNumber.value);
    let numbersQuantity = Number(numberTotals.value);
    const isNotRepeatNumber = repeatNumbersCheckbox.checked;

    const range = max - min + 1;

    if (isNotRepeatNumber && numbersQuantity > range) {
        numbersQuantity = range;
    }

    const uniqueNumbers = [];

    for (let i = 0; i < numbersQuantity; i++) {
        setTimeout(() => {
            buildNumberResult(min, max, isNotRepeatNumber, uniqueNumbers);
        }, 500 * i);
    }

    // Mostrar botão "Sortear novamente" após o último sorteio
    setTimeout(() => {
        drawButtonAgain.style.display = "flex";
        drawButtonAgain.style.opacity = 1;
    }, 2500 * numbersQuantity);
}
// Adiciona evento de clique ao botão "Sortear"
drawButton.onclick = (event) => {
    event.preventDefault();
    numberDrawResults.classList.remove("hide-totals");
    numberDrawResults.classList.add("show-totals");
    firstDrawn.classList.add("hide-totals");
    firstDrawn.classList.remove("show-totals");
    drawButton.style.display = "none";

    drawnNumber();
};

drawButtonAgain.onclick = (event) => {
    event.preventDefault();
    drawButtonAgain.style.display = "none";
    drawButtonAgain.style.opacity = 0;
    drawNumbersContainer.innerHTML = "";
    drawnNumber();
};
