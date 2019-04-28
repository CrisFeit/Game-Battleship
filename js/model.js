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
    shot();
    
    function shot(){
      let grid = radar.getElementsByClassName(guess)[0];
      let gridY = grid.offsetTop + grid.offsetHeight /2;
      let gridX = grid.offsetLeft + grid.offsetWidth /2;

      for(let i =0 ;i< model.ships.length; i++){
        model.ships[i].cordsY = navios[i].offsetTop + navios[i].offsetHeight /2;
        model.ships[i].cordsX = navios[i].offsetLeft + navios[i].offsetWidth /2;
        
        if((model.ships[i].cordsY - 20 ) < gridY && gridY < model.ships[i].cordsY + 20 && (model.ships[i].cordsX - 20 ) < gridX && gridX < (model.ships[i].cordsX + 20)){
            hit(model.ships[i],navios[i]);
            return true;
          }
      }
        miss();
    }

    function hit(ship,navio){
      
      if (!field.classList.contains('hit') && !field.classList.contains('miss')) {        
              ship.sank = true;
              view.damage(navio);
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
      if (!field.classList.contains('miss') && !field.classList.contains('hit')) {
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