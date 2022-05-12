 // Following is a SuperClass for your app
LTApp = function() {
    this.INITED = false;
};

 // Images preloading functions
LTApp.prototype = {
    preload: function(sources, callback) {
        this.sources = sources;
        let imgcount = 0,
            img;
        $('*').each(function(i, el) {
            if (el.tagName !== 'SCRIPT' && el.tagName !== 'feMergeNode') {
                this.findImageInElement(el);
            }
        }.bind(this));
        if (this.sources.length === 0) {
            callback.call();
        } else if (document.images) {
            for (let i = 0; i < this.sources.length; i++) {
                img = new Image();
                img.onload = function() {
                    imgcount++;
                    if (imgcount === this.sources.length) {
                        callback.call();
                    }
                }.bind(this);
                img.src = this.sources[i];
            }
        } else {
            callback.call();
        }
    },
    determineUrl: function(element) {
        let url = '';
        let t;
        const style = element.currentStyle || window.getComputedStyle(element, null);

        if ((style.backgroundImage !== '' && style.backgroundImage !== 'none') || (element.style.backgroundImage !== '' && element.style.backgroundImage !== 'none')) {
            t = (style.backgroundImage || element.style.backgroundImage);
            if (t.indexOf('gradient(') === -1) {
                url = t.split(',');
            }
        } else if (typeof(element.getAttribute('src')) !== 'undefined' && element.nodeName.toLowerCase() === 'img') {
            url = element.getAttribute('src');
        }
        return [].concat(url);
    },
    findImageInElement: function(element) {
        const urls = this.determineUrl(element);
        const extra = (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/Opera/i)) ? '?rand=' + Math.random() : '';
        urls.forEach(function(url) {
            url = this.stripUrl(url);
            if (url !== '') {
                this.sources.push(url + extra);
            }
        }.bind(this));
    },
    stripUrl: function(url) {
        url = $.trim(url);
        url = url.replace(/url\(\"/g, '');
        url = url.replace(/url\(/g, '');
        url = url.replace(/\"\)/g, '');
        url = url.replace(/\)/g, '');
        return url;
    }
};

'use strict';

// Main Application
function App_banner() {
    if (App_banner.instance !== undefined) {
        return App_banner.instance;
    } else {
        App_banner.instance = this;
    }
    LTApp.call(this);
    return App_banner.instance;
}
App_banner.prototype = new LTApp();
App_banner.fn = App_banner.prototype;

// Singleton thing
App_banner.getInstance = function () {
    if (App_banner.instance === undefined) {
        new App_banner();
    }
    return App_banner.instance;
}

//Initialize your app, surcharge with whatever needed
App_banner.fn.init = function () {
    if (!this.INITED) {
        this.INITED = true;

        // Add the images url you want to preload in the empty array on the first parameter
        this.preload([], this.display.bind(this));
    }
    IDsToVars();
};

// Shows everything, start animating
App_banner.fn.display = function () {
    this.steps = $('.step');
    this.goTo(1);
    $('body').removeClass('loading');
    $('body').addClass('loaded');
};

// Display the given step
App_banner.fn.goTo = function (stepNumber) {
    this.steps.each(function (i, el) {
        const $el = $(el);

        if ($el.data('order') == stepNumber) {
            $('.step-active').removeClass('step-active');
            $el.addClass('step-active');
        }
    });

    if (this['step' + stepNumber]) {
        this['step' + stepNumber]();
    }
};

// Display the given step
App_banner.fn.goToAndWait = function (stepNumber, seconds) {
    this.steps.each(function (i, el) {
        const $el = $(el);
        let $old;

        if ($el.data('order') == stepNumber) {
            $old = $('.step-active');
            $el.addClass('step-active');

            setTimeout(function () {
                $old.removeClass('step-active');
            }, seconds);
        }
    });

    if (this['step' + stepNumber]) {
        this['step' + stepNumber]();
    }
};
