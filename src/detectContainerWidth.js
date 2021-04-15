// // var makeWidget = function(currentScriptElement, $) {

// var container = $(".layout");
                   
// // var tr = JSON.parse(container.find('.translations').val());
// var tr = {'aa':'bb', 'cc':'dd'};

// // $(currentScriptElement).after(container);
// var $category = 1;



// var $sliderAmount = $('.a44-amount-0fc43060c55a3daf6aa85e7a5b40578a');
// var $sliderPeriod = $('.a44-period-0fc43060c55a3daf6aa85e7a5b40578a');

// $sliderAmount.attr({
//     min: 100,
//     max: 60000,
//     'data-currency': ' zł',
//     value: '1000'
// });

// $sliderPeriod.attr({
//     min: 1,
//     max: 65,
//     'data-suffix': ' dni',
//     value: '12'
// });



// var $suffix = ' dni';
// var $freeAmount = $('#chck-free-amount-0fc43060c55a3daf6aa85e7a5b40578a');
// var $alert = $('<div />').addClass('a44-alert').html(typeof tr['No offers matching criteria'] !== 'undefined' ? tr['No offers matching criteria'] : 'No offers matching criteria').hide();
// var $promo = $('<div />').addClass('a44-promo').html(typeof tr['We also recommend loans with other parameters'] !== 'undefined' ? tr['We also recommend loans with other parameters'] : 'We also recommend loans with other parameters').hide();
// var filter = function() {

//     var amount = parseInt($sliderAmount.val());
//     var period = parseInt($sliderPeriod.val());
//     container.find('.a44-offer').hide();
//     var $offers = container.find('.a44-offer').filter(function() {
//         return parseInt($(this).attr("data-minamount")) <= amount;
//     }).filter(function() {
//         return parseInt($(this).attr("data-maxamount")) >= amount;
//     }).filter(function() {
//         return parseInt($(this).attr("data-minperiod")) <= period;
//     }).filter(function() {
//         return parseInt($(this).attr("data-maxperiod")) >= period;
//     }).filter(function() {
//         if ($freeAmount.is(':checked'))
//             return parseInt($(this).attr("data-freeamount")) >= amount;
//         return true;
//     });
//     $offers.show();
//     if ($offers.length > 0)
//         $alert.hide();
//     else
//         $alert.show();
//     if ($offers.length <= 3) {
//         if ($('.a44-offer.promo').length) {
//             $('.a44-offer.promo').each(function() {
//                 if ($(this).css('display') == 'none')
//                     $(this).insertAfter($promo).show();
//             });
//             $promo.show();
//         }
//     } else {
//         //     $('.a44-offer.promo').hide();
//         $promo.hide();
//     }
// };
// $([$sliderPeriod, $sliderAmount, $freeAmount]).each(function(i, $e) {

//     $suffix = $e.attr('data-suffix') == undefined ? '' : ($e.attr('data-suffix') == ' dni' ? ' ' + tr['days'] : ' ' + tr['months']);
//     var $currency = $e.attr('data-currency') == undefined ? '' : $e.attr('data-currency');
//     var $sliderLabelValue = $(this).parents('.range-wrapper').find('input.value').val($e.attr('value'));
//     //console.log($(this));
//     $(this).parents('.range-wrapper').find('.a44-min').html($category == 3 && $(this).parents('.period-container').length ? '61 ' + (typeof tr['days'] !== 'undefined' ? tr['days'] : 'days') : ($e.attr('min') + $suffix + $currency));
//     $(this).parents('.range-wrapper').find('.a44-max').html($e.attr('max') + $suffix + $currency);
//     $e.on('input', function() {
//         var $this = $(this);
//         var to = parseInt($this.val());
//         var from = parseInt($sliderLabelValue.val());
//         // var step = parseFloat($this.attr('step'));
//         $({
//             counter: from
//         }).animate({
//             counter: to
//         }, {
//             duration: 500,
//             easing: 'swing',
//             step: function() {
//                 $sliderLabelValue.val(Math.round(this.counter));
//             },
//             done: function() {
//                 $sliderLabelValue.val(to);
//                 if ($sliderLabelValue.parents('.period-value-container').length && $category == 3 && to == 2) {
//                     $sliderLabelValue.val('61');
//                     var $span = $('<span>' + (typeof tr['days'] !== 'undefined' ? tr['days'] : 'days') + '</span>');
//                     $sliderLabelValue.parents('.period-value-container').find('.value-wrapper').html('').append($sliderLabelValue).append($span);
//                 } else if ($sliderLabelValue.parents('.period-value-container').length) {
//                     $sliderLabelValue.val(to);
//                     $span = $('<span>' + ($e.attr('data-suffix') == ' dni' ? (typeof tr['days'] !== 'undefined' ? tr['days'] : 'days') : (typeof tr['months'] !== 'undefined' ? tr['months'] : 'months')) + '</span>');
//                     $sliderLabelValue.parents('.period-value-container').find('.value-wrapper').html('').append($sliderLabelValue).append($span);
//                 }
//             }
//         });
//     });
//     $sliderLabelValue.on('blur keyup', function(e) {
//         if (e.type === 'blur' || e.keyCode === 13) {
//             var $this = $(this);
//             if (!$this.val().match(/^\d+$/)) {
//                 $this.val('12');
//             }
//             if ($this.parents('.amount-value-container').length > 0) {
//                 $this.val(parseInt(Math.round(parseInt($this.val()) / 50) * 50));
//             }
//             if (parseInt($this.val()) > parseInt($e.attr('max'))) {
//                 $this.val(parseInt($e.attr('max')));
//             }
//             if (parseInt($this.val()) < parseInt($e.attr('min'))) {
//                 $this.val(parseInt($e.attr('min')));
//             }

//             var to = parseInt($this.val());
//             var from = parseInt($e.val());
//             // var step = parseFloat($e.attr('step'));
//             $({
//                 counter: from
//             }).animate({
//                 counter: to
//             }, {
//                 duration: 500,
//                 easing: 'swing',
//                 step: function() {
//                     $e.val(Math.round(this.counter));
//                 },
//                 done: function() {
//                     $e.val(to).trigger('change');
//                 }
//             });
//         }
//     });
//     $e.on('change', filter);
// });
// if ($category == 1)
//     $freeAmount.change(filter);
// else
//     $freeAmount.parent().remove();
// $alert.insertBefore(container.children().last());
// $promo.insertBefore('.costs-info');
// var $containerWidth = container.parent().width();
// var $containerSize = '';
// if ($containerWidth < 544) {
//     $containerSize = 'a44-xs';
// } else if ($containerWidth >= 544 && $containerWidth < 768) {
//     $containerSize = 'a44-sm';
// } else if ($containerWidth >= 768 && $containerWidth < 992) {
//     $containerSize = 'a44-md';
// } else if ($containerWidth >= 992 && $containerWidth < 1200) {
//     $containerSize = 'a44-lg';
// } else {
//     $containerSize = 'a44-xl';
// }
// container.addClass($containerSize);
// $(window).resize(function() {
//     container.parent().css('width', '100%');
//     var $containerWidth = container.parent().width();
//     var $containerSize = '';
//     if ($containerWidth < 544) {
//         $containerSize = 'a44-xs';
//     } else if ($containerWidth >= 544 && $containerWidth < 768) {
//         $containerSize = 'a44-sm';
//     } else if ($containerWidth >= 768 && $containerWidth < 992) {
//         $containerSize = 'a44-md';
//     } else if ($containerWidth >= 992 && $containerWidth < 1200) {
//         $containerSize = 'a44-lg';
//     } else {
//         $containerSize = 'a44-xl';
//     }
//     container.removeClass();
//     container.addClass('a44-widget').addClass('layout').addClass($containerSize);
// });

// $('input[type=range].costslider').change(function() {
//     var range = $(this);
//     var widget = range.parents('.a44-widget');
//     var slugs = [];
//     widget.find('[data-costs]').each(function(i, e) {
//         slugs.push($(e).data('costs'));
//     });
//     widget.find('.amount, .time, .installment, .cost, .apr').html('-');
//     if (slugs.length > 0) {
//         var prefix = widget.find('input[class^="a44-period"]').attr('data-suffix') === ' dni' ? 'day' : 'month';
//         var amount = parseInt(widget.find('input[class^="a44-amount"]').val());
//         var time = parseInt(widget.find('input[class^="a44-period"]').val());
//         $.getJSON('https://loando.pl/api/json/costs', {
//             slug: slugs,
//             amount: amount,
//             period: time,
//             time_type: prefix
//         }, function(data) {
//             //console.log(data);
//             $(slugs).each(function(i, name) {
//                 if (typeof data.costs !== 'undefined' && typeof data.costs[name] !== 'undefined') {
//                     var container = widget.find($('[data-costs="' + name + '"]'));
//                     container.find('.amount').html((typeof data.costs[name].amount !== 'undefined' ? data.costs[name].amount : '*' + amount) + '  zł /' + (typeof data.costs[name].time !== 'undefined' ? data.costs[name].time : time) + (prefix == 'month' ? ' ' + (typeof tr['months'] !== 'undefined' ? tr['months'] : 'months') : ' ' + (typeof tr['days'] !== 'undefined' ? tr['days'] : 'days')));

//                     container.find('.installment').html('<a href="' + container.find('.cta-link').attr('href') + '" target="_blank" style="color:#fff;">Zobacz</a>');

//                     if (typeof data.costs[name].installment !== 'undefined' && prefix == 'month')
//                         container.find('.installment').html(data.costs[name].installment + '  zł');
//                     if (typeof data.costs[name].cost !== 'undefined' && prefix == 'day')
//                         container.find('.installment').html(data.costs[name].cost + '  zł');
                        
//                     container.find('.apr').html(((typeof data.costs[name].apr !== 'undefined' && data.costs[name].apr != null) ? data.costs[name].apr + '%' : '<a href="' + container.find('.cta-link').attr('href') + '" target="_blank" style="color:#fff;">Sprawdź</a>'));
//                     if (typeof data.costs[name].amount !== 'undefined' && typeof data.costs[name].cost !== 'undefined') {
//                         var installment = container.find('.installment');
//                         installment.html(installment.html() + ' / ' + (Math.round((data.costs[name].cost + data.costs[name].amount) * 100) / 100) + '  zł');
//                     }
//                 }
//             });
//         });
//     }
// });
// $('input[type=range].costslider').last().trigger('change');
// $('.rating').on('mousemove', function(e) {
//     var fill = calculateFill(e, $(this));
//     $(this).find('.rate').css('width', round(fill, 20, 0) + '%');
// });
// $('.rating').on('mouseleave', function() {
//     $(this).find('.rate').css('width', $(this).parents('.a44-offer').find('.offer-rate').html() / 5 * 100 + '%');
// });

// function calculateFill(e, container) {
//     var startCoord = container.offset().left;
//     var endCoord = container.offset().left + container.width();
//     var cursorPosX = e.pageX;
//     var relativeWidth = endCoord - startCoord;
//     var relativeCursorPosX = cursorPosX - startCoord;
//     var percentFilled = relativeCursorPosX / relativeWidth * 100;
//     return percentFilled;
// }

// function round(number, increment, offset) {
//     return Math.ceil((number - offset) / increment) * increment + offset;
// }

// $('.rate').on('click', function(e) {
//     var elem = $(this);
//     var fill = calculateFill(e, $(this).parents('.rating'));
//     var rate = Math.ceil(fill / 100 * 5);
//     // var url = $(location).attr('href');
//     setTimeout(function() {
//         $.ajax({
//             url: 'https://widgets.aff44.com/vote?save_rate=' + elem.parents('.a44-offer').attr('data-id') + '&rate=' + rate,
//             dataType: 'jsonp',
//         }).done(function(data) {
//             if (data.status === 'success') {
//                 var new_rate = Number(data.new_rate);
//                 elem.parents('.a44-offer').find('.offer-rate').html(new_rate.toFixed(1));
//                 var vote_count = data.votes_count.toString();
//                 var last_char = vote_count.slice(-1);
//                 elem.parents('.a44-offer').find('.votes-count').html('(<b>' + data.votes_count + '</b> ' + (last_char == '1' ? (typeof tr['vote'] !== 'undefined' ? tr['vote'] : 'vote') : (['2', '3', '4'].includes(last_char) ? (typeof tr['votes'] !== 'undefined' ? tr['votes'] : 'votes') : (typeof tr['votes2'] !== 'undefined' ? tr['votes2'] : 'votes2'))) + ')');
//                 //console.log((new_rate.toFixed(1) / 5 * 100));
//                 elem.parents('.a44-offer').find('.rate').css('width', (new_rate.toFixed(1) / 5 * 100) + '%')
//             }
//         });
//     }, Math.random() * 300);

// });
// // };

// // function defer(method, currentScriptElement) {
// // if (window.jQuery) {
// //     method(currentScriptElement, window.jQuery);
// // } else
// //     setTimeout(function() {
// //         defer(method, currentScriptElement)
// //     }, 50);
// // }
// // defer(makeWidget, document.currentScript);