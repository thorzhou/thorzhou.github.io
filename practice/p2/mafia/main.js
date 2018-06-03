var playerIdentityList = new Array();

function setNumOfPlayer(){
    var num = document.getElementById('playerSetting').value;
    var killer = document.getElementById('numOfKiller');
    var civilian = document.getElementById('numOfCivilian');
    playerIdentityList.splice(0,playerIdentityList.length);
    var reg = /^\d{1,2}$/;
    num = num.replace(/\s/g, "");
    if (reg.test(num)) {
        if(num < 4 || num > 18)
        {
            alert('请输入正确的玩家人数');
            return;
        }
    }else{
        alert('请输入正确的玩家人数');
        return;
    }
    var kn = Math.floor(num/3);
    killer.innerHTML = '杀手'+ kn + ' 人';
    civilian.innerHTML = '平民' + (num-kn) + ' 人';
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