const DATA = {
  whichSite: ["landing", "multiPage", "onlineStore"],
  price: [4000, 8000, 26000],
  desktopTemplates: [50, 40, 30],
  adapt: 20,
  mobileTemplates: 15,
  editable: 10,
  metrikaYandex: [500, 1000, 2000],
  analyticsGoogle: [800, 1350, 3000],
  sendOrder: 500,
  deadlineDay: [
    [2, 7],
    [3, 10],
    [7, 14]
  ],
  deadlinePercent: [20, 17, 15]
};

const startButton = document.querySelector(".start-button"),
  firstScreen = document.querySelector(".first-screen"),
  mainForm = document.querySelector(".main-form"),
  formCalculate = document.querySelector(".form-calculate"),
  endButton = document.querySelector(".end-button"),
  blockTotal = document.querySelector(".total"),
  fastRange = document.querySelector(".fast-range"),
  totalPriceSum = document.querySelector(".total_price__sum"),
  adapt = document.getElementById("adapt"),
  mobileTemplates = document.getElementById("mobileTemplates");

const showElem = elem => {
  elem.style.display = "block";
};

const hideElem = elem => {
  elem.style.display = "none";
};

const priceCalculation = elem => {
  let result = 0,
    index = 0,
    options = [];

  if (elem.name === "whichSite") {
    for (const item of formCalculate.elements) {
      if (item.type === "checkbox") {
        item.checked = false;
      }
    }
    hideElem(fastRange);
  }

  for (const item of formCalculate.elements) {
    if (item.name === "whichSite" && item.checked) {
      index = DATA.whichSite.indexOf(item.value);
    } else if (item.classList.contains("calc-handler") && item.checked) {
      options.push(item.value);
    }
  }

  options.forEach(key => {
    if (typeof DATA[key] === "number") {
      if (key === "sendOrder") {
        result += DATA[key];
      } else {
        result += (DATA.price[index] * DATA[key]) / 100;
      }
    } else {
      if (key === "desktopTemplates") {
        result += (DATA.price[index] * DATA.desktopTemplates[index]) / 100;
      } else {
        result += DATA[key][index];
      }
    }
  });

  result += DATA.price[index];

  totalPriceSum.textContent = result;
};

const handlerCallbackForm = event => {
  const target = event.target;

  if (adapt.checked) {
    mobileTemplates.disabled = false;
  } else {
    mobileTemplates.disabled = true;
    mobileTemplates.checked = false;
  }

  if (target.classList.contains("want-faster")) {
    target.checked ? showElem(fastRange) : hideElem(fastRange);
  }

  if (target.classList.contains("calc-handler")) {
    priceCalculation(target);
  }
};

startButton.addEventListener("click", () => {
  showElem(mainForm);
  hideElem(firstScreen);
});

endButton.addEventListener("click", () => {
  for (const elem of formCalculate.elements) {
    if (elem.tagName === "FIELDSET") {
      hideElem(elem);
    }
  }

  showElem(blockTotal);
});

formCalculate.addEventListener("change", handlerCallbackForm);
