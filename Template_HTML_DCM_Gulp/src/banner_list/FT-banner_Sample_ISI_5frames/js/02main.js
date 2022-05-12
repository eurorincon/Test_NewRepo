
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
    const t_d = 0.4; // time of duration 
    const t_r = '+=1.9'; // time of reding frame
    tl.addLabel('f1')
      .set([txtBox1, txtBox2, txtBox3, txtBox4, leftBoxFF, rightBoxFF, ctaBox, legal_BoxFF, btnLegal, legal_Box01, legal_Box02, legal_Box03, legal_Box04, bg04], {autoAlpha:0})
      .set([txtBox1, txtBox2, txtBox3, txtBox4, leftBoxFF], {x:-300})
      .set([bg01, bg02, bg03, rightBoxFF], {x:300})

      .to([txtBox1, legal_Box01], { duration: t_d, stagger:0.2, x: 0, autoAlpha: 1, ease: "power2.out"}, "f1+=0.4")

    // FRAME 2
      .addLabel('f2', t_r)
      .to(txtBox1, {duration: t_d, x:300, ease: "power2.out"}, "f2")
      .to(legal_Box01, { duration: t_d, autoAlpha:0, ease: "power2.out"}, "f2")
      .to([txtBox2, bg01, legal_Box02], { duration: t_d, stagger:0.2, x: 0, autoAlpha: 1, ease: "power2.out"}, "f2")
      
      // FRAME 3
      .addLabel('f3', t_r)
      .to(txtBox2, {duration: t_d, x:-300, ease: "power2.out"}, "f3")
      .to(legal_Box02, {duration: t_d, autoAlpha:0, ease: "power2.out"}, "f3")
      .to(bg01, {duration: t_d, x:300, ease: "power2.in"}, "f3")
      .to([txtBox3, bg02, legal_Box03], { duration: t_d, stagger:0.2, x: 0, autoAlpha: 1, ease: "power2.out"}, "f3+=0.5")
      
      // FRAME 4
      .addLabel('f4', t_r)
      .to(txtBox3, {duration: t_d, x:-300, ease: "power2.out"}, "f4")
      .to(legal_Box03, {duration: t_d, autoAlpha:0, ease: "power2.out"}, "f4")
      .to(bg02, {duration: t_d, x:300, ease: "power2.in"}, "f4")
      .to([txtBox4, bg03, legal_Box04], { duration: t_d, stagger:0.2, x: 0, autoAlpha: 1, ease: "power2.out"}, "f4+=0.5")
      
      // FF
      .addLabel('ff', t_r)
      .to(legal_Box04, {duration: t_d, autoAlpha:0, ease: "power2.in"}, "ff")
      .to(txtBox4, {duration: t_d, x:-300, ease: "power2.in"}, "ff")
      .to(bg03, {duration: t_d, x:300, ease: "power2.in"}, "ff")
      
      .to(bg04, { duration: t_d, autoAlpha: 1, ease: "power2.in"}, "ff+=0.5")
      .to(leftBoxFF, { duration: t_d, x: 0, autoAlpha: 1, ease: "power2.out"}, "+=0")
      .to(rightBoxFF, { duration: t_d, x: 0, autoAlpha: 1, ease: "power2.out"}, "+=0")
      .to([ctaBox, [legal_BoxFF, btnLegal]], { duration: t_d, x: 0, stagger: 0.2, autoAlpha: 1, ease: "power2.out"}, "+=0.5")

    // CTA HOVER EFFECT
  ctaBtn.onmouseover = function () {
      // console.log("BTN CTA");
      // gsap.to(ctaShine, 0.6, { x: 250, onComplete: function () { gsap.to(ctaShine, 0, { x: 0 }); } });
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
    var colorBox = myFT.instantAds.cta_BoxColor;
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


