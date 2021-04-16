<template>
  <div class="a44-slider" ref="slider">
    <div class="period-container">
      <div class="range-wrapper">

        <div class="period-name-container">
          <span class="name">Okres pożyczki</span>
        </div>

        <div class="period-value-container">
          <span class="value-wrapper">
            <input type="text" class="value" readonly value="" />dni
          </span>
        </div>

        <div class="aclr"></div>

        <div class="input-wrapper">
          <input type="range" class="a44-period-69ac1091c4c51b931f1225a13d0e9e39 costslider"
            step="1"  data-suffix=" dni"  @input="getPeriod"/>
        </div>
        <div class="min-val-wrapper">
          <span class="a44-min">1 dni</span>
        </div>
        <div class="max-val-wrapper">
          <span class="a44-max">65 dni</span>
        </div>
        <div class="aclr"></div>
      </div>
    </div>

    <div class="amount-container">
      <div class="range-wrapper">
        <div class="amount-name-container">
          <span class="name">Kwota pożyczki</span>
        </div>
        <div class="amount-value-container">
          <span class="value-wrapper">
            <input type="text" class="value" value="" /> zł
          </span>
        </div>
        <div class="aclr"></div>
        <div class="input-wrapper">
          <input type="range" class="a44-amount-69ac1091c4c51b931f1225a13d0e9e39 costslider" step="50"
            data-currency=" zł"/>
        </div>
        <div class="min-val-wrapper">
          <span class="a44-min">100 zł</span>
        </div>
        <div class="max-val-wrapper">
          <span class="a44-max">60000 zł</span>
        </div>
        <div class="aclr"></div>
      </div>
    </div>
    <div class="aclr"></div>

    <div class="free-amount-container">
      <input type="checkbox" id="chck-free-amount-12392823e6dbdfb0f22e748cfdf47832" ref="freeAmount"/>
      <span class="checkmark"></span>
      <label for="chck-free-amount"> Pokaż tylko darmowe pożyczki</label>
      <input type="hidden" class="translations" value="" />
    </div>

  </div>

</template>

<script>

import { computed,  ref  } from "vue" 
import { useStore } from "vuex" 

import $ from "jquery";
import { onMounted } from "vue";

export default ({

    setup() {
        
        const store = useStore();
        
        const communicates = computed(()=>store.state.communicates);

        const slider = ref(null)
        
        function initSliders(){

            const $sliderAmount = $('.amount-container input');
            const $sliderPeriod = $('.period-container input');
            
            $sliderAmount.attr({
                min: 100,
                max: 60000,
                'data-currency': ' zł',
                value: '1000'
            });
            
            $sliderPeriod.attr({
                min: 1,
                max: 65,
                'data-suffix': ' dni',
                value: '12'
            });
        }

        function alerts(){
            const $freeAmount = $('[id^="#chck-free-amount-"');

            let $category = 1; 
            // const $alert = $('<div />').addClass('a44-alert').html(typeof tr['No offers matching criteria'] !== 'undefined' ? tr['No offers matching criteria'] : 'No offers matching criteria').hide();
            
            // const $promo = $('<div />').addClass('a44-promo').html(typeof communicates.value['We also recommend loans with other parameters'] !== 'undefined' ? communicates.value['We also recommend loans with other parameters'] : 'We also recommend loans with other parameters').hide();
            
            if ($category == 1){
                $freeAmount.change(filter);
            }
            else
            $freeAmount.parent().remove();

            // $alert.insertBefore(slider.value.children.last());
            // $promo.insertBefore('.costs-info');

        }
        
        onMounted(()=>{
            
            initSliders();
            alerts();
            getPeriod();

        })
       


           



         function getPeriod(){
             
            const $category = 1;
            let $suffix = ' dni';

            const $sliderAmount = $('.amount-container input.costslider');
            const $sliderPeriod = $('.period-container input.costslider');
            const $freeAmount = $('[id^="#chck-free-amount-"');
           

            $([$sliderPeriod, $sliderAmount, $freeAmount]).each(function(i, $e) {
                
                const $suffixDays = communicates.value["days"]
                const $suffixMonth = communicates.value["month"]

                $suffix = $e.attr('data-suffix') == undefined ? '' : ($e.attr('data-suffix') == ' dni' ? ' ' + $suffixDays : ' ' + $suffixMonth);
              
                const $currency = $e.attr('data-currency') == undefined ? '' : $e.attr('data-currency');
                const $sliderLabelValue = $(this).parents('.range-wrapper').find('input.value');

                $(this).parents('.range-wrapper').find('.a44-min').html($category == 3 && $(this).parents('.period-container').length ? '61 ' + (typeof communicates.value['days'] !== 'undefined' ? communicates.value['days'] : 'days') : ($e.attr('min') + $suffix + $currency));
                $(this).parents('.range-wrapper').find('.a44-max').html($e.attr('max') + $suffix + $currency);

                $e.on('input', function() {
                    const $this = $(this);
                    const to = parseInt($this.val());
                    const from = parseInt($sliderLabelValue.val());
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
                                let $span = $('<span>' + (typeof communicates.value['days'] !== 'undefined' ? communicates.value['days'] : 'days') + '</span>');
                                $sliderLabelValue.parents('.period-value-container').find('.value-wrapper').html('').append($sliderLabelValue).append($span);
                            } else if ($sliderLabelValue.parents('.period-value-container').length) {
                                $sliderLabelValue.val(to);
                                let $span = $('<span>' + ($e.attr('data-suffix') == ' dni' ? (typeof communicates.value['days'] !== 'undefined' ? communicates.value['days'] : 'days') : (typeof communicates.value['months'] !== 'undefined' ? communicates.value['months'] : 'months')) + '</span>');
                                $sliderLabelValue.parents('.period-value-container').find('.value-wrapper').html('').append($sliderLabelValue).append($span);
                            }
                        }
                    });
                });
                
                $sliderLabelValue.on('blur keyup', function(e) {
                    if (e.type === 'blur' || e.keyCode === 13) {
                        const $this = $(this);
                        if (!$this.val().match(/^\d+$/)) {
                            $this.val('12');
                        }
                        if ($this.parents('.amount-value-container').length > 0) {
                            $this.val(parseInt(Math.round(parseInt($this.val()) / 50) * 50));
                        }
                        if (parseInt($this.val()) > parseInt($e.attr('max'))) {
                            $this.val(parseInt($e.attr('max')));
                        }
                        if (parseInt($this.val()) < parseInt($e.attr('min'))) {
                            $this.val(parseInt($e.attr('min')));
                        }

                        const to = parseInt($this.val());
                        const from = parseInt($e.val());

                        $({
                            counter: from
                        }).animate({
                            counter: to
                        }, {
                            duration: 500,
                            easing: 'swing',
                            step: function() {
                                $e.val(Math.round(this.counter));
                            },
                            done: function() {
                                console.log("done")
                                $e.val(to).trigger('change');
                            }
                        });
                    }
                });

                $e.on('change', filter);
                
            });

 



            $('input[type=range].costslider').change(function() {

                const widget = $('input[type=range].costslider').parents('.a44-widget');
                const slugs = [];

                store.state.offers.forEach(offer => slugs.push(offer.loando_slug))

                widget.find('.amount, .time, .installment, .cost, .apr').html('-');

                if (slugs.length > 0) {
                    const prefix = widget.find('input[class^="a44-period"]').attr('data-suffix') === ' dni' ? 'day' : 'month';
                    const amount = parseInt(widget.find('input[class^="a44-amount"]').val());
                    const time = parseInt(widget.find('input[class^="a44-period"]').val());
                
                $.getJSON('https://loando.pl/api/json/costs', {
                    slug: slugs,
                    amount: amount,
                    period: time,
                    time_type: prefix
                }, function(data) {
                    $(slugs).each(function(i, name) {
                        if (typeof data.costs !== 'undefined' && typeof data.costs[name] !== 'undefined') {
                            const container = widget.find($('[data-costs="' + name + '"]'));
                            container.find('.amount').html((typeof data.costs[name].amount !== 'undefined' ? data.costs[name].amount : '*' + amount) + '  zł /' + (typeof data.costs[name].time !== 'undefined' ? data.costs[name].time : time) + (prefix == 'month' ? ' ' + (typeof communicates.value['months'] !== 'undefined' ? communicates.value['months'] : 'months') : ' ' + (typeof communicates.value['days'] !== 'undefined' ? communicates.value['days'] : 'days')));

    
                            container.find('.installment').html('<a href="' + container.find('.cta-link').attr('href') + '" target="_blank" style="color:#fff;">Zobacz</a>');
    
                            if (typeof data.costs[name].installment !== 'undefined' && prefix == 'month')
                                container.find('.installment').html(data.costs[name].installment + '  zł');
                            if (typeof data.costs[name].cost !== 'undefined' && prefix == 'day')
                                container.find('.installment').html(data.costs[name].cost + '  zł');
                                
                            container.find('.apr').html(((typeof data.costs[name].apr !== 'undefined' && data.costs[name].apr != null) ? data.costs[name].apr + '%' : '<a href="' + container.find('.cta-link').attr('href') + '" target="_blank" style="color:#fff;">Sprawdź</a>'));
                            if (typeof data.costs[name].amount !== 'undefined' && typeof data.costs[name].cost !== 'undefined') {
                                const installment = container.find('.installment');
                                installment.html(installment.html() + ' / ' + (Math.round((data.costs[name].cost + data.costs[name].amount) * 100) / 100) + '  zł');
                            }
                        }
                    });
                });
            }
                })
            }
            setTimeout(()=>{
                $('input[type=range].costslider').last().trigger('change');
            },2000)



            const filter = function() {
                // console.log(11, $('<div />'))
                // const $alert = $('<div />').addClass('a44-alert').html(typeof communicates.value['No offers matching criteria'] !== 'undefined' ? communicates.value['No offers matching criteria'] : 'No offers matching criteria').hide();
                // const $promo = $('<div />').addClass('a44-promo').html(typeof communicates.value['We also recommend loans with other parameters'] !== 'undefined' ? communicates.value['We also recommend loans with other parameters'] : 'We also recommend loans with other parameters').hide();
        
                const $sliderAmount = $('.amount-container input.costslider');
                const $sliderPeriod = $('.period-container input.costslider');
                // const $freeAmount = $('[id^="#chck-free-amount-"');

                const amount = parseInt($sliderAmount.val());
                const period = parseInt($sliderPeriod.val());

                $(slider.value).find('.a44-offer').hide();

                // const $offers = $(".layout").find('.a44-offer').filter(function() {
                // return parseInt($(this).attr("data-minamount")) <= amount;
                // }).filter(function() {
                // return parseInt($(this).attr("data-maxamount")) >= amount;
                // }).filter(function() {
                // return parseInt($(this).attr("data-minperiod")) <= period;
                // }).filter(function() {
                // return parseInt($(this).attr("data-maxperiod")) >= period;
                // }).filter(function() {
                //     if ($freeAmount.is(':checked')){
                //         return parseInt($(this).attr("data-freeamount")) >= amount;
                //     }  
                //     return true;
                // });
                
                
                store.commit("updateFilteres", { period, amount })

                // $offers.show();
                // if ($offers.length > 0)
                //     $alert.hide();
                // else
                //     $alert.show();
                // if ($offers.length <= 3) {
                //     if ($('.a44-offer.promo').length) {
                //         $('.a44-offer.promo').each(function() {
                //             if ($(this).css('display') == 'none')
                //                 $(this).insertAfter($promo).show();
                //         });
                //         $promo.show();
                //     }
                // } else {
                //     $promo.hide();
                // }
            };








        return {
            slider,
            getPeriod
        }
    }
})
</script>
