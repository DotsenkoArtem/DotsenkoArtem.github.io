/* 
- в данном скрипте применяю цикл for(...), хотя удобнее было бы с .forEach(), по той причине, что не нашел как реализовать его поддержку в IE

-
*/
"use strict";

initSelect();

function initSelect() {
  const selectArr = document.querySelectorAll(".select");
  const wrapper = document.querySelector("#wrapper");

  if (selectArr) {
    for (let i = 0; i < selectArr.length; i++) {
      const select = selectArr[i],
        defaultOptions = select.querySelectorAll(".select__option"),
        optionsData = completeOptionsData(defaultOptions);

      select.addEventListener("click", (event) => {
        event.stopPropagation();
        if (!select.classList.contains("open")) {
          openSelect(select);
          optionsHandler(select, optionsData);
        } else {
          closeSelect(select);
        }
      });
    }

    wrapper.addEventListener("click", function () {
      for (let i = 0; i < selectArr.length; i++) {
        const select = selectArr[i];
        closeSelect(select);
      }
    });
  } else {
    console.log(`Ошибка! Переменная ${selectArr} не определена.`);
  }
}
// = = = = = = = = = = = = = = = = = = = = = = = = = =

// Functions
// Заполнение данных значений пунктов .option
function completeOptionsData(options) {
  const arr = [];
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    arr.push(option.innerHTML);
  }
  return ([] = arr);
}

// Обработка списка пунктов .option
function optionsHandler(select, optionsData) {
  const options = select.querySelectorAll(".select__option");

  for (let j = 0; j < options.length; j++) {
    const option = options[j];
    option.addEventListener("click", () =>
      selectOption(select, option, optionsData)
    );
  }
}

/*
  - выбор пункта из списка, 
  - перерисовка списка из изначально полученных данных optionsData с целью упорядоченного его отображения
*/

function selectOption(select, option, optionsData) {
  const optionsBox = select.querySelector(".select__option-box > ul");
  const optionSelected = select.querySelector(".select__option_selected");

  optionSelected.innerHTML = option.innerHTML;
  optionsBox.innerHTML = "";

  for (let i = 0; i < optionsData.length; i++) {
    const data = optionsData[i];

    if (data !== optionSelected.innerHTML)
      optionsBox.innerHTML += `<li class="select__option">${data}</li>`;
  }
}

// Открытие списка .option
function openSelect(select) {
  select.classList.add("open");
}

// Закрытие списка .option
function closeSelect(select) {
  select.classList.remove("open");
}
