"use strict"
const navios = document.querySelectorAll('.ships');

function init() {
  view.start();
  view.generateShips();
  controller.keyPress();
  controller.btnStop.onclick = view.stop;
}

document.addEventListener('DOMContentLoaded',function(){
  controller.btnStart.onclick = init;
  controller.btnRank.onclick = view.rank;
  view.renderRank();
});
