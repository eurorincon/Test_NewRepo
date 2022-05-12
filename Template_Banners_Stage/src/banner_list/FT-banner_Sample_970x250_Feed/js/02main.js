App_banner.fn.step1 = function () {
    // global variables
    let tl = new gsap.timeline();
    const ctaBtn = $('.ctaContainer');
    window.tl = tl;
    // main animation
    const t_d = 0.5; // time of duration 
    const t_r = '+=2.2'; // time of reding frame
    tl.addLabel('f1')
      .set([leftBoxFF, rightBoxFF, girl_img, bg01, ctaBox], {autoAlpha:0})
      .set([leftBoxFF, rightBoxFF], {x:-300})
      .set(bg01, {x:320})
      
    .addLabel('ff', '+=0.5')
      .to(bg01, { duration: t_d, autoAlpha: 1, x: 0, ease: "power2.out"}, "ff")
      .to(girl_img, {duration: t_d, autoAlpha: 1, x:0, ease: "power2.in"}, "ff")
      .to(leftBoxFF, { duration: t_d, x: 0, autoAlpha: 1, ease: "power2.out"}, "+=0")
      .to(rightBoxFF, { duration: t_d, x: 0, autoAlpha: 1, ease: "power2.out"}, "+=0")
      .to(ctaBox, { duration: t_d, x: 0, autoAlpha: 1, ease: "power2.out"}, "+=0.5")

    // CTA HOVER EFFECT
  ctaBtn.onmouseover = function () {
      // console.log("BTN CTA");
      // gsap.to(ctaShine, 0.6, { x: 250, onComplete: function () { gsap.to(ctaShine, 0, { x: 0 }); } });
     };  
  // CTA HOVER EFFECT
  
  myFT.on('instantads', function () {
    // code for Feed acction
    var ftFeed = new FTFeed(myFT);
    ftFeed.getFeed(feedSuccess, feedError);
    var productId = "";
    myFT.instantAds.phone_img = "";
    var bluetitle = myFT.instantAds.BlueTitle;
    var creativeType = myFT.instantAds.creativeType;

    // Feed successfully loaded, setup content
    function feedSuccess(feedItems) {
      Tracker.impressionTrackEvent("Feed: " + feedItems[0].powerfeeds_id);
      productId = feedItems[0].powerfeeds_id;
      bluetitle = feedItems[0].powerfeeds_name;
      // console.log('Titulo: ' + bluetitle.length);

      myFT.instantAds.dynamicURL = feedItems[0].producturl;
      if (creativeType == "product") {
        $("#txt_FF_r")[0].innerHTML = feedItems[0].powerfeeds_name;
        $("#bg01 img")[0].src = feedItems[0].powerfeeds_image;
        if (bluetitle.length >= 40) {
          txt_FF_r.classList.add('txt_md');
        } else if (bluetitle.length >= 60) {
          txt_FF_r.classList.add('txt_small');
        }
      } else if (creativeType == "cart_abandoner") {
        $("#bg01 img")[0].src = feedItems[0].powerfeeds_image;
      }
    }

    function feedError(errorMsg, feedUrl) {
      // console.log('Titulo: ' + bluetitle.length);
      if (creativeType == "generic") {
        Tracker.impressionTrackEvent("Version: Generic");
        productId = "generic";
      } else if (creativeType == "cart_abandoner") {
        Tracker.impressionTrackEvent("Version: Cart Abandoner");
        productId = "cart_abandoner"
      } else if (creativeType == "product") {
        Tracker.impressionTrackEvent("Version: Product Page");
        productId = "product";
      } else {
        Tracker.impressionTrackEvent("Error");
        productid = "error";
      }
    }
  // end Feed acction
    let colorBox = myFT.instantAds.cta_BoxColor;
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


