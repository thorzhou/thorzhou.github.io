var idList = sessionStorage.getItem("playerIdentitiesList");

const idMap = {
    'Civilian':'平民',
    'Killer':'杀手'
};
idList= idList.split(',');
idList.forEach(function (item,index) {
    idList[index] = idMap[item];
})
console.log(idList);

$(document),ready(function () {
    $('#numCircle').innerText = 1;
})