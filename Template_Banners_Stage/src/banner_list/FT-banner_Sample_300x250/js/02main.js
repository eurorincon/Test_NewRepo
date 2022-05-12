
App_banner.fn.step1 = function () {

    // global variables
    let tl  = new TimelineLite();
    const ctaBtn   = $('#ctaBtn');

    // debug animation from console
    window.tl = tl;

    // main animation
    tl.addLabel('f1','+=0')
    // FRAME 1
      .set(txtBox1, { x: (-txtBox1.offsetWidth)})
      .set(bigBox2, { x: (-bigBox2.offsetWidth)})
      .set(txtBox2, { x: (-txtBox2.offsetWidth)})
      .set(bigBox3, { x: (-bigBox3.offsetWidth)})
      .set(txtBox3, { x: (-txtBox3.offsetWidth)})
      .set(bigBox4, { x: (-bigBox4.offsetWidth)})
      .set(txtBox4, { x: (-txtBox4.offsetWidth)})
      .set([legal_Box, ctaBox], { autoAlpha:0 })

      .to(txtBox1, .3, {x:0, ease: Power1.easeOut}, "f1+=.4")
      .to([logoBox, frame1], .5, {x:300, ease: Power2.easeOut}, "f1+=2.7")
      .staggerTo([txtBox2, bigBox2], .3, {x:0, ease: Power2.easeOut}, .1, "+=0")
      .to(bigBox2, .2, {scale:1.2, ease: Power3.easeOut}, "+=.2")
      .to(bigBox2, .2, {scale:1, ease: Power3.easeOut})
      
    // FRAME 2
      .addLabel('f2','+=2.5')
      .to([frame2, bg01], .8, {x:300, ease: Power2.easeOut}, "f2+=0")
      .to(txtBox3, .3, {x:0, ease: Power2.easeOut}, "+=0")
      .to(bigBox3, .3, {x:0, ease: Power2.easeOut}, "-=.3")
      .to(legal_Box, .3, {autoAlpha:1, ease: Power2.easeOut}, "+=0.1")
      
    // FRAME 3
      .addLabel('f3','+=2.5')
      .to([frame3, bg02], .8, {x:300, ease: Power2.easeOut}, "f3+=0")
      .staggerTo([txtBox4, bigBox4], .3, {x:0, ease: Power2.easeOut}, .1, "+=0")
      
    // FINAL-FRAME
      .addLabel('ff')
      .to(ctaBox, 1, {autoAlpha:1, ease: Power2.easeOut}, "f4")
      .to(ctaShine, 1, { x: 250, onComplete: function () { TweenLite.to(ctaShine, 0, { x: 0 }); } }, '+=1')

    // CTA HOVER EFFECT
    ctaHit.onmouseover = function () {
       TweenLite.to(ctaShine, 0.6, { x: 250, onComplete: function () { TweenLite.to(ctaShine, 0, { x: 0 }); } });
     };  
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