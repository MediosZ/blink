console.log("blink")
var blinkAction = function (el) {
  el.classList.add('blink');
  el.addEventListener("webkitAnimationEnd", function () {
    el.classList.remove('blink');
    
  }, false);
}

function doBlink() {
  setTimeout(function () {
    var node = document.getElementById("eye")
    console.log("start blink")
    blinkAction(node)
  }, 500);
}

doBlink()
setTimeout(()=>{
  doBlink()
}, 500)