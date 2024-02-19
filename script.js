// Selected all id in HTML
const main = document.getElementById("main-container");
const input = document.getElementById("myInput");
const copyBtn = document.getElementById("copyBtn");
const changeBtn = document.getElementById("changeBtn");
const input2 = document.getElementById("myInput2");
const copyBtn2 = document.getElementById("copyBtn2");

// Window onload function
window.onload = function () {
  mainFun();
};

// mainFun function
function mainFun() {
  // Change backgroundColor
  changeBtn.addEventListener("click", function () {
    const myColor = decimalColorFun();
    const bgColor = generatedHexColor(myColor);
    const rgbColor = generatedRgbColor(myColor);
    main.style.backgroundColor = bgColor;
    input.value = bgColor.substring(1);
    input2.value = rgbColor;
  });
  //   copyBtn
  copyBtn.addEventListener("click", function () {
    navigator.clipboard.writeText(`#${input.value}`);
    if (isInvalid(input.value)) {
      toastMsgFun(`#${input.value} copied!`);
    } else {
      alert("Input is not Valid!");
    }
  });
  //   copyBtn2
  copyBtn2.addEventListener("click", function () {
    navigator.clipboard.writeText(`#${input2.value}`);
    toastMsgFun(`#${input2.value} copied!`);
  });
  input.addEventListener("keyup", function (e) {
    const color = e.target.value;
    if (color) {
      input.value = color.toUpperCase();
      if (isInvalid(color)) {
        main.style.backgroundColor = `#${color}`;
        input2.value = hexToRgb(color);
      }
    }
  });
}
// generatedHexColor function
function generatedHexColor({ red, green, blue }) {
  function myFunction(value) {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }
  return `#${myFunction(red)}${myFunction(green)}${myFunction(
    blue
  )}`.toUpperCase();
}
// return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
// }

// generatedRgbColor function
function generatedRgbColor({ red, green, blue }) {
  return `rbg(${red}, ${green}, ${blue})`;
}

// isInvalid function
function isInvalid(color) {
  if (color.length !== 6) return false;
  return /^[0-9a-fA-F]{6}$/i.test(color);
}

// Convert hex to rgb
function hexToRgb(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);
  return `rgb(${red}, ${green}, ${blue})`;
}

// toastMsgFun function
function toastMsgFun(msg) {
  let div = document.createElement("div");
  div.innerHTML = msg;
  div.className = "css-Toast-msg toast-message-slide-in";
  div.addEventListener("click", function () {
    div.classList.remove("toast-message-slide-in");
    div.classList.add("toast-message-slide-out");
    div.addEventListener("animationend", function () {
      div.remove();
    });
  });
  document.body.appendChild(div);
}

// generatedDecimalColor function
function decimalColorFun() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return {
    red: red,
    green: green,
    blue: blue,
  };
}
