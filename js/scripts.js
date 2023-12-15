
/*--------------------------------------------------------

    Main Scripts

    [Table of contents]
        01. CAROUSEL
        02. RANDOM HEADER
        03. HEADER CONTENT OPACITY
        04. NAVBAR
        05. STICKY NAVBAR
        06. MAGNIFIC POPUP
        07. COUNTERS
        08. NAVBAR WIDTH FIX
        09. CONTACT FORM
        10. SCROLL TO TOP
        11. SMOOTH SCROLL
        12. PAGE ANIMATIONS
        13. PRELOADER
        14. ISOTOPE

--------------------------------------------------------*/

(function(){
    'use strict';
    $(window).ready(function(){

        /*--------------------------------------------------------
            01. CAROUSEL
        --------------------------------------------------------*/
        $(function(){
            $(".caption").owlCarousel({
                navigation: false,
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: true,
                transitionStyle: "fade",
                mouseDrag: false,
                touchDrag: false,
                autoPlay: true
            });
        });

        /*--------------------------------------------------------
            02. RANDOM HEADER
        --------------------------------------------------------*/
        $(function(){
            var random = Math.ceil(Math.random() * 6),
                newHeader = "header-" + random;
            $('.head').addClass(newHeader);
        });

        /*--------------------------------------------------------
            03. HEADER CONTENT OPACITY
        --------------------------------------------------------*/
        $(function(){
            var element = $('.caption .item'),
                offsetEnd = 450,
                opacity,
                offset = $(document).scrollTop();
            offset > offsetEnd ? opacity = 0 : opacity = 1 - offset/offsetEnd;
            element.css("opacity", opacity);
            $(window).scroll(function(){
                offset = $(document).scrollTop();
                offset <= offsetEnd ? opacity = 1 - offset/offsetEnd : opacity = 0;
                element.css('opacity', opacity);
            });
        });

        /*--------------------------------------------------------
            04. NAVBAR
        --------------------------------------------------------*/
        $(function(){
            var head = $('.head').height(),
                navbar = $('.navbar');
            $(this).scrollTop() >= head ? navbar.removeClass('normal').addClass('offset') : navbar.removeClass('offset').addClass('normal');
            $(window).scroll(function () {
                $(this).scrollTop() >= head ? navbar.removeClass('normal').addClass('offset') : navbar.removeClass('offset').addClass('normal');
            });
        });

        /*--------------------------------------------------------
            05. STICKY NAVBAR
        --------------------------------------------------------*/
        $(function(){
            $('.navbar').sticky({
                topSpacing: 0
            });
        });

        /*--------------------------------------------------------
            06. MAGNIFIC POPUP
        --------------------------------------------------------*/
        $(function(){
            $('#works .grid').magnificPopup({
                delegate: 'a',
                type: 'image'
            });
        });

        /*--------------------------------------------------------
            07. COUNTERS
        --------------------------------------------------------*/
        $(function(){
            $('.counter').counterUp({
                delay: 10,
                time: 1000
            });
        });

        /*--------------------------------------------------------
            08. NAVBAR WIDTH FIX
        --------------------------------------------------------*/
        $(function(){
            var width = $('.head').width();
            $('.navbar').css('max-width', width);
            $(window).resize(function() {
                var width = $('.head').width();
                $('.navbar').css('max-width', width);
            });
        });

   /*--------------------------------------------------------
    09. CONTACT FORM
--------------------------------------------------------*/
        $(function() {
            // Function to determine the subject line
            function determineSubject() {
                return $('#fill-quote-checkbox').is(':checked') ? 'New Quote Request From Site' : 'New Contact Message From Site';
            }

            // Helper function to validate email
            const isValidEmail = email => {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
            };

            $('#contacts-send').on('click', function(event) {
                event.preventDefault();
                var name = $('#contacts-name').val(),
                    email = $('#contacts-email').val(),
                    phone = $('#contacts-phone').val(),
                    message = $('#contacts-message').val(),
                    tripDetails = $('#contacts-trip-details').val(),
                    departureStartDate = $('#contacts-departure-start-date').val(),
                    departureEndDate = $('#contacts-departure-end-date').val(),
                    subject = determineSubject(),
                    valid = true;

                // Clear previous error messages
                $('#contacts-errors').empty();

                // Validation checks
                if (!name) {
                    valid = false;
                    $('#contacts-errors').append('<div class="text-danger">Name is required.</div>');
                }
                if (!email) {
                    valid = false;
                    $('#contacts-errors').append('<div class="text-danger">Email is required.</div>');
                }
                if (!isValidEmail(email)) {
                    valid = false;
                    $('#contacts-errors').append('<div class="text-danger">Enter a valid email.</div>');
                }
                if (!message) {
                    valid = false;
                    $('#contacts-errors').append('<div class="text-danger">Message is required.</div>');
                }

                // Update button content for loading
                $('#contacts-send').html('<div class="spinner-container"><i class="fa fa-spinner fa-spin"></i><br></div>').prop('disabled', true);


                // Construct data to be sent
                var postData = {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message,
                    tripDetails: tripDetails,
                    departureStartDate: departureStartDate,
                    departureEndDate: departureEndDate,
                    subject: subject
                };

                // Sending data to backend if valid
                if (valid) {
                    $.ajax({
                        url: "https://api.shamuscoachbus.com/contact_me",
                        type: 'POST',
                        data: JSON.stringify(postData),
                        contentType: 'application/json',
                        success: function(response) {
                            $('#contacts-send').html('<i class="fa fa-paper-plane"></i><span>Message Sent</span>');
                            $('#success-message').html('<div class="alert text-center alert-success">Thank you! Your message has been sent.</div>').show();
                            $('form[name="contact_form"]').hide();
                        },
                        error: function(xhr, status, error) {
                            $('#contacts-send').html('<i class="fa fa-paper-plane"></i><span>Send Message</span>').prop('disabled', false);
                            $('#contacts-errors').html('<div class="alert alert-danger">An error occurred. Please try again.</div>');
                        }
                    });
                } else {
                    // Re-enable the button if validation fails
                    $('#contacts-send').html('<i class="fa fa-paper-plane"></i><span>Send Message</span>').prop('disabled', false);
                }
            });
        });



        /*--------------------------------------------------------
            10. SCOLL TO TOP
        --------------------------------------------------------*/
        $(function(){
            if ($(window).width() > 850) {
                $(window).scroll(function(){
                    $(this).scrollTop() > 500 ? $('.scrolltop').fadeIn() : $('.scrolltop').fadeOut();
                });
                $('.scrolltop').click(function(){
                    $('html, body').animate({scrollTop: 0}, 500);
                    return false;
                });
            }
        });

        /*--------------------------------------------------------
            11. SMOOTH SCROLL
        --------------------------------------------------------*/
        $(function(){
            var height = $('nav').height();
            $('.scroll').click(function(){
                var href = $(this).attr("href");
                var hash = href.substr(href.indexOf("#"));
                if (hash == '#home') {
                    $('html, body').animate({scrollTop: 0}, 500);
                }
                else {
                    $('html,body').animate({scrollTop:$(this.hash).offset().top - height}, 500);
                }
            });
        });

        /*--------------------------------------------------------
            12. PAGE ANIMATIONS
        --------------------------------------------------------*/
        $(function(){
            new WOW().init();
        });
    }); /* end of ready function */


    $(window).load(function(){

        /*--------------------------------------------------------
            13. PRELOADER
        --------------------------------------------------------*/
        $(function(){
            $('#status').fadeOut();
            $('#preloader').delay(350).fadeOut('slow');
            $('body').delay(350).css({'overflow':'visible'});
        });

        /*--------------------------------------------------------
            14. ISOTOPE
        --------------------------------------------------------*/
        $(function(){
            var $container = $('#works .grid');
            $container.imagesLoaded(function() {
                $container.isotope({
                    itemSelector: '.item',
                    layoutMode: 'fitRows'
                });
            });
            $('#works .filters li').click(function() {
                $('#works .filters li').removeClass('active');
                $(this).addClass('active');
                var filter = $(this).attr('data-filter');
                $('#works .item').each(function(){
                    $(this).find('a').css({
                        'cursor': 'pointer'
                    });
                    $(this).css({
                        '-webkit-transform': 'scale(1)',
                        '-moz-transform': 'scale(1)',
                        '-o-transform': 'scale(1)',
                        'transform': 'scale(1)',
                        'opacity': 1
                    });
                    if (filter != '*' && !$(this).hasClass(filter)) {
                        $(this).find('a').css({
                            'cursor': 'not-allowed'
                        });
                        $(this).css({
                            '-webkit-transform': 'scale(0.8)',
                            '-moz-transform': 'scale(0.8)',
                            '-o-transform': 'scale(0.8)',
                            'transform': 'scale(0.8)',
                            'opacity': '0.3'
                        });
                    }
                });
            });
        });
    }); /* end of load function */
})(jQuery);