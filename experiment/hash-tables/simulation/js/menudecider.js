document.getElementById('img3').style.visibility = 'hidden';
function clearstatus() {
    document.getElementById("status").innerHTML = "";
    document.getElementById("status").style.color = "black";
    document.getElementById("status1").innerHTML = "";
    document.getElementById("status1").style.color = "black";
    document.getElementById("status2").innerHTML = "";
    document.getElementById("status2").style.color = "black";
    document.getElementById("status3").innerHTML = "";
    document.getElementById("status3").style.color = "black";
}
function appearinsert() {
    clearstatus();

    document.getElementById('removebutton').style.backgroundColor = '#fff';
    document.getElementById('removebutton').style.color = '#2080bc';
    document.getElementById('searchbutton').style.backgroundColor = '#fff';
    document.getElementById('searchbutton').style.color = '#2080bc';
    document.getElementById('insertbutton').setAttribute("style", "border-color: grey");
    document.getElementById('removebutton').setAttribute("style", "border-color: #2080bc");
    document.getElementById('searchbutton').setAttribute("style", "border-color: #2080bc");
    document.getElementById('insertbutton').style.backgroundColor = 'grey';
    document.getElementById('insertbutton').style.color = '#fff';

    document.getElementById('middleinputdiv').style.display = 'none';
    document.getElementById('rightinputdiv').style.display = 'none';
    document.getElementById('leftinputdiv').style.display = 'block';
    document.getElementById('img3').style.visibility = 'hidden';
}
function appearsearch() {
    clearstatus();

    document.getElementById("status").innerHTML = "";
    document.getElementById("status").style.color = "black";

    document.getElementById('insertbutton').style.backgroundColor = '#fff';
    document.getElementById('insertbutton').style.color = '#2080bc';
    document.getElementById('removebutton').style.backgroundColor = '#fff';
    document.getElementById('removebutton').style.color = '#2080bc';
    document.getElementById('searchbutton').setAttribute("style", "border-color: grey");
    document.getElementById('insertbutton').setAttribute("style", "border-color: #2080bc");
    document.getElementById('removebutton').setAttribute("style", "border-color: #2080bc");
    document.getElementById('searchbutton').style.backgroundColor = 'grey';
    document.getElementById('searchbutton').style.color = '#fff';

    document.getElementById('middleinputdiv').style.display = 'block';
    document.getElementById('rightinputdiv').style.display = 'none';
    document.getElementById('leftinputdiv').style.display = 'none';
    document.getElementById('img3').style.visibility = 'hidden';

}
function appearremove() {
    clearstatus();

    document.getElementById("status").innerHTML = "";
    document.getElementById("status").style.color = "black";

    document.getElementById('insertbutton').style.backgroundColor = '#fff';
    document.getElementById('insertbutton').style.color = '#2080bc';
    document.getElementById('searchbutton').style.backgroundColor = '#fff';
    document.getElementById('searchbutton').style.color = '#2080bc';
    document.getElementById('removebutton').setAttribute("style", "border-color: grey");
    document.getElementById('insertbutton').setAttribute("style", "border-color: #2080bc");
    document.getElementById('searchbutton').setAttribute("style", "border-color: #2080bc");
    document.getElementById('removebutton').style.backgroundColor = 'grey';
    document.getElementById('removebutton').style.color = '#fff';

    document.getElementById('middleinputdiv').style.display = 'none';
    document.getElementById('leftinputdiv').style.display = 'none';
    document.getElementById('rightinputdiv').style.display = 'block';
    document.getElementById('img3').style.visibility = 'visible';

}

var handlers = function () {
document.getElementById("insertbutton").addEventListener("click", appearinsert);
document.getElementById("searchbutton").addEventListener("click", appearsearch);
document.getElementById("removebutton").addEventListener("click", appearremove);
}
handlers();
