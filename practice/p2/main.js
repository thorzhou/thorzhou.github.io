function mafiaSim(){
    localStorage.lastGame = '杀人游戏简单版';
    window.location.href =  gameMap[localStorage.lastGame];//'./mafia'
}
if(localStorage.lastGame!=undefined){
    document.getElementById('previousText').innerHTML = '上次游戏： '+localStorage.lastGame;
}

const gameMap = {
    '杀人游戏简单版': './mafia'
}

function lastPlayed() {
    if(localStorage.lastGame!=undefined){
        window.location.href =  gameMap[localStorage.lastGame];
    }    
}