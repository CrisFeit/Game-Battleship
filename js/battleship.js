"use strict"
const navios = document.querySelectorAll('.ships');
const radar = document.getElementById('radar-grid');

function init() {
  controller.keyPress();
	// place the ships on the game board
  view.generateShips();
}
window.onload = init;
