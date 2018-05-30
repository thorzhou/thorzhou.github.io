function btnStart(e) {
    timerHandler = setInterval(change,1000);
}
function btnStop(e) {
    clearInterval(timerHandler);
    resetColor();
}

var lat = document.getElementsByClassName('box');//this is htmlCollection, not an array

function getRandomList(){
    var sourceList = [0,1,2,3,4,5,6,7,8];
    var indexList = [];
    for (var index = 0; index < 3; index++) {
        var ind = Math.floor(Math.random() * sourceList.length);
        indexList.push(sourceList[ind]);
        sourceList.splice(ind,1);
    }
    console.log(indexList);
    return indexList;
}

function getRandomColor(){
    return 'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
}

function change(){
    resetColor();
    var nl = getRandomList();
    for (var i = 0; i < 3; i++) {
        lat.item(nl[i]).style.background = getRandomColor();
    }
}

function resetColor() {
    for (var index = 0; index < lat.length; index++) {
        lat.item(index).style.background = 'moccasin';
    }
}

var timerHandler;