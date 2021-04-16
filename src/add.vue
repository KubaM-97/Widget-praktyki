

     

                                 


                                 



//  var $category = 1;

//         var $suffix = ' dni';



//                                   // ????? START
//                                   $([$sliderPeriod, $sliderAmount, $freeAmount]).each(function(i, $e) {

//                                       $suffix = $e.attr('data-suffix') == undefined ? '' : ($e.attr('data-suffix') == ' dni' ? ' ' + tr['days'] : ' ' + tr['months']);
//                                       var $currency = $e.attr('data-currency') == undefined ? '' : $e.attr('data-currency');
//                                       var $sliderLabelValue = $(this).parents('.range-wrapper').find('input.value').val($e.attr('value'));
                                      
//                                       $(this).parents('.range-wrapper').find('.a44-min').html($category == 3 && $(this).parents('.period-container').length ? '61 ' + (typeof tr['days'] !== 'undefined' ? tr['days'] : 'days') : ($e.attr('min') + $suffix + $currency));
//                                       $(this).parents('.range-wrapper').find('.a44-max').html($e.attr('max') + $suffix + $currency);
//                                       $e.on('input', function() {

//                                           var $this = $(this);
//                                           var to = parseInt($this.val());
//                                           var from = parseInt($sliderLabelValue.val());
                                        
//                                           $({
//                                               counter: from
//                                           }).animate({
//                                               counter: to
//                                           }, {
//                                               duration: 500,
//                                               easing: 'swing',
//                                               step: function() {
//                                                   $sliderLabelValue.val(Math.round(this.counter));
//                                               },
//                                               done: function() {
//                                                   $sliderLabelValue.val(to);
//                                                   if ($sliderLabelValue.parents('.period-value-container').length && $category == 3 && to == 2) {
//                                                       $sliderLabelValue.val('61');
//                                                       var $span = $('<span>' + (typeof tr['days'] !== 'undefined' ? tr['days'] : 'days') + '</span>');
//                                                       $sliderLabelValue.parents('.period-value-container').find('.value-wrapper').html('').append($sliderLabelValue).append($span);
//                                                   } else if ($sliderLabelValue.parents('.period-value-container').length) {
//                                                       $sliderLabelValue.val(to);
//                                                       $span = $('<span>' + ($e.attr('data-suffix') == ' dni' ? (typeof tr['days'] !== 'undefined' ? tr['days'] : 'days') : (typeof tr['months'] !== 'undefined' ? tr['months'] : 'months')) + '</span>');
//                                                       $sliderLabelValue.parents('.period-value-container').find('.value-wrapper').html('').append($sliderLabelValue).append($span);
//                                                   }
//                                               }
//                                           });
//                                       });
//                                       $sliderLabelValue.on('blur keyup', function(e) {
//                                         console.log($(this))
//                                           if (e.type === 'blur' || e.keyCode === 13) {
//                                               var $this = $(this);
//                                               if (!$this.val().match(/^\d+$/)) {
//                                                   $this.val('12');
//                                               }
//                                               if ($this.parents('.amount-value-container').length > 0) {
//                                                   $this.val(parseInt(Math.round(parseInt($this.val()) / 50) * 50));
//                                               }
//                                               if (parseInt($this.val()) > parseInt($e.attr('max'))) {
//                                                   $this.val(parseInt($e.attr('max')));
//                                               }
//                                               if (parseInt($this.val()) < parseInt($e.attr('min'))) {
//                                                   $this.val(parseInt($e.attr('min')));
//                                               }

//                                               var to = parseInt($this.val());
//                                               var from = parseInt($e.val());

//                                               $({
//                                                   counter: from
//                                               }).animate({
//                                                   counter: to
//                                               }, {
//                                                   duration: 500,
//                                                   easing: 'swing',
//                                                   step: function() {
//                                                       $e.val(Math.round(this.counter));
//                                                   },
//                                                   done: function() {
//                                                       $e.val(to).trigger('change');
//                                                   }
//                                               });
//                                           }
//                                       });

//                                       // // do not delete
//                                       // $e.on('change', filter);
//                                   });
//                                   // ????? END

 
 
//  }











