window.onload = function () {
    imgLocation("container","box");
    var imgData = {"data":[{"src":'14.jpg'},{"src":'15.jpg'},{"src":'16.jpg'},{"src":'17.jpg'},{"src":'18.jpg'},{"src":'19.jpg'},{"src":'20.jpg'},{"src":'21.jpg'},{"src":'22.jpg'},{"src":'23.jpg'},{"src":'24.jpg'},{"src":'25.jpg'},{"src":'26.jpg'},{"src":'27.jpg'},{"src":'28.jpg'},{"src":'29.jpg'},{"src":'30.jpg'}]}
    window.onscroll = function(){//监听滚轮
        if(checkFlag()){
            var cparent = document.getElementById("container");
            for(var i = 0;i<imgData.data.length;i++){
                var ccontent = document.createElement("div");
                ccontent.className = "box";
                cparent.appendChild(ccontent);
                var boximg = document.createElement("div");
                boximg.className="boximg";
                ccontent.appendChild(boximg);
                var img = document.createElement("img");
                img.src = "images/"+imgData.data[i].src;
                img.style.width = "400px";
                img.style.height = "auto";
                boximg.appendChild(img);
            }
            imgLocation("container","box");
        }
    }
}

function checkFlag(){
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent,"box");
    var lastHeight = ccontent[ccontent.length-1].offsetTop;
    var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
    var pageHeight = document.body.clientHeight||document.documentElement.clientHeight;
    if(lastHeight<scrollTop+pageHeight)
        return true;
}

function imgLocation(parent,content) {
    //将parent下所有的content全部取出
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent,content);
    // console.log(ccontent.length);
    var imgWidth = ccontent[0].offsetWidth;
    var cols = parseInt(document.documentElement.clientWidth/imgWidth);
    cparent.style.cssText = "width:"+imgWidth*cols+"px;margin:0 auto;";
    var boxHeightArr = [];
    for(var i = 0; i<ccontent.length;i++)
    {
        if(i<cols){
            boxHeightArr[i] = ccontent[i].offsetHeight;
        }else{
            var minheight = Math.min.apply(null,boxHeightArr);
            var minIndex = getminheightlocation(boxHeightArr,minheight);
            ccontent[i].style.position = "absolute";
            ccontent[i].style.top = minheight+"px";
            ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
            boxHeightArr[minIndex]+=ccontent[i].offsetHeight;
        }
    }
}

function getChildElement(parent,content) {
    var contentArr = [];
    var allcontent = parent.getElementsByTagName("*");
    for (var i = 0; i < allcontent.length; i++) {
        if(allcontent[i].className==content){
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}

function getminheightlocation(boxHeightArr,minheight){
    for(var i in boxHeightArr)
    {
        if(boxHeightArr[i] == minheight){
            return i;
        }
    }
}