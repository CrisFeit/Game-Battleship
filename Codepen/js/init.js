(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function init() {
  view.start();
  view.generateShips();
  controller.keyPress();
  controller.btnStop.onclick = view.stop;
}

document.addEventListener('DOMContentLoaded', function () {
  controller.btnStart.onclick = init;
  controller.btnRank.onclick = view.rank;
  controller.rankTitle.onclick = view.rank;
  view.renderRank();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfOTE0OWJkMTEuanMiXSwibmFtZXMiOlsiaW5pdCIsInZpZXciLCJzdGFydCIsImdlbmVyYXRlU2hpcHMiLCJjb250cm9sbGVyIiwia2V5UHJlc3MiLCJidG5TdG9wIiwib25jbGljayIsInN0b3AiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJidG5TdGFydCIsImJ0blJhbmsiLCJyYW5rIiwicmFua1RpdGxlIiwicmVuZGVyUmFuayJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUFTQSxJQUFULEdBQWdCO0FBQ2RDLEVBQUFBLElBQUksQ0FBQ0MsS0FBTDtBQUNBRCxFQUFBQSxJQUFJLENBQUNFLGFBQUw7QUFDQUMsRUFBQUEsVUFBVSxDQUFDQyxRQUFYO0FBQ0FELEVBQUFBLFVBQVUsQ0FBQ0UsT0FBWCxDQUFtQkMsT0FBbkIsR0FBNkJOLElBQUksQ0FBQ08sSUFBbEM7QUFDRDs7QUFFREMsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBNkMsWUFBVTtBQUNyRE4sRUFBQUEsVUFBVSxDQUFDTyxRQUFYLENBQW9CSixPQUFwQixHQUE4QlAsSUFBOUI7QUFDQUksRUFBQUEsVUFBVSxDQUFDUSxPQUFYLENBQW1CTCxPQUFuQixHQUE2Qk4sSUFBSSxDQUFDWSxJQUFsQztBQUNBVCxFQUFBQSxVQUFVLENBQUNVLFNBQVgsQ0FBcUJQLE9BQXJCLEdBQStCTixJQUFJLENBQUNZLElBQXBDO0FBQ0FaLEVBQUFBLElBQUksQ0FBQ2MsVUFBTDtBQUNELENBTEQiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBpbml0KCkge1xyXG4gIHZpZXcuc3RhcnQoKTtcclxuICB2aWV3LmdlbmVyYXRlU2hpcHMoKTtcclxuICBjb250cm9sbGVyLmtleVByZXNzKCk7XHJcbiAgY29udHJvbGxlci5idG5TdG9wLm9uY2xpY2sgPSB2aWV3LnN0b3A7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLGZ1bmN0aW9uKCl7XHJcbiAgY29udHJvbGxlci5idG5TdGFydC5vbmNsaWNrID0gaW5pdDtcclxuICBjb250cm9sbGVyLmJ0blJhbmsub25jbGljayA9IHZpZXcucmFuaztcclxuICBjb250cm9sbGVyLnJhbmtUaXRsZS5vbmNsaWNrID0gdmlldy5yYW5rO1xyXG4gIHZpZXcucmVuZGVyUmFuaygpO1xyXG59KTtcclxuIl19
},{}]},{},[1])