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
      this.cronometro.style.display = 'block';
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