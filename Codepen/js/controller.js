
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

      console.log("Without trim"+warName);
      
      console.log("Input "+warName.trim().toUpperCase());
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
          }
          return;
        };
      });
    });
  },
}
