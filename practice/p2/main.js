function mafiaSim(){
    localStorage.lastGame = '杀人游戏简单版';
    window.location.href =  gameMap[localStorage.lastGame];//'./mafia'
}
if(!localStorage.lastGame){
    document.getElementById('previousText').innerHTML = '上次游戏： '+localStorage.lastGame;
}

const gameMap = {
    '杀人游戏简单版': './mafia'
}