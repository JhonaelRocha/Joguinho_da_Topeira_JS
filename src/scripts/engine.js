
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifes: document.querySelector("#lifes"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lifes: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimeId: setInterval(countDown, 1000),
    }
}
function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0 ){
        gameOver();
    }
}

function playerSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}


/* Escolhe um quadrado aleatório */
function randomSquare(){
    state.view.squares.forEach( (square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id;
}
//------------------------------------------


function Death(){
    if(state.values.lifes <= 0){
        gameOver()
    }
    state.values.lifes --;
    state.view.lifes.textContent = `x${state.values.lifes}`
    
}
function gameOver(){
    clearInterval(state.actions.timerId)
    clearInterval(state.actions.countDownTimeId)
    alert("Game Over! O seu resultado foi " + state.values.result);
    window.location.reload();
}
function gameDifficulty(){
    if(state.values.result == 10){
        clearInterval(state.actions.timerId)
        state.actions.timerId = setInterval(randomSquare, 800)
    }
    if(state.values.result == 20){
        clearInterval(state.actions.timerId)
        state.actions.timerId = setInterval(randomSquare, 750)
    }
    if(state.values.result == 30){
        clearInterval(state.actions.timerId)
        state.actions.timerId = setInterval(randomSquare, 700)
    }
    if(state.values.result == 40){
        clearInterval(state.actions.timerId)
        state.actions.timerId = setInterval(randomSquare, 600)
    }
    if(state.values.result == 50){
        clearInterval(state.actions.timerId)
        state.actions.timerId = setInterval(randomSquare, 575)
    }
}



/* Checa se o quadrado clicado contém o Ralph */
function addListenerHitBox(){
    state.view.squares.forEach( (square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result ++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playerSound("hit");
                gameDifficulty()
            }else{
                Death();
            }
        } )
    })
}
//------------------------------------------



/* Inicializa o Jogo */
function initialize(){
    addListenerHitBox()
    
}
//------------------------------------------

initialize();