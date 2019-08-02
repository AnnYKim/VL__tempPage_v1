function goFullPage() {
  var fp = document.querySelector("#fullpage");
  new fullpage(fp, {
    licenseKey: '82FF7946-B75142E4-9395E39E-98EA9E2A', //DO NOT use this key for personal purpose. (개인소유 키이므로 다른 용도로 사용할 수 없습니다.)
    scrollingSpeed: 600,
    keyboardScrolling: true,
    easing: 'easeInOutQuint',
  });



}
var windowW = 0;
var loadImage = document.querySelector(".loadImage");
var loadBackground = document.querySelector(".loadBackground");

function getWindowW() {
  windowW = window.innerWidth;
  console.log("getWindowW", windowW);
}


// var box = document.querySelector(".titleLogo");
// console.log(box);

// TweenLite.to(sec2Lines[0], 2, {
//   top: '300px'
// });


function animation() {
  var body = document.body;
  var sec2Logo = document.querySelector(".section2 .smallLogo");
  var sec2Lines = document.querySelectorAll(".section2 .textLine");
  var sec3Text = document.querySelector(".section3-paraContainer")
  var sec3Lines = document.querySelectorAll(".section3-title .textLine");
  var sec3StrongLine1 = document.querySelector(".section3-strongLine.line1");
  var sec3StrongLine2 = document.querySelector(".section3-strongLine.line2");
  var sec3StrongText = document.querySelector(".section3-strongText");
  var sec1logoText = document.querySelectorAll(".logo--path");
  var titleLogo = document.querySelector(".titleLogo");
  var winkEye = document.querySelector(".eyes-wink");


  console.log(sec1logoText);

  var first = new TimelineLite();
  var tl_sec1 = new TimelineLite();
  var tl_sec2 = new TimelineLite();
  var tl_sec3 = new TimelineLite();


  var titleAnimation = {
    scale: 1,
    x: 0,
    autoAlpha: 1
  }

  first.addLabel("start").to(loadBackground, 0.4, {
      scale: '1.5',
      // width: '120%',
      // height: '120%',
      onComplete: function () {
        body.classList.add("go")
      }
    }).from(titleLogo, 1.5, {
      autoAlpha: 0,
    }, "start+=0.1")
    .from(titleLogo, 1.23, {
      // y: -30,
      scale: '0.93',
      ease: Bounce.easeOut,
    }, "start+=0.1").addLabel("title")
    .staggerFrom([sec1logoText[0], sec1logoText[1], sec1logoText[2], sec1logoText[3]], 0.4, {
      x: '-15px',
      autoAlpha: 0,
    }, 0.04)
    .staggerFrom([sec1logoText[4], sec1logoText[5], sec1logoText[6], sec1logoText[7]], 0.4, {
      x: '-15px',
      autoAlpha: 0,
    }, 0.04, "title+=0.2");

  // tl_sec1.addLabel("start", "0")
  //   .staggerFrom([sec1logoText[0], sec1logoText[1], sec1logoText[2], sec1logoText[3]], 0.4, {
  //     x: '-15px',
  //     autoAlpha: 0,
  //   }, 0.08)
  //   .staggerFrom([sec1logoText[4], sec1logoText[5], sec1logoText[6], sec1logoText[7]], 0.4, {
  //     x: '-15px',
  //     autoAlpha: 0,
  //   }, 0.08, "start+=0.3");


  tl_sec2.addLabel("start", "0").to(sec2Logo, 1, {
    autoAlpha: 1
  }).staggerTo([sec2Lines[0], sec2Lines[1], sec2Lines[2], sec2Lines[3], sec2Lines[4]], 0.7, titleAnimation, 0.16, "start+=0.3");

  tl_sec3
    .addLabel("start", "0")
    .staggerTo([sec3Lines[0], sec3Lines[1], sec3Lines[2]], 0.7, titleAnimation, 0.16)
    .to(sec3Text, 0.5, {
      autoAlpha: 1,
      y: 0,
    }, "start+=0.8")
    .to(sec3StrongLine1, 0.5, {
      width: '100vw',
      ease: Linear.easeNone
    }, "start+=1.1")
    .addLabel("line", "0").to(sec3StrongLine2, 0.2, {
      width: '100%',
      ease: Linear.easeNone
    }, "line+=1.6")
    .to(sec3StrongText, 0.37, {
      autoAlpha: 1,
      x: 0,
    }, "line+=1.6");

}

function init() {
  // goFullPage();
  animation();
  getWindowW();
  loadBackground.classList.add("ㅁㄴㅇㄹ")
  console.log("windowW:::", windowW);
  // loadBackground.style.width = windowW + "px";
  // loadBackground.style.height = windowW + "px";
  loadImage.style.display = "none";
}


document.addEventListener("DOMContentLoaded", goFullPage);
document.addEventListener("DOMContentLoaded", getWindowW);
window.addEventListener("load", init);
window.addEventListener("resize", getWindowW);