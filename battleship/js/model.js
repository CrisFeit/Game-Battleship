(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

var _model = _interopRequireDefault(require("./model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {
  input: document.getElementById('guessInput'),
  fireButton: document.getElementById('fireButton'),
  btnStart: document.getElementById('start'),
  btnStop: document.getElementById('stop'),
  btnRank: document.getElementById('rank'),
  btnSave: document.getElementById('save-score'),
  inputName: document.getElementById('rank-name'),
  form: document.getElementById('rank-form'),
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
  },
  fireReady: function fireReady(campCheck) {
    if (campCheck) {
      var field = document.getElementById(campCheck);

      if (!field.classList.contains('hit') && !field.classList.contains('miss')) {
        var shoot = function shoot() {
          var valor = controller.input.value;
          field = document.getElementById(valor);

          _model.default.fire(valor, field);

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
        _view.default.displayMessage('Marked Field');

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

      var currentScore = _model.default.getScore.score().total;

      var warName = controller.inputName.value;
      console.log("Without trim" + warName);
      console.log("Input " + warName.trim().toUpperCase());

      if (warName.length == 0 || warName.length > 20) {
        controller.inputName.classList.add('is-invalid');
        return;
      }

      if (currentScore > 800 || !_model.default.init) {
        warName = "Invalid Score";
        controller.inputName.classList.add('is-invalid');
        setTimeout(function () {
          _view.default.stop();
        }, 5000);
        return;
      }

      db.collection('rank').get().then(function (snapshot) {
        var doc = snapshot.docs;

        for (var i = 0; i < doc.length; i++) {
          if (doc[i].data().name.toUpperCase() == warName.trim().toUpperCase() && doc[i].data().score >= currentScore) {
            console.log('data Name :' + doc[i].data().name.toUpperCase());
            warName = "Can't be done";
            controller.inputName.classList.add('is-invalid');
            return;
          } else if (doc[i].data().name.toUpperCase() == warName.trim().toUpperCase() && doc[i].data().score < currentScore) {
            db.collection('rank').doc(doc[i].data().id).update({
              score: currentScore
            });
            controller.form.classList.remove('fade-in');
            setTimeout(function () {
              controller.form.remove();

              _view.default.renderRank();
            }, 2000);
            return;
          } else if (i + 1 === doc.length) {
            db.collection('rank').add({
              name: warName,
              score: currentScore
            });
            controller.form.classList.remove('fade-in');
            setTimeout(function () {
              controller.form.remove();

              _view.default.renderRank();
            }, 2000);
          }
        }

        ;
      });
    });
  }
};
var _default = controller;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiY29udHJvbGxlciIsImlucHV0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImZpcmVCdXR0b24iLCJidG5TdGFydCIsImJ0blN0b3AiLCJidG5SYW5rIiwiYnRuU2F2ZSIsImlucHV0TmFtZSIsImZvcm0iLCJrZXlQcmVzcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicGFyc2VHdWVzcyIsImNhbXBvIiwiTWFzY2FyYSIsImV2ZW50byIsImJvbGVhbm9NYXNjYXJhIiwiRGlnaXRhdG8iLCJrZXlDb2RlIiwiY2FtcENoZWNrIiwidmFsdWUiLCJsZW5ndGgiLCJyZXBsYWNlIiwidG9VcHBlckNhc2UiLCJmaXJlUmVhZHkiLCJhYm9ydCIsInBvc2ljYW9DYW1wbyIsIk5vdm9WYWxvckNhbXBvIiwiVGFtYW5ob01hc2NhcmEiLCJpIiwiY2hhckF0IiwiZmllbGQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInNob290IiwidmFsb3IiLCJtb2RlbCIsImZpcmUiLCJmaXJlRW50ZXIiLCJjbGljayIsImRpc2FibGVkIiwiYWRkIiwib25jbGljayIsInZpZXciLCJkaXNwbGF5TWVzc2FnZSIsInJlbW92ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJmb2N1cyIsImFkZFJhbmsiLCJwcmV2ZW50RGVmYXVsdCIsImN1cnJlbnRTY29yZSIsImdldFNjb3JlIiwic2NvcmUiLCJ0b3RhbCIsIndhck5hbWUiLCJjb25zb2xlIiwibG9nIiwidHJpbSIsImluaXQiLCJzZXRUaW1lb3V0Iiwic3RvcCIsImRiIiwiY29sbGVjdGlvbiIsImdldCIsInRoZW4iLCJzbmFwc2hvdCIsImRvYyIsImRvY3MiLCJkYXRhIiwibmFtZSIsImlkIiwidXBkYXRlIiwicmVuZGVyUmFuayJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsSUFBTUEsVUFBVSxHQUFHO0FBQ2pCQyxFQUFBQSxLQUFLLEVBQUVDLFFBQVEs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QUEwQmEsTUFBMUIsQ0FBaUMsU0FBakM7QUFDQWMsWUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDZjdELGNBQUFBLFVBQVUsQ0FBQ1UsSUFBWCxDQUFnQnFDLE1BQWhCOztBQUNBRiw0QkFBSzZCLFVBQUw7QUFDRCxhQUhTLEVBR1AsSUFITyxDQUFWO0FBSUE7QUFFRCxXQVhNLE1BV0EsSUFBSTNDLENBQUMsR0FBRyxDQUFKLEtBQVVxQyxHQUFHLENBQUM3QyxNQUFsQixFQUEwQjtBQUMvQndDLFlBQUFBLEVBQUUsQ0FBQ0MsVUFBSCxDQUFjLE1BQWQsRUFBc0JyQixHQUF0QixDQUEwQjtBQUN4QjRCLGNBQUFBLElBQUksRUFBRWYsT0FEa0I7QUFFeEJGLGNBQUFBLEtBQUssRUFBRUY7QUFGaUIsYUFBMUI7QUFJQXBELFlBQUFBLFVBQVUsQ0FBQ1UsSUFBWCxDQUFnQndCLFNBQWhCLENBQTBCYSxNQUExQixDQUFpQyxTQUFqQztBQUNBYyxZQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmN0QsY0FBQUEsVUFBVSxDQUFDVSxJQUFYLENBQWdCcUMsTUFBaEI7O0FBQ0FGLDRCQUFLNkIsVUFBTDtBQUNELGFBSFMsRUFHUCxJQUhPLENBQVY7QUFJRDtBQUNGOztBQUFBO0FBQ0YsT0FoQ0Q7QUFpQ0QsS0F0REQ7QUF1REQ7QUEvSmdCLENBQW5CO2VBa0tlMUUsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB2aWV3IGZyb20gJy4vdmlldy5qcyc7XHJcbmltcG9ydCBtb2RlbCBmcm9tICcuL21vZGVsJztcclxuXHJcbmNvbnN0IGNvbnRyb2xsZXIgPSB7XHJcbiAgaW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdndWVzc0lucHV0JyksXHJcbiAgZmlyZUJ1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpcmVCdXR0b24nKSxcclxuICBidG5TdGFydDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0JyksXHJcbiAgYnRuU3RvcDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3AnKSxcclxuICBidG5SYW5rOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFuaycpLFxyXG4gIGJ0blNhdmU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXZlLXNjb3JlJyksXHJcbiAgaW5wdXROYW1lOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFuay1uYW1lJyksXHJcbiAgZm9ybTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhbmstZm9ybScpLFxyXG5cclxuICBrZXlQcmVzczogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICByZXR1cm4gcGFyc2VHdWVzcyh0aGlzLCAnMDAnLCBlKTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHBhcnNlR3Vlc3MoY2FtcG8sIE1hc2NhcmEsIGV2ZW50bykge1xyXG4gICAgICAgIGxldCBib2xlYW5vTWFzY2FyYTtcclxuXHJcbiAgICAgICAgbGV0IERpZ2l0YXRvID0gZXZlbnRvLmtleUNvZGU7XHJcbiAgICAgICAgbGV0IGNhbXBDaGVjaztcclxuICAgICAgICBpZiAoY2FtcG8udmFsdWUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgY2FtcENoZWNrID0gY2FtcG8udmFsdWUucmVwbGFjZSgvW15hLWddW14wLTZdKy9nLCBcIlwiKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgY2FtcG8udmFsdWUgPSBjYW1wQ2hlY2s7XHJcbiAgICAgICAgICBjb250cm9sbGVyLmZpcmVSZWFkeShjYW1wQ2hlY2spO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjYW1wQ2hlY2sgPSBjYW1wby52YWx1ZS5yZXBsYWNlKC9bXmEtZ10rL2csIFwiXCIpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICBjb250cm9sbGVyLmFib3J0KCk7XHJcbiAgICAgICAgICBjYW1wby52YWx1ZSA9IGNhbXBDaGVjaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwb3NpY2FvQ2FtcG8gPSAwO1xyXG4gICAgICAgIGxldCBOb3ZvVmFsb3JDYW1wbyA9IFwiXCI7XHJcbiAgICAgICAgbGV0IFRhbWFuaG9NYXNjYXJhID0gY2FtcENoZWNrLmxlbmd0aDtcclxuXHJcbiAgICAgICAgaWYgKERpZ2l0YXRvICE9IDgpIHsgLy8gYmFja3NwYWNlXHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBUYW1hbmhvTWFzY2FyYTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGJvbGVhbm9NYXNjYXJhID0gKChNYXNjYXJhLmNoYXJBdChpKSA9PSBcIi1cIikgfHwgKE1hc2NhcmEuY2hhckF0KGkpID09IFwiLlwiKSB8fFxyXG4gICAgICAgICAgICAgIChNYXNjYXJhLmNoYXJBdChpKSA9PSBcIi9cIikpXHJcbiAgICAgICAgICAgIGJvbGVhbm9NYXNjYXJhID0gYm9sZWFub01hc2NhcmEgfHwgKChNYXNjYXJhLmNoYXJBdChpKSA9PSBcIihcIikgfHxcclxuICAgICAgICAgICAgICAoTWFzY2FyYS5jaGFyQXQoaSkgPT0gXCIpXCIpIHx8IChNYXNjYXJhLmNoYXJBdChpKSA9PSBcIiBcIikpXHJcbiAgICAgICAgICAgIGlmIChib2xlYW5vTWFzY2FyYSkge1xyXG4gICAgICAgICAgICAgIE5vdm9WYWxvckNhbXBvICs9IE1hc2NhcmEuY2hhckF0KGkpO1xyXG4gICAgICAgICAgICAgIFRhbWFuaG9NYXNjYXJhKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgTm92b1ZhbG9yQ2FtcG8gKz0gY2FtcENoZWNrLmNoYXJBdChwb3NpY2FvQ2FtcG8pO1xyXG4gICAgICAgICAgICAgIHBvc2ljYW9DYW1wbysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjYW1wby52YWx1ZSA9IE5vdm9WYWxvckNhbXBvO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBmaXJlUmVhZHk6IGZ1bmN0aW9uIChjYW1wQ2hlY2spIHtcclxuICAgIGlmIChjYW1wQ2hlY2spIHtcclxuICAgICAgbGV0IGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FtcENoZWNrKTtcclxuXHJcbiAgICAgIGlmICghZmllbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSAmJiAhZmllbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaXNzJykpIHtcclxuICAgICAgICBmaXJlQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZmlyZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdpcy0tZW5hYmxlZCcpO1xyXG4gICAgICAgIGNvbnRyb2xsZXIuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmaXJlRW50ZXIpO1xyXG4gICAgICAgIGZpcmVCdXR0b24ub25jbGljayA9IHNob290O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG9vdCgpIHtcclxuICAgICAgICAgIGxldCB2YWxvciA9IGNvbnRyb2xsZXIuaW5wdXQudmFsdWU7XHJcbiAgICAgICAgICBmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZhbG9yKTtcclxuICAgICAgICAgIG1vZGVsLmZpcmUodmFsb3IsIGZpZWxkKTtcclxuICAgICAgICAgIGNvbnRyb2xsZXIuYWJvcnQoZmlyZUVudGVyKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBmaXJlRW50ZXIoZSkge1xyXG4gICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgZmlyZUJ1dHRvbi5jbGljaygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2aWV3LmRpc3BsYXlNZXNzYWdlKCdNYXJrZWQgRmllbGQnKTtcclxuICAgICAgICBjb250cm9sbGVyLmFib3J0KGZpcmVFbnRlcik7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFib3J0OiBmdW5jdGlvbiAoZmlyZUVudGVyKSB7XHJcbiAgICBmaXJlQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIGZpcmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaXMtLWVuYWJsZWQnKTtcclxuICAgIGNvbnRyb2xsZXIuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmaXJlRW50ZXIpO1xyXG4gICAgY29udHJvbGxlci5pbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgICBjb250cm9sbGVyLmlucHV0LmZvY3VzKCk7XHJcbiAgfSxcclxuXHJcbiAgYWRkUmFuazogZnVuY3Rpb24gKCkge1xyXG4gICAgY29udHJvbGxlci5mb3JtLmNsYXNzTGlzdC5hZGQoJ2ZhZGUtaW4nKTtcclxuICAgIGNvbnRyb2xsZXIuYnRuU2F2ZS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgY29udHJvbGxlci5pbnB1dE5hbWUuZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb250cm9sbGVyLmlucHV0TmFtZS5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgKCkgPT4ge1xyXG4gICAgICBjb250cm9sbGVyLmlucHV0TmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1pbnZhbGlkJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb250cm9sbGVyLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBsZXQgY3VycmVudFNjb3JlID0gbW9kZWwuZ2V0U2NvcmUuc2NvcmUoKS50b3RhbDtcclxuICAgICAgbGV0IHdhck5hbWUgPSBjb250cm9sbGVyLmlucHV0TmFtZS52YWx1ZTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiV2l0aG91dCB0cmltXCIrd2FyTmFtZSk7XHJcbiAgICAgIFxyXG4gICAgICBjb25zb2xlLmxvZyhcIklucHV0IFwiK3dhck5hbWUudHJpbSgpLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgICBpZiAod2FyTmFtZS5sZW5ndGggPT0gMCB8fCB3YXJOYW1lLmxlbmd0aCA+IDIwKSB7XHJcbiAgICAgICAgY29udHJvbGxlci5pbnB1dE5hbWUuY2xhc3NMaXN0LmFkZCgnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY3VycmVudFNjb3JlID4gODAwIHx8ICFtb2RlbC5pbml0KSB7XHJcbiAgICAgICAgd2FyTmFtZSA9IFwiSW52YWxpZCBTY29yZVwiXHJcbiAgICAgICAgY29udHJvbGxlci5pbnB1dE5hbWUuY2xhc3NMaXN0LmFkZCgnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdmlldy5zdG9wKCk7XHJcbiAgICAgICAgfSwgNTAwMCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkYi5jb2xsZWN0aW9uKCdyYW5rJykuZ2V0KCkudGhlbihzbmFwc2hvdCA9PiB7XHJcbiAgICAgICAgbGV0IGRvYyA9IHNuYXBzaG90LmRvY3M7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb2MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChkb2NbaV0uZGF0YSgpLm5hbWUudG9VcHBlckNhc2UoKSA9PSB3YXJOYW1lLnRyaW0oKS50b1VwcGVyQ2FzZSgpICYmIGRvY1tpXS5kYXRhKCkuc2NvcmUgPj0gY3VycmVudFNjb3JlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhIE5hbWUgOicrZG9jW2ldLmRhdGEoKS5uYW1lLnRvVXBwZXJDYXNlKCkpXHJcbiAgICAgICAgICAgIHdhck5hbWUgPSBcIkNhbid0IGJlIGRvbmVcIjtcclxuICAgICAgICAgICAgY29udHJvbGxlci5pbnB1dE5hbWUuY2xhc3NMaXN0LmFkZCgnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgfSBlbHNlIGlmIChkb2NbaV0uZGF0YSgpLm5hbWUudG9VcHBlckNhc2UoKSA9PSB3YXJOYW1lLnRyaW0oKS50b1VwcGVyQ2FzZSgpICYmIGRvY1tpXS5kYXRhKCkuc2NvcmUgPCBjdXJyZW50U2NvcmUpIHtcclxuICAgICAgICAgICAgZGIuY29sbGVjdGlvbigncmFuaycpLmRvYyhkb2NbaV0uZGF0YSgpLmlkKS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgIHNjb3JlOiBjdXJyZW50U2NvcmVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdmYWRlLWluJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIuZm9ybS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICB2aWV3LnJlbmRlclJhbmsoKTtcclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBkb2MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGRiLmNvbGxlY3Rpb24oJ3JhbmsnKS5hZGQoe1xyXG4gICAgICAgICAgICAgIG5hbWU6IHdhck5hbWUsXHJcbiAgICAgICAgICAgICAgc2NvcmU6IGN1cnJlbnRTY29yZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29udHJvbGxlci5mb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhZGUtaW4nKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29udHJvbGxlci5mb3JtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgIHZpZXcucmVuZGVyUmFuaygpO1xyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRyb2xsZXIiXX0=
},{"./model":3,"./view.js":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var grid = radar.getElementsByClassName(guess)[0];
      var gridY = grid.offsetTop + grid.offsetHeight / 2;
      var gridX = grid.offsetLeft + grid.offsetWidth / 2;

      for (var i = 0; i < model.ships.length; i++) {
        model.ships[i].cordsY = _view.default.navios[i].offsetTop + _view.default.navios[i].offsetHeight / 2;
        model.ships[i].cordsX = _view.default.navios[i].offsetLeft + _view.default.navios[i].offsetWidth / 2;

        if (model.ships[i].cordsY - 20 < gridY && gridY < model.ships[i].cordsY + 20 && model.ships[i].cordsX - 20 < gridX && gridX < model.ships[i].cordsX + 20) {
          hit(model.ships[i], _view.default.navios[i]);
        }
      }

      miss();
    }

    function hit(ship, navio) {
      if (!field.classList.contains('hit') && !field.classList.contains('miss')) {
        ship.res--;

        if (ship.res === 0) {
          ship.sank = true;

          _view.default.damage(navio, 'sunk');

          _view.default.displayMessage('You sank the battleship ' + ship.id);
        } else {
          _view.default.damage(navio, 'hit');

          _view.default.displayMessage(' The ' + ship.id + ' has been hit !  ');
        }

        _view.default.displayHit(guess);

        if (model.isSunk()) {
          _view.default.displayMessage(' Congratulations! You sank all battleships ');

          setTimeout(function () {
            _view.default.displayEndMessage('Mission Complete');

            _view.default.finish();

            _view.default.end(model.getScore.score());
          }, 3000);
        }

        return true;
      }

      return false;
    }

    ;

    function miss() {
      if (!field.classList.contains('miss') && !field.classList.contains('hit')) {
        _view.default.displayMiss(guess);

        _view.default.displayMessage('You missed.');
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
var _default = model;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfZWMyZmZmYTUuanMiXSwibmFtZXMiOlsibW9kZWwiLCJzcXVhcmUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzaGlwcyIsImlkIiwiY29yZHNZIiwiY29yZHNYIiwicmVzIiwiaW5pdCIsImZpcmUiLCJndWVzcyIsImZpZWxkIiwic2hvdCIsImdyaWQiLCJyYWRhciIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJncmlkWSIsIm9mZnNldFRvcCIsIm9mZnNldEhlaWdodCIsImdyaWRYIiwib2Zmc2V0TGVmdCIsIm9mZnNldFdpZHRoIiwiaSIsImxlbmd0aCIsInZpZXciLCJuYXZpb3MiLCJoaXQiLCJtaXNzIiwic2hpcCIsIm5hdmlvIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJzYW5rIiwiZGFtYWdlIiwiZGlzcGxheU1lc3NhZ2UiLCJkaXNwbGF5SGl0IiwiaXNTdW5rIiwic2V0VGltZW91dCIsImRpc3BsYXlFbmRNZXNzYWdlIiwiZmluaXNoIiwiZW5kIiwiZ2V0U2NvcmUiLCJzY29yZSIsImRpc3BsYXlNaXNzIiwicG9pbnRzIiwic2hvdHNIaXQiLCJzaG90c01pc3MiLCJzaGlwc1N1bmsiLCJ0aW1lIiwidG90YWwiLCJtaW4iLCJnZXRFbGVtZW50QnlJZCIsImZpcnN0Q2hpbGQiLCJkYXRhIiwic2VjIiwicGFyc2VGbG9hdCIsImZvckVhY2giLCJlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBRUEsSUFBTUEsS0FBSyxHQUFHO0FBRVpDLEVBQUFBLE1BQU0sRUFBRUMsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixXQUExQixDQUZJO0FBSVpDLEVBQUFBLEtBQUssRUFBRSxDQUFDO0FBQ05DLElBQUFBLEVBQUUsRUFBRSxTQURFO0FBRU5DLElBQUFBLE1BQU0sRUFBRSxDQUZGO0FBR05DLElBQUFBLE1BQU0sRUFBRSxDQUhGO0FBSU5DLElBQUFBLEdBQUcsRUFBRTtBQUpDLEdBQUQsRUFLSjtBQUNESCxJQUFBQSxFQUFFLEVBQUUsV0FESDtBQUVEQyxJQUFBQSxNQUFNLEVBQUUsQ0FGUDtBQUdEQyxJQUFBQSxNQUFNLEVBQUUsQ0FIUDtBQUlEQyxJQUFBQSxHQUFHLEVBQUU7QUFKSixHQUxJLEVBVUo7QUFDREgsSUFBQUEsRUFBRSxFQUFFLFNBREg7QUFFREMsSUFBQUEsTUFBTSxFQUFFLENBRlA7QUFHREMsSUFBQUEsTUFBTSxFQUFFLENBSFA7QUFJREMsSUFBQUEsR0FBRyxFQUFFO0FBSkosR0FWSSxDQUpLO0FBb0JaQyxFQUFBQSxJQUFJLEVBQUcsS0FwQks7QUFzQlpDLEVBQUFBLElBQUksRUFBRSxjQUFVQyxLQUFWLEVBQWlCQyxLQUFqQixFQUF3QjtBQUM1QkMsSUFBQUEsSUFBSTs7QUFFSixhQUFTQSxJQUFULEdBQWdCO0FBQ2QsVUFBSUMsSUFBSSxHQUFHQyxLQUFLLENBQUNDLHNCQUFOLENBQTZCTCxLQUE3QixFQUFvQyxDQUFwQyxDQUFYO0FBQ0EsVUFBSU0sS0FBSyxHQUFHSCxJQUFJLENBQUNJLFNBQUwsR0FBaUJKLElBQUksQ0FBQ0ssWUFBTCxHQUFvQixDQUFqRDtBQUNBLFVBQUlDLEtBQUssR0FBR04sSUFBSSxDQUFDTyxVQUFMLEdBQWtCUCxJQUFJLENBQUNRLFdBQUwsR0FBbUIsQ0FBakQ7O0FBRUEsV0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHdkIsS0FBSyxDQUFDSSxLQUFOLENBQVlvQixNQUFoQyxFQUF3Q0QsQ0FBQyxFQUF6QyxFQUE2QztBQUMzQ3ZCLFFBQUFBLEtBQUssQ0FBQ0ksS0FBTixDQUFZbUIsQ0FBWixFQUFlakIsTUFBZixHQUF3Qm1CLGNBQUtDLE1BQUwsQ0FBWUgsQ0FBWixFQUFlTCxTQUFmLEdBQTJCTyxjQUFLQyxNQUFMLENBQVlILENBQVosRUFBZUosWUFBZixHQUE4QixDQUFqRjtBQUNBbkIsUUFBQUEsS0FBSyxDQUFDSSxLQUFOLENBQVltQixDQUFaLEVBQWVoQixNQUFmLEdBQXdCa0IsY0FBS0MsTUFBTCxDQUFZSCxDQUFaLEVBQWVGLFVBQWYsR0FBNEJJLGNBQUtDLE1BQUwsQ0FBWUgsQ0FBWixFQUFlRCxXQUFmLEdBQTZCLENBQWpGOztBQUVBLFlBQUt0QixLQUFLLENBQUNJLEtBQU4sQ0FBWW1CLENBQVosRUFBZWpCLE1BQWYsR0FBd0IsRUFBekIsR0FBK0JXLEtBQS9CLElBQXdDQSxLQUFLLEdBQUdqQixLQUFLLENBQUNJLEtBQU4sQ0FBWW1CLENBQVosRUFBZWpCLE1BQWYsR0FBd0IsRUFBeEUsSUFBK0VOLEtBQUssQ0FBQ0ksS0FBTixDQUFZbUIsQ0FBWixFQUFlaEIsTUFBZixHQUF3QixFQUF6QixHQUErQmEsS0FBN0csSUFBc0hBLEtBQUssR0FBSXBCLEtBQUssQ0FBQ0ksS0FBTixDQUFZbUIsQ0FBWixFQUFlaEIsTUFBZixHQUF3QixFQUEzSixFQUFnSztBQUM5Sm9CLFVBQUFBLEdBQUcsQ0FBQzNCLEtBQUssQ0FBQ0ksS0FBTixDQUFZbUIsQ0FBWixDQUFELEVBQWlCRSxjQUFLQyxNQUFMLENBQVlILENBQVosQ0FBakIsQ0FBSDtBQUNEO0FBQ0Y7O0FBQ0RLLE1BQUFBLElBQUk7QUFDTDs7QUFFRCxhQUFTRCxHQUFULENBQWFFLElBQWIsRUFBbUJDLEtBQW5CLEVBQTBCO0FBRXhCLFVBQUksQ0FBQ2xCLEtBQUssQ0FBQ21CLFNBQU4sQ0FBZ0JDLFFBQWhCLENBQXlCLEtBQXpCLENBQUQsSUFBb0MsQ0FBQ3BCLEtBQUssQ0FBQ21CLFNBQU4sQ0FBZ0JDLFFBQWhCLENBQXlCLE1BQXpCLENBQXpDLEVBQTJFO0FBQ3pFSCxRQUFBQSxJQUFJLENBQUNyQixHQUFMOztBQUNBLFlBQUlxQixJQUFJLENBQUNyQixHQUFMLEtBQWEsQ0FBakIsRUFBb0I7QUFDbEJxQixVQUFBQSxJQUFJLENBQUNJLElBQUwsR0FBWSxJQUFaOztBQUNBUix3QkFBS1MsTUFBTCxDQUFZSixLQUFaLEVBQW1CLE1BQW5COztBQUNBTCx3QkFBS1UsY0FBTCxDQUFvQiw2QkFBNkJOLElBQUksQ0FBQ3hCLEVBQXREO0FBQ0QsU0FKRCxNQUlPO0FBQ0xvQix3QkFBS1MsTUFBTCxDQUFZSixLQUFaLEVBQW1CLEtBQW5COztBQUNBTCx3QkFBS1UsY0FBTCxDQUFvQixVQUFTTixJQUFJLENBQUN4QixFQUFkLEdBQWlCLG1CQUFyQztBQUNEOztBQUNEb0Isc0JBQUtXLFVBQUwsQ0FBZ0J6QixLQUFoQjs7QUFDQSxZQUFJWCxLQUFLLENBQUNxQyxNQUFOLEVBQUosRUFBb0I7QUFDbEJaLHdCQUFLVSxjQUFMLENBQW9CLDZDQUFwQjs7QUFDQUcsVUFBQUEsVUFBVSxDQUFDLFlBQVk7QUFDckJiLDBCQUFLYyxpQkFBTCxDQUF1QixrQkFBdkI7O0FBQ0FkLDBCQUFLZSxNQUFMOztBQUNBZiwwQkFBS2dCLEdBQUwsQ0FBU3pDLEtBQUssQ0FBQzBDLFFBQU4sQ0FBZUMsS0FBZixFQUFUO0FBQ0QsV0FKUyxFQUlQLElBSk8sQ0FBVjtBQUtEOztBQUNELGVBQU8sSUFBUDtBQUNEOztBQUNELGFBQU8sS0FBUDtBQUNEOztBQUFBOztBQUVELGFBQVNmLElBQVQsR0FBZ0I7QUFDZCxVQUFJLENBQUNoQixLQUFLLENBQUNtQixTQUFOLENBQWdCQyxRQUFoQixDQUF5QixNQUF6QixDQUFELElBQXFDLENBQUNwQixLQUFLLENBQUNtQixTQUFOLENBQWdCQyxRQUFoQixDQUF5QixLQUF6QixDQUExQyxFQUEyRTtBQUN6RVAsc0JBQUttQixXQUFMLENBQWlCakMsS0FBakI7O0FBQ0FjLHNCQUFLVSxjQUFMLENBQW9CLGFBQXBCO0FBQ0Q7O0FBQ0QsYUFBTyxLQUFQO0FBQ0Q7O0FBQUE7QUFDRixHQTFFVztBQTRFWkUsRUFBQUEsTUFBTSxFQUFFLGtCQUFZO0FBQ2xCLFNBQUssSUFBSWQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3ZCLEtBQUssQ0FBQ0ksS0FBTixDQUFZb0IsTUFBaEMsRUFBd0NELENBQUMsRUFBekM7QUFDRSxVQUFJLENBQUN2QixLQUFLLENBQUNJLEtBQU4sQ0FBWW1CLENBQVosRUFBZVUsSUFBcEIsRUFBMEI7QUFDeEIsZUFBTyxLQUFQO0FBQ0Q7QUFISDs7QUFJQSxXQUFPLElBQVA7QUFDRCxHQWxGVztBQW1GWlMsRUFBQUEsUUFBUSxFQUFJLFlBQVU7QUFDcEIsYUFBU0MsS0FBVCxHQUFnQjtBQUNkLFVBQU1FLE1BQU0sR0FBRztBQUNiQyxRQUFBQSxRQUFRLEVBQUcsQ0FERTtBQUViQyxRQUFBQSxTQUFTLEVBQUcsQ0FGQztBQUdiQyxRQUFBQSxTQUFTLEVBQUcsQ0FIQztBQUliQyxRQUFBQSxJQUFJLEVBQUcsQ0FKTTtBQUtiQyxRQUFBQSxLQUFLLEVBQUM7QUFMTyxPQUFmOztBQVFBLFVBQUcsQ0FBQ2xELEtBQUssQ0FBQ1MsSUFBVixFQUFlO0FBQ2IsZUFBTyxLQUFQO0FBQ0Q7O0FBRUQsVUFBSTBDLEdBQUcsR0FBR2pELFFBQVEsQ0FBQ2tELGNBQVQsQ0FBd0IsS0FBeEIsRUFBK0JDLFVBQS9CLENBQTBDQyxJQUFwRDtBQUNBLFVBQUlDLEdBQUcsR0FBR3JELFFBQVEsQ0FBQ2tELGNBQVQsQ0FBd0IsS0FBeEIsRUFBK0JDLFVBQS9CLENBQTBDQyxJQUFwRDtBQUNBVCxNQUFBQSxNQUFNLENBQUNJLElBQVAsR0FBZU8sVUFBVSxDQUFDTCxHQUFELENBQVYsR0FBaUIsRUFBakIsR0FBc0JLLFVBQVUsQ0FBQ0QsR0FBRCxDQUEvQztBQUVBdkQsTUFBQUEsS0FBSyxDQUFDQyxNQUFOLENBQWF3RCxPQUFiLENBQXFCLFVBQUFDLEVBQUUsRUFBSTtBQUN6QixZQUFHQSxFQUFFLENBQUMzQixTQUFILENBQWFDLFFBQWIsQ0FBc0IsS0FBdEIsQ0FBSCxFQUFnQztBQUM5QmEsVUFBQUEsTUFBTSxDQUFDQyxRQUFQO0FBQ0QsU0FGRCxNQUVNLElBQUdZLEVBQUUsQ0FBQzNCLFNBQUgsQ0FBYUMsUUFBYixDQUFzQixNQUF0QixDQUFILEVBQWlDO0FBQ3JDYSxVQUFBQSxNQUFNLENBQUNFLFNBQVA7QUFDRDtBQUNGLE9BTkQ7QUFPQS9DLE1BQUFBLEtBQUssQ0FBQ0ksS0FBTixDQUFZcUQsT0FBWixDQUFvQixVQUFBM0IsS0FBSyxFQUFHO0FBQzFCLFlBQUdBLEtBQUssQ0FBQ3RCLEdBQU4sS0FBYyxDQUFqQixFQUFtQjtBQUNqQnFDLFVBQUFBLE1BQU0sQ0FBQ0csU0FBUDtBQUNEO0FBQ0YsT0FKRDtBQUtBSCxNQUFBQSxNQUFNLENBQUNLLEtBQVAsR0FBZ0JMLE1BQU0sQ0FBQ0ksSUFBUCxHQUFlSixNQUFNLENBQUNDLFFBQVAsR0FBa0IsRUFBakMsR0FBdUNELE1BQU0sQ0FBQ0csU0FBUCxHQUFrQixFQUF6RCxHQUErREgsTUFBTSxDQUFDRSxTQUFQLEdBQW1CLEVBQWxHO0FBQ0EsYUFBT0YsTUFBUDtBQUNEOztBQUNELFdBQU87QUFDTEYsTUFBQUEsS0FBSyxFQUFDQTtBQURELEtBQVA7QUFHRCxHQXBDVTtBQW5GQyxDQUFkO2VBeUhlM0MsSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB2aWV3IGZyb20gJy4vdmlldy5qcyc7XHJcblxyXG5jb25zdCBtb2RlbCA9IHtcclxuXHJcbiAgc3F1YXJlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZCBkaXYnKSxcclxuICBcclxuICBzaGlwczogW3tcclxuICAgIGlkOiBcIk1hbm9XYXJcIixcclxuICAgIGNvcmRzWTogMCxcclxuICAgIGNvcmRzWDogMCxcclxuICAgIHJlczogMyxcclxuICB9LCB7XHJcbiAgICBpZDogXCJEZXN0cm95ZXJcIixcclxuICAgIGNvcmRzWTogMCxcclxuICAgIGNvcmRzWDogMCxcclxuICAgIHJlczogMixcclxuICB9LCB7XHJcbiAgICBpZDogXCJTaWxlbmNlXCIsXHJcbiAgICBjb3Jkc1k6IDAsXHJcbiAgICBjb3Jkc1g6IDAsXHJcbiAgICByZXM6IDIsXHJcbiAgfV0sXHJcbiAgaW5pdCA6IGZhbHNlLFxyXG4gIFxyXG4gIGZpcmU6IGZ1bmN0aW9uIChndWVzcywgZmllbGQpIHtcclxuICAgIHNob3QoKTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gc2hvdCgpIHtcclxuICAgICAgbGV0IGdyaWQgPSByYWRhci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGd1ZXNzKVswXTtcclxuICAgICAgbGV0IGdyaWRZID0gZ3JpZC5vZmZzZXRUb3AgKyBncmlkLm9mZnNldEhlaWdodCAvIDI7XHJcbiAgICAgIGxldCBncmlkWCA9IGdyaWQub2Zmc2V0TGVmdCArIGdyaWQub2Zmc2V0V2lkdGggLyAyO1xyXG4gICAgICBcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RlbC5zaGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG1vZGVsLnNoaXBzW2ldLmNvcmRzWSA9IHZpZXcubmF2aW9zW2ldLm9mZnNldFRvcCArIHZpZXcubmF2aW9zW2ldLm9mZnNldEhlaWdodCAvIDI7XHJcbiAgICAgICAgbW9kZWwuc2hpcHNbaV0uY29yZHNYID0gdmlldy5uYXZpb3NbaV0ub2Zmc2V0TGVmdCArIHZpZXcubmF2aW9zW2ldLm9mZnNldFdpZHRoIC8gMjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoKG1vZGVsLnNoaXBzW2ldLmNvcmRzWSAtIDIwKSA8IGdyaWRZICYmIGdyaWRZIDwgbW9kZWwuc2hpcHNbaV0uY29yZHNZICsgMjAgJiYgKG1vZGVsLnNoaXBzW2ldLmNvcmRzWCAtIDIwKSA8IGdyaWRYICYmIGdyaWRYIDwgKG1vZGVsLnNoaXBzW2ldLmNvcmRzWCArIDIwKSkge1xyXG4gICAgICAgICAgaGl0KG1vZGVsLnNoaXBzW2ldLCB2aWV3Lm5hdmlvc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIG1pc3MoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gaGl0KHNoaXAsIG5hdmlvKSB7XHJcbiAgICAgIFxyXG4gICAgICBpZiAoIWZpZWxkLmNsYXNzTGlzdC5jb250YWlucygnaGl0JykgJiYgIWZpZWxkLmNsYXNzTGlzdC5jb250YWlucygnbWlzcycpKSB7XHJcbiAgICAgICAgc2hpcC5yZXMtLTtcclxuICAgICAgICBpZiAoc2hpcC5yZXMgPT09IDApIHtcclxuICAgICAgICAgIHNoaXAuc2FuayA9IHRydWU7XHJcbiAgICAgICAgICB2aWV3LmRhbWFnZShuYXZpbywgJ3N1bmsnKTtcclxuICAgICAgICAgIHZpZXcuZGlzcGxheU1lc3NhZ2UoJ1lvdSBzYW5rIHRoZSBiYXR0bGVzaGlwICcgKyBzaGlwLmlkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmlldy5kYW1hZ2UobmF2aW8sICdoaXQnKTtcclxuICAgICAgICAgIHZpZXcuZGlzcGxheU1lc3NhZ2UoJyBUaGUgJyArc2hpcC5pZCsnIGhhcyBiZWVuIGhpdCAhICAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmlldy5kaXNwbGF5SGl0KGd1ZXNzKTtcclxuICAgICAgICBpZiAobW9kZWwuaXNTdW5rKCkpIHtcclxuICAgICAgICAgIHZpZXcuZGlzcGxheU1lc3NhZ2UoJyBDb25ncmF0dWxhdGlvbnMhIFlvdSBzYW5rIGFsbCBiYXR0bGVzaGlwcyAnKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2aWV3LmRpc3BsYXlFbmRNZXNzYWdlKCdNaXNzaW9uIENvbXBsZXRlJyk7XHJcbiAgICAgICAgICAgIHZpZXcuZmluaXNoKCk7XHJcbiAgICAgICAgICAgIHZpZXcuZW5kKG1vZGVsLmdldFNjb3JlLnNjb3JlKCkpO1xyXG4gICAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIG1pc3MoKSB7ICAgICBcclxuICAgICAgaWYgKCFmaWVsZC5jbGFzc0xpc3QuY29udGFpbnMoJ21pc3MnKSAmJiAhZmllbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSkge1xyXG4gICAgICAgIHZpZXcuZGlzcGxheU1pc3MoZ3Vlc3MpO1xyXG4gICAgICAgIHZpZXcuZGlzcGxheU1lc3NhZ2UoJ1lvdSBtaXNzZWQuJyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBpc1N1bms6IGZ1bmN0aW9uICgpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kZWwuc2hpcHMubGVuZ3RoOyBpKyspXHJcbiAgICAgIGlmICghbW9kZWwuc2hpcHNbaV0uc2Fuaykge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuICBnZXRTY29yZSA6IChmdW5jdGlvbigpe1xyXG4gICAgZnVuY3Rpb24gc2NvcmUoKXtcclxuICAgICAgY29uc3QgcG9pbnRzID0ge1xyXG4gICAgICAgIHNob3RzSGl0IDogMCxcclxuICAgICAgICBzaG90c01pc3MgOiAwLFxyXG4gICAgICAgIHNoaXBzU3VuayA6IDAsXHJcbiAgICAgICAgdGltZSA6IDAsXHJcbiAgICAgICAgdG90YWw6MCxcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYoIW1vZGVsLmluaXQpe1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IG1pbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW4nKS5maXJzdENoaWxkLmRhdGEgXHJcbiAgICAgIGxldCBzZWMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VjJykuZmlyc3RDaGlsZC5kYXRhXHJcbiAgICAgIHBvaW50cy50aW1lID0gKHBhcnNlRmxvYXQobWluKSAqNjAgKyBwYXJzZUZsb2F0KHNlYykpIDtcclxuXHJcbiAgICAgIG1vZGVsLnNxdWFyZS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICBpZihlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpKXtcclxuICAgICAgICAgIHBvaW50cy5zaG90c0hpdCsrIDtcclxuICAgICAgICB9ZWxzZSBpZihlbC5jbGFzc0xpc3QuY29udGFpbnMoJ21pc3MnKSl7XHJcbiAgICAgICAgICBwb2ludHMuc2hvdHNNaXNzKysgO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIG1vZGVsLnNoaXBzLmZvckVhY2gobmF2aW8gPT57XHJcbiAgICAgICAgaWYobmF2aW8ucmVzID09PSAwKXtcclxuICAgICAgICAgIHBvaW50cy5zaGlwc1N1bmsrKztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBwb2ludHMudG90YWwgPSAocG9pbnRzLnRpbWUgKyAocG9pbnRzLnNob3RzSGl0ICogMjUpICsocG9pbnRzLnNoaXBzU3VuayogNzApIC0gcG9pbnRzLnNob3RzTWlzcyAqIDEwKTtcclxuICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNjb3JlOnNjb3JlLFxyXG4gICAgfVxyXG4gIH0pKCksXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IG1vZGVsIl19
},{"./view.js":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var grid = radar.getElementsByClassName(guess)[0];
      var gridY = grid.offsetTop + grid.offsetHeight / 2;
      var gridX = grid.offsetLeft + grid.offsetWidth / 2;

      for (var i = 0; i < model.ships.length; i++) {
        model.ships[i].cordsY = _view.default.navios[i].offsetTop + _view.default.navios[i].offsetHeight / 2;
        model.ships[i].cordsX = _view.default.navios[i].offsetLeft + _view.default.navios[i].offsetWidth / 2;

        if (model.ships[i].cordsY - 20 < gridY && gridY < model.ships[i].cordsY + 20 && model.ships[i].cordsX - 20 < gridX && gridX < model.ships[i].cordsX + 20) {
          hit(model.ships[i], _view.default.navios[i]);
        }
      }

      miss();
    }

    function hit(ship, navio) {
      if (!field.classList.contains('hit') && !field.classList.contains('miss')) {
        ship.res--;

        if (ship.res === 0) {
          ship.sank = true;

          _view.default.damage(navio, 'sunk');

          _view.default.displayMessage('You sank the battleship ' + ship.id);
        } else {
          _view.default.damage(navio, 'hit');

          _view.default.displayMessage(' The ' + ship.id + ' has been hit !  ');
        }

        _view.default.displayHit(guess);

        if (model.isSunk()) {
          _view.default.displayMessage(' Congratulations! You sank all battleships ');

          setTimeout(function () {
            _view.default.displayEndMessage('Mission Complete');

            _view.default.finish();

            _view.default.end(model.getScore.score());
          }, 3000);
        }

        return true;
      }

      return false;
    }

    ;

    function miss() {
      if (!field.classList.contains('miss') && !field.classList.contains('hit')) {
        _view.default.displayMiss(guess);

        _view.default.displayMessage('You missed.');
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
var _default = model;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsLmpzIl0sIm5hbWVzIjpbIm1vZGVsIiwic3F1YXJlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2hpcHMiLCJpZCIsImNvcmRzWSIsImNvcmRzWCIsInJlcyIsImluaXQiLCJmaXJlIiwiZ3Vlc3MiLCJmaWVsZCIsInNob3QiLCJncmlkIiwicmFkYXIiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiZ3JpZFkiLCJvZmZzZXRUb3AiLCJvZmZzZXRIZWlnaHQiLCJncmlkWCIsIm9mZnNldExlZnQiLCJvZmZzZXRXaWR0aCIsImkiLCJsZW5ndGgiLCJ2aWV3IiwibmF2aW9zIiwiaGl0IiwibWlzcyIsInNoaXAiLCJuYXZpbyIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwic2FuayIsImRhbWFnZSIsImRpc3BsYXlNZXNzYWdlIiwiZGlzcGxheUhpdCIsImlzU3VuayIsInNldFRpbWVvdXQiLCJkaXNwbGF5RW5kTWVzc2FnZSIsImZpbmlzaCIsImVuZCIsImdldFNjb3JlIiwic2NvcmUiLCJkaXNwbGF5TWlzcyIsInBvaW50cyIsInNob3RzSGl0Iiwic2hvdHNNaXNzIiwic2hpcHNTdW5rIiwidGltZSIsInRvdGFsIiwibWluIiwiZ2V0RWxlbWVudEJ5SWQiLCJmaXJzdENoaWxkIiwiZGF0YSIsInNlYyIsInBhcnNlRmxvYXQiLCJmb3JFYWNoIiwiZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUVBLElBQU1BLEtBQUssR0FBRztBQUVaQyxFQUFBQSxNQUFNLEVBQUVDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsV0FBMUIsQ0FGSTtBQUlaQyxFQUFBQSxLQUFLLEVBQUUsQ0FBQztBQUNOQyxJQUFBQSxFQUFFLEVBQUUsU0FERTtBQUVOQyxJQUFBQSxNQUFNLEVBQUUsQ0FGRjtBQUdOQyxJQUFBQSxNQUFNLEVBQUUsQ0FIRjtBQUlOQyxJQUFBQSxHQUFHLEVBQUU7QUFKQyxHQUFELEVBS0o7QUFDREgsSUFBQUEsRUFBRSxFQUFF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QUN0QixHQUFOLEtBQWMsQ0FBakIsRUFBbUI7QUFDakJxQyxVQUFBQSxNQUFNLENBQUNHLFNBQVA7QUFDRDtBQUNGLE9BSkQ7QUFLQUgsTUFBQUEsTUFBTSxDQUFDSyxLQUFQLEdBQWdCTCxNQUFNLENBQUNJLElBQVAsR0FBZUosTUFBTSxDQUFDQyxRQUFQLEdBQWtCLEVBQWpDLEdBQXVDRCxNQUFNLENBQUNHLFNBQVAsR0FBa0IsRUFBekQsR0FBK0RILE1BQU0sQ0FBQ0UsU0FBUCxHQUFtQixFQUFsRztBQUNBLGFBQU9GLE1BQVA7QUFDRDs7QUFDRCxXQUFPO0FBQ0xGLE1BQUFBLEtBQUssRUFBQ0E7QUFERCxLQUFQO0FBR0QsR0FwQ1U7QUFuRkMsQ0FBZDtlQXlIZTNDLEsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdmlldyBmcm9tICcuL3ZpZXcuanMnO1xyXG5cclxuY29uc3QgbW9kZWwgPSB7XHJcblxyXG4gIHNxdWFyZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQgZGl2JyksXHJcbiAgXHJcbiAgc2hpcHM6IFt7XHJcbiAgICBpZDogXCJNYW5vV2FyXCIsXHJcbiAgICBjb3Jkc1k6IDAsXHJcbiAgICBjb3Jkc1g6IDAsXHJcbiAgICByZXM6IDMsXHJcbiAgfSwge1xyXG4gICAgaWQ6IFwiRGVzdHJveWVyXCIsXHJcbiAgICBjb3Jkc1k6IDAsXHJcbiAgICBjb3Jkc1g6IDAsXHJcbiAgICByZXM6IDIsXHJcbiAgfSwge1xyXG4gICAgaWQ6IFwiU2lsZW5jZVwiLFxyXG4gICAgY29yZHNZOiAwLFxyXG4gICAgY29yZHNYOiAwLFxyXG4gICAgcmVzOiAyLFxyXG4gIH1dLFxyXG4gIGluaXQgOiBmYWxzZSxcclxuICBcclxuICBmaXJlOiBmdW5jdGlvbiAoZ3Vlc3MsIGZpZWxkKSB7XHJcbiAgICBzaG90KCk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHNob3QoKSB7XHJcbiAgICAgIGxldCBncmlkID0gcmFkYXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShndWVzcylbMF07XHJcbiAgICAgIGxldCBncmlkWSA9IGdyaWQub2Zmc2V0VG9wICsgZ3JpZC5vZmZzZXRIZWlnaHQgLyAyO1xyXG4gICAgICBsZXQgZ3JpZFggPSBncmlkLm9mZnNldExlZnQgKyBncmlkLm9mZnNldFdpZHRoIC8gMjtcclxuICAgICAgXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kZWwuc2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBtb2RlbC5zaGlwc1tpXS5jb3Jkc1kgPSB2aWV3Lm5hdmlvc1tpXS5vZmZzZXRUb3AgKyB2aWV3Lm5hdmlvc1tpXS5vZmZzZXRIZWlnaHQgLyAyO1xyXG4gICAgICAgIG1vZGVsLnNoaXBzW2ldLmNvcmRzWCA9IHZpZXcubmF2aW9zW2ldLm9mZnNldExlZnQgKyB2aWV3Lm5hdmlvc1tpXS5vZmZzZXRXaWR0aCAvIDI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKChtb2RlbC5zaGlwc1tpXS5jb3Jkc1kgLSAyMCkgPCBncmlkWSAmJiBncmlkWSA8IG1vZGVsLnNoaXBzW2ldLmNvcmRzWSArIDIwICYmIChtb2RlbC5zaGlwc1tpXS5jb3Jkc1ggLSAyMCkgPCBncmlkWCAmJiBncmlkWCA8IChtb2RlbC5zaGlwc1tpXS5jb3Jkc1ggKyAyMCkpIHtcclxuICAgICAgICAgIGhpdChtb2RlbC5zaGlwc1tpXSwgdmlldy5uYXZpb3NbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBtaXNzKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGhpdChzaGlwLCBuYXZpbykge1xyXG4gICAgICBcclxuICAgICAgaWYgKCFmaWVsZC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpICYmICFmaWVsZC5jbGFzc0xpc3QuY29udGFpbnMoJ21pc3MnKSkge1xyXG4gICAgICAgIHNoaXAucmVzLS07XHJcbiAgICAgICAgaWYgKHNoaXAucmVzID09PSAwKSB7XHJcbiAgICAgICAgICBzaGlwLnNhbmsgPSB0cnVlO1xyXG4gICAgICAgICAgdmlldy5kYW1hZ2UobmF2aW8sICdzdW5rJyk7XHJcbiAgICAgICAgICB2aWV3LmRpc3BsYXlNZXNzYWdlKCdZb3Ugc2FuayB0aGUgYmF0dGxlc2hpcCAnICsgc2hpcC5pZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZpZXcuZGFtYWdlKG5hdmlvLCAnaGl0Jyk7XHJcbiAgICAgICAgICB2aWV3LmRpc3BsYXlNZXNzYWdlKCcgVGhlICcgK3NoaXAuaWQrJyBoYXMgYmVlbiBoaXQgISAgJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZpZXcuZGlzcGxheUhpdChndWVzcyk7XHJcbiAgICAgICAgaWYgKG1vZGVsLmlzU3VuaygpKSB7XHJcbiAgICAgICAgICB2aWV3LmRpc3BsYXlNZXNzYWdlKCcgQ29uZ3JhdHVsYXRpb25zISBZb3Ugc2FuayBhbGwgYmF0dGxlc2hpcHMgJyk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmlldy5kaXNwbGF5RW5kTWVzc2FnZSgnTWlzc2lvbiBDb21wbGV0ZScpO1xyXG4gICAgICAgICAgICB2aWV3LmZpbmlzaCgpO1xyXG4gICAgICAgICAgICB2aWV3LmVuZChtb2RlbC5nZXRTY29yZS5zY29yZSgpKTtcclxuICAgICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBtaXNzKCkgeyAgICAgXHJcbiAgICAgIGlmICghZmllbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaXNzJykgJiYgIWZpZWxkLmNsYXNzTGlzdC5jb250YWlucygnaGl0JykpIHtcclxuICAgICAgICB2aWV3LmRpc3BsYXlNaXNzKGd1ZXNzKTtcclxuICAgICAgICB2aWV3LmRpc3BsYXlNZXNzYWdlKCdZb3UgbWlzc2VkLicpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcbiAgfSxcclxuXHJcbiAgaXNTdW5rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGVsLnNoaXBzLmxlbmd0aDsgaSsrKVxyXG4gICAgICBpZiAoIW1vZGVsLnNoaXBzW2ldLnNhbmspIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbiAgZ2V0U2NvcmUgOiAoZnVuY3Rpb24oKXtcclxuICAgIGZ1bmN0aW9uIHNjb3JlKCl7XHJcbiAgICAgIGNvbnN0IHBvaW50cyA9IHtcclxuICAgICAgICBzaG90c0hpdCA6IDAsXHJcbiAgICAgICAgc2hvdHNNaXNzIDogMCxcclxuICAgICAgICBzaGlwc1N1bmsgOiAwLFxyXG4gICAgICAgIHRpbWUgOiAwLFxyXG4gICAgICAgIHRvdGFsOjAsXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKCFtb2RlbC5pbml0KXtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBtaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWluJykuZmlyc3RDaGlsZC5kYXRhIFxyXG4gICAgICBsZXQgc2VjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYycpLmZpcnN0Q2hpbGQuZGF0YVxyXG4gICAgICBwb2ludHMudGltZSA9IChwYXJzZUZsb2F0KG1pbikgKjYwICsgcGFyc2VGbG9hdChzZWMpKSA7XHJcblxyXG4gICAgICBtb2RlbC5zcXVhcmUuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgaWYoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSl7XHJcbiAgICAgICAgICBwb2ludHMuc2hvdHNIaXQrKyA7XHJcbiAgICAgICAgfWVsc2UgaWYoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaXNzJykpe1xyXG4gICAgICAgICAgcG9pbnRzLnNob3RzTWlzcysrIDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBtb2RlbC5zaGlwcy5mb3JFYWNoKG5hdmlvID0+e1xyXG4gICAgICAgIGlmKG5hdmlvLnJlcyA9PT0gMCl7XHJcbiAgICAgICAgICBwb2ludHMuc2hpcHNTdW5rKys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcG9pbnRzLnRvdGFsID0gKHBvaW50cy50aW1lICsgKHBvaW50cy5zaG90c0hpdCAqIDI1KSArKHBvaW50cy5zaGlwc1N1bmsqIDcwKSAtIHBvaW50cy5zaG90c01pc3MgKiAxMCk7XHJcbiAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzY29yZTpzY29yZSxcclxuICAgIH1cclxuICB9KSgpLFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBtb2RlbCJdfQ==
},{"./view.js":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _model = _interopRequireDefault(require("./model.js"));

var _controller = _interopRequireDefault(require("./controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    _model.default.init = true;
    this.mapa.classList.add('radar-map');

    _controller.default.btnStart.classList.add('is-active');

    _controller.default.btnStart.disabled = true;
    _controller.default.btnRank.disabled = true;
    _controller.default.input.disabled = false;

    _controller.default.input.focus();

    this.countDown();
    setTimeout(function () {
      _this.antena.classList.remove('hidden');

      _controller.default.btnStop.disabled = false;
    }, 5000);
  },
  stop: function stop() {
    window.location.reload();
  },
  finish: function finish() {
    clearInterval(view.interval);
    view.mapa.querySelector('.antena').style.animationPlayState = 'paused';
    view.cronometro.style.animationPlayState = 'paused';

    _controller.default.btnStart.classList.remove('is-active');

    _controller.default.input.disabled = true;
    _controller.default.btnStop.disabled = true;
    view.navios.forEach(function (el) {
      el.style.animationPlayState = 'paused';
    });
    view.cronometro.classList.remove('is--time-over');
    view.end(_model.default.getScore.score());
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
      _this2.cronometro.style.display = 'block';
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
      _controller.default.btnStop.disabled = false;
      _controller.default.btnStop.style.zIndex = '9';
      _controller.default.btnRank.disabled = false;

      _controller.default.addRank();
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
    db.collection('rank').orderBy('score', 'desc').get().then(function (snapshot) {
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
var _default = view;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXcuanMiXSwibmFtZXMiOlsidmlldyIsIm5hdmlvcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsIm1lc3NhZ2UiLCJnZXRFbGVtZW50QnlJZCIsIm1lc3NhZ2VFbmQiLCJhbnRlbmEiLCJxdWVyeVNlbGVjdG9yIiwibWFwYSIsImNyb25vbWV0cm8iLCJpbnRlcnZhbCIsInBvaW50cyIsIm92ZXJsYXkiLCJtb2RhbCIsImxpc3QiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwicmFua1dyYXAiLCJyYW5rTGlzdCIsInN0YXJ0IiwibW9kZWwiLCJpbml0IiwiY2xhc3NMaXN0IiwiYWRkIiwiY29udHJvbGxlciIsImJ0blN0YXJ0IiwiZGlzYWJsZWQiLCJidG5SYW5rIiwiaW5wdXQiLCJmb2N1cyIsImNvdW50RG93biIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJidG5TdG9wIiwic3RvcCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZmluaXNoIiwiY2xlYXJJbnRlcnZhbCIsInN0eWxlIiwiYW5pbWF0aW9uUGxheVN0YXRlIiwiZm9yRWFjaCIsImVsIiwiZW5kIiwiZ2V0U2NvcmUiLCJzY29yZSIsImdlbmVyYXRlU2hpcHMiLCJrZXkiLCJyYW5kb20iLCJhbmltYXRpb25EaXJlY3Rpb24iLCJpIiwicGxhY2UiLCJzZXRJbnRlcnZhbCIsImxlbmd0aCIsIm1heCIsIm15TGlzdCIsInB1c2giLCJzb3J0IiwiYSIsImIiLCJNYXRoIiwicm91bmQiLCJteU51bXMiLCJzcGxpY2UiLCJkaXNwbGF5TWVzc2FnZSIsIm1zZyIsInRleHRDb250ZW50IiwiZGlzcGxheUhpdCIsImRpc3BsYXlNaXNzIiwiZGlzcGxheUVuZE1lc3NhZ2UiLCJkYW1hZ2UiLCJuYXZpbyIsInN0YXR1cyIsInRpbWUiLCJkaXNwbGF5IiwicyIsIm0iLCJwcm9wIiwiZ2V0QXR0cmlidXRlIiwic2NvcmVzIiwiekluZGV4IiwiYWRkUmFuayIsInJhbmsiLCJjb250YWlucyIsInRvZ2dsZSIsInJlbmRlclJhbmsiLCJpbm5lckhUTUwiLCJkYiIsImNvbGxlY3Rpb24iLCJvcmRlckJ5IiwiZ2V0IiwidGhlbiIsInNuYXBzaG90IiwiZG9jcyIsImRvYyIsImxpIiwiY3JlYXRlRWxlbWVudCIsIm5hbWUiLCJzZXRBdHRyaWJ1dGUiLCJpZCIsImRhdGEiLCJhcHBlbmRDaGlsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsSUFBTUEsSUFBSSxHQUFHO0FBQ1hDLEVBQUFBLE1BQU0sRUFBRUMsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixRQUExQixDQURHO0FBRVhDLEVBQUFBLE9BQU8sRUFBRUYsUUFBUSxDQUFDRyxjQUFULENBQXdCLGFBQXhCLENBRkU7QUFHWEMsRUFBQUEsVUFBVSxFQUFFSixRQUFRLENBQUNHLGNBQVQsQ0FBd0IsWUFBeEIsQ0FIRDtBQUlYRSxFQUFBQSxNQUFNLEVBQUVMLFFBQVEsQ0FBQ00sYUFBVCxDQUF1QixTQUF2QixDQUpHO0FBS1hDLEVBQUFBLElBQUksRUFBRVAsUUFBUSxDQUFDRyxjQUFULENBQXdCLE9BQXhCLENBTEs7QUFNWEssRUFBQUEsVUFBVSxFQUFFUixRQUFRLENBQUNHLGNBQVQsQ0FBd0IsV0FBeEIsQ0FORDtBQU9YTSxFQUFBQSxRQUFRLEVBQUUsSUFQQztBQVFYQyxFQUFBQSxNQUFNLEVBQUVWLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsdUJBQTFCLENBUkc7QUFTWFUsRUFBQUEsT0FBTyxFQUFFWCxRQUFRLENBQUNHLGNBQVQsQ0FBd0IsU0FBeEIsQ0FURTtBQVVYUyxFQUFBQSxLQUFLLEVBQUVaLFFBQVEsQ0FBQ0csY0FBVCxDQUF3QixPQUF4QixDQVZJO0FBV1hVLEVBQUFBLElBQUksRUFBRWIsUUFBUSxDQUFDYyxzQkFBVCxDQUFnQyxpQkFBaEMsQ0FYSztBQVlYQyxFQUFBQSxRQUFRLEVBQUVmLFFBQVEsQ0FBQ0csY0FBVCxDQUF3QixXQUF4QixDQVpDO0FBYVhhLEVBQUFBLFFBQVEsRUFBRWhCLFFB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ZWwuanMnO1xyXG5pbXBvcnQgY29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInO1xyXG5cclxuY29uc3QgdmlldyA9IHtcclxuICBuYXZpb3MgOmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwcycpLFxyXG4gIG1lc3NhZ2U6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlQXJlYScpLFxyXG4gIG1lc3NhZ2VFbmQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlRW5kJyksXHJcbiAgYW50ZW5hOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW50ZW5hJyksXHJcbiAgbWFwYTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhZGFyJyksXHJcbiAgY3Jvbm9tZXRybzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50RG93bicpLFxyXG4gIGludGVydmFsOiBudWxsLFxyXG4gIHBvaW50czogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvaW50LWxpc3QtaXRlbSBzcGFuJyksXHJcbiAgb3ZlcmxheTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXknKSxcclxuICBtb2RhbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsJyksXHJcbiAgbGlzdDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9pbnQtbGlzdC1pdGVtJyksXHJcbiAgcmFua1dyYXA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5rLXdyYXAnKSxcclxuICByYW5rTGlzdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhbmstbGlzdCcpLFxyXG4gIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICBtb2RlbC5pbml0ID10cnVlO1xyXG4gICAgdGhpcy5tYXBhLmNsYXNzTGlzdC5hZGQoJ3JhZGFyLW1hcCcpO1xyXG4gICAgY29udHJvbGxlci5idG5TdGFydC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcclxuICAgIGNvbnRyb2xsZXIuYnRuU3RhcnQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgY29udHJvbGxlci5idG5SYW5rLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIGNvbnRyb2xsZXIuaW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIGNvbnRyb2xsZXIuaW5wdXQuZm9jdXMoKTtcclxuICAgIHRoaXMuY291bnREb3duKCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5hbnRlbmEuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcclxuICAgICAgY29udHJvbGxlci5idG5TdG9wLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB9LCA1MDAwKTtcclxuICB9LFxyXG4gIHN0b3A6IGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICB9LFxyXG4gIGZpbmlzaDogKCkgPT4ge1xyXG4gICAgY2xlYXJJbnRlcnZhbCh2aWV3LmludGVydmFsKTtcclxuICAgIHZpZXcubWFwYS5xdWVyeVNlbGVjdG9yKCcuYW50ZW5hJykuc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3BhdXNlZCc7XHJcbiAgICB2aWV3LmNyb25vbWV0cm8uc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3BhdXNlZCc7XHJcbiAgICBjb250cm9sbGVyLmJ0blN0YXJ0LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xyXG4gICAgY29udHJvbGxlci5pbnB1dC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICBjb250cm9sbGVyLmJ0blN0b3AuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgdmlldy5uYXZpb3MuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3BhdXNlZCc7XHJcbiAgICB9KTtcclxuICAgIHZpZXcuY3Jvbm9tZXRyby5jbGFzc0xpc3QucmVtb3ZlKCdpcy0tdGltZS1vdmVyJyk7XHJcbiAgICB2aWV3LmVuZChtb2RlbC5nZXRTY29yZS5zY29yZSgpKTtcclxuICB9LFxyXG4gIGdlbmVyYXRlU2hpcHM6IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBrZXkgPSByYW5kb20oMik7XHJcbiAgICB2aWV3Lm5hdmlvc1trZXlbMF1dLnN0eWxlLmFuaW1hdGlvbkRpcmVjdGlvbiA9ICdhbHRlcm5hdGUtcmV2ZXJzZSc7XHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBsZXQgcGxhY2UgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIHZpZXcubmF2aW9zW2tleVtpXV0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgIGkrKztcclxuICAgICAgaWYgKGkgPT09IHZpZXcubmF2aW9zLmxlbmd0aCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwocGxhY2UpO1xyXG4gICAgICB9XHJcbiAgICB9LCA3MDAwKTtcclxuXHJcbiAgICBmdW5jdGlvbiByYW5kb20obWF4KSB7XHJcbiAgICAgIHZhciBteUxpc3QgPSBbXTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gbWF4OyBpKyspIHtcclxuICAgICAgICBteUxpc3QucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgICBteUxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAyKSAtIDE7XHJcbiAgICAgIH0pO1xyXG4gICAgICB2YXIgbXlOdW1zID0gbXlMaXN0LnNwbGljZSgwLCBtYXggKyAxKTtcclxuICAgICAgcmV0dXJuIG15TnVtcztcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBkaXNwbGF5TWVzc2FnZTogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgdGhpcy5tZXNzYWdlLnRleHRDb250ZW50ID0gbXNnO1xyXG4gIH0sXHJcblxyXG4gIGRpc3BsYXlIaXQ6IGZ1bmN0aW9uIChsb2NhdGlvbikge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobG9jYXRpb24pLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gIH0sXHJcblxyXG4gIGRpc3BsYXlNaXNzOiBmdW5jdGlvbiAobG9jYXRpb24pIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxvY2F0aW9uKS5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XHJcbiAgfSxcclxuICBkaXNwbGF5RW5kTWVzc2FnZTogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgdGhpcy5tZXNzYWdlRW5kLnRleHRDb250ZW50ID0gbXNnO1xyXG4gIH0sXHJcbiAgZGFtYWdlOiBmdW5jdGlvbiAobmF2aW8sIHN0YXR1cykge1xyXG4gICAgaWYgKHN0YXR1cyA9PT0gJ2hpdCcpIHtcclxuICAgICAgbmF2aW8uY2xhc3NMaXN0LmFkZCgnaGl0dGVkJyk7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG5hdmlvLmNsYXNzTGlzdC5yZW1vdmUoJ2hpdHRlZCcpO1xyXG4gICAgICB9LCAzMDAwKTtcclxuICAgIH1cclxuICAgIGlmIChzdGF0dXMgPT09ICdzdW5rJykge1xyXG4gICAgICBuYXZpby5jbGFzc0xpc3QuYWRkKCdzdW5rJyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjb3VudERvd246IGZ1bmN0aW9uICgpIHtcclxuICAgIHRpbWUoKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5jcm9ub21ldHJvLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSwgNjAwMDApO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNyb25vbWV0cm8uY2xhc3NMaXN0LmFkZCgnaXMtLXRpbWUtb3ZlcicpXHJcbiAgICB9LCAxMjAwMDApO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRpbWUoKSB7XHJcbiAgICAgIGxldCBzID0gMzA7XHJcbiAgICAgIGxldCBtID0gMjtcclxuXHJcbiAgICAgIHZpZXcuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHMgPT0gMCkge1xyXG4gICAgICAgICAgbS0tO1xyXG4gICAgICAgICAgcyA9IDYwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobSA8IDEwKSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pblwiKS50ZXh0Q29udGVudCA9IFwiMFwiICsgbTtcclxuICAgICAgICBlbHNlIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluXCIpLnRleHRDb250ZW50ID0gbTtcclxuICAgICAgICBzLS07XHJcbiAgICAgICAgaWYgKHMgPCAxMCkgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWNcIikudGV4dENvbnRlbnQgPSBcIjBcIiArIHM7XHJcbiAgICAgICAgZWxzZSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlY1wiKS50ZXh0Q29udGVudCA9IHM7XHJcblxyXG4gICAgICAgIGlmIChtID09IDAgJiYgcyA9PSAwKSB7XHJcbiAgICAgICAgICB2aWV3LmZpbmlzaCgpO1xyXG4gICAgICAgICAgdmlldy5kaXNwbGF5RW5kTWVzc2FnZSgnTWlzc2lvbiBpcyBPdmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH07XHJcbiAgfSxcclxuICBlbmQ6IGZ1bmN0aW9uIChzY29yZSkge1xyXG4gICAgdmlldy5vdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXknKTtcclxuICAgIHZpZXcucG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGZvciAobGV0IHByb3AgaW4gc2NvcmUpIHtcclxuICAgICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdpZCcpID09IHByb3ApIHtcclxuICAgICAgICAgIGVsLnRleHRDb250ZW50ID0gc2NvcmVbcHJvcF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHZpZXcubW9kYWwuY2xhc3NMaXN0LmFkZCgnZGlzcGxheScpO1xyXG4gICAgfSwgMjAwMCk7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGxldCBpID0gMDtcclxuICAgICAgbGV0IHNjb3JlcyA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICB2aWV3Lmxpc3RbaV0uY2xhc3NMaXN0LmFkZCgnZGlzcGxheScpO1xyXG4gICAgICAgIGkrKztcclxuICAgICAgICBpZiAoaSA9PT0gdmlldy5saXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChzY29yZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgMjAwMCk7XHJcbiAgICB9LCAzMDAwKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBjb250cm9sbGVyLmJ0blN0b3AuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgY29udHJvbGxlci5idG5TdG9wLnN0eWxlLnpJbmRleCA9ICc5JztcclxuICAgICAgY29udHJvbGxlci5idG5SYW5rLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgIGNvbnRyb2xsZXIuYWRkUmFuaygpO1xyXG4gICAgfSwgMTYwMDApO1xyXG4gIH0sXHJcbiAgcmFuazogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHZpZXcubW9kYWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNwbGF5JykpIHtcclxuICAgICAgdmlldy5yYW5rV3JhcC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LXJhbmsnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZpZXcub3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKCdkaXNwbGF5Jyk7XHJcbiAgICAgIHZpZXcucmFua1dyYXAuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1yYW5rJyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICByZW5kZXJSYW5rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2aWV3LnJhbmtMaXN0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgZGIuY29sbGVjdGlvbigncmFuaycpLm9yZGVyQnkoJ3Njb3JlJywnZGVzYycpLmdldCgpLnRoZW4oc25hcHNob3QgPT57XHJcbiAgICAgIHNuYXBzaG90LmRvY3MuZm9yRWFjaChkb2MgPT4ge1xyXG4gICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHJvbmcnKTtcclxuICAgICAgICBsZXQgc2NvcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgZG9jLmlkKTtcclxuICAgICAgICBuYW1lLnRleHRDb250ZW50ID0gZG9jLmRhdGEoKS5uYW1lO1xyXG4gICAgICAgIHNjb3JlLnRleHRDb250ZW50ID0gZG9jLmRhdGEoKS5zY29yZTtcclxuICAgICAgICBcclxuICAgICAgICBuYW1lLmFwcGVuZENoaWxkKHNjb3JlKTtcclxuICAgICAgICBsaS5hcHBlbmRDaGlsZChuYW1lKTtcclxuICAgICAgICBcclxuICAgICAgICB2aWV3LnJhbmtMaXN0LmFwcGVuZENoaWxkKGxpKTsgXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHZpZXciXX0=
},{"./controller":1,"./model.js":3}]},{},[2])