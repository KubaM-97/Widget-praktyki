<template>

  <div class="a44-slider" ref="slider">

    <div class="period-container">
      <div class="range-wrapper">

        <div class="period-name-container">
          <span class="name"> {{translations["Loan period"]}} </span>
        </div>

        <div class="period-value-container">
          <span class="value-wrapper">
            <input type="text" class="value" readonly value=12 />{{arr.suffix}}
          </span>
        </div>

        <div class="aclr"></div>

        <div class="input-wrapper">
          <input type="range" 
            :class="'a44-period-'+arr.hash +' costslider'"
            step="1" v-model.number="filterParams.period" 
            :data-suffix="arr.suffix" :min="arr.minPeriod" :max="arr.maxPeriod"
            @input="getPeriod"
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
            <input type="text" class="value" value=1000 /> {{arr.currency}}
          </span>
        </div>
        <div class="aclr"></div>
        <div class="input-wrapper">
          <input type="range" :class="'a44-amount-'+arr.hash +' costslider'" step="50"
            v-model.number="filterParams.amount" 
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

import { computed,  ref } from "vue" 
import { useStore } from "vuex" 

import $ from "jquery";
import { onMounted } from "vue";

export default ({

    setup() {

        const store = useStore();
        const translations = computed(()=>store.state.translations);
        const slider = ref(null); 

        const arr = computed(()=>store.state.arr); 
        const category = computed(()=>store.state.arr).value.category;
        
        const filterParams = computed(()=>store.state.filterParams).value



        //init slider!!!


        onMounted(()=>{
            getPeriod();
        })

        // function sliderMoveAnimation(){
          
        //   // const $sliderLabelValue = $(this).parents('.range-wrapper').find('input.value');
        //   // const $this = $(this);
        //   // const to = parseInt($this.val());
        //   // const from = parseInt($sliderLabelValue.val());
        //     const sliderLabelValue = document.querySelector('.range-wrapper input[type="text"].value');
        //     const to = parseInt(this.value)
        //     const from = parseInt(sliderLabelValue.value)
            
        //     $({
        //         counter: from
        //     }).animate({
        //         counter: to
        //     }, {
        //         duration: 500,
        //         easing: 'swing',
        //         step: function() {
        //             sliderLabelValue.value = Math.round(this.counter);
        //         },
        //         done: function() {
        //             sliderLabelValue.value = to;
        //             if (sliderLabelValue.parents('.period-value-container').length && category == 3 && to == 2) {
        //                 sliderLabelValue.value = '61';
        //                 const $span = `<span>  + 
        //                               ${ (typeof translations.value['days'] !== 'undefined' ? translations.value['days'] : 'days')} 
        //                               </span>`;
        //                 sliderLabelValue.parents('.period-value-container').find('.value-wrapper').html('').append(sliderLabelValue).append($span);
        //             } else if (sliderLabelValue.parents('.period-value-container').length) {
        //                 sliderLabelValue.value = to;
        //                 let $span = $('<span>' + ($e.attr('data-suffix') == ' dni' ? (typeof translations.value['days'] !== 'undefined' ? translations.value['days'] : 'days') : (typeof translations.value['months'] !== 'undefined' ? translations.value['months'] : 'months')) + '</span>');
        //                 sliderLabelValue.parents('.period-value-container').find('.value-wrapper').html('').append(sliderLabelValue).append($span);
        //             }
        //         }
        //     });

        // }

        function getPeriod(){
             

            const $sliderAmount = $('.amount-container input.costslider');
            // const $sliderAmount = document.querySelector('.amount-container input.costslider');
            
            const $sliderPeriod = $('.period-container input.costslider');
            const $freeAmount = $('[id^="#chck-free-amount-"');
           

            $([$sliderPeriod, $sliderAmount, $freeAmount]).each(function(i, $e) {
                
                const $suffixDays = translations.value["days"]
                const $suffixMonth = translations.value["month"]

                let $suffix = ref(' dni').value;
                $suffix = $e.attr('data-suffix') == undefined ? '' : ($e.attr('data-suffix') == ' dni' ? ' ' + $suffixDays : ' ' + $suffixMonth);
              
                const $currency = $e.attr('data-currency') == undefined ? '' : $e.attr('data-currency');
                const $sliderLabelValue = $(this).parents('.range-wrapper').find('input.value');

                $(this).parents('.range-wrapper').find('.a44-min').html(category == 3 && $(this).parents('.period-container').length ? '61 ' + (typeof translations.value['days'] !== 'undefined' ? translations.value['days'] : 'days') : ($e.attr('min') + $suffix + $currency));
                $(this).parents('.range-wrapper').find('.a44-max').html($e.attr('max') + $suffix + $currency);
          
                // $e.on('input', sliderMoveAnimation);

                // $e.on('input', function() {
                    
                // });
                
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
                        // console.log(data)
                        $(slugs).each(function(i, name) {
                            if (typeof data.costs !== 'undefined' && typeof data.costs[name] !== 'undefined') {
                                
                                // here need to add some names to the container
                                var container = widget.find($('[data-costs="' + name + '"]'));                            

                                container.find('.amount').html((typeof data.costs[name].amount !== 'undefined' ? data.costs[name].amount : '*' + amount) + '  zł /' + (typeof data.costs[name].time !== 'undefined' ? data.costs[name].time : time) + (prefix == 'month' ? ' ' + (typeof translations.value['months'] !== 'undefined' ? translations.value['months'] : 'months') : ' ' + (typeof translations.value['days'] !== 'undefined' ? translations.value['days'] : 'days')));
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
        
        // $('input[type=range].costslider').last().trigger('change')
        
        }





        return {
          arr,
          translations,
          filterParams,
            slider,
            getPeriod
        }
    }
    
})
</script>
