
App_banner.fn.step1 = function () {

    // global variables
    let tl = new gsap.timeline();
    const ctaBtn   = $('#ctaBtn');

    // debug animation from console
    window.tl = tl;

    // main animation
    tl.addLabel('f1','+=0')
      

      .set([bg02, logo_1, logo_nrf, mid_line], {alpha:0})
      .set(copy1, {x:301})
      
      .set([txt_01_a,txt_02_a, txt_03_a], {x:-300})
      .set([ctaBox], {alpha:0})

      .to(logoBox,  {duration:.5,x:-300, ease: "power2.out"}, "f1+=1")
      .to(logo_1, {duration:.5, alpha:1},"f1+=1")// entra logo
      .to([copy1, txt_01_h, txt_01_a], { duration:.5,x:0, ease: "power2.out"}, "f1+=1")
      .to(txt_01_h, {duration:.2, scale:1.1, ease: "power2.out"})
      .to(txt_01_h, {duration:.2, scale:1, ease: "power2.out"})
       

      // SEGUNDA IMAGEN
      .addLabel('f2','+=2')
      .to([txt_01_a, copy1], {duration:.5, x:-300, ease: "power2.out"},'f2+=0') 
      .to(bg02, {duration:1.5, alpha:1, ease: "power2.out"},'f2')
      .to(txt_02_a, {duration:.8,  x: 0, ease: "power2.out" }, 'f2+=0')

      // Tercer imagen
      .addLabel('f3','+=2') 
      .to(copy2, {duration:.8, x:-300, ease: "power2.out"}, "f3+=0")
      .to(txt_03_a, {duration:.8,  x: 0, ease: "power2.out" }, 'f3+=0')


      .to([logo_nrf, mid_line], { duration:.5, alpha:1},'f3+=0')
      .to(ctaBox, {duration:1, alpha:1, ease: "power2.out"}, "-=.4")
    

      .to(ctaShine, {duration:1,  x: 250, onComplete: function () { gsap.to(ctaShine, {duration:0,  x: 0 }); } }, '+=1')

    // CTA HOVER EFFECT
    ctaHit.onmouseover = function () {
      gsap.to(ctaShine, {duration:0.6,  x: 250, onComplete: function () { gsap.to(ctaShine, {duration:0,  x: 0 }); } });
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