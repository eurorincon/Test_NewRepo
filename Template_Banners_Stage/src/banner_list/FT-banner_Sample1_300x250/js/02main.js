
App_banner.fn.step1 = function () {

    //var caja1 = getElementById("#txtBox1");
    // global variables
    var tl  = new TimelineLite();
    var ctaBtn   = $('#ctaBtn');

    window.tl = tl;

    // main animation
    tl.addLabel('f1','+=0')
      .set(frame1,{autoAlpha:1})
      .set([frame2, finalFrame, legalBox, ctaBox, btn_disc],{autoAlpha:0})
        // .set([bg01, bg02], {autoAlpha:1})
        .set([bigBox1, txtBox1, bigBox2,txtBox3], {x:-300})
        .set(bigBox3, {x:300})

        .staggerTo([bigBox1, txtBox1], .5, {x:0, ease: Power2.easeOut}, .5, 'f1+=1')

      .addLabel('f2','+=2')
        .to(bg01, 1, {autoAlpha:0, ease: Power2.easeOut},'f2')
        .to(frame2, .5, {autoAlpha:1, ease: Power2.easeOut},'f2')
        .to([bigBox1, txtBox1], .8, {x:-300, ease: Power2.easeOut}, "f2+=0")
        .to(bigBox2, .8, { x: 0, ease: Power2.easeOut }, 'f2+=0')

      .addLabel('ff','+=2')
        .set(finalFrame,{autoAlpha:1}, 'ff')
        .to(bigBox2, .8, {x:-300, ease: Power2.easeOut}, 'ff+=0')
        .to(bg02, 1, { autoAlpha: 0 }, 'ff+=0')
        .to([bigBox3, txtBox3], .5, {x:0, ease: Power2.easeOut}, 'ff+=1')
        .staggerTo([legalBox, ctaBox, btn_disc], 1, {autoAlpha:1, ease: Power2.easeOut}, .5, )
        .to(ctaShine, 1, { x: 280, onComplete: function () { TweenLite.to(ctaShine, 0, { x: 0 }); } }, '+=1')
 
    // CTA HOVER EFFECT
    ctaHit.onmouseover = function () {
       TweenLite.to(ctaShine, .6, { x: 280, onComplete: function () { TweenLite.to(ctaShine, 0, { x: 0 }); } });
     };  
     myFT.on('instantads', function () {
       var btnlegal = myFT.instantAds.btn_legal;
       var txt_01_b = myFT.instantAds.eye_brow_01_line2;
       if (btnlegal === '') {
         btn_disc.classList.add('hide');
       }
       if (txt_01_b == '') {
        txtBox1.classList.add('hide');
      };
     });
};
// ****************************************
// CTA Disclamer Box
function legalDisc() {
  TweenLite.to([legalBox, legal_close], 0.6, { autoAlpha: 1 });
  TweenLite.to(btn_disc, 0.6, { autoAlpha: 0 });
};
function legalClose() {
  TweenLite.to([legalBox, legal_close], 0.6, { autoAlpha: 0 });
  TweenLite.to(btn_disc, 0.6, { autoAlpha: 1 });
};
//SET IDS IN DOM TO GLOBAL VARIABLES
function IDsToVars(){
  var allElements = document.getElementsByTagName("id");
  for (var q = 0; q<allElements.length; q++){
     var el = allElements[q];
     if (el.id){
      window[el.id]=document.getElementById(el.id);
    }
  }
};