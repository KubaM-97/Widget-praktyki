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
            data-currency=" zł" @input="getAmount"/>
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
        const input_hidden = computed(()=>store.state.input_hidden);

        const slider = ref(null)

        let tr;

        onMounted(()=>{

            tr = $('.translations').val(JSON.stringify(input_hidden.value));    
           
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

            const $freeAmount = $('[id^="#chck-free-amount-"');
            let $category = 1; 
            // const $alert = $('<div />').addClass('a44-alert').html(typeof tr['No offers matching criteria'] !== 'undefined' ? tr['No offers matching criteria'] : 'No offers matching criteria').hide();
            
            const $promo = $('<div />').addClass('a44-promo').html(typeof tr['We also recommend loans with other parameters'] !== 'undefined' ? tr['We also recommend loans with other parameters'] : 'We also recommend loans with other parameters').hide();
            
            if ($category == 1){
                $freeAmount.change(filter);
            }
            else
            $freeAmount.parent().remove();

            // $alert.insertBefore(slider.value.children.last());
            $promo.insertBefore('.costs-info');
            
            
      
            getPeriod();
        })
       


           



         function getPeriod(){
             
            const $category = 1;
            let $suffix = ' dni';

            const $sliderAmount = $('.amount-container input.costslider');
            const $sliderPeriod = $('.period-container input.costslider');
            const $freeAmount = $('[id^="#chck-free-amount-"');
           

            $([$sliderPeriod, $sliderAmount, $freeAmount]).each(function(i, $e) {
                
                const $suffixDays = JSON.parse(tr.val())["days"]
                const $suffixMonth = JSON.parse(tr.val())["month"]

                $suffix = $e.attr('data-suffix') == undefined ? '' : ($e.attr('data-suffix') == ' dni' ? ' ' + $suffixDays : ' ' + $suffixMonth);
              
                const $currency = $e.attr('data-currency') == undefined ? '' : $e.attr('data-currency');
                const $sliderLabelValue = $(this).parents('.range-wrapper').find('input.value');

                $(this).parents('.range-wrapper').find('.a44-min').html($category == 3 && $(this).parents('.period-container').length ? '61 ' + (typeof tr['days'] !== 'undefined' ? tr['days'] : 'days') : ($e.attr('min') + $suffix + $currency));
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
                                let $span = $('<span>' + (typeof tr['days'] !== 'undefined' ? tr['days'] : 'days') + '</span>');
                                $sliderLabelValue.parents('.period-value-container').find('.value-wrapper').html('').append($sliderLabelValue).append($span);
                            } else if ($sliderLabelValue.parents('.period-value-container').length) {
                                $sliderLabelValue.val(to);
                                let $span = $('<span>' + ($e.attr('data-suffix') == ' dni' ? (typeof tr['days'] !== 'undefined' ? tr['days'] : 'days') : (typeof tr['months'] !== 'undefined' ? tr['months'] : 'months')) + '</span>');
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

                // // do not delete
                $e.on('change', filter);
            });

 



            $('input[type=range].costslider').change(function() {
                
           const widget = $('input[type=range].costslider').parents('.a44-widget');
           const slugs = [];

           
           console.log(widget)
           console.log(widget.find('div').length)
           console.log(widget.find('[data-costs]'))
           widget.find('[data-costs]').each(function(i, e) {
            //    console.log("widget")/
               console.log($(e).data())
               slugs.push($(e).data('costs'));
           });

           widget.find('.amount, .time, .installment, .cost, .apr').html('-');
console.log(slugs.length)
           if (slugs.length > 0) {
               console.log(333)
               const prefix = widget.find('input[class^="a44-period"]').attr('data-suffix') === ' dni' ? 'day' : 'month';
               const amount = parseInt(widget.find('input[class^="a44-amount"]').val());
               const time = parseInt(widget.find('input[class^="a44-period"]').val());
            
               $.getJSON('https://loando.pl/api/json/costs', {
                   slug: slugs,
                   amount: amount,
                   period: time,
                   time_type: prefix
               }, function(data) {
                //    console.log(data)
                   $(slugs).each(function(i, name) {
                       console.log(4444)
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
            })
            $('input[type=range].costslider').last().trigger('change');
        }

        function getAmount(){
            // slider = $('.a44-slider');
            // const resultAmount = slider.find(".amount-container input[type=text]");
            // sliderAmount = slider.find(".amount-container input[type=range]").val();
 
            // resultAmount.val(sliderAmount);
            // display_offers(sliderAmount, sliderPeriod)
        }
    const filter = function() {
        const $alert = $('<div />').addClass('a44-alert').html(typeof tr['No offers matching criteria'] !== 'undefined' ? tr['No offers matching criteria'] : 'No offers matching criteria').hide();
        const $promo = $('<div />').addClass('a44-promo').html(typeof tr['We also recommend loans with other parameters'] !== 'undefined' ? tr['We also recommend loans with other parameters'] : 'We also recommend loans with other parameters').hide();
  
        const $sliderAmount = $('.amount-container input.costslider');
        const $sliderPeriod = $('.period-container input.costslider');
        const $freeAmount = $('[id^="#chck-free-amount-"');

        const amount = parseInt($sliderAmount.val());
        const period = parseInt($sliderPeriod.val());

        $(slider.value).find('.a44-offer').hide();

        const $offers = $(".layout").find('.a44-offer').filter(function() {
         return parseInt($(this).attr("data-minamount")) <= amount;
        }).filter(function() {
         return parseInt($(this).attr("data-maxamount")) >= amount;
        }).filter(function() {
         return parseInt($(this).attr("data-minperiod")) <= period;
        }).filter(function() {
          return parseInt($(this).attr("data-maxperiod")) >= period;
        }).filter(function() {
            if ($freeAmount.is(':checked')){
                return parseInt($(this).attr("data-freeamount")) >= amount;
            }  
            return true;
        });
        
        
        store.commit("updateFilteres", { period, amount })
        // store.commit("setOffers", $offers)

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
            $promo.hide();
        }
};

        return {
            slider,
            getPeriod,
            getAmount
        }
    }
})
</script>









  //  Cześć Rafał, wczoraj mówiłeś, że jeżeli będę miał jakiś kłopot to żebym do Cibie napisał, to piszę ;)
        //  W tym widgetu chodzi o te 5 gwiazdek po najechaniu ładnie wypełnia się 1,2,3,4 lub 5 gwiazdek, ale po kliknięciu wyświtla i się aki błąd:
         
        //  GET https://widgets.aff44.com/vote?save_rate=undefined&rate=1&callback=jQuery360048765289300618697_1618472727013&_=1618472727014 net::ERR_ABORTED 500 (Internal Server Error)

        // Poradziłbyś coś? 