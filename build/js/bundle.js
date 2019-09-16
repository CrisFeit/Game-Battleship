const model = {

  square: document.querySelectorAll('.grid div'),
  
  ships: [{
    id: "ManoWar",
    cordsY: 0,
    cordsX: 0,
    res: 3,
  }, {
    id: "Destroyer",
    cordsY: 0,
    cordsX: 0,
    res: 2,
  }, {
    id: "Silence",
    cordsY: 0,
    cordsX: 0,
    res: 2,
  }],
  init : false,
  
  fire: function (guess, field) {
    shot();
    
    function shot() {
      let size = document.getElementById('radar-grid').firstElementChild.offsetWidth /2.5;
      let grid = radar.getElementsByClassName(guess)[0];
      let gridY = grid.offsetTop + grid.offsetHeight / 2;
      let gridX = grid.offsetLeft + grid.offsetWidth / 2;
      
      for (let i = 0; i < model.ships.length; i++) {
        model.ships[i].cordsY = view.navios[i].offsetTop + view.navios[i].offsetHeight / 2;
        model.ships[i].cordsX = view.navios[i].offsetLeft + view.navios[i].offsetWidth / 2;
        
        if ((model.ships[i].cordsY - size) < gridY && gridY < model.ships[i].cordsY + size && (model.ships[i].cordsX - size) < gridX && gridX < (model.ships[i].cordsX + size)) {
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
          view.displayMessage(' The ' +ship.id+' has been hit !  ');
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
    };
    
    function miss() {     
      if (!field.classList.contains('miss') && !field.classList.contains('hit')) {
        view.displayMiss(guess);
        view.displayMessage('You missed.');
      }
      return false;
    };
  },

  isSunk: function () {
    for (let i = 0; i < model.ships.length; i++)
      if (!model.ships[i].sank) {
        return false;
      }
    return true;
  },
  getScore : (function(){
    function score(){
      const points = {
        shotsHit : 0,
        shotsMiss : 0,
        shipsSunk : 0,
        time : 0,
        total:0,
      }

      if(!model.init){
        return false;
      }

      let min = document.getElementById('min').firstChild.data 
      let sec = document.getElementById('sec').firstChild.data
      points.time = (parseFloat(min) *60 + parseFloat(sec)) ;

      model.square.forEach(el => {
        if(el.classList.contains('hit')){
          points.shotsHit++ ;
        }else if(el.classList.contains('miss')){
          points.shotsMiss++ ;
        }
      });
      model.ships.forEach(navio =>{
        if(navio.res === 0){
          points.shipsSunk++;
        }
      });
      points.total = (points.time + (points.shotsHit * 25) +(points.shipsSunk* 70) - points.shotsMiss * 10);
      return points;
    }
    return {
      score:score,
    }
  })(),
};


const view = {
  navios :document.querySelectorAll('.ships'),
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
  start: function () {
    model.init =true;
    this.mapa.classList.add('radar-map');
    controller.btnStart.classList.add('is-active');
    controller.btnStart.disabled = true;
    controller.btnRank.disabled = true;
    controller.input.disabled = false;
    controller.input.focus();
    this.countDown();
    setTimeout(() => {
      this.antena.classList.remove('hidden')
      controller.btnStop.disabled = false;
    }, 5000);
  },
  stop: function () {
    window.location.reload();
  },
  finish: () => {
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
  generateShips: function () {
    let key = random(2);
    view.navios[key[0]].style.animationDirection = 'alternate-reverse';
    let i = 0;
    let place = setInterval(() => {
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

  displayMessage: function (msg) {
    this.message.textContent = msg;
  },

  displayHit: function (location) {
    document.getElementById(location).classList.add('hit');
  },

  displayMiss: function (location) {
    document.getElementById(location).classList.add('miss');
  },
  displayEndMessage: function (msg) {
    this.messageEnd.textContent = msg;
  },
  damage: function (navio, status) {
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
  countDown: function () {
    time();

    setTimeout(() => {
      this.cronometro.style.visibility = 'visible';
    }, 60000);

    setTimeout(() => {
      this.cronometro.classList.add('is--time-over')
    }, 120000);

    function time() {
      let s = 30;
      let m = 2;

      view.interval = setInterval(() => {
        if (s == 0) {
          m--;
          s = 60;
        }
        if (m < 10) document.getElementById("min").textContent = "0" + m;
        else document.getElementById("min").textContent = m;
        s--;
        if (s < 10) document.getElementById("sec").textContent = "0" + s;
        else document.getElementById("sec").textContent = s;

        if (m == 0 && s == 0) {
          view.finish();
          view.displayEndMessage('Mission is Over');
        }
      }, 1000);
    };
  },
  end: function (score) {
    view.overlay.classList.add('display');
    view.points.forEach(function (el) {
      for (let prop in score) {
        if (el.getAttribute('id') == prop) {
          el.textContent = score[prop];
        }
      }
    })
    setTimeout(() => {
      view.modal.classList.add('display');
    }, 2000);

    setTimeout(() => {
      let i = 0;
      let scores = setInterval(() => {
        view.list[i].classList.add('display');
        i++;
        if (i === view.list.length) {
          clearInterval(scores);
        }
      }, 2000);
    }, 3000);
    setTimeout(() => {
      controller.btnStop.disabled = false;
      controller.btnStop.style.zIndex = '9';
      controller.btnRank.disabled = false;
      controller.addRank();
    }, 16000);
  },
  rank: function () {
    if (view.modal.classList.contains('display')) {
      view.rankWrap.classList.toggle('show-rank');
    } else {
      view.overlay.classList.toggle('display');
      view.rankWrap.classList.toggle('show-rank');
    }
  },
  renderRank: function () {
    view.rankList.innerHTML = '';
    db.collection('rank').orderBy('score','desc').get().then(snapshot =>{
      snapshot.docs.forEach(doc => {
        let li = document.createElement('li');
        let name = document.createElement('strong');
        let score = document.createElement('span');
        
        li.setAttribute('data-id', doc.id);
        name.textContent = doc.data().name;
        score.textContent = doc.data().score;
        
        name.appendChild(score);
        li.appendChild(name);
        
        view.rankList.appendChild(li); 
      });
    });
  },
};

const controller = {
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

  keyPress: function () {
    this.input.addEventListener('input', function (e) {

      return parseGuess(this, '00', e);

      function parseGuess(campo, Mascara, evento) {
        let boleanoMascara;

        let Digitato = evento.keyCode;
        let campCheck;
        if (campo.value.length > 1) {
          campCheck = campo.value.replace(/[^a-g][^0-6]+/g, "").toUpperCase();
          campo.value = campCheck;
          controller.fireReady(campCheck);
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
    this.grid.addEventListener('touchend',function(ev){
      let touch = ev.target.getAttribute('id');
      
      model.fire(touch, ev.target);
    });
  },

  fireReady: function (campCheck) {
    if (campCheck) {
      let field = document.getElementById(campCheck);

      if (!field.classList.contains('hit') && !field.classList.contains('miss')) {
        fireButton.disabled = false;
        fireButton.classList.add('is--enabled');
        controller.input.addEventListener('keypress', fireEnter);
        fireButton.onclick = shoot;

        function shoot() {
          let valor = controller.input.value;
          field = document.getElementById(valor);
          model.fire(valor, field);
          controller.abort(fireEnter);
        };

        function fireEnter(e) {
          if (e.keyCode === 13) {
            fireButton.click();
          }
        }
      } else {
        view.displayMessage('Marked Field');
        controller.abort(fireEnter);
      }
      return false;
    }
  },

  abort: function (fireEnter) {
    fireButton.disabled = true;
    fireButton.classList.remove('is--enabled');
    controller.input.removeEventListener('keypress', fireEnter);
    controller.input.value = "";
    controller.input.focus();
  },

  addRank: function () {
    controller.form.classList.add('fade-in');
    controller.btnSave.disabled = false;
    controller.inputName.disabled = false;

    controller.inputName.addEventListener('focusin', () => {
      controller.inputName.classList.remove('is-invalid');
    });

    controller.form.addEventListener('submit', (e) => {
      e.preventDefault();
      let currentScore = model.getScore.score().total;
      let warName = controller.inputName.value;

      if (warName.length == 0 || warName.length > 20) {
        controller.inputName.classList.add('is-invalid');
        return;
      }
      if (currentScore > 600 || !model.init) {
        warName = "Invalid Score"
        controller.inputName.classList.add('is-invalid');
        setTimeout(() => {
          view.stop();
        }, 5000);
        return;
      }

      db.collection('rank').get().then(snapshot => {
        let doc = snapshot.docs;
        for (let i = 0; i < doc.length; i++) {
          if (doc[i].data().name.toUpperCase() == warName.trim().toUpperCase() && doc[i].data().score >= currentScore) {
            
            warName = "Can't be done";
            controller.inputName.classList.add('is-invalid');
            return;

          } else if (doc[i].data().name.toUpperCase() == warName.trim().toUpperCase() && doc[i].data().score < currentScore) {
            db.collection('rank').doc(doc[i].id).update({
              score: currentScore
            });
            controller.form.classList.remove('fade-in');
            setTimeout(() => {
              controller.form.remove();
              view.renderRank();
            }, 2000);
            return;

          } else if (i + 1 === doc.length) {
            db.collection('rank').add({
              name: warName,
              score: currentScore
            });
            controller.form.classList.remove('fade-in');
            setTimeout(() => {
              controller.form.remove();
              view.renderRank();
            }, 2000);
            return;
          }
        };
      });
    });
  },
}
function init() {
  view.start();
  view.generateShips();
  controller.keyPress();
  controller.btnStop.onclick = view.stop;
}

document.addEventListener('DOMContentLoaded',function(){
  controller.btnStart.onclick = init;
  controller.btnRank.onclick = view.rank;
  controller.rankTitle.onclick = view.rank;
  view.renderRank();
});
