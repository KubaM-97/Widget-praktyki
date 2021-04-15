<template>
    <div class="a44-slider" ref="slider">

        <div class="period-container">
            <div class="range-wrapper">

                <div class="period-name-container">
                    <span class="name">Okres pożyczki</span>
                </div>

                <div class="period-value-container">
                    <span class="value-wrapper">
                        <input type="text" class="value" readonly value="12">dni
                    </span>
                </div>

                <div class="aclr"></div>

                <div class="input-wrapper">
                    <input type="range" 
                    class="a44-period-69ac1091c4c51b931f1225a13d0e9e39 costslider"
                    step="1" data-suffix=" dni" min="1" max="65" value="12" @input="getPeriod">
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
                        <input type="text" class="value" value="1000"> zł
                    </span>
                </div>
                <div class="aclr"></div>
                <div class="input-wrapper">
                    <input type="range" class="a44-amount-69ac1091c4c51b931f1225a13d0e9e39 costslider"
                    step="50" data-currency=" zł" min="100" max="60000" value="1000" @input="getAmount">
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
            <!-- <input type="checkbox" id="chck-free-amount-12392823e6dbdfb0f22e748cfdf47832" ref="freeAmount"> -->
            <input type="checkbox" id="chck-free-amount-12392823e6dbdfb0f22e748cfdf47832" ref="freeAmount">
            <span class="checkmark"></span>
            <label for="chck-free-amount"> Pokaż tylko darmowe pożyczki</label>
            <input type="hidden" class="translations" value=""/>
        </div>
    
    </div>
    
</template>

<script>

import { computed,  } from "vue" 
import { useStore } from "vuex" 

import $ from "jquery";
import { onMounted } from "vue";

export default ({

    setup() {
        
        const store = useStore();
        const input_hidden = computed(()=>store.state.input_hidden);

        let tr;

        onMounted(()=>{
            tr = $('.translations').val(JSON.stringify(input_hidden.value));    
        })
       
        let slider;
         

         function getPeriod(){

           const widget = $('input[type=range].costslider').parents('.a44-widget');
           const slugs = [];

           widget.find('[data-costs]').each(function(i, e) {
               slugs.push($(e).data('costs'));
           });

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
                           container.find('.amount').html((typeof data.costs[name].amount !== 'undefined' ? data.costs[name].amount : '*' + amount) + '  zł /' + (typeof data.costs[name].time !== 'undefined' ? data.costs[name].time : time) + (prefix == 'month' ? ' ' + (typeof tr['months'] !== 'undefined' ? tr['months'] : 'months') : ' ' + (typeof tr['days'] !== 'undefined' ? tr['days'] : 'days')));
 
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
        }

        function getAmount(){
            // slider = $('.a44-slider');
            // const resultAmount = slider.find(".amount-container input[type=text]");
            // sliderAmount = slider.find(".amount-container input[type=range]").val();
 
            // resultAmount.val(sliderAmount);
            // display_offers(sliderAmount, sliderPeriod)
        }

/* eslint-disable */
        function display_offers(sliderAmount, sliderPeriod){

                const $category = 1;

                const $alert = $('<div />').addClass('a44-alert').html(typeof tr['No offers matching criteria'] !== 'undefined' ? tr['No offers matching criteria'] : 'No offers matching criteria').hide();
                const $promo = $('<div />').addClass('a44-promo').html(typeof tr['We also recommend loans with other parameters'] !== 'undefined' ? tr['We also recommend loans with other parameters'] : 'We also recommend loans with other parameters').hide();

                const freeAmount = slider.find('.free-amount-container');

                if ($category == 1)
                    freeAmount.change(filter);
                else
                    freeAmount.parent().remove();
                $alert.insertBefore(slider.children().last());
                $promo.insertBefore('.costs-info');

                const filter = function() {
        
                    const amount = parseInt(sliderAmount.val());
                    const period = parseInt(sliderPeriod.val());

                    slider.find('.a44-offer').hide();

                    const $offers = slider.find('.a44-offer').filter(function() {
                        return parseInt($(this).attr("data-minamount")) <= amount;
                    }).filter(function() {
                        return parseInt($(this).attr("data-maxamount")) >= amount;
                    }).filter(function() {
                        return parseInt($(this).attr("data-minperiod")) <= period;
                    }).filter(function() {
                        return parseInt($(this).attr("data-maxperiod")) >= period;
                    }).filter(function() {
                        if (freeAmount.is(':checked'))
                            return parseInt($(this).attr("data-freeamount")) >= amount;
                        return true;
                    });
                    $offers.show();
                    if ($offers.length > 0)
                        $alert.hide();
                    else
                        $alert.show();
                    if ($offers.length <= 3) {
                        if ($('.a44-offer.promo').length) {
                            $('.a44-offer.promo').each(function() {
                                if ($(this).css('display') == 'none')
                                    $(this).insertAfter($promo).show();
                            });
                            $promo.show();
                        }
                    } else {
                            $('.a44-offer.promo').hide();
                        $promo.hide();
                    }
    }
        }
/* eslint-enable */
    


        return {
            slider,
            getPeriod,
            getAmount
        }
    }
})
</script>
