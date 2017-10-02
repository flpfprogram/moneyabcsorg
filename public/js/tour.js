/* globals hopscotch: false */

/* ============ */
/* EXAMPLE TOUR */
/* ============ */
var homepage = {
        id: 'homepage',
        steps: [
            {
                target: 'logo',
                title: 'Welcome to MoneyABCs',
                content: 'Take a tour of our platform features to make the most out of your experience. ',
                placement: 'bottom',
                arrowOffset: 60,
                xOffset: 'center',
                showCloseButton : 'true'
            },
            {
                target: 'news-section',
                title: 'Confused Where to begin?',
                content: 'The section below shows what’s trending online in the field of financial literacy. Visit us daily for fresh articles.  ',
                placement: 'top',
                showCloseButton : 'true',
                arrowOffset: 'center',
                xOffset: "center",
                bubbleWidth :"700"

            },
            {
                target: 'search_concept',
                placement: 'top',
                title: 'Looking for a particular topic?',
                content: 'Use our specialized search engine to scout the net for you.',
                showCloseButton : 'true',
                arrowOffset: 'center',
                xOffset: 'center'
            },
            {
                target: 'share',
                placement: 'top',
                title: 'Share with your contacts ',
                content: 'Use this button to share via social media',
                showCloseButton : 'true',
                xOffset: -20
            },
            {
                target: 'email_1',
                placement: 'top',
                title: 'Share with your contacts',
                content: 'Use this button to email this story',
                showCloseButton : 'true',
                xOffset: -20
            },
            {
                target: '1',
                placement: 'top',
                title: 'Add to your profile',
                content: 'If you are a registered member of our network, use this button to save this article for later review. Sing up for your account today!',
                showCloseButton : 'true',
                xOffset:-20
            },
            {
                target: 'sub_resources',
                placement: 'top',
                title: 'Learning Tools  ',
                content: 'We have multiple instructional materials, like presentations, webinars, and videos that you can access now!',
                xOffset: 'center',
                arrowOffset: 'center',
                showCloseButton : 'true'
            },
            {
                target: 'customize',
                placement: 'top',
                title: 'Personalize your experience! ',
                content: 'Change the layout of your display and what topics you want to give priority to by pressing this button.',
                showCloseButton : 'true',
            },
            {
                target: 'signup',
                placement: 'left',
                title: 'Sign Up!',
                content: 'If you are an educator or a financial literacy activist, join our network to gain free access to many more resources.',
                showCloseButton : 'true',
                onEnd: function() {
                    alert ('done');
                    hopscotch.endTour([clearCookie]);
                }
            },
        ],
        showPrevButton: true,
        scrollTopMargin: 100
    },
    /* ========== */
    /* TOUR SETUP */
    /* ========== */
    addClickListener = function(el, fn) {
        if (el.addEventListener) {
            el.addEventListener('click', fn, false);
        }
        else {
            el.attachEvent('onclick', fn);
        }
    },
//add a check if the flag is in cookie
    init = function() {
        if (localStorage.getItem("tutorial1") != "done"){
            hopscotch.startTour(homepage);
        }

//if (typeof (Storage) !== "undefined") {
        // Store
        // localStorage.setItem("tutorial1", "done");
        // Retrieve
        //  alert(localStorage.getItem("tutorial1"));
        //  }
//set a flag in cookie
    };
init();

var customoverlay = {
        id: 'customoverlay',
        steps: [
            {
                target: 'customize',
                title: 'This will be a cool feature for you',
                content: 'Here you can customize your board layout and the articles you are interested in',
                placement: 'bottom',
                showCloseButton : 'true'
            },
            {
                target: 'schema',
                placement: 'bottom',
                xOffset : 'center',
                content: 'Click of the column of your interest that will ease your ready. It can be 2,3,4 or 6',
                showCloseButton : 'true'
            },
            {
                target: 'next_topics',
                placement: 'bottom',
                xOffset : 'center',
                content: 'Goto the next page of customization',
                showCloseButton : 'true'
            },
            {
                target: 'topics',
                placement: 'top',
                content: 'Choose the area of your interest. I will display the board depending on these topics. Select atleast more than 5 topics and click on "Save"',
                xOffset : 600,
                showCloseButton : 'true'
            },
        ],
        showPrevButton: true,
        scrollTopMargin: 100
    },
    addClickListener = function(el, fn) {
        if (el.addEventListener) {
            el.addEventListener('click', fn, false);
        }
        else {
            el.attachEvent('onclick', fn);
        }
    }
//add a check if the flag is in cookie
$(function () {
    $('.customize_button').on("click", function () {
        hopscotch.endTour(homepage);
    });
});