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
  },

  fireReady: function (campCheck) {
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
    }
    return false;
  },

  abort: function (fireEnter) {
    fireButton.disabled = true;
    fireButton.classList.remove('is--enabled');
    controller.input.removeEventListener('keypress', fireEnter);
    controller.input.value = "";
    controller.input.focus();
  },

}