var orig;
var can1 = document.getElementById("c1");
var can2 = document.getElementById("c2");
var can3 = document.getElementById("c3");

var orig_img = null;
var encr_img = null, decr_img = null;

var key = 50;

function upload() {
  clear_canvas(can2);
  clear_canvas(can3);
  orig = document.getElementById("imgchoose");
  orig_img = new SimpleImage(orig);
  orig_img.drawTo(can1);
  document.getElementById("p1").style.visibility = "hidden";
  document.getElementById("p2").style.visibility = "visible";
  document.getElementById("p3").style.visibility = "visible";
}