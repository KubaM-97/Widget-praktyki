<template>
    {{filterParams}}
  <div class="a44-slider">

    <div class="period-container">
      <div class="range-wrapper">

        <div class="period-name-container">
          <span class="name"> {{translations["Loan period"]}} </span>
        </div>

        <div class="period-value-container">
          <span class="value-wrapper">
            <input type="text" class="value" readonly
            
             value=""
            />{{arr.suffix}}
          </span>
        </div>
<!-- @input="getPeriod"  :value="filterParams.period" -->
        <div class="aclr"></div>

        <div class="input-wrapper">
          <input type="range" 
            :class="'a44-period-'+arr.hash +' costslider'"
            step="1" value="12" ref="sliderPeriod"
            :data-suffix="arr.suffix" :min="arr.minPeriod" :max="arr.maxPeriod"
          />
        </div>
        <div class="min-val-wrapper">
          <span class="a44-min"> {{arr.minPeriod}} {{arr.suffix}} </span>
        </div>
        <div class="max-val-wrapper">
          <span class="a44-max"> {{arr.minPeriod}} {{arr.suffix}} </span>
        </div>
        <div class="aclr"></div>
      </div>
    </div>

    <div class="amount-container">
      <div class="range-wrapper">
        <div class="amount-name-container">
          <span class="name"> {{translations["Loan amount"]}} </span>
        </div>
        <div class="amount-value-container">
          <span class="value-wrapper">
            <input type="text" class="value" value="" /> {{arr.currency}}
          </span>
        </div>
        <div class="aclr"></div>
        <div class="input-wrapper">
          <input type="range" :class="'a44-amount-'+arr.hash +' costslider'" step="50"
            v-model.number="filterParams.amount" ref="sliderAmount"
            :data-currency="arr.currency" :min="arr.minAmount" :max="arr.maxAmount" />
        </div>
        <div class="min-val-wrapper">
          <span class="a44-min">{{arr.minAmount}} {{arr.currency}}</span>
        </div>
        <div class="max-val-wrapper">
          <span class="a44-max">{{arr.maxAmount}} {{arr.currency}}</span>
        </div>
        <div class="aclr"></div>
      </div>
    </div>

    <div class="aclr"></div>

    <div class="free-amount-container">
      <input type="checkbox" :id="'chck-free-amount-'+arr.hash"  ref="freeAmount"
       v-model="filterParams.free_amount"/>
      <span class="checkmark"></span>
      <label :for="'chck-free-amount-'+arr.hash"> {{ translations["Show only free loans"] }}</label>
      <input type="hidden" class="translations" value="" />
    </div>

  </div>

</template>

<script>

import { computed, ref } from "vue" 
import { useStore } from "vuex" 

import $ from "jquery";
import { onMounted } from "vue";

export default ({

    setup() {

        const store = useStore();
        const translations = computed(()=>store.state.translations);
        const arr = computed(()=>store.state.arr); 
        const filterParams = computed(()=>store.state.filterParams); 
        const sliderAmount = ref(null)
        const sliderPeriod = ref(null)
        const freeAmount = ref(null)
        const suffix = computed(()=>arr.value.suffix)
        const $category = computed(()=>arr.value.category)
        onMounted(()=>{
          // console.log(computed(()=>store.state.arr).value.suffix)
          console.log(arr.value.suffix)
            getPeriod();
        })

        function getPeriod(){

        
        console.log(suffix.value)
        console.log($category.value)
        var $suffix =  suffix.value == undefined ? ''  : ( suffix.value == ' dni' ? ' ' + translations.value['days'] : ' ' + translations.value['months']);
        console.log($suffix)
            
var $sliderAmount = $('.a44-amount-cd3663de5636ca498cc5c38ace1e8188');
var $sliderPeriod = $('.a44-period-cd3663de5636ca498cc5c38ace1e8188');
var $freeAmount = $('#chck-free-amount-cd3663de5636ca498cc5c38ace1e8188');
// var $category = 1;
            $([$sliderPeriod, $sliderAmount, $freeAmount]).each(function(i, $e) {

    var $suffix = $e.attr('data-suffix') == undefined ? '' : ($e.attr('data-suffix') == ' dni' ? ' ' + translations.value['days'] : ' ' + translations.value['months']);
    var $currency = $e.attr('data-currency') == undefined ? '' : $e.attr('data-currency');
    var $sliderLabelValue = $(this).parents('.range-wrapper').find('input.value').val($e.attr('value'));
    //console.log($(this));
    $(this).parents('.range-wrapper').find('.a44-min').html($category == 3 && $(this).parents('.period-container').length ? '61 ' + (typeof translations.value['days'] !== 'undefined' ? translations.value['days'] : 'days') : ($e.attr('min') + $suffix + $currency));
    $(this).parents('.range-wrapper').find('.a44-max').html($e.attr('max') + $suffix + $currency);
    $e.on('input', function() {
        var $this = $(this);
        var to = parseInt($this.val());
        var from = parseInt($sliderLabelValue.val());
        $({
            counter: from
        }).animate({
            counter: to
        }, {
            duration: 500,
            easing: 'swing',
            step: function() {
                $sliderLabelValue.val(Math.round(this.counter));
            },
            done: function() {
                $sliderLabelValue.val(to);
                if ($sliderLabelValue.parents('.period-value-container').length && $category == 3 && to == 2) {
                    $sliderLabelValue.val('61');
                    var $span = $('<span>' + (typeof translations.value['days'] !== 'undefined' ? translations.value['days'] : 'days') + '</span>');
                    $sliderLabelValue.parents('.period-value-container').find('.value-wrapper').html('').append($sliderLabelValue).append($span);
                } else if ($sliderLabelValue.parents('.period-value-container').length) {
                    $sliderLabelValue.val(to);
                    $span = $('<span>' + ($e.attr('data-suffix') == ' dni' ? (typeof translations.value['days'] !== 'undefined' ? translations.value['days'] : 'days') : (typeof translations.value['months'] !== 'undefined' ? translations.value['months'] : 'months')) + '</span>');
                    $sliderLabelValue.parents('.period-value-container').find('.value-wrapper').html('').append($sliderLabelValue).append($span);
                }
            }
        });
    });  // $e.on('change', filter);
});
$('input[type=range].costslider').change(function() {
    var range = $(this);
    var widget = range.parents('.a44-widget');
    var slugs = [];
    widget.find('[data-costs]').each(function(i, e) {
        slugs.push($(e).data('costs'));
    });
    widget.find('.amount, .time, .installment, .cost, .apr').html('-');
    if (slugs.length > 0) {
        var prefix = widget.find('input[class^="a44-period"]').attr('data-suffix') === ' dni' ? 'day' : 'month';
        var amount = parseInt(widget.find('input[class^="a44-amount"]').val());
        var time = parseInt(widget.find('input[class^="a44-period"]').val());
        $.getJSON('https://loando.pl/api/json/costs', {
            slug: slugs,
            amount: amount,
            period: time,
            time_type: prefix
        }, function(data) {
            console.log(data);
            $(slugs).each(function(i, name) {
                if (typeof data.costs !== 'undefined' && typeof data.costs[name] !== 'undefined') {
                    var container = widget.find($('[data-costs="' + name + '"]'));
                    container.find('.amount').html((typeof data.costs[name].amount !== 'undefined' ? data.costs[name].amount : '*' + amount) + '  zł /' + (typeof data.costs[name].time !== 'undefined' ? data.costs[name].time : time) + (prefix == 'month' ? ' ' + (typeof translations.value['months'] !== 'undefined' ? translations.value['months'] : 'months') : ' ' + (typeof translations.value['days'] !== 'undefined' ? translations.value['days'] : 'days')));

                    container.find('.installment').html('<a href="' + container.find('.cta-link').attr('href') + '" target="_blank" style="color:#fff;">Zobacz</a>');

                    if (typeof data.costs[name].installment !== 'undefined' && prefix == 'month')
                        container.find('.installment').html(data.costs[name].installment + '  zł');
                    if (typeof data.costs[name].cost !== 'undefined' && prefix == 'day')
                        container.find('.installment').html(data.costs[name].cost + '  zł');
                        
                    container.find('.apr').html(((typeof data.costs[name].apr !== 'undefined' && data.costs[name].apr != null) ? data.costs[name].apr + '%' : '<a href="' + container.find('.cta-link').attr('href') + '" target="_blank" style="color:#fff;">Sprawdź</a>'));
                    if (typeof data.costs[name].amount !== 'undefined' && typeof data.costs[name].cost !== 'undefined') {
                        var installment = container.find('.installment');
                        installment.html(installment.html() + ' / ' + (Math.round((data.costs[name].cost + data.costs[name].amount) * 100) / 100) + '  zł');
                    }
                }
            });
        });
    }
});
$('input[type=range].costslider').last().trigger('change');







            // const $sliderAmount = $('.amount-container input[type=range].costslider');            
            // const $sliderPeriod = $('.period-container input[type=range].costslider');
            // const $freeAmount = $('input[type=checkbox][id^="chck-free-amount-"');
            // console.log($sliderAmount, $sliderPeriod, $freeAmount.length)

            // $([$sliderPeriod, $sliderAmount, $freeAmount]).each(function(i, $e) {
                // console.log($e)
                // days / month
                // $suffix = $e.attr('data-suffix') == undefined ? '' : ($e.attr('data-suffix') == ' dni' ? ' ' + translations.value['days'] : ' ' + translations.value['months']);

                // // null / currency
                // $currency = $e.attr('data-currency') == undefined ? '' : $e.attr('data-currency');

                // // get proper input[type=text]
                // const $sliderLabelValue = $(this).parents('.range-wrapper').find('input.value').val($e.attr('value'));
                // console.log($sliderLabelValue)
                
                // $(this).parents('.range-wrapper').find('.a44-min').html($category == 3 && $(this).parents('.period-container').length ? '61 ' + (typeof translations.value['days'] !== 'undefined' ? translations.value['days'] : 'days') : ($e.attr('min') + $suffix + $currency));
                // $(this).parents('.range-wrapper').find('.a44-max').html($e.attr('max') + $suffix + $currency);
                // $e.on('input', function() {
                //     const $this = $(this);
                //     const to = parseInt($this.val());
                //     const from = parseInt($sliderLabelValue.val());
                //     $({
                //         counter: from
                //     }).animate({
                //         counter: to
                //     }, {
                //         duration: 500,
                //         easing: 'swing',
                //         step: function() {
                //             $sliderLabelValue.val(Math.round(this.counter));
                //         },
                //         done: function() {
                //             $sliderLabelValue.val(to);
                //             if ($sliderLabelValue.parents('.period-value-container').length && $category == 3 && to == 2) {
                //                 $sliderLabelValue.val('61');
                //                 const $span = $('<span>' + (typeof translations.value['days'] !== 'undefined' ? translations.value['days'] : 'days') + '</span>');
                //                 $sliderLabelValue.parents('.period-value-container').find('.value-wrapper').html('').append($sliderLabelValue).append($span);
                //             } else if ($sliderLabelValue.parents('.period-value-container').length) {
                //                 $sliderLabelValue.val(to);
                //                 $span = $('<span>' + ($e.attr('data-suffix') == ' dni' ? (typeof translations.value['days'] !== 'undefined' ? translations.value['days'] : 'days') : (typeof translations.value['months'] !== 'undefined' ? translations.value['months'] : 'months')) + '</span>');
                //                 $sliderLabelValue.parents('.period-value-container').find('.value-wrapper').html('').append($sliderLabelValue).append($span);
                //             }
                //         }
                //     });
                // });
           
          //  })
        }
//     $sliderLabelValue.on('blur keyup', function(e) {
//         if (e.type === 'blur' || e.keyCode === 13) {
//             $this = $(this);
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

//             const to = parseInt($this.val());
//             const from = parseInt($e.val());
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
//             $sliderLabelValue.on('blur keyup', function(e) {
//                     if (e.type === 'blur' || e.keyCode === 13) {
//                         const $this = $(this);
//                         if (!$this.val().match(/^\d+$/)) {
//                             $this.val('12');
//                         }
//                         if ($this.parents('.amount-value-container').length > 0) {
//                             $this.val(parseInt(Math.round(parseInt($this.val()) / 50) * 50));
//                         }
//                         if (parseInt($this.val()) > parseInt($e.attr('max'))) {
//                             $this.val(parseInt($e.attr('max')));
//                         }
//                         if (parseInt($this.val()) < parseInt($e.attr('min'))) {
//                             $this.val(parseInt($e.attr('min')));
//                         }

//                         const to = parseInt($this.val());
//                         const from = parseInt($e.val());

//                         $({
//                             counter: from
//                         }).animate({
//                             counter: to
//                         }, {
//                             duration: 500,
//                             easing: 'swing',
//                             step: function() {
//                                 $e.val(Math.round(this.counter));
//                             },
//                             done: function() {
//                                 console.log("done")
//                                 $e.val(to).trigger('change');
//                             }
//                         });
//                     }
//                 });
                


            // $('input[type=range].costslider').change(green_blocks);

            // $('input[type=range].costslider').change(function() {

            //     const widget = $('input[type=range].costslider').parents('.a44-widget');
            //     const slugs = [];

            //     store.state.offers.forEach(offer => slugs.push(offer.loando_slug))

            //     widget.find('.amount, .time, .installment, .cost, .apr').html('-');

            //     if (slugs.length > 0) {
            //         const prefix = widget.find('input[class^="a44-period"]').attr('data-suffix') === ' dni' ? 'day' : 'month';
            //         const amount = parseInt(widget.find('input[class^="a44-amount"]').val());
            //         const time = parseInt(widget.find('input[class^="a44-period"]').val());
                
            //         $.getJSON('https://loando.pl/api/json/costs', {
            //             slug: slugs,
            //             amount: amount,
            //             period: time,
            //             time_type: prefix
            //         }, function(data) {
            //             // console.log(data)
            //             $(slugs).each(function(i, name) {
            //                 if (typeof data.costs !== 'undefined' && typeof data.costs[name] !== 'undefined') {
                                
            //                     // here need to add some names to the container
            //                     const container = widget.find($('[data-costs="' + name + '"]'));                            

            //                     container.find('.amount').html((typeof data.costs[name].amount !== 'undefined' ? data.costs[name].amount : '*' + amount) + '  zł /' + (typeof data.costs[name].time !== 'undefined' ? data.costs[name].time : time) + (prefix == 'month' ? ' ' + (typeof translations.value['months'] !== 'undefined' ? translations.value['months'] : 'months') : ' ' + (typeof translations.value['days'] !== 'undefined' ? translations.value['days'] : 'days')));
            //                     container.find('.installment').html('<a href="' + container.find('.cta-link').attr('href') + '" target="_blank" style="color:#fff;">Zobacz</a>');
        
            //                     if (typeof data.costs[name].installment !== 'undefined' && prefix == 'month')
            //                         container.find('.installment').html(data.costs[name].installment + '  zł');
            //                     if (typeof data.costs[name].cost !== 'undefined' && prefix == 'day')
            //                         container.find('.installment').html(data.costs[name].cost + '  zł');
                                    
            //                     container.find('.apr').html(((typeof data.costs[name].apr !== 'undefined' && data.costs[name].apr != null) ? data.costs[name].apr + '%' : '<a href="' + container.find('.cta-link').attr('href') + '" target="_blank" style="color:#fff;">Sprawdź</a>'));
            //                     if (typeof data.costs[name].amount !== 'undefined' && typeof data.costs[name].cost !== 'undefined') {
                                   
            //                         const installment = container.find('.installment');
            //                         installment.html(installment.html() + ' / ' + (Math.round((data.costs[name].cost + data.costs[name].amount) * 100) / 100) + '  zł');
            //                     }
            //                 }
            //             })
            //         })
            //     }
            // })
        
        // $('input[type=range].costslider').last().trigger('change')
        
        // }

        // function green_blocks(){

        //         const widget = $('input[type=range].costslider').parents('.a44-widget');
        //         const slugs = [];

        //         store.state.offers.forEach(offer => slugs.push(offer.loando_slug))

        //         widget.find('.amount, .time, .installment, .cost, .apr').html('-');

        //         if (slugs.length > 0) {

        //             const prefix = widget.find('input[class^="a44-period"]').attr('data-suffix') === ' dni' ? 'day' : 'month';
                    
        //             //ranges
        //             const amount = filterParams.amount;
        //             const time = filterParams.period;

        //             console.log(amount, time)
        //             // console.log(filterParams.amount, filterParams.period)


        //             $.getJSON('https://loando.pl/api/json/costs', {
        //                 slug: slugs,
        //                 amount: amount,
        //                 period: time,
        //                 time_type: prefix
        //             }, function(data) {
        //                 // console.log(data)
        //                 $(slugs).each(function(i, name) {
        //                     if (typeof data.costs !== 'undefined' && typeof data.costs[name] !== 'undefined') {
                                
        //                         // here need to add some names to the container
        //                         const container = widget.find($('[data-costs="' + name + '"]'));                            

        //                         container.find('.amount').html((typeof data.costs[name].amount !== 'undefined' ? data.costs[name].amount : '*' + amount) + '  zł /' + (typeof data.costs[name].time !== 'undefined' ? data.costs[name].time : time) + (prefix == 'month' ? ' ' + (typeof translations.value['months'] !== 'undefined' ? translations.value['months'] : 'months') : ' ' + (typeof translations.value['days'] !== 'undefined' ? translations.value['days'] : 'days')));
        //                         container.find('.installment').html('<a href="' + container.find('.cta-link').attr('href') + '" target="_blank" style="color:#fff;">Zobacz</a>');
        
        //                         if (typeof data.costs[name].installment !== 'undefined' && prefix == 'month')
        //                             container.find('.installment').html(data.costs[name].installment + '  zł');
        //                         if (typeof data.costs[name].cost !== 'undefined' && prefix == 'day')
        //                             container.find('.installment').html(data.costs[name].cost + '  zł');
                                    
        //                         container.find('.apr').html(((typeof data.costs[name].apr !== 'undefined' && data.costs[name].apr != null) ? data.costs[name].apr + '%' : '<a href="' + container.find('.cta-link').attr('href') + '" target="_blank" style="color:#fff;">Sprawdź</a>'));
        //                         if (typeof data.costs[name].amount !== 'undefined' && typeof data.costs[name].cost !== 'undefined') {
                                   
        //                             const installment = container.find('.installment');
        //                             installment.html(installment.html() + ' / ' + (Math.round((data.costs[name].cost + data.costs[name].amount) * 100) / 100) + '  zł');
        //                         }
        //                     }
        //                 })
        //             })
        //         }
        // }



        return {
          arr,
          translations,
          filterParams,
            getPeriod,
            sliderAmount,
            sliderPeriod,
            freeAmount
        }
    }
    
})
</script>
