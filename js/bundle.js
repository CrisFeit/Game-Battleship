(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;
var firebaseConfig = {
  apiKey: "AIzaSyAsOckeBlx0P8kg8XRr66XwkIT_T6VHJms",
  authDomain: "battleship-web-2cde3.firebaseapp.com",
  databaseURL: "https://battleship-web-2cde3.firebaseio.com",
  projectId: "battleship-web-2cde3",
  storageBucket: "battleship-web-2cde3.appspot.com",
  messagingSenderId: "22663135008",
  appId: "1:22663135008:web:f6fb7dd2cc5a7aee"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
exports.db = db;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRiLmpzIl0sIm5hbWVzIjpbImZpcmViYXNlQ29uZmlnIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsImRhdGFiYXNlVVJMIiwicHJvamVjdElkIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiYXBwSWQiLCJmaXJlYmFzZSIsImluaXRpYWxpemVBcHAiLCJkYiIsImZpcmVzdG9yZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBSUEsY0FBYyxHQUFHO0FBQ25CQyxFQUFBQSxNQUFNLEVBQUUseUNBRFc7QUFFbkJDLEVBQUFBLFVBQVUsRUFBRSxzQ0FGTztBQUduQkMsRUFBQUEsV0FBVyxFQUFFLDZDQUhNO0FBSW5CQyxFQUFBQSxTQUFTLEVBQUUsc0JBSlE7QUFLbkJDLEVBQUFBLGFBQWEsRUFBRSxrQ0FMSTtBQU1uQkMsRUFBQUEsaUJBQWlCLEVBQUUsYUFOQTtBQU9uQkMsRUFBQUEsS0FBSyxFQUFFO0FBUFksQ0FBckI7QUFTQUMsUUFBUSxDQUFDQyxhQUFULENBQXVCVCxjQUF2QjtBQUVPLElBQU1VLEVBQUUsR0FBR0YsUUFBUSxDQUFDRyxTQUFULEVBQVgiLCJzb3VyY2VzQ29udGVudCI6WyJcclxudmFyIGZpcmViYXNlQ29uZmlnID0ge1xyXG4gIGFwaUtleTogXCJBSXphU3lBc09ja2VCbHgwUDhrZzhYUnI2Nlh3a0lUX1Q2VkhKbXNcIixcclxuICBhdXRoRG9tYWluOiBcImJhdHRsZXNoaXAtd2ViLTJjZGUzLmZpcmViYXNlYXBwLmNvbVwiLFxyXG4gIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vYmF0dGxlc2hpcC13ZWItMmNkZTMuZmlyZWJhc2Vpby5jb21cIixcclxuICBwcm9qZWN0SWQ6IFwiYmF0dGxlc2hpcC13ZWItMmNkZTNcIixcclxuICBzdG9yYWdlQnVja2V0OiBcImJhdHRsZXNoaXAtd2ViLTJjZGUzLmFwcHNwb3QuY29tXCIsXHJcbiAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMjI2NjMxMzUwMDhcIixcclxuICBhcHBJZDogXCIxOjIyNjYzMTM1MDA4OndlYjpmNmZiN2RkMmNjNWE3YWVlXCJcclxufTtcclxuZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XHJcblxyXG5leHBvcnQgY29uc3QgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTsiXX0=
},{}],2:[function(require,module,exports){
"use strict";

var _db = require("./db");

var model = {
  square: document.querySelectorAll('.grid div'),
  ships: [{
    id: "ManoWar",
    cordsY: 0,
    cordsX: 0,
    res: 3
  }, {
    id: "Destroyer",
    cordsY: 0,
    cordsX: 0,
    res: 2
  }, {
    id: "Silence",
    cordsY: 0,
    cordsX: 0,
    res: 2
  }],
  init: false,
  fire: function fire(guess, field) {
    shot();

    function shot() {
      var size = document.getElementById('radar-grid').firstElementChild.offsetWidth / 2.5;
      var grid = radar.getElementsByClassName(guess)[0];
      var gridY = grid.offsetTop + grid.offsetHeight / 2;
      var gridX = grid.offsetLeft + grid.offsetWidth / 2;

      for (var i = 0; i < model.ships.length; i++) {
        model.ships[i].cordsY = view.navios[i].offsetTop + view.navios[i].offsetHeight / 2;
        model.ships[i].cordsX = view.navios[i].offsetLeft + view.navios[i].offsetWidth / 2;

        if (model.ships[i].cordsY - size < gridY && gridY < model.ships[i].cordsY + size && model.ships[i].cordsX - size < gridX && gridX < model.ships[i].cordsX + size) {
          hit(model.ships[i], view.navios[i]);
        }
      }

      miss();
    }

    function hit(ship, navio) {
      if (!field.classList.contains('hit') && !field.classList.contains('miss')) {
        ship.res--;

        if (ship.res === 0) {
          ship.sank = true;
          view.damage(navio, 'sunk');
          view.displayMessage('You sank the battleship ' + ship.id);
        } else {
          view.damage(navio, 'hit');
          view.displayMessage(' The ' + ship.id + ' has been hit !  ');
        }

        view.displayHit(guess);

        if (model.isSunk()) {
          view.displayMessage(' Congratulations! You sank all battleships ');
          setTimeout(function () {
            view.displayEndMessage('Mission Complete');
            view.finish();
            view.end(model.getScore.score());
          }, 3000);
        }

        return true;
      }

      return false;
    }

    ;

    function miss() {
      if (!field.classList.contains('miss') && !field.classList.contains('hit')) {
        view.displayMiss(guess);
        view.displayMessage('You missed.');
      }

      return false;
    }

    ;
  },
  isSunk: function isSunk() {
    for (var i = 0; i < model.ships.length; i++) {
      if (!model.ships[i].sank) {
        return false;
      }
    }

    return true;
  },
  getScore: function () {
    function score() {
      var points = {
        shotsHit: 0,
        shotsMiss: 0,
        shipsSunk: 0,
        time: 0,
        total: 0
      };

      if (!model.init) {
        return false;
      }

      var min = document.getElementById('min').firstChild.data;
      var sec = document.getElementById('sec').firstChild.data;
      points.time = parseFloat(min) * 60 + parseFloat(sec);
      model.square.forEach(function (el) {
        if (el.classList.contains('hit')) {
          points.shotsHit++;
        } else if (el.classList.contains('miss')) {
          points.shotsMiss++;
        }
      });
      model.ships.forEach(function (navio) {
        if (navio.res === 0) {
          points.shipsSunk++;
        }
      });
      points.total = points.time + points.shotsHit * 25 + points.shipsSunk * 70 - points.shotsMiss * 10;
      return points;
    }

    return {
      score: score
    };
  }()
};
var view = {
  navios: document.querySelectorAll('.ships'),
  message: document.getElementById('messageArea'),
  messageEnd: document.getElementById('messageEnd'),
  antena: document.querySelector('.antena'),
  mapa: document.getElementById('radar'),
  cronometro: document.getElementById('countDown'),
  interval: null,
  points: document.querySelectorAll('.point-list-item span'),
  overlay: document.getElementById('overlay'),
  modal: document.getElementById('modal'),
  list: document.getElementsByClassName('point-list-item'),
  rankWrap: document.getElementById('rank-wrap'),
  rankList: document.getElementById('rank-list'),
  start: function start() {
    var _this = this;

    model.init = true;
    this.mapa.classList.add('radar-map');
    controller.btnStart.classList.add('is-active');
    controller.btnStart.disabled = true;
    controller.btnRank.disabled = true;
    controller.input.disabled = false;
    controller.input.focus();
    this.countDown();
    setTimeout(function () {
      _this.antena.classList.remove('hidden');

      controller.btnStop.disabled = false;
    }, 5000);
  },
  stop: function stop() {
    window.location.reload();
  },
  finish: function finish() {
    clearInterval(view.interval);
    view.mapa.querySelector('.antena').style.animationPlayState = 'paused';
    view.cronometro.style.animationPlayState = 'paused';
    controller.btnStart.classList.remove('is-active');
    controller.input.disabled = true;
    controller.btnStop.disabled = true;
    view.navios.forEach(function (el) {
      el.style.animationPlayState = 'paused';
    });
    view.cronometro.classList.remove('is--time-over');
    view.end(model.getScore.score());
  },
  generateShips: function generateShips() {
    var key = random(2);
    view.navios[key[0]].style.animationDirection = 'alternate-reverse';
    var i = 0;
    var place = setInterval(function () {
      view.navios[key[i]].classList.remove('hidden');
      i++;

      if (i === view.navios.length) {
        clearInterval(place);
      }
    }, 7000);

    function random(max) {
      var myList = [];

      for (var i = 0; i <= max; i++) {
        myList.push(i);
      }

      myList.sort(function (a, b) {
        return Math.round(Math.random() * 2) - 1;
      });
      var myNums = myList.splice(0, max + 1);
      return myNums;
    }
  },
  displayMessage: function displayMessage(msg) {
    this.message.textContent = msg;
  },
  displayHit: function displayHit(location) {
    document.getElementById(location).classList.add('hit');
  },
  displayMiss: function displayMiss(location) {
    document.getElementById(location).classList.add('miss');
  },
  displayEndMessage: function displayEndMessage(msg) {
    this.messageEnd.textContent = msg;
  },
  damage: function damage(navio, status) {
    if (status === 'hit') {
      navio.classList.add('hitted');
      setTimeout(function () {
        navio.classList.remove('hitted');
      }, 3000);
    }

    if (status === 'sunk') {
      navio.classList.add('sunk');
    }
  },
  countDown: function countDown() {
    var _this2 = this;

    time();
    setTimeout(function () {
      _this2.cronometro.style.visibility = 'visible';
    }, 60000);
    setTimeout(function () {
      _this2.cronometro.classList.add('is--time-over');
    }, 120000);

    function time() {
      var s = 30;
      var m = 2;
      view.interval = setInterval(function () {
        if (s == 0) {
          m--;
          s = 60;
        }

        if (m < 10) document.getElementById("min").textContent = "0" + m;else document.getElementById("min").textContent = m;
        s--;
        if (s < 10) document.getElementById("sec").textContent = "0" + s;else document.getElementById("sec").textContent = s;

        if (m == 0 && s == 0) {
          view.finish();
          view.displayEndMessage('Mission is Over');
        }
      }, 1000);
    }

    ;
  },
  end: function end(score) {
    view.overlay.classList.add('display');
    view.points.forEach(function (el) {
      for (var prop in score) {
        if (el.getAttribute('id') == prop) {
          el.textContent = score[prop];
        }
      }
    });
    setTimeout(function () {
      view.modal.classList.add('display');
    }, 2000);
    setTimeout(function () {
      var i = 0;
      var scores = setInterval(function () {
        view.list[i].classList.add('display');
        i++;

        if (i === view.list.length) {
          clearInterval(scores);
        }
      }, 2000);
    }, 3000);
    setTimeout(function () {
      controller.btnStop.disabled = false;
      controller.btnStop.style.zIndex = '9';
      controller.btnRank.disabled = false;
      controller.addRank();
    }, 16000);
  },
  rank: function rank() {
    if (view.modal.classList.contains('display')) {
      view.rankWrap.classList.toggle('show-rank');
    } else {
      view.overlay.classList.toggle('display');
      view.rankWrap.classList.toggle('show-rank');
    }
  },
  renderRank: function renderRank() {
    view.rankList.innerHTML = '';

    _db.db.collection('rank').orderBy('score', 'desc').get().then(function (snapshot) {
      snapshot.docs.forEach(function (doc) {
        var li = document.createElement('li');
        var name = document.createElement('strong');
        var score = document.createElement('span');
        li.setAttribute('data-id', doc.id);
        name.textContent = doc.data().name;
        score.textContent = doc.data().score;
        name.appendChild(score);
        li.appendChild(name);
        view.rankList.appendChild(li);
      });
    });
  }
};
var controller = {
  input: document.getElementById('guessInput'),
  fireButton: document.getElementById('fireButton'),
  btnStart: document.getElementById('start'),
  btnStop: document.getElementById('stop'),
  btnRank: document.getElementById('rank'),
  rankTitle: document.getElementById('rank-title'),
  btnSave: document.getElementById('save-score'),
  inputName: document.getElementById('rank-name'),
  form: document.getElementById('rank-form'),
  grid: document.getElementById('grid'),
  keyPress: function keyPress() {
    this.input.addEventListener('input', function (e) {
      return parseGuess(this, '00', e);

      function parseGuess(campo, Mascara, evento) {
        var boleanoMascara;
        var Digitato = evento.keyCode;
        var campCheck;

        if (campo.value.length > 1) {
          campCheck = campo.value.replace(/[^a-g][^0-6]+/g, "").toUpperCase();
          campo.value = campCheck;
          controller.fireReady(campCheck);
        } else {
          campCheck = campo.value.replace(/[^a-g]+/g, "").toUpperCase();
          controller.abort();
          campo.value = campCheck;
        }

        var posicaoCampo = 0;
        var NovoValorCampo = "";
        var TamanhoMascara = campCheck.length;

        if (Digitato != 8) {
          // backspace
          for (var i = 0; i <= TamanhoMascara; i++) {
            boleanoMascara = Mascara.charAt(i) == "-" || Mascara.charAt(i) == "." || Mascara.charAt(i) == "/";
            boleanoMascara = boleanoMascara || Mascara.charAt(i) == "(" || Mascara.charAt(i) == ")" || Mascara.charAt(i) == " ";

            if (boleanoMascara) {
              NovoValorCampo += Mascara.charAt(i);
              TamanhoMascara++;
            } else {
              NovoValorCampo += campCheck.charAt(posicaoCampo);
              posicaoCampo++;
            }
          }

          campo.value = NovoValorCampo;
          return true;
        } else {
          return true;
        }
      }
    });
    this.grid.addEventListener('touchend', function (ev) {
      var touch = ev.target.getAttribute('id');
      model.fire(touch, ev.target);
    });
  },
  fireReady: function fireReady(campCheck) {
    if (campCheck) {
      var field = document.getElementById(campCheck);

      if (!field.classList.contains('hit') && !field.classList.contains('miss')) {
        var shoot = function shoot() {
          var valor = controller.input.value;
          field = document.getElementById(valor);
          model.fire(valor, field);
          controller.abort(_fireEnter);
        };

        var _fireEnter = function _fireEnter(e) {
          if (e.keyCode === 13) {
            fireButton.click();
          }
        };

        fireButton.disabled = false;
        fireButton.classList.add('is--enabled');
        controller.input.addEventListener('keypress', _fireEnter);
        fireButton.onclick = shoot;
        ;
      } else {
        view.displayMessage('Marked Field');
        controller.abort(fireEnter);
      }

      return false;
    }
  },
  abort: function abort(fireEnter) {
    fireButton.disabled = true;
    fireButton.classList.remove('is--enabled');
    controller.input.removeEventListener('keypress', fireEnter);
    controller.input.value = "";
    controller.input.focus();
  },
  addRank: function addRank() {
    controller.form.classList.add('fade-in');
    controller.btnSave.disabled = false;
    controller.inputName.disabled = false;
    controller.inputName.addEventListener('focusin', function () {
      controller.inputName.classList.remove('is-invalid');
    });
    controller.form.addEventListener('submit', function (e) {
      e.preventDefault();
      var currentScore = model.getScore.score().total;
      var warName = controller.inputName.value;

      if (warName.length == 0 || warName.length > 20) {
        controller.inputName.classList.add('is-invalid');
        return;
      }

      if (currentScore > 600 || !model.init) {
        warName = "Invalid Score";
        controller.inputName.classList.add('is-invalid');
        setTimeout(function () {
          view.stop();
        }, 5000);
        return;
      }

      _db.db.collection('rank').get().then(function (snapshot) {
        var doc = snapshot.docs;

        for (var i = 0; i < doc.length; i++) {
          if (doc[i].data().name.toUpperCase() == warName.trim().toUpperCase() && doc[i].data().score >= currentScore) {
            warName = "Can't be done";
            controller.inputName.classList.add('is-invalid');
            return;
          } else if (doc[i].data().name.toUpperCase() == warName.trim().toUpperCase() && doc[i].data().score < currentScore) {
            _db.db.collection('rank').doc(doc[i].id).update({
              score: currentScore
            });

            controller.form.classList.remove('fade-in');
            setTimeout(function () {
              controller.form.remove();
              view.renderRank();
            }, 2000);
            return;
          } else if (i + 1 === doc.length) {
            _db.db.collection('rank').add({
              name: warName,
              score: currentScore
            });

            controller.form.classList.remove('fade-in');
            setTimeout(function () {
              controller.form.remove();
              view.renderRank();
            }, 2000);
            return;
          }
        }

        ;
      });
    });
  }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfMTg5ZGRmNzguanMiXSwibmFtZXMiOlsibW9kZWwiLCJzcXVhcmUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzaGlwcyIsImlkIiwiY29yZHNZIiwiY29yZHNYIiwicmVzIiwiaW5pdCIsImZpcmUiLCJndWVzcyIsImZpZWxkIiwic2hvdCIsInNpemUiLCJnZXRFbGVtZW50QnlJZCIsImZpcnN0RWxlbWVudENoaWxkIiwib2Zmc2V0V2lkdGgiLCJncmlkIiwicmFkYXIiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiZ3JpZFkiLCJvZmZzZXRUb3AiLCJvZmZzZXRIZWlnaHQiLCJncmlkWCIsIm9mZnNldExlZnQiLCJpIiwibGVuZ3RoIiwidmlldyIsIm5hdmlvcyIsImhpdCIsIm1pc3MiLCJzaGlwIiwibmF2aW8iLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInNhbmsiLCJkYW1hZ2UiLCJkaXNwbGF5TWVzc2FnZSIsImRpc3BsYXlIaXQiLCJpc1N1bmsiLCJzZXRUaW1lb3V0IiwiZGlzcGxheUVuZE1lc3NhZ2UiLCJmaW5pc2giLCJlbmQiLCJnZXRTY29yZSIsInNjb3JlIiwiZGlzcGxheU1pc3MiLCJwb2ludHMiLCJzaG90c0hpdCIsInNob3RzTWlzcyIsInNoaXBzU3VuayIsInRpbWUiLCJ0b3RhbCIsIm1pbiIsImZpcnN0Q2hpbGQiLCJkYXRhIiwic2VjIiwicGFyc2VGbG9hdCIsImZvckVhY2giLCJlbCIsIm1lc3NhZ2UiLCJtZXNzYWdlRW5kIiwiYW50ZW5hIiwicXVlcnlTZWxlY3RvciIsIm1hcGEiLCJjcm9ub21ldHJvIiwiaW50ZXJ2YWwiLCJvdmVybGF5IiwibW9kYWwiLCJsaXN0IiwicmFua1dyYXAiLCJyYW5rTGlzdCIsInN0YXJ0IiwiYWRkIiwiY29udHJvbGxlciIsImJ0blN0YXJ0IiwiZGlzYWJsZWQiLCJidG5SYW5rIiwiaW5wdXQiLCJmb2N1cyIsImNvdW50RG93biIsInJlbW92ZSIsImJ0blN0b3AiLCJzdG9wIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJjbGVhckludGVydmFsIiwic3R5bGUiLCJhbmltYXRpb25QbGF5U3RhdGUiLCJnZW5lcmF0ZVNoaXBzIiwia2V5IiwicmFuZG9tIiwiYW5pbWF0aW9uRGlyZWN0aW9uIiwicGxhY2UiLCJzZXRJbnRlcnZhbCIsIm1heCIsIm15TGlzdCIsInB1c2giLCJzb3J0IiwiYSIsImIiLCJNYXRoIiwicm91bmQiLCJteU51bXMiLCJzcGxpY2UiLCJtc2ciLCJ0ZXh0Q29udGVudCIsInN0YXR1cyIsInZpc2liaWxpdHkiLCJzIiwibSIsInByb3AiLCJnZXRBdHRyaWJ1dGUiLCJzY29yZXMiLCJ6SW5kZXgiLCJhZGRSYW5rIiwicmFuayIsInRvZ2dsZSIsInJlbmRlclJhbmsiLCJpbm5lckhUTUwiLCJkYiIsImNvbGxlY3Rpb24iLCJvcmRlckJ5IiwiZ2V0IiwidGhlbiIsInNuYXBzaG90IiwiZG9jcyIsImRvYyIsImxpIiwiY3JlYXRlRWxlbWVudCIsIm5hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImZpcmVCdXR0b24iLCJyYW5rVGl0bGUiLCJidG5TYXZlIiwiaW5wdXROYW1lIiwiZm9ybSIsImtleVByZXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwYXJzZUd1ZXNzIiwiY2FtcG8iLCJNYXNjYXJhIiwiZXZlbnRvIiwiYm9sZWFub01hc2NhcmEiLCJEaWdpdGF0byIsImtleUNvZGUiLCJjYW1wQ2hlY2siLCJ2YWx1ZSIsInJlcGxhY2UiLCJ0b1VwcGVyQ2FzZSIsImZpcmVSZWFkeSIsImFib3J0IiwicG9zaWNhb0NhbXBvIiwiTm92b1ZhbG9yQ2FtcG8iLCJUYW1hbmhvTWFzY2FyYSIsImNoYXJBdCIsImV2IiwidG91Y2giLCJ0YXJnZXQiLCJzaG9vdCIsInZhbG9yIiwiZmlyZUVudGVyIiwiY2xpY2siLCJvbmNsaWNrIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInByZXZlbnREZWZhdWx0IiwiY3VycmVudFNjb3JlIiwid2FyTmFt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LENBQUMySSxnQkFBVCxDQUEwQixrQkFBMUIsRUFBNkMsWUFBVTtBQUNyRGxFLEVBQUFBLFVBQVUsQ0FBQ0MsUUFBWCxDQUFvQjJGLE9BQXBCLEdBQThCOUosSUFBOUI7QUFDQWtFLEVBQUFBLFVBQVUsQ0FBQ0csT0FBWCxDQUFtQnlGLE9BQW5CLEdBQTZCM0ksSUFBSSxDQUFDMEYsSUFBbEM7QUFDQTNDLEVBQUFBLFVBQVUsQ0FBQzZELFNBQVgsQ0FBcUIrQixPQUFyQixHQUErQjNJLElBQUksQ0FBQzBGLElBQXBDO0FBQ0ExRixFQUFBQSxJQUFJLENBQUM0RixVQUFMO0FBQ0QsQ0FMRCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vZGVsID0ge1xyXG5cclxuICBzcXVhcmU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkIGRpdicpLFxyXG4gIFxyXG4gIHNoaXBzOiBbe1xyXG4gICAgaWQ6IFwiTWFub1dhclwiLFxyXG4gICAgY29yZHNZOiAwLFxyXG4gICAgY29yZHNYOiAwLFxyXG4gICAgcmVzOiAzLFxyXG4gIH0sIHtcclxuICAgIGlkOiBcIkRlc3Ryb3llclwiLFxyXG4gICAgY29yZHNZOiAwLFxyXG4gICAgY29yZHNYOiAwLFxyXG4gICAgcmVzOiAyLFxyXG4gIH0sIHtcclxuICAgIGlkOiBcIlNpbGVuY2VcIixcclxuICAgIGNvcmRzWTogMCxcclxuICAgIGNvcmRzWDogMCxcclxuICAgIHJlczogMixcclxuICB9XSxcclxuICBpbml0IDogZmFsc2UsXHJcbiAgXHJcbiAgZmlyZTogZnVuY3Rpb24gKGd1ZXNzLCBmaWVsZCkge1xyXG4gICAgc2hvdCgpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBzaG90KCkge1xyXG4gICAgICBsZXQgc2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYWRhci1ncmlkJykuZmlyc3RFbGVtZW50Q2hpbGQub2Zmc2V0V2lkdGggLzIuNTtcclxuICAgICAgbGV0IGdyaWQgPSByYWRhci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGd1ZXNzKVswXTtcclxuICAgICAgbGV0IGdyaWRZID0gZ3JpZC5vZmZzZXRUb3AgKyBncmlkLm9mZnNldEhlaWdodCAvIDI7XHJcbiAgICAgIGxldCBncmlkWCA9IGdyaWQub2Zmc2V0TGVmdCArIGdyaWQub2Zmc2V0V2lkdGggLyAyO1xyXG4gICAgICBcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RlbC5zaGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG1vZGVsLnNoaXBzW2ldLmNvcmRzWSA9IHZpZXcubmF2aW9zW2ldLm9mZnNldFRvcCArIHZpZXcubmF2aW9zW2ldLm9mZnNldEhlaWdodCAvIDI7XHJcbiAgICAgICAgbW9kZWwuc2hpcHNbaV0uY29yZHNYID0gdmlldy5uYXZpb3NbaV0ub2Zmc2V0TGVmdCArIHZpZXcubmF2aW9zW2ldLm9mZnNldFdpZHRoIC8gMjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoKG1vZGVsLnNoaXBzW2ldLmNvcmRzWSAtIHNpemUpIDwgZ3JpZFkgJiYgZ3JpZFkgPCBtb2RlbC5zaGlwc1tpXS5jb3Jkc1kgKyBzaXplICYmIChtb2RlbC5zaGlwc1tpXS5jb3Jkc1ggLSBzaXplKSA8IGdyaWRYICYmIGdyaWRYIDwgKG1vZGVsLnNoaXBzW2ldLmNvcmRzWCArIHNpemUpKSB7XHJcbiAgICAgICAgICBoaXQobW9kZWwuc2hpcHNbaV0sIHZpZXcubmF2aW9zW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgbWlzcygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBoaXQoc2hpcCwgbmF2aW8pIHtcclxuICAgICAgXHJcbiAgICAgIGlmICghZmllbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSAmJiAhZmllbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaXNzJykpIHtcclxuICAgICAgICBzaGlwLnJlcy0tO1xyXG4gICAgICAgIGlmIChzaGlwLnJlcyA9PT0gMCkge1xyXG4gICAgICAgICAgc2hpcC5zYW5rID0gdHJ1ZTtcclxuICAgICAgICAgIHZpZXcuZGFtYWdlKG5hdmlvLCAnc3VuaycpO1xyXG4gICAgICAgICAgdmlldy5kaXNwbGF5TWVzc2FnZSgnWW91IHNhbmsgdGhlIGJhdHRsZXNoaXAgJyArIHNoaXAuaWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2aWV3LmRhbWFnZShuYXZpbywgJ2hpdCcpO1xyXG4gICAgICAgICAgdmlldy5kaXNwbGF5TWVzc2FnZSgnIFRoZSAnICtzaGlwLmlkKycgaGFzIGJlZW4gaGl0ICEgICcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2aWV3LmRpc3BsYXlIaXQoZ3Vlc3MpO1xyXG4gICAgICAgIGlmIChtb2RlbC5pc1N1bmsoKSkge1xyXG4gICAgICAgICAgdmlldy5kaXNwbGF5TWVzc2FnZSgnIENvbmdyYXR1bGF0aW9ucyEgWW91IHNhbmsgYWxsIGJhdHRsZXNoaXBzICcpO1xyXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZpZXcuZGlzcGxheUVuZE1lc3NhZ2UoJ01pc3Npb24gQ29tcGxldGUnKTtcclxuICAgICAgICAgICAgdmlldy5maW5pc2goKTtcclxuICAgICAgICAgICAgdmlldy5lbmQobW9kZWwuZ2V0U2NvcmUuc2NvcmUoKSk7XHJcbiAgICAgICAgICB9LCAzMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gbWlzcygpIHsgICAgIFxyXG4gICAgICBpZiAoIWZpZWxkLmNsYXNzTGlzdC5jb250YWlucygnbWlzcycpICYmICFmaWVsZC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpKSB7XHJcbiAgICAgICAgdmlldy5kaXNwbGF5TWlzcyhndWVzcyk7XHJcbiAgICAgICAgdmlldy5kaXNwbGF5TWVzc2FnZSgnWW91IG1pc3NlZC4nKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIGlzU3VuazogZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RlbC5zaGlwcy5sZW5ndGg7IGkrKylcclxuICAgICAgaWYgKCFtb2RlbC5zaGlwc1tpXS5zYW5rKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LFxyXG4gIGdldFNjb3JlIDogKGZ1bmN0aW9uKCl7XHJcbiAgICBmdW5jdGlvbiBzY29yZSgpe1xyXG4gICAgICBjb25zdCBwb2ludHMgPSB7XHJcbiAgICAgICAgc2hvdHNIaXQgOiAwLFxyXG4gICAgICAgIHNob3RzTWlzcyA6IDAsXHJcbiAgICAgICAgc2hpcHNTdW5rIDogMCxcclxuICAgICAgICB0aW1lIDogMCxcclxuICAgICAgICB0b3RhbDowLFxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZighbW9kZWwuaW5pdCl7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgbWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbicpLmZpcnN0Q2hpbGQuZGF0YSBcclxuICAgICAgbGV0IHNlYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWMnKS5maXJzdENoaWxkLmRhdGFcclxuICAgICAgcG9pbnRzLnRpbWUgPSAocGFyc2VGbG9hdChtaW4pICo2MCArIHBhcnNlRmxvYXQoc2VjKSkgO1xyXG5cclxuICAgICAgbW9kZWwuc3F1YXJlLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgIGlmKGVsLmNsYXNzTGlzdC5jb250YWlucygnaGl0Jykpe1xyXG4gICAgICAgICAgcG9pbnRzLnNob3RzSGl0KysgO1xyXG4gICAgICAgIH1lbHNlIGlmKGVsLmNsYXNzTGlzdC5jb250YWlucygnbWlzcycpKXtcclxuICAgICAgICAgIHBvaW50cy5zaG90c01pc3MrKyA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgbW9kZWwuc2hpcHMuZm9yRWFjaChuYXZpbyA9PntcclxuICAgICAgICBpZihuYXZpby5yZXMgPT09IDApe1xyXG4gICAgICAgICAgcG9pbnRzLnNoaXBzU3VuaysrO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHBvaW50cy50b3RhbCA9IChwb2ludHMudGltZSArIChwb2ludHMuc2hvdHNIaXQgKiAyNSkgKyhwb2ludHMuc2hpcHNTdW5rKiA3MCkgLSBwb2ludHMuc2hvdHNNaXNzICogMTApO1xyXG4gICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2NvcmU6c2NvcmUsXHJcbiAgICB9XHJcbiAgfSkoKSxcclxufTtcclxuXG5pbXBvcnQgeyBkYiB9IGZyb20gJy4vZGInO1xyXG5cclxuY29uc3QgdmlldyA9IHtcclxuICBuYXZpb3MgOmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwcycpLFxyXG4gIG1lc3NhZ2U6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlQXJlYScpLFxyXG4gIG1lc3NhZ2VFbmQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlRW5kJyksXHJcbiAgYW50ZW5hOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW50ZW5hJyksXHJcbiAgbWFwYTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhZGFyJyksXHJcbiAgY3Jvbm9tZXRybzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50RG93bicpLFxyXG4gIGludGVydmFsOiBudWxsLFxyXG4gIHBvaW50czogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvaW50LWxpc3QtaXRlbSBzcGFuJyksXHJcbiAgb3ZlcmxheTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXknKSxcclxuICBtb2RhbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsJyksXHJcbiAgbGlzdDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9pbnQtbGlzdC1pdGVtJyksXHJcbiAgcmFua1dyYXA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5rLXdyYXAnKSxcclxuICByYW5rTGlzdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhbmstbGlzdCcpLFxyXG4gIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICBtb2RlbC5pbml0ID10cnVlO1xyXG4gICAgdGhpcy5tYXBhLmNsYXNzTGlzdC5hZGQoJ3JhZGFyLW1hcCcpO1xyXG4gICAgY29udHJvbGxlci5idG5TdGFydC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcclxuICAgIGNvbnRyb2xsZXIuYnRuU3RhcnQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgY29udHJvbGxlci5idG5SYW5rLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIGNvbnRyb2xsZXIuaW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIGNvbnRyb2xsZXIuaW5wdXQuZm9jdXMoKTtcclxuICAgIHRoaXMuY291bnREb3duKCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5hbnRlbmEuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcclxuICAgICAgY29udHJvbGxlci5idG5TdG9wLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB9LCA1MDAwKTtcclxuICB9LFxyXG4gIHN0b3A6IGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICB9LFxyXG4gIGZpbmlzaDogKCkgPT4ge1xyXG4gICAgY2xlYXJJbnRlcnZhbCh2aWV3LmludGVydmFsKTtcclxuICAgIHZpZXcubWFwYS5xdWVyeVNlbGVjdG9yKCcuYW50ZW5hJykuc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3BhdXNlZCc7XHJcbiAgICB2aWV3LmNyb25vbWV0cm8uc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3BhdXNlZCc7XHJcbiAgICBjb250cm9sbGVyLmJ0blN0YXJ0LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xyXG4gICAgY29udHJvbGxlci5pbnB1dC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICBjb250cm9sbGVyLmJ0blN0b3AuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgdmlldy5uYXZpb3MuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3BhdXNlZCc7XHJcbiAgICB9KTtcclxuICAgIHZpZXcuY3Jvbm9tZXRyby5jbGFzc0xpc3QucmVtb3ZlKCdpcy0tdGltZS1vdmVyJyk7XHJcbiAgICB2aWV3LmVuZChtb2RlbC5nZXRTY29yZS5zY29yZSgpKTtcclxuICB9LFxyXG4gIGdlbmVyYXRlU2hpcHM6IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBrZXkgPSByYW5kb20oMik7XHJcbiAgICB2aWV3Lm5hdmlvc1trZXlbMF1dLnN0eWxlLmFuaW1hdGlvbkRpcmVjdGlvbiA9ICdhbHRlcm5hdGUtcmV2ZXJzZSc7XHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBsZXQgcGxhY2UgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIHZpZXcubmF2aW9zW2tleVtpXV0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgIGkrKztcclxuICAgICAgaWYgKGkgPT09IHZpZXcubmF2aW9zLmxlbmd0aCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwocGxhY2UpO1xyXG4gICAgICB9XHJcbiAgICB9LCA3MDAwKTtcclxuXHJcbiAgICBmdW5jdGlvbiByYW5kb20obWF4KSB7XHJcbiAgICAgIHZhciBteUxpc3QgPSBbXTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gbWF4OyBpKyspIHtcclxuICAgICAgICBteUxpc3QucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgICBteUxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAyKSAtIDE7XHJcbiAgICAgIH0pO1xyXG4gICAgICB2YXIgbXlOdW1zID0gbXlMaXN0LnNwbGljZSgwLCBtYXggKyAxKTtcclxuICAgICAgcmV0dXJuIG15TnVtcztcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBkaXNwbGF5TWVzc2FnZTogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgdGhpcy5tZXNzYWdlLnRleHRDb250ZW50ID0gbXNnO1xyXG4gIH0sXHJcblxyXG4gIGRpc3BsYXlIaXQ6IGZ1bmN0aW9uIChsb2NhdGlvbikge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobG9jYXRpb24pLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gIH0sXHJcblxyXG4gIGRpc3BsYXlNaXNzOiBmdW5jdGlvbiAobG9jYXRpb24pIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxvY2F0aW9uKS5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XHJcbiAgfSxcclxuICBkaXNwbGF5RW5kTWVzc2FnZTogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgdGhpcy5tZXNzYWdlRW5kLnRleHRDb250ZW50ID0gbXNnO1xyXG4gIH0sXHJcbiAgZGFtYWdlOiBmdW5jdGlvbiAobmF2aW8sIHN0YXR1cykge1xyXG4gICAgaWYgKHN0YXR1cyA9PT0gJ2hpdCcpIHtcclxuICAgICAgbmF2aW8uY2xhc3NMaXN0LmFkZCgnaGl0dGVkJyk7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG5hdmlvLmNsYXNzTGlzdC5yZW1vdmUoJ2hpdHRlZCcpO1xyXG4gICAgICB9LCAzMDAwKTtcclxuICAgIH1cclxuICAgIGlmIChzdGF0dXMgPT09ICdzdW5rJykge1xyXG4gICAgICBuYXZpby5jbGFzc0xpc3QuYWRkKCdzdW5rJyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjb3VudERvd246IGZ1bmN0aW9uICgpIHtcclxuICAgIHRpbWUoKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5jcm9ub21ldHJvLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbiAgICB9LCA2MDAwMCk7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY3Jvbm9tZXRyby5jbGFzc0xpc3QuYWRkKCdpcy0tdGltZS1vdmVyJylcclxuICAgIH0sIDEyMDAwMCk7XHJcblxyXG4gICAgZnVuY3Rpb24gdGltZSgpIHtcclxuICAgICAgbGV0IHMgPSAzMDtcclxuICAgICAgbGV0IG0gPSAyO1xyXG5cclxuICAgICAgdmlldy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICBpZiAocyA9PSAwKSB7XHJcbiAgICAgICAgICBtLS07XHJcbiAgICAgICAgICBzID0gNjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtIDwgMTApIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluXCIpLnRleHRDb250ZW50ID0gXCIwXCIgKyBtO1xyXG4gICAgICAgIGVsc2UgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5cIikudGV4dENvbnRlbnQgPSBtO1xyXG4gICAgICAgIHMtLTtcclxuICAgICAgICBpZiAocyA8IDEwKSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlY1wiKS50ZXh0Q29udGVudCA9IFwiMFwiICsgcztcclxuICAgICAgICBlbHNlIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VjXCIpLnRleHRDb250ZW50ID0gcztcclxuXHJcbiAgICAgICAgaWYgKG0gPT0gMCAmJiBzID09IDApIHtcclxuICAgICAgICAgIHZpZXcuZmluaXNoKCk7XHJcbiAgICAgICAgICB2aWV3LmRpc3BsYXlFbmRNZXNzYWdlKCdNaXNzaW9uIGlzIE92ZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfTtcclxuICB9LFxyXG4gIGVuZDogZnVuY3Rpb24gKHNjb3JlKSB7XHJcbiAgICB2aWV3Lm92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnZGlzcGxheScpO1xyXG4gICAgdmlldy5wb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZm9yIChsZXQgcHJvcCBpbiBzY29yZSkge1xyXG4gICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2lkJykgPT0gcHJvcCkge1xyXG4gICAgICAgICAgZWwudGV4dENvbnRlbnQgPSBzY29yZVtwcm9wXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdmlldy5tb2RhbC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Jyk7XHJcbiAgICB9LCAyMDAwKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICBsZXQgc2NvcmVzID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIHZpZXcubGlzdFtpXS5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Jyk7XHJcbiAgICAgICAgaSsrO1xyXG4gICAgICAgIGlmIChpID09PSB2aWV3Lmxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICBjbGVhckludGVydmFsKHNjb3Jlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAyMDAwKTtcclxuICAgIH0sIDMwMDApO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGNvbnRyb2xsZXIuYnRuU3RvcC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICBjb250cm9sbGVyLmJ0blN0b3Auc3R5bGUuekluZGV4ID0gJzknO1xyXG4gICAgICBjb250cm9sbGVyLmJ0blJhbmsuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgY29udHJvbGxlci5hZGRSYW5rKCk7XHJcbiAgICB9LCAxNjAwMCk7XHJcbiAgfSxcclxuICByYW5rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodmlldy5tb2RhbC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc3BsYXknKSkge1xyXG4gICAgICB2aWV3LnJhbmtXcmFwLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctcmFuaycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmlldy5vdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoJ2Rpc3BsYXknKTtcclxuICAgICAgdmlldy5yYW5rV3JhcC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LXJhbmsnKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHJlbmRlclJhbms6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZpZXcucmFua0xpc3QuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBkYi5jb2xsZWN0aW9uKCdyYW5rJykub3JkZXJCeSgnc2NvcmUnLCdkZXNjJykuZ2V0KCkudGhlbihzbmFwc2hvdCA9PntcclxuICAgICAgc25hcHNob3QuZG9jcy5mb3JFYWNoKGRvYyA9PiB7XHJcbiAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBsZXQgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0cm9uZycpO1xyXG4gICAgICAgIGxldCBzY29yZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBcclxuICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBkb2MuaWQpO1xyXG4gICAgICAgIG5hbWUudGV4dENvbnRlbnQgPSBkb2MuZGF0YSgpLm5hbWU7XHJcbiAgICAgICAgc2NvcmUudGV4dENvbnRlbnQgPSBkb2MuZGF0YSgpLnNjb3JlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG5hbWUuYXBwZW5kQ2hpbGQoc2NvcmUpO1xyXG4gICAgICAgIGxpLmFwcGVuZENoaWxkKG5hbWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZpZXcucmFua0xpc3QuYXBwZW5kQ2hpbGQobGkpOyBcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG59O1xuXHJcbmNvbnN0IGNvbnRyb2xsZXIgPSB7XHJcbiAgaW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdndWVzc0lucHV0JyksXHJcbiAgZmlyZUJ1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpcmVCdXR0b24nKSxcclxuICBidG5TdGFydDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0JyksXHJcbiAgYnRuU3RvcDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3AnKSxcclxuICBidG5SYW5rOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFuaycpLFxyXG4gIHJhbmtUaXRsZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhbmstdGl0bGUnKSxcclxuICBidG5TYXZlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZS1zY29yZScpLFxyXG4gIGlucHV0TmFtZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhbmstbmFtZScpLFxyXG4gIGZvcm06IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5rLWZvcm0nKSxcclxuICBncmlkOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZCcpLFxyXG5cclxuICBrZXlQcmVzczogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICByZXR1cm4gcGFyc2VHdWVzcyh0aGlzLCAnMDAnLCBlKTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHBhcnNlR3Vlc3MoY2FtcG8sIE1hc2NhcmEsIGV2ZW50bykge1xyXG4gICAgICAgIGxldCBib2xlYW5vTWFzY2FyYTtcclxuXHJcbiAgICAgICAgbGV0IERpZ2l0YXRvID0gZXZlbnRvLmtleUNvZGU7XHJcbiAgICAgICAgbGV0IGNhbXBDaGVjaztcclxuICAgICAgICBpZiAoY2FtcG8udmFsdWUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgY2FtcENoZWNrID0gY2FtcG8udmFsdWUucmVwbGFjZSgvW15hLWddW14wLTZdKy9nLCBcIlwiKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgY2FtcG8udmFsdWUgPSBjYW1wQ2hlY2s7XHJcbiAgICAgICAgICBjb250cm9sbGVyLmZpcmVSZWFkeShjYW1wQ2hlY2spO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjYW1wQ2hlY2sgPSBjYW1wby52YWx1ZS5yZXBsYWNlKC9bXmEtZ10rL2csIFwiXCIpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICBjb250cm9sbGVyLmFib3J0KCk7XHJcbiAgICAgICAgICBjYW1wby52YWx1ZSA9IGNhbXBDaGVjaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwb3NpY2FvQ2FtcG8gPSAwO1xyXG4gICAgICAgIGxldCBOb3ZvVmFsb3JDYW1wbyA9IFwiXCI7XHJcbiAgICAgICAgbGV0IFRhbWFuaG9NYXNjYXJhID0gY2FtcENoZWNrLmxlbmd0aDtcclxuXHJcbiAgICAgICAgaWYgKERpZ2l0YXRvICE9IDgpIHsgLy8gYmFja3NwYWNlXHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBUYW1hbmhvTWFzY2FyYTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGJvbGVhbm9NYXNjYXJhID0gKChNYXNjYXJhLmNoYXJBdChpKSA9PSBcIi1cIikgfHwgKE1hc2NhcmEuY2hhckF0KGkpID09IFwiLlwiKSB8fFxyXG4gICAgICAgICAgICAgIChNYXNjYXJhLmNoYXJBdChpKSA9PSBcIi9cIikpXHJcbiAgICAgICAgICAgIGJvbGVhbm9NYXNjYXJhID0gYm9sZWFub01hc2NhcmEgfHwgKChNYXNjYXJhLmNoYXJBdChpKSA9PSBcIihcIikgfHxcclxuICAgICAgICAgICAgICAoTWFzY2FyYS5jaGFyQXQoaSkgPT0gXCIpXCIpIHx8IChNYXNjYXJhLmNoYXJBdChpKSA9PSBcIiBcIikpXHJcbiAgICAgICAgICAgIGlmIChib2xlYW5vTWFzY2FyYSkge1xyXG4gICAgICAgICAgICAgIE5vdm9WYWxvckNhbXBvICs9IE1hc2NhcmEuY2hhckF0KGkpO1xyXG4gICAgICAgICAgICAgIFRhbWFuaG9NYXNjYXJhKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgTm92b1ZhbG9yQ2FtcG8gKz0gY2FtcENoZWNrLmNoYXJBdChwb3NpY2FvQ2FtcG8pO1xyXG4gICAgICAgICAgICAgIHBvc2ljYW9DYW1wbysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjYW1wby52YWx1ZSA9IE5vdm9WYWxvckNhbXBvO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIHRoaXMuZ3JpZC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsZnVuY3Rpb24oZXYpe1xyXG4gICAgICBsZXQgdG91Y2ggPSBldi50YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpO1xyXG4gICAgICBcclxuICAgICAgbW9kZWwuZmlyZSh0b3VjaCwgZXYudGFyZ2V0KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGZpcmVSZWFkeTogZnVuY3Rpb24gKGNhbXBDaGVjaykge1xyXG4gICAgaWYgKGNhbXBDaGVjaykge1xyXG4gICAgICBsZXQgZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW1wQ2hlY2spO1xyXG5cclxuICAgICAgaWYgKCFmaWVsZC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpICYmICFmaWVsZC5jbGFzc0xpc3QuY29udGFpbnMoJ21pc3MnKSkge1xyXG4gICAgICAgIGZpcmVCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBmaXJlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2lzLS1lbmFibGVkJyk7XHJcbiAgICAgICAgY29udHJvbGxlci5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGZpcmVFbnRlcik7XHJcbiAgICAgICAgZmlyZUJ1dHRvbi5vbmNsaWNrID0gc2hvb3Q7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob290KCkge1xyXG4gICAgICAgICAgbGV0IHZhbG9yID0gY29udHJvbGxlci5pbnB1dC52YWx1ZTtcclxuICAgICAgICAgIGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmFsb3IpO1xyXG4gICAgICAgICAgbW9kZWwuZmlyZSh2YWxvciwgZmllbGQpO1xyXG4gICAgICAgICAgY29udHJvbGxlci5hYm9ydChmaXJlRW50ZXIpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZpcmVFbnRlcihlKSB7XHJcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgICAgICBmaXJlQnV0dG9uLmNsaWNrKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZpZXcuZGlzcGxheU1lc3NhZ2UoJ01hcmtlZCBGaWVsZCcpO1xyXG4gICAgICAgIGNvbnRyb2xsZXIuYWJvcnQoZmlyZUVudGVyKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYWJvcnQ6IGZ1bmN0aW9uIChmaXJlRW50ZXIpIHtcclxuICAgIGZpcmVCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgZmlyZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdpcy0tZW5hYmxlZCcpO1xyXG4gICAgY29udHJvbGxlci5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGZpcmVFbnRlcik7XHJcbiAgICBjb250cm9sbGVyLmlucHV0LnZhbHVlID0gXCJcIjtcclxuICAgIGNvbnRyb2xsZXIuaW5wdXQuZm9jdXMoKTtcclxuICB9LFxyXG5cclxuICBhZGRSYW5rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb250cm9sbGVyLmZvcm0uY2xhc3NMaXN0LmFkZCgnZmFkZS1pbicpO1xyXG4gICAgY29udHJvbGxlci5idG5TYXZlLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICBjb250cm9sbGVyLmlucHV0TmFtZS5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnRyb2xsZXIuaW5wdXROYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCAoKSA9PiB7XHJcbiAgICAgIGNvbnRyb2xsZXIuaW5wdXROYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWludmFsaWQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnRyb2xsZXIuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGxldCBjdXJyZW50U2NvcmUgPSBtb2RlbC5nZXRTY29yZS5zY29yZSgpLnRvdGFsO1xyXG4gICAgICBsZXQgd2FyTmFtZSA9IGNvbnRyb2xsZXIuaW5wdXROYW1lLnZhbHVlO1xyXG5cclxuICAgICAgaWYgKHdhck5hbWUubGVuZ3RoID09IDAgfHwgd2FyTmFtZS5sZW5ndGggPiAyMCkge1xyXG4gICAgICAgIGNvbnRyb2xsZXIuaW5wdXROYW1lLmNsYXNzTGlzdC5hZGQoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGN1cnJlbnRTY29yZSA+IDYwMCB8fCAhbW9kZWwuaW5pdCkge1xyXG4gICAgICAgIHdhck5hbWUgPSBcIkludmFsaWQgU2NvcmVcIlxyXG4gICAgICAgIGNvbnRyb2xsZXIuaW5wdXROYW1lLmNsYXNzTGlzdC5hZGQoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHZpZXcuc3RvcCgpO1xyXG4gICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZGIuY29sbGVjdGlvbigncmFuaycpLmdldCgpLnRoZW4oc25hcHNob3QgPT4ge1xyXG4gICAgICAgIGxldCBkb2MgPSBzbmFwc2hvdC5kb2NzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9jLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoZG9jW2ldLmRhdGEoKS5uYW1lLnRvVXBwZXJDYXNlKCkgPT0gd2FyTmFtZS50cmltKCkudG9VcHBlckNhc2UoKSAmJiBkb2NbaV0uZGF0YSgpLnNjb3JlID49IGN1cnJlbnRTY29yZSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgd2FyTmFtZSA9IFwiQ2FuJ3QgYmUgZG9uZVwiO1xyXG4gICAgICAgICAgICBjb250cm9sbGVyLmlucHV0TmFtZS5jbGFzc0xpc3QuYWRkKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGRvY1tpXS5kYXRhKCkubmFtZS50b1VwcGVyQ2FzZSgpID09IHdhck5hbWUudHJpbSgpLnRvVXBwZXJDYXNlKCkgJiYgZG9jW2ldLmRhdGEoKS5zY29yZSA8IGN1cnJlbnRTY29yZSkge1xyXG4gICAgICAgICAgICBkYi5jb2xsZWN0aW9uKCdyYW5rJykuZG9jKGRvY1tpXS5pZCkudXBkYXRlKHtcclxuICAgICAgICAgICAgICBzY29yZTogY3VycmVudFNjb3JlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb250cm9sbGVyLmZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnZmFkZS1pbicpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICBjb250cm9sbGVyLmZvcm0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgdmlldy5yZW5kZXJSYW5rKCk7XHJcbiAgICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gZG9jLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBkYi5jb2xsZWN0aW9uKCdyYW5rJykuYWRkKHtcclxuICAgICAgICAgICAgICBuYW1lOiB3YXJOYW1lLFxyXG4gICAgICAgICAgICAgIHNjb3JlOiBjdXJyZW50U2NvcmVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdmYWRlLWluJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIuZm9ybS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICB2aWV3LnJlbmRlclJhbmsoKTtcclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbn1cbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgdmlldy5zdGFydCgpO1xyXG4gIHZpZXcuZ2VuZXJhdGVTaGlwcygpO1xyXG4gIGNvbnRyb2xsZXIua2V5UHJlc3MoKTtcclxuICBjb250cm9sbGVyLmJ0blN0b3Aub25jbGljayA9IHZpZXcuc3RvcDtcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsZnVuY3Rpb24oKXtcclxuICBjb250cm9sbGVyLmJ0blN0YXJ0Lm9uY2xpY2sgPSBpbml0O1xyXG4gIGNvbnRyb2xsZXIuYnRuUmFuay5vbmNsaWNrID0gdmlldy5yYW5rO1xyXG4gIGNvbnRyb2xsZXIucmFua1RpdGxlLm9uY2xpY2sgPSB2aWV3LnJhbms7XHJcbiAgdmlldy5yZW5kZXJSYW5rKCk7XHJcbn0pO1xyXG4iXX0=
},{"./db":1}]},{},[2])