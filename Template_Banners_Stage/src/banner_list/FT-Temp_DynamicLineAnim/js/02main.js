App_banner.fn.step1 = function () {
  myFT.on('instantads', function () {
    
    // Feed successfully loaded, setup content
    function fontAdapt() {
      //---------------------- Text shrink module to handle long words overflowing text areas ----------------------//
    let txt_shrink = $('.txt_shrink');
      txt_shrink.each(function() {
        while ( parseInt($(this).height()) >= parseInt($(this).parent().height()) || parseInt($(this).width()) >= parseInt($(this).parent().width()) ) {
          if ( parseInt($(this).height()) >= parseInt($(this).parent().height()) || parseInt($(this).width()) >= parseInt($(this).parent().width())) {
            $(this).css( "font-size", "-=1" );
          }
        }
      });
      //---------------------- End text shrink module to handle long words overflowing text areas ----------------------//
    }
    fontAdapt();

    function parraph_LbL() {
      //---------------------- Text line by line module to handle long words overflowing text areas ----------------------//
      $('.txt_anim__lbl').each(function() {
        let t_animLbL = $(this);
        let wordDef1 = t_animLbL.text().split('\n');
        t_animLbL.empty();

        $.each(wordDef1, function (i, line) {
          t_animLbL.append(
            '<span class="txtAnimLbL">' + line + '</span>'
          );
        });
      });
      //---------------------- End text line by line module to handle long words overflowing text areas ----------------------//
    }
    parraph_LbL();

    function parraph_WbW() {
      //---------------------- Text word by word module to handle long words overflowing text areas ----------------------//
      $('.txt_anim__wbw').each(function() {
        let t_animWbW = $(this);
        let wordDef = t_animWbW.text().split(' ');
        t_animWbW.empty();

        $.each(wordDef, function (i, word) {
          t_animWbW.append(
            '<span class="txtAnimWbW">' + word + `&nbsp;` + '</span>'
          );
        });
      });
      //---------------------- End text word by word module to handle long words overflowing text areas ----------------------//
    }
    parraph_WbW();
    
    function parraph_Letter() {
      //---------------------- Text shrink module to handle long words overflowing text areas ----------------------//
      $('.txt_anim__letter').each(function() {
        let t_animLetter = $(this);
        let wordDef2 = t_animLetter.text().split('');
        t_animLetter.empty();

        $.each(wordDef2, function (i, letter) {
          if (letter == ' ') {
            t_animLetter.append(
              '<span class="txtAnimLetter">&nbsp;</span>'
            );
          } else {
            t_animLetter.append(
              '<span class="txtAnimLetter">' + letter + '</span>'
            );
          }
        });
      });
      //---------------------- End text shrink module to handle long words overflowing text areas ----------------------//
    }
    parraph_Letter();

  });

  // global variables
  let tl = new gsap.timeline();
  const ctaBtn = $('.ctaContainer');
  const txtAnimLbL = $('.txtAnimLbL');
  const txtAnimWbW = $('.txtAnimWbW');
  const txtAnimLetter = $('.txtAnimLetter');
  const boxAnim2 = $('.txtBox2');
  const txtAnim2 = $('.txt_02');
  window.tl = tl;
    
  // main animation
  const t_d = 0.5; // time of duration 
  const t_r = '+=2.2'; // time of reding frame
  tl.addLabel('f1')
    .set([txtBox1a, qstnmrk, couts, bg01, txtAnimLbL, txtAnimWbW, boxAnim2], {autoAlpha:0})
    .set([txtBox1a, qstnmrk, couts], {scale:.2})
    .set([boxAnim2], {scale:.2})
    .set(txtBox2a, {x:90, y:20})
    .set(txtBox2b, {x:-26, y:30})
    .set(txtBox2c, {x:0, y:-15})
    .set(txtBox2d, {x:5, y:-55})
    .set(txtBox2e, {x:-110, y:-60})
    .set([txtAnimLbL], { x:250})
    .set([txtAnimWbW], { y:20, scaleY:0.2})
    
      .to([qstnmrk, couts], {autoAlpha:1, duration: t_d,scale:1, ease:"back.out(1.5)"},'f1')
      .to([txtBox1a,txtBox1b], {autoAlpha: 1, duration: t_d, scale:1, ease: "power2.out"})
      .to(txtAnimLbL, {autoAlpha: 1, duration: 0.8, stagger: 0.3, x:0, ease: "back.out(1.5)" }, 'f1+=1')
      .to(bg01, {autoAlpha: 1, duration: t_d, ease: "power2.out"})
      
    tl.addLabel('f2', t_r)
      .set(frame2, {autoAlpha:1},'f2')
      .to(frame1, {duration: t_d, x:-400, ease: "power2.inOut"},'f2')
      .to(['.txtBox2'], { duration: 0.5, stagger: 0.1, autoAlpha: 1,scale:1,x:0,y:0, ease: "back.out(1.5)" }, 'f2+=.8')
      
    tl.addLabel('f3', t_r)
      .set([frame3, txtBox3a, txtBox3b], { autoAlpha: 1 }, 'f3')
      .to(frame2, { duration: t_d, x: -300, ease: "power2.inOut" }, 'f3')
      .to(txtAnimWbW, { duration: 0.5, stagger: 0.15, autoAlpha: 1,scale:1,x:0,y:0, ease: "back.out(1.5)" }, 'f3+=.5')

      tl.addLabel('f4', t_r)
      .set([frame4, txtBox4a, txtBox4b], { autoAlpha: 1 }, 'f4')
      .to(frame3, { duration: t_d, x: -300, ease: "power2.inOut" }, 'f4')
      .to(txtAnimLetter, { duration: 0.3, stagger: 0.1, autoAlpha: 1,scale:1,x:0,y:0, ease: "back.out(1.5)" }, 'f4+=.5')

    // .addLabel('ff', t_r)
    //   .to(frame4, {duration: 1, x:-400, ease: "power2.out"},'ff')
    //   .to(leftBoxFF, { duration: t_d, x: 0, autoAlpha: 1, ease: "power2.out"}, "+=0")
    //   .to(rightBoxFF, { duration: t_d, x: 0, autoAlpha: 1, ease: "power2.out"}, "+=0")
    //   .to(ctaBox, { duration: t_d, x: 0, autoAlpha: 1, ease: "power2.out"}, "+=0.5")

    // CTA HOVER EFFECT
   ctaBtn.onmouseover = function () {
  //     console.log("BTN CTA");
  //     gsap.to(ctaShine, 0.6, { x: 250, onComplete: function () { gsap.to(ctaShine, 0, { x: 0 }); } });
    };  
  // CTA HOVER EFFECT

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
}


