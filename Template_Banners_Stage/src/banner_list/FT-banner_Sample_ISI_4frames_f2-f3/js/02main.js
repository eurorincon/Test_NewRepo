
App_banner.fn.step1 = function () {

    // global variables
  let tl = new gsap.timeline();
  const ctaBtn = $('.ctaContainer');
  const btnLegal = $('.btn_legal');
    const isi = $('.isi');
    const isiMain = $('.isi-main');

    // debug animation from console
    window.tl = tl;

  function isPassive() {
    var supportsPassiveOption = false;
    try {
      addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassiveOption = true;
        }
      }));
    } catch (e) { }
    return supportsPassiveOption;
  }
  var myScroll;
  function loadedISI() {
    myScroll = new IScroll('#isi_wrapper', {
      scrollX: true,
      scrollY: true,
      scrollbars: 'custom',
      mouseWheel: true,
      scrollbars: true,
      interactiveScrollbars: true,
      click: true
    });
  }
  document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
    capture: false,
    passive: false
  } : false);


    // main animation
    tl.addLabel('f1')
      .set([txtBox1, 
        legal_Box01, 
        legal_Box02, 
        legal_Box03,
        txtBox2, 
        txtBox3, 
        leftBoxFF, 
        rightBoxFF, 
        ctaBox, 
        legal_BoxFF,
        btnLegal
      ], {autoAlpha:0})
      .set([txtBox1, txtBox2, txtBox3, leftBoxFF], {x:-300})
      .set([bg01, bg02, rightBoxFF], {x:300})

      .to([txtBox1, legal_Box01], { duration: 0.5, stagger:.2, x: 0, autoAlpha: 1, ease: "power2.out"}, "f1+=.5")
      // .to(legal_Box01, { duration: 0.5, x: 0, autoAlpha: 1, ease: "power2.out"}, "f1+=1")

    // FRAME 2
      .addLabel('f2','+=2.6')
      .to(txtBox1, {duration:0.5, x:300, ease: "power2.out"}, "f2")
      .to(legal_Box01, { duration: .5, autoAlpha:0, ease: "power2.out"}, "f2")
      .to([txtBox2, bg01, legal_Box02], { duration: 0.5, stagger: .2, x: 0, autoAlpha: 1, ease: "power2.out"}, "f2")
      
      // FRAME 3
      .addLabel('f3','+=2.6')
      // .to(txtBox2, {duration:0.5, x:-300, ease: "power2.out"}, "f3")
      .to(legal_Box02, {duration:0.5, autoAlpha:0, ease: "power2.out"}, "f3")
      .to(bg01, {duration:0.5, x:300, ease: "power2.in"}, "f3")
      .to([bg02, legal_Box03], { duration: 0.5, stagger: .2, x: 0, autoAlpha: 1, ease: "power2.out"}, "f3+=.5")
      // .to(txtBox3, { duration: 0.5, x: 300, ease: "power2.out" }, "f3")
      // .to(legal_Box03, { duration: 0.5, x: 0, autoAlpha: 1, ease: "power2.out"}, "+=0")
      
      // FF
      .addLabel('ff','+=2.6')
      .to(legal_Box03, {duration:0.5, autoAlpha:0, ease: "power2.in"}, "ff")
      .to(txtBox2, {duration:0.5, x:-300, ease: "power2.in"}, "ff")
      .to(bg02, {duration:0.5, x:300, ease: "power2.in"}, "ff")
      .to(leftBoxFF, { duration: 0.5, x: 0, autoAlpha: 1, ease: "power2.out"}, "+=0")
      .to(rightBoxFF, { duration: 0.5, x: 0, autoAlpha: 1, ease: "power2.out"}, "+=0")
      .to(ctaBox, { duration: 0.5, x: 0, autoAlpha: 1, ease: "power2.out"}, "+=.5")
      .to(legal_BoxFF,  { duration: 0.5, x: 0, autoAlpha: 1, ease: "power2.out"}, "+=0")
      .to(btnLegal, { duration: 0.5, x: 0, autoAlpha: 1, ease: "power2.out"}, "+=0")

    // CTA HOVER EFFECT
  ctaBtn.onmouseover = function () {
      // console.log("BTN CTA");
      //  gsap.to(ctaShine, 0.6, { x: 250, onComplete: function () { gsap.to(ctaShine, 0, { x: 0 }); } });
     };  
  // CTA HOVER EFFECT
  ctaHitClose.onclick = function () {
    gsap.to($(this), 0.3, { autoAlpha: 0 });
    gsap.to(legalBox, 0.3, { autoAlpha: 0 });
    gsap.to(ctaHitOpen, 0.3, { autoAlpha: 1 });
  };
  ctaHitOpen.onclick = function () {
    gsap.to($(this), 0.3, { autoAlpha: 0 });
    gsap.to(legalBox, 0.3, { autoAlpha: 1 });
    gsap.to(ctaHitClose, 0.3, { autoAlpha: 1 });
  };

  myFT.on('instantads', function () {
   
    // console.log("*** load ISI ***");
    var btnlegal = myFT.instantAds.btn_legal;
    var colorBox = myFT.instantAds.color_Box;
    var legalFF = myFT.instantAds.legal_txt_ff;

    if (btnlegal === '') {
      ctaHitOpen.classList.add('hide');
    } else {
      loadedISI();
      legal_BoxFF.classList.add('hide');

    }
    // if (legalFF === '') {
    //   legal_BoxFF.classList.add('hide');
    // } else {
    //   loadedISI();
    // }

    if (colorBox === 'green') {
      ctaTxt.classList.add('cta_green');
    } if (colorBox === 'yellow') {
      ctaTxt.classList.add('cta_yellow');
    } else {
      ctaTxt.classList.add('cta_red');
    } 
      });

};

  

//SET IDS IN DOM TO GLOBAL VARIABLES
function IDsToVars(){
  const allElements = document.getElementsByTagName("id");
  
  for (let q = 0; q<allElements.length; q++){
     const el = allElements[q];
     if (el.id){
      window[el.id]=document.getElementById(el.id);
    }
  }
};


