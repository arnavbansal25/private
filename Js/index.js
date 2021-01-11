var fg, bg, com_;
var can1 = document.getElementById("c1");
var can2 = document.getElementById("c2");
var can3 = document.getElementById("c3");
var can4 = document.getElementById("c4");
var can5 = document.getElementById("c5");
var can6 = document.getElementById("c6");

var fg_img = null, bg_img = null;
var out_img = null, com_img = null;
var fg_img_new = null, bg_img_new = null;
var encr_img = null, decr_img = null;

var key = 50;
/*
function encryptAES(pix) {
  var password = $('password').value;
  var s = RawDeflate.deflate(canvasArrToString(pix));
  var encrypted = CryptoJS.AES.encrypt(s, password);
  console.log(encrypted.toString())
  var image = new Image();
  image.src = "data:image/png;base64," + btoa(encrypted.toString());
  can2.getContext('2d').putImageData(image.src, 0, 0);
}
*/

function fgupload() {
  clear_canvas(can1);
  clear_canvas(can3);
  fg = document.getElementById("fgchoose");
  fg_img = new SimpleImage(fg);
  fg_img.drawTo(can1);
  document.getElementById("p1").style.visibility = "hidden";
  document.getElementById("p3").style.visibility = "visible";
}

function bgupload() {
  clear_canvas(can2);
  clear_canvas(can3);
  bg = document.getElementById("bgchoose");
  bg_img = new SimpleImage(bg);
  bg_img.drawTo(can2);
  document.getElementById("p2").style.visibility = "hidden";
  document.getElementById("p3").style.visibility = "visible";
}

function combine() {
  if (fg_img == null) {
    alert("Foreground Image not found!");
    return;
  }
  if (!fg_img.complete()) {
    alert("Foreground Image loading!");
    return;
  }
  if (bg_img == null) {
    alert("Background Image not found!");
    return;
  }
  if (!bg_img.complete()) {
    alert("Background Image loading!");
    return;
  }

  var w, h;
  if (fg_img.getWidth() > bg_img.getWidth())
    w = bg_img.getWidth();
  else
    w = fg_img.getWidth();
  if (fg_img.getHeight() > bg_img.getHeight())
    h = bg_img.getHeight();
  else
    h = fg_img.getHeight();

  fg_img.setSize(w, h);
  bg_img.setSize(w, h);
 
  //alert(fg_img.getWidth());
  //alert(fg_img.getHeight());
  //alert(bg_img.getWidth());
  //alert(bg_img.getHeight());

  // encryption
  encr_img = new SimpleImage(bg_img.getWidth(), bg_img.getHeight());
  
  for(var pi of bg_img.values()){
    encr_img.setPixel(pi.getX(),pi.getY(),pi);
  }

  for(var pi of encr_img.values()){
    var r1 = pi.getRed();
    var g1 = pi.getGreen();
    var b1 = pi.getBlue();

    r1 = (r1+key)%256;
    g1 = (g1+key)%256;
    b1 = (b1+key)%256;

    pi.setRed(r1);
    pi.setGreen(g1);
    pi.setBlue(b1);
  }

  out_img = new SimpleImage(fg_img.getWidth(), fg_img.getHeight());

  for(var pi of fg_img.values()){
    out_img.setPixel(pi.getX(),pi.getY(),pi);
  }

  for (var pi of out_img.values()) {
    var r1 = pi.getRed();
    var g1 = pi.getGreen();
    var b1 = pi.getBlue();
    
    var r2 = encr_img.getPixel(pi.getX(),pi.getY()).getRed();
    var g2 = encr_img.getPixel(pi.getX(),pi.getY()).getGreen();
    var b2 = encr_img.getPixel(pi.getX(),pi.getY()).getBlue();
    
    var r3 = (Math.floor(r1/16))*16 + Math.floor(r2/16);
    var g3 = (Math.floor(g1/16))*16 + Math.floor(g2/16);
    var b3 = (Math.floor(b1/16))*16 + Math.floor(b2/16);
    
    pi.setRed(r3);
    pi.setGreen(g3);
    pi.setBlue(b3);
  }
  
  out_img.drawTo(can3);
  document.getElementById("p3").style.visibility = "hidden";
  
  fg_img = new SimpleImage(fg);
  bg_img = new SimpleImage(fg);

  document.getElementById("download_btn").setAttribute('download', "combined");
}

function download_img(e) {
  if (fg_img == null) {
    alert("Foreground Image not found!");
    return;
  }
  if (!fg_img.complete()) {
    alert("Foreground Image loading!");
    return;
  }
  if (bg_img == null) {
    alert("Background Image not found!");
    return;
  }
  if (!bg_img.complete()) {
    alert("Background Image loading!");
    return;
  }
  var img = can3.toDataURL("image/png");
  e.href = img;
}

function com_upload(){
  clear_canvas(can5);
  clear_canvas(can6);
  com_ = document.getElementById("img");
  com_img = new SimpleImage(com_);
  com_img.drawTo(can4);
  document.getElementById("p4").style.visibility = "hidden";
  document.getElementById("p5").style.visibility = "visible";
  document.getElementById("p6").style.visibility = "visible";
}


    var r_fg = Math.floor(r/16)*16;
    var g_fg = Math.floor(g/16)*16;
    var b_fg = Math.floor(b/16)*16;

    pi.setRed(r_fg);
    pi.setGreen(g_fg);
    pi.setBlue(b_fg);
  }

  for(var pi of bg_img_new.values()){
    var r = com_img.getPixel(pi.getX(),pi.getY()).getRed();
    var g = com_img.getPixel(pi.getX(),pi.getY()).getGreen();
    var b = com_img.getPixel(pi.getX(),pi.getY()).getBlue();

    var r_bg = (r - (Math.floor(r/16)*16) )*16;
    var g_bg = (g - (Math.floor(g/16)*16) )*16;
    var b_bg = (b - (Math.floor(b/16)*16) )*16;

    pi.setRed(r_bg);
    pi.setGreen(g_bg);
    pi.setBlue(b_bg);
  }

  decr_img = new SimpleImage(bg_img_new.getWidth(), bg_img_new.getHeight());

  for(var pi of bg_img_new.values()){
    decr_img.setPixel(pi.getX(),pi.getY(),pi);
  }

  for(var pi of decr_img.values()){
    var r1 = pi.getRed();
    var g1 = pi.getGreen();
    var b1 = pi.getBlue();

    r1 = (r1-key+256)%256;
    g1 = (g1-key+256)%256;
    b1 = (b1-key+256)%256;

    pi.setRed(r1);
    pi.setGreen(g1);
    pi.setBlue(b1);
  }

  fg_img_new.drawTo(can5);
  document.getElementById("p5").style.visibility = "hidden";
  decr_img.drawTo(can6);
  document.getElementById("p6").style.visibility = "hidden";

  com_img = new SimpleImage(com_);
}

function clear_canvas(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}