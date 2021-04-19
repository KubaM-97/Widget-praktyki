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
            step="1"  data-suffix=" dni" v-model.number="filterParams.period"/>
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
            data-currency=" zł" v-model.number="filterParams.amount"/>
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
      <input type="checkbox" id="chck-free-amount-12392823e6dbdfb0f22e748cfdf47832" ref="freeAmount"
       v-model="filterParams.free_amount"/>
      <span class="checkmark"></span>
      <label for="chck-free-amount"> Pokaż tylko darmowe pożyczki</label>
      <input type="hidden" class="translations" value="" />
    </div>

  </div>

</template>

<script>

import { computed,  ref } from "vue" 
import { useStore } from "vuex" 

import $ from "jquery";
import { onMounted } from "vue";

export default ({

    setup() {
        

        const store = useStore();
        const messages = computed(()=>store.state.messages);
        const slider = ref(null)
        
        const filterParams = computed(()=>store.state.filterParams).value

        function slidersAttr(){

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
       

        onMounted(()=>{
            slidersAttr();
            getPeriod();
        })


        function getPeriod(){
             
            const $category = 1;
            let $suffix = ' dni';

            const $sliderAmount = $('.amount-container input.costslider');
            const $sliderPeriod = $('.period-container input.costslider');
            const $freeAmount = $('[id^="#chck-free-amount-"');
           

            $([$sliderPeriod, $sliderAmount, $freeAmount]).each(function(i, $e) {
                
                const $suffixDays = messages.value["days"]
                const $suffixMonth = messages.value["month"]

                $suffix = $e.attr('data-suffix') == undefined ? '' : ($e.attr('data-suffix') == ' dni' ? ' ' + $suffixDays : ' ' + $suffixMonth);
              
                const $currency = $e.attr('data-currency') == undefined ? '' : $e.attr('data-currency');
                const $sliderLabelValue = $(this).parents('.range-wrapper').find('input.value');

                $(this).parents('.range-wrapper').find('.a44-min').html($category == 3 && $(this).parents('.period-container').length ? '61 ' + (typeof messages.value['days'] !== 'undefined' ? messages.value['days'] : 'days') : ($e.attr('min') + $suffix + $currency));
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
                                let $span = $('<span>' + (typeof messages.value['days'] !== 'undefined' ? messages.value['days'] : 'days') + '</span>');
                                $sliderLabelValue.parents('.period-value-container').find('.value-wrapper').html('').append($sliderLabelValue).append($span);
                            } else if ($sliderLabelValue.parents('.period-value-container').length) {
                                $sliderLabelValue.val(to);
                                let $span = $('<span>' + ($e.attr('data-suffix') == ' dni' ? (typeof messages.value['days'] !== 'undefined' ? messages.value['days'] : 'days') : (typeof messages.value['months'] !== 'undefined' ? messages.value['months'] : 'months')) + '</span>');
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
                                
                                // here need to add some names to the container
                                var container = widget.find($('[data-costs="' + name + '"]'));                            

                                container.find('.amount').html((typeof data.costs[name].amount !== 'undefined' ? data.costs[name].amount : '*' + amount) + '  zł /' + (typeof data.costs[name].time !== 'undefined' ? data.costs[name].time : time) + (prefix == 'month' ? ' ' + (typeof messages.value['months'] !== 'undefined' ? messages.value['months'] : 'months') : ' ' + (typeof messages.value['days'] !== 'undefined' ? messages.value['days'] : 'days')));
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
                        })
                    })
                }
            })
        setTimeout(()=>$('input[type=range].costslider').last().trigger('change'),2000)
        
        }





        return {
          filterParams,
            slider,
            getPeriod
        }
    }
})
</script>

<style scoped>
.a44-slider {
    border-radius: 5px;
    margin-bottom: 16px;
    padding: 16px;
}

.a44-slider .period-container {
    max-width: 50%;
    width: 100%;
    float: left;
    padding-right: 12px;
}

.a44-slider .period-name-container {
    max-width: 66%;
    width: 100%;
    float: left;
    text-align: left;
}

.a44-slider .period-value-container {
    max-width: 33%;
    width: 100%;
    float: left;
    text-align: right;
}

.a44-slider .amount-container {
    max-width: 50%;
    width: 100%;
    float: left;
    padding-left: 12px;
}

.a44-slider .range-wrapper {
    border-radius: 5px;
    padding: 16px;
}

.a44-slider .range-wrapper .value-wrapper {
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 700;
}

.a44-slider .amount-name-container {
    max-width: 66%;
    width: 100%;
    float: left;
    text-align: left;
}

.a44-slider .amount-value-container {
    max-width: 33%;
    width: 100%;
    float: left;
    text-align: right;
}

.a44-slider .name {
    font-size: 18px;
    font-weight: 700;
}

.a44-slider .name:before {
    display: inline-block;
    padding: 4px 7.2px 2.4px 7.2px;
    background: #fd9937;
    border-radius: 4px;
    content: " ";
    vertical-align: middle;
    margin-right: 10px;
}

.a44-slider .amount-container .name:before {
    content: url("~@/assets/img/wallet.png");
}

.a44-slider .period-container .name:before {
    content: url("~@/assets/img/calendar.png");
}

.a44-slider .value {
    border: 0;
    background: transparent;
    border-bottom: 2px solid #6a727c;
    font-size: 17.6px;
    font-weight: bold;
    max-width: 60px;
    text-align: center;
}

.a44-slider .input-wrapper {
    margin: 8px auto 0 auto;
}

.a44-slider input[type="range"] {
    width: 100%;
}

.a44-slider .free-amount-container {
    width: 100%;
    padding-top: 16px;
    font-weight: 400;
    font-size: 13.184px;
    position: relative;
}

.a44-slider .min-val-wrapper,
.a44-slider .max-val-wrapper {
    max-width: 50%;
    width: 100%;
    float: left;
    text-transform: uppercase;
    font-size: 11px;
}

.a44-slider .min-val-wrapper {
    text-align: left;
}

.a44-slider .max-val-wrapper {
    text-align: right;
}

.a44-md .a44-slider .name {
    font-size: 17.6px;
}

.a44-md .a44-slider .value-wrapper {
    font-size: 17.6px;
}

.a44-sm .a44-slider .name {
    font-size: 17.6px;
}

.a44-sm .a44-slider .value-wrapper {
    font-size: 17.6px;
}

.a44-sm .period-container,
.a44-sm .amount-container {
    max-width: 100%;
    padding: 0;
}

.a44-sm .period-container {
    margin-bottom: 16px;
}

.a44-xs .a44-slider .name {
    font-size: 16px;
}

.a44-xs .a44-slider .value-wrapper {
    font-size: 16px;
}

.a44-xs .period-container,
.a44-xs .amount-container {
    max-width: 100%;
    padding: 0;
}

.a44-xs .period-container {
    margin-bottom: 16px;
}

input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    background: transparent;
    height: 38px;
}

input[type="range"]:focus {
    outline: none;
}

input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: #fd9937;
    border-radius: 1px;
}

input[type="range"]::-webkit-slider-thumb {
    height: 28px;
    width: 28px;
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -12px;
}

input[type="range"]::-moz-range-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: #fd9937;
    border-radius: 1px;
}

input[type="range"]::-moz-range-thumb {
    height: 28px;
    width: 28px;
    border-radius: 50%;
    border: 0px transparent;
    background-color: transparent;
    cursor: pointer;
}

input[type="range"]::-moz-range-progress {
    background-color: #fd9937;
}

input[type="range"]::-ms-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
}

input[type="range"]::-ms-fill-lower {
    background: #fd8c1e;
    border-radius: 2px;
}

input[type="range"]::-ms-thumb {
    height: 28px;
    width: 28px;
    border-radius: 50%;
    border: 0px transparent;
    background-color: transparent;
    margin-top: 0px;
    cursor: pointer;
}

input[type="range"]:focus::-ms-fill-lower {
    background: #fd9937;
}

.free-amount-container input {
    -moz-appearance: none;
    -webkit-appearance: none;
    -o-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    box-shadow: 0px 1px 1px #efefef;
    background-color: #fff;
    border: 1px solid #d7e3f0;
    position: relative;
    z-index: 10;
    top: 4px;
}

.free-amount-container .checkmark {
    position: absolute;
    height: 10px;
    width: 10px;
    z-index: 9;
}

.free-amount-container .checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.free-amount-container input:checked {
    background: transparent;
}

.free-amount-container input:checked~.checkmark:after {
    display: block;
}

.free-amount-container .checkmark:after {
    left: -14px;
    top: 10px;
    width: 4px;
    height: 8px;
    border: solid black;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    background: #fff;
}
</style>
