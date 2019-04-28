
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
  generateShips : function(){
    navios.forEach(function(el){
        setTimeout(function(){
          el.classList.remove('hidden');
        },5000)
    })
  },
  damage: function(navio){
    navio.style.animationPlayState = 'paused';
    navio.classList.add('hitted');
    
  }

  // sunkingShip : function(sunked){

  // }
};