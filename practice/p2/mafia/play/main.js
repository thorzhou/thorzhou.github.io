const idMap = {
    'Civilian':'平民',
    'Killer':'杀手'
};
var index = 0;
var idList,$num,$hidePage,$showPage,$idText,$btn;
var state = false;

$(document).ready(function () {
    idList = getIdList();
    $num = $("#numCircle");
    $hidePage = $("#hidePage");
    $showPage = $("#showPage");
    $idText = $("#showPage h2");
    $btn = $("#btn-next");
    $btn.click(toggleState);
});

var end=false;
function toggleState() {
    if (state){
        state = false;
        if (end) {
            $btn.off();
            navToJudge();
            return;
        }
        $hidePage.css("visibility","visible");
        $showPage.css("visibility","hidden");
        $num.text(index + 1);
        $btn.text("查看"+(index+1)+"号身份");
    } else {
        state = true;
        $hidePage.css("visibility","hidden");
        $showPage.css("visibility","visible");
        $idText.text(idList[index]);
        if ((index+2) > idList.length){
            $btn.text("法官查看");
            end = true;
        }else{
            $btn.text("隐藏传给"+(++index+1)+"号");
        }
    }
}

function navToJudge() {
    $("#nav-text").text("法官日记");
    $btn.text("开始游戏");
    $num.remove();
    $("#box").remove();
    createJudgePanel();
    // $btn.click(function () {
    //     window.open("/");
    // })
}

function createJudgePanel() {
    var $panel = $("#judge-page");
    // for (let i = 0; i < idList.length; i++) {
    //     $panel.append("<div class=\"card\"><h3>"+idList[index]+"</h3><p>"+(index+1)+"号</p></div>")
    // }
    $.each(idList,function (i,value) {
        var str = "<div class='card'><h3>"+value+"</h3><p>"+(i+1)+"号</p></div>";
        $panel.append(str);
    })
}

function getIdList() {
    var idList = sessionStorage.getItem("playerIdentitiesList");
    idList= idList.split(',');
    idList.forEach(function (item,index) {
        idList[index] = idMap[item];
    });
    return idList;
}