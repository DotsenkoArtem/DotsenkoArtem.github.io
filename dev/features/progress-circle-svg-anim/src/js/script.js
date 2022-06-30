"use strict";
// ! НЕ РАБОТАЕТ АНИМАЦИЯ stroke-dashoffset В Internet Explorer
startProgress();

function startProgress() {
  const DURATION = 5000;
  const FREQUENCY = 10;
  let percent = 0;
  let animProgress = 0;
  // При анимации через js
  const DASHOFFSET = 440;

  // Если анимирую #progress через CSS
  progress.style.animationDuration = `${DURATION}ms`;

  // При анимации через js - можно использовать
  // progress.style.transition = `${FREQUENCY}ms`;

  setTimeout(function numAnimate() {
    if (animProgress < DURATION) {
      animProgress += FREQUENCY;
      percent = (animProgress / DURATION) * 100;
      number.innerHTML = `${Math.ceil(percent)}%`;

      // При анимации через js
      progress.style.strokeDashoffset =
        DASHOFFSET - (percent * DASHOFFSET) / 100;

      setTimeout(numAnimate, FREQUENCY);
    }
  }, FREQUENCY);
}
// ====================================================

// ЗАПИСЬ ЧЕРЕЗ ОБЪЕКТ ПРОБОВАЛ - УСПЕШНО
/* let progr = {
  DURATION: 5000,
  FREQUENCY: 50,
  START: Date.now(),

  start() {
    let percent = 0;
    progress.style.animationDuration = `${this.DURATION}ms`;

    const DURATION = this.DURATION;
    const FREQUENCY = this.FREQUENCY;
    const START = this.START;
    setTimeout(function numAnimate() {
      let now = Date.now();
      if (START + DURATION >= now) {
        percent = ((now - START) / DURATION) * 100;
        number.innerHTML = `${Math.ceil(percent, 2)}%`;
      }
      setTimeout(numAnimate, FREQUENCY);
    }, FREQUENCY);
  },
};
progr.start(); */
