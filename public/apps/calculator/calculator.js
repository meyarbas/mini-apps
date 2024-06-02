const result = document.querySelector(".result");
const clear = document.querySelector(".clear");
const equal = document.querySelector(".equal");
const optButtons = document.querySelectorAll(".optButton");
const numButtons = document.querySelectorAll('.numButton');

let decimalAdded = false;

clear.addEventListener('click', () => {
  result.value = "0";
  decimalAdded = false;
});

equal.addEventListener('click', () => {
  try {
    result.value = eval(result.value);
  } catch (e) {
    result.value = "Error";
  }
  decimalAdded = false;
});

const handleButtonPress = (button) => {
  const lastChar = result.value[result.value.length - 1];
  if (!isNaN(parseFloat(lastChar)) || lastChar === undefined) {
    result.value += button.textContent;
    decimalAdded = false;
  } else {
    result.value = result.value.slice(0, -1) + button.textContent;
  }
};

optButtons.forEach((button) => {
  button.addEventListener('click', () => handleButtonPress(button));
});

numButtons.forEach((button) => {
  button.addEventListener('click', () => {
    result.value = result.value === "0"? "" : result.value;
    if (button.textContent === ".") {
      if (!decimalAdded) {
        result.value += button.textContent;
        decimalAdded = true;
      }
    } else {
      result.value += button.textContent;
    }
  });
});