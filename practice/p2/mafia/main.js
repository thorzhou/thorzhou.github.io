var playerIdentityList = new Array();
var num = 4;
var kn = 1;
function gameStart() {
    if(!checkNumOfPlayers()){
        return;
    }
    setPlayerIdentities();
    window.location.href = './play';
}

function checkNumOfPlayers() {
    var reg = /^\d{1,2}$/;
    num = document.getElementById('playerSetting').value;
    num = num.replace(/\s/g, "");
    document.getElementById('playerSetting').value = num;
    if (reg.test(num)) {
        if(num < 4 || num > 18)
        {
            alert('请输入正确的玩家人数');
            return false;
        }
    }else{
        alert('请输入正确的玩家人数');
        return false;
    }
    return true;
}

function getNumOfPlayers(params) {
    var killer = document.getElementById('numOfKiller');
    var civilian = document.getElementById('numOfCivilian');
    if(!checkNumOfPlayers()){
        return;
    }
    kn = Math.floor(num/3);
    killer.innerHTML = '杀手'+ kn + ' 人';
    civilian.innerHTML = '平民' + (num-kn) + ' 人';
}

function setPlayerIdentities(){
    playerIdentityList.splice(0,playerIdentityList.length);
    resetIdentity(num,kn);
    console.log(playerIdentityList);
}

function resetIdentity(len,kn){
    for (let index = 0; index < len; index++) {
        if(index<kn){
            playerIdentityList[index] = 'Killer';
        }else{
            playerIdentityList[index] = 'Civilian';
        }
    }
    playerIdentityList = shuffle(playerIdentityList);
}

function shuffle(a) {
    var length = a.length;
    var shuffled = Array(length);
    for (let i = 0,rand; i < length; i++) {
        rand = ~~(Math.random()* (i+1))
        if(rand !== i){
            shuffled[i] = shuffled[rand];
        }
        shuffled[rand] = a[i];
    }
    return shuffled;
}

document.onkeydown = function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    // if(e && e.keyCode == 27)//esc
}

var slider = document.getElementById('slideNum');
slider.min = 4;
slider.max = 18;
slider.step = 1;
slider.value = 4;

function sliderCallback() {
    var inputNum = document.getElementById('playerSetting');
    var p = Math.floor((slider.value-4) / 14 * 100);
    // var bg = 'linear-gradient(to right, #fab344 '+p+'%, white '+(100 - p)+'%, white)';
    // slider.style.background = bg;
    slider.style.backgroundSize = p + '% 100%';
    inputNum.value = slider.value;
    getNumOfPlayers();
}

function minus() {
    if(parseInt(slider.value) > 4){
        slider.value -= 1;
        sliderCallback();
    }
}

function plus() {
    if(parseInt(slider.value) < 18){
        slider.value = parseInt(slider.value) + 1;
        sliderCallback();
    }
}