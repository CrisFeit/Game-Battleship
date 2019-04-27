"use strict"
var navios = document.querySelectorAll('.ships');
var radar = document.getElementById('#radar');
const model = {
  shots: 0,
  shipsSunk: 0,
  
  ships : [{
    id: "ManoWar",
    cordsY: 0,
    cordsX: 0,
    sank:false,
  },{
    id: "Destroyer",
    cordsY: 0,
    cordsX: 0,
    sank:false,
  }],
  

  fire: function (guess,field) {
    
    for(let i =0 ;i< model.ships.length; i++){
      model.ships[i].cordsY = navios[i].offsetTop;
      model.ships[i].cordsX = navios[i].offsetLeft;
      
      if((model.ships[i].cordsY- 30 ) < field.offsetTop && field.offsetTop < model.ships[i].cordsY + 30 && (model.ships[i].cordsX - 30 ) < field.offsetLeft && field.offsetLeft < (model.ships[i].cordsX + 30)){
          hit(model.ships[i]);
          return false;
        }
    }

      miss();

    function hit(ship){
      
      if (!field.classList.contains('hit')) {
              ship.sank = true;
              view.displayHit(guess);
              view.displayMessage('HIT!');
              view.displayMessage('You sank the battleship '+ship.id)
              model.shipsSunk++;
                  // if (model.isSunk()) {
                  //     view.displayMessage(' Congratuations! You sank all battleships ')     
                  // }
                  return true;
          }
          return false;
    };

    function miss(){
      if (!field.classList.contains('miss')) {
          model.shots++;
          view.displayMiss(guess);
          view.displayMessage('You missed.');
    }
    return false;
  };
},

  isSunk: function () {
    for(let i = 0; i < model.ships.length; i++)
    if ( model.ships[i].sunk == false) {
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
      document.getElementById(location).classList.add('miss');
    
  },
  // generateShips : function(){
  //   navios.forEach(function(el){
  //       setTimeout(function(){
  //         el.classList.remove('hidden');
  //       },100000)
  //   })
  // },

  // sunkingShip : function(sunked){

  // }
};

const controller = {
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
      let field = document.getElementById(campCheck);
      
      if(!field.classList.contains('hit') && !field.classList.contains('miss')){
        controller.input.addEventListener('keypress', fireEnter);

      fireButton.addEventListener('click', function () {  
      
        model.fire(campCheck,field);  
        controller.abort(fireEnter);
        
      });
      fireButton.disabled = false;
      fireButton.classList.add('is--enabled');

      function fireEnter(e) {
        if (e.keyCode === 13) {
          fireButton.click();
        }
      }
    }else{
      controller.abort(fireEnter);
    }
  }
  },
  abort: function (fireEnter) {
    fireButton.disabled = true;
    fireButton.classList.remove('is--enabled');
    controller.input.removeEventListener('keypress', fireEnter);
    controller.input.value = "";
    controller.input.focus();
  },
}

window.onload = init;

function init() {
  controller.keyPress();
	// place the ships on the game board
  // view.generateShips();  
}
