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
      let grid = radar.getElementsByClassName(guess)[0];
      let gridY = grid.offsetTop + grid.offsetHeight / 2;
      let gridX = grid.offsetLeft + grid.offsetWidth / 2;
      
      for (let i = 0; i < model.ships.length; i++) {
        model.ships[i].cordsY = navios[i].offsetTop + navios[i].offsetHeight / 2;
        model.ships[i].cordsX = navios[i].offsetLeft + navios[i].offsetWidth / 2;
        
        if ((model.ships[i].cordsY - 20) < gridY && gridY < model.ships[i].cordsY + 20 && (model.ships[i].cordsX - 20) < gridX && gridX < (model.ships[i].cordsX + 20)) {
          hit(model.ships[i], navios[i]);
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
