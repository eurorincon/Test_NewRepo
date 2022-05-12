App_banner.fn.step1 = function () {

  // global variables
  let tl = new gsap.timeline();
  const ctaBtn = $('.ctaContainer');
  const btnLegal = $('.btn_legal');

  // debug animation from console
  window.tl = tl;

  myFT.on('instantads', function () {

    const btnlegal = myFT.instantAds.btn_legal;
    const colorBox = myFT.instantAds.cta_BoxColor;
    const legalFF = myFT.instantAds.legal_txt_ff;
   
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
    }
    if (colorBox === 'yellow') {
      ctaTxt.classList.add('cta_yellow');
    } else {
      ctaTxt.classList.add('cta_red');
    }

  });
    // main animation
    const t_d = 0.4; // time of duration 
    const t_r = '+=1.9'; // time of reding frame

    function scene1() {
      let tl = gsap.timeline();
      tl.addLabel('f1') // build scene 1
        .set([txtBox1, txtBox2, txtBox3, txtBox4, leftBoxFF, rightBoxFF, ctaBox, legal_BoxFF, btnLegal, legal_Box01, legal_Box02, legal_Box03, legal_Box04, bg04], {
          autoAlpha: 0
        })
        .set([txtBox1, txtBox2, txtBox3, txtBox4, leftBoxFF], {
          x: -300
        })
        .set([bg01, bg02, bg03, rightBoxFF], {
          x: 300
        })

        .to([txtBox1, legal_Box01], {
          duration: t_d,
          stagger: 0.2,
          x: 0,
          autoAlpha: 1,
          ease: "power2.out"
        }, "f1+=0.4")

        .to(txtBox1, {
          duration: t_d,
          x: 300,
          ease: "power2.out"
        }, "f1+=2")
        .to(legal_Box01, {
          duration: t_d,
          autoAlpha: 0,
          ease: "power2.out"
        }, "f1+=2")

      return tl;
    }

    function scene2() {
      let tl = gsap.timeline();
      tl.addLabel('f2') // build scene 2
        .to([txtBox2, bg01, legal_Box02], {
          duration: t_d,
          stagger: 0.2,
          x: 0,
          autoAlpha: 1,
          ease: "power2.out"
        }, "f2")
        .to(txtBox2, {
          duration: t_d,
          x: -300,
          ease: "power2.out"
        }, "f2+=2")
        .to(legal_Box02, {
          duration: t_d,
          autoAlpha: 0,
          ease: "power2.out"
        }, "f2+=2")
        .to(bg01, {
          duration: t_d,
          x: 300,
          ease: "power2.in"
        }, "f2+=2");

      return tl;
    }

    function scene3() {
      let tl = gsap.timeline();
      tl.addLabel('f3') // build scene 3
        .to([txtBox3, bg02, legal_Box03], {
          duration: t_d,
          stagger: 0.2,
          x: 0,
          autoAlpha: 1,
          ease: "power2.out"
        }, "f3+=0.5")
        .to(txtBox3, {
          duration: t_d,
          x: -300,
          ease: "power2.out"
        }, "f3+=2")
        .to(legal_Box03, {
          duration: t_d,
          autoAlpha: 0,
          ease: "power2.out"
        })
        .to(bg02, {
          duration: t_d,
          x: 300,
          ease: "power2.in"
        }, "-=.5");
      return tl;
    }

    function scene4() {
      let tl = gsap.timeline();
      tl.addLabel('f4') // build scene 4
        .to([txtBox4, bg03, legal_Box04], {
          duration: t_d,
          stagger: 0.2,
          x: 0,
          autoAlpha: 1,
          ease: "power2.out"
        }, "f4+=0.5")
        .to(legal_Box04, {
          duration: t_d,
          autoAlpha: 0,
          ease: "power2.in"
        }, "f4+=2")
        .to(txtBox4, {
          duration: t_d,
          x: -300,
          ease: "power2.in"
        });

      return tl;
    }

    function scene5() {
      let tl = gsap.timeline();
      tl.addLabel('ff') // build scene FF
        .to(bg03, {
          duration: t_d,
          x: 300,
          ease: "power2.in"
        }, "ff")

        .to(bg04, {
          duration: t_d,
          autoAlpha: 1,
          ease: "power2.in"
        }, "ff+=0.5")
        .to(leftBoxFF, {
          duration: t_d,
          x: 0,
          autoAlpha: 1,
          ease: "power2.out"
        }, "+=0")
        .to(rightBoxFF, {
          duration: t_d,
          x: 0,
          autoAlpha: 1,
          ease: "power2.out"
        }, "+=0")
        .to([ctaBox, [legal_BoxFF, btnLegal]], {
          duration: t_d,
          x: 0,
          stagger: 0.2,
          autoAlpha: 1,
          ease: "power2.out"
        }, "+=0.5")

      return tl;
    }
  function runScenes() {
    var dyn2 = new FTDynamicElement();
    dyn2 = myFT.instantAds.run_Scenes;
    listScenes = dyn2.split(',').map(Number);
    tl.add(scene1(), "+=0")
      for (let i = 0; i <= listScenes.length-1; i++) {
        if (listScenes[i] === 2) {
          tl.add(scene2(), "-=0.5")
        }
        if (listScenes[i] === 3) {
          tl.add(scene3(), "-=0.5")
        }
        if (listScenes[i] === 4) {
          tl.add(scene4(), "-=0.5")
        }
      }
      tl.add(scene5(), "-=0.5");
      return tl;
  }
  runScenes();
  // 
  // CTA HOVER EFFECT
  // ctaBtn.onmouseover = function () {
  //   // console.log("BTN CTA");
  //   gsap.to(ctaShine, 0.6, { x: 250, onComplete: function () { gsap.to(ctaShine, 0, { x: 0 }); } });
  // };
  // CTA HOVER EFFECT
  ctaHitClose.onclick = function () {
    gsap.to([$(this),legalBox], 0.3, {autoAlpha: 0});
    gsap.to(ctaHitOpen, 0.3, {autoAlpha: 1});
  };
  ctaHitOpen.onclick = function () {
    gsap.to($(this), 0.3, {autoAlpha: 0});
    gsap.to([legalBox, ctaHitClose], 0.3, {autoAlpha: 1});
  };

  // Start iScroll functions *************************
    var myScroll;
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
    document.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, isPassive() ? {
      capture: false,
      passive: false
    } : false);
  // End iScroll functions *************************

};

//SET IDS IN DOM TO GLOBAL VARIABLES
function IDsToVars() {
  const allElements = document.getElementsByTagName("id");

  for (let q = 0; q < allElements.length; q++) {
    const el = allElements[q];
    if (el.id) {
      window[el.id] = document.getElementById(el.id);
    }
  }
};