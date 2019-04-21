"use strict"
var navio = document.querySelector('.ships');

const model = {
  numShips: 3,
  shipsSunk: 0,
  ships: [{
      location: 'A6',
      hits: ''
    },
    {
      location: 'C4',
      hits: ''
    },
    {
      location: 'B0',
      hits: ''
    }
  ],

  fire: function (guess) {
    // for (let ship of this.ships) {
    //   if (guess == ship.location) {
    //     ship.hits = 'hit';
    //     view.displayHit(guess);
    //     view.displayMessage('HIT!');
    //     if (this.isSunk(ship)) {
    //       view.displayMessage('You sank a Battleship!')
    //       this.shipsSunk++;
    //     }
    //     console.log(this.shipsSunk);
    //     return true;
    //   }
    // }
      
    view.displayMiss(guess);
    view.displayMessage('You missed.');
    return false;
  },

  isSunk: function (ship) {
    if (ship.hits != 'hit') {
      return false;
    }
    return true;
  },

};

const view = {

  displayMessage: function (msg) {
    document.getElementById('messageArea').textContent = msg;
  },

  displayHit: function (location) {
    document.getElementById(location).classList.add('hit');
  },

  displayMiss: function (location) {
    if (location) {
      document.getElementById(location).classList.add('miss');
    }
  },

};

const controller = {
  shots: 0,
  input: document.getElementById('guessInput'),
  fireButton: document.getElementById('fireButton'),
  
  keyPress: function () {
    this.input.addEventListener('input', function (e) {

      return parseGuess(this, '00', e);

      function parseGuess(campo, Mascara, evento) {
        let boleanoMascara;

        let Digitato = evento.keyCode;
        let campCheck;
        if (campo.value.length > 1) {
          campCheck = campo.value.replace(/[^a-g][^0-6]+/g, "").toUpperCase();
          controller.fireReady(campCheck);
          campo.value = campCheck;
        } else {
          campCheck = campo.value.replace(/[^a-g]+/g, "").toUpperCase();
          controller.abort();
          campo.value = campCheck;
        }

        let posicaoCampo = 0;
        let NovoValorCampo = "";
        let TamanhoMascara = campCheck.length;

        if (Digitato != 8) { // backspace
          for (let i = 0; i <= TamanhoMascara; i++) {
            boleanoMascara = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".") ||
              (Mascara.charAt(i) == "/"))
            boleanoMascara = boleanoMascara || ((Mascara.charAt(i) == "(") ||
              (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "))
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
    })
  },
  fireReady: function (campCheck) {
    if (campCheck) {
    let field = document.getElementById(controller.input.value);
    
      controller.input.addEventListener('keypress', fireEnter);

      fireButton.addEventListener('click', function () {
          console.log("Field Top: " + field.offsetTop + " Field Left: " + field.offsetLeft)
          console.log("Navio Top: " + navio.offsetTop + " Navio Left: " + navio.offsetLeft);
  
        model.fire(controller.input.value);
        controller.input.value = ""
        controller.abort(fireEnter);
        controller.input.focus();
      
      });
      fireButton.disabled = false;
      fireButton.classList.add('is--enabled');

      function fireEnter(e) {
        if (e.keyCode === 13) {
          fireButton.click();
        }
      }
    }
  },
  abort: function (fireEnter) {
    fireButton.disabled = true;
    fireButton.classList.remove('is--enabled');
    controller.input.removeEventListener('keypress', fireEnter);
  },
}



// init - called when the page has completed loading

window.onload = init;

function init() {
  controller.keyPress();
	// place the ships on the game board
  // model.generateShipLocations();
  
}