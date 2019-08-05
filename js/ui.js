(function () {
  var windowW = 0;
  var loadImage = document.querySelector(".loadImage");
  var loadBackground = document.querySelector(".loadBackground");
  var tl_sec1 = new TimelineLite();
  var tl_sec2 = new TimelineLite({
    paused: true
  });
  var tl_sec3 = new TimelineLite({
    paused: true
  });

  function goFullPage() {
    var fp = document.querySelector("#fullpage")
    var key = '82FF7946-B75142E4-9395E39E-98EA9E2A'; //DO NOT use this key for personal purpose. (개인소유 키이므로 다른 용도로 사용할 수 없습니다.)
    new fullpage(fp, {
      licenseKey: key,
      scrollingSpeed: 600,
      keyboardScrolling: true,
      onLeave: function (origin, destination, direction) {
        if (origin.index == 0 && direction == 'down') {
          tl_sec2.play(); //2번째 페이지 애니메이션 실행
        }
        if (origin.index == 1 && direction == 'down') {
          tl_sec3.play(); //3번째 페이지 애니메이션 실행
        }
      }
    });
    fullpage_api.setAllowScrolling(false); //최초 로드 시 스크롤 불가
    fullpage_api.moveTo(0); //최초 로드 시 번째 페이지로
  }

  function getWindowW() {
    windowW = window.innerWidth;
  }

  function animation() {
    var body = document.body;
    var sec1logoText = document.querySelectorAll(".logo--path"); //섹션1 로고(텍스트)
    var titleLogo = document.querySelector(".titleLogo"); //섹션1 로고 전체
    var vidoriEyes = document.querySelectorAll(".vidoriEyes"); //섹션1 로고의 비도리 눈
    var sec2Logo = document.querySelector(".section2 .smallLogo"); //섹션2 작은 로고
    var sec2Lines = document.querySelectorAll(".section2 .textLine"); //섹션2 텍스트
    var sec3Text = document.querySelector(".section3-paraContainer") //섹션3 큰 텍스트
    var sec3Lines = document.querySelectorAll(".section3-title .textLine"); //섹션3 문단
    var sec3StrongLine1 = document.querySelector(".section3-strongLine.line1"); //섹션3 형광펜 마커(1)
    var sec3StrongLine2 = document.querySelector(".section3-strongLine.line2"); //섹션3 형광펜 마커(2)
    var sec3StrongText = document.querySelector(".section3-strongText"); //섹션3 형광펜 위의 굵은 글
    var titleAnimation = {
      scale: 1,
      x: 0,
      autoAlpha: 1
    }

    // *** Section 1 Animation ***
    tl_sec1
      .addLabel("start")
      .to(loadBackground, 0.4, { //검은색 배경 확대
        scale: '1.5',
        onComplete: function () {
          body.classList.add("pageStart")
        }
      }).from(titleLogo, 1.4, { //로고 페이드인
        autoAlpha: 0,
      }, "start+=0.05")
      .from(titleLogo, 1.2, { //로고 바운싱
        scale: '0.9',
        ease: Bounce.easeOut,
        onComplete: function () {
          fullpage_api.setAllowScrolling(true); //스크롤 가능케 설정
        }
      }, "start+=0.05")
      .addLabel("title") //타이틀 페이드인 이벤트 시작
      .staggerFrom([sec1logoText[0], sec1logoText[1], sec1logoText[2], sec1logoText[3]], 0.35, {
        x: '-15px',
        autoAlpha: 0,
      }, 0.03, "start+=1.3")
      .staggerFrom([sec1logoText[4], sec1logoText[5], sec1logoText[6], sec1logoText[7]], 0.35, {
        x: '-15px',
        autoAlpha: 0,
        onComplete: function () {
          vidoriEyes.forEach(function (el) { //타이틀 등장 후 눈깜빡거림 이벤트 시작
            el.classList.remove("eye-wink"); //Stop Wink!
            el.classList.add("eye-blink");
          });
        }
      }, 0.03, "title+=0");

    // *** Section 2 Animation ***
    tl_sec2
      .addLabel("start", "0")
      .to(sec2Logo, 1, { //섹션2 로고 등장
        autoAlpha: 1
      })
      .staggerTo([sec2Lines[0], sec2Lines[1], sec2Lines[2], sec2Lines[3], sec2Lines[4]], 0.7,
        titleAnimation, 0.16, "start+=0.3"); //섹션2 텍스트 등장

    // *** Section 3 Animation ***
    tl_sec3
      .addLabel("start", "0")
      .staggerTo([sec3Lines[0], sec3Lines[1], sec3Lines[2]], 0.7, titleAnimation, 0.16)
      .to(sec3Text, 0.5, { //섹션3 큰 텍스트 등장
        autoAlpha: 1,
        y: 0
      }, "start+=0.8")
      .to(sec3StrongLine1, 0.5, { //섹션3 형광펜 마커 긋기
        width: '100vw',
        ease: Linear.easeNone
      }, "start+=0.9")
      .addLabel("line", "0")
      .to(sec3StrongLine2, 0.25, {
        width: '100%',
        ease: Linear.easeNone
      }, "line+=1.38")
      .to(sec3StrongText, 0.44, { //섹션3 텍스트 문단 올라오기
        autoAlpha: 1,
        x: 0,
      }, "line+=1.42");

  }

  function init() {
    getWindowW();
    animation();
    loadImage.style.display = "none";
  }


  document.addEventListener("DOMContentLoaded", goFullPage);
  document.addEventListener("DOMContentLoaded", getWindowW);
  window.addEventListener("load", init);
  window.addEventListener("resize", getWindowW);
}());