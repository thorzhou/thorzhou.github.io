var myImage = document.querySelector('img');
myImage.onclick = function(){
    var mySrc = myImage.getAttribute('src');
    myImage.setAttribute('width','500px');
    if (mySrc === 'images/self.jpg') {
        myImage.setAttribute('src','images/dog.jpg');
    }else{
        myImage.setAttribute('src','images/self.jpg');
    }
}
var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');

function SetUserName() {
    var myName = prompt('Please enter your name.');
    localStorage.setItem('name',myName);
    myHeading.innerHTML = 'Mozilla is cool, '+ myName;
}
if (!localStorage.getItem('name')) {
    SetUserName();
} else {
    var storedName = localStorage.getItem('name');
    myHeading.innerHTML = 'Mozilla is cool, '+ storedName;
}
myButton.onclick = function(){
    SetUserName();
}