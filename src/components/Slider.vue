<template>
    {{filterParams}}
  <div class="a44-slider">

    <div class="period-container" ref="periodContainer">
      <div class="range-wrapper">

        <div class="period-name-container">
          <span class="name"> {{translations["Loan period"]}} </span>
        </div>

        <div class="period-value-container">
          <span class="value-wrapper">
            <input type="text" class="value" readonly :value="filterParams.period" 
            :min="arr.minPeriod" :max="arr.maxPeriod" name="period-label"/>
            <span class="suffix">{{arr.suffix}}</span>
          </span>
        </div>

        <div class="aclr"></div>

        <div class="input-wrapper">
          <input type="range" v-model.number.lazy="filterParams.period" @input="getPeriod" @change="green_blocks"
            :class="'a44-period-'+arr.hash +' costslider'" name="period-costslider"
            step="1" :min="arr.minPeriod" :max="arr.maxPeriod"/>
        </div>
        <div class="min-val-wrapper">
          <span class="a44-min"> {{arr.minPeriod}} {{arr.suffix}} </span>
        </div>
        <div class="max-val-wrapper">
          <span class="a44-max"> {{arr.maxPeriod}} {{arr.suffix}} </span>
        </div>
        <div class="aclr"></div>
      </div>
    </div>

    <div class="amount-container" ref="amountContainer">
      <div class="range-wrapper">
        <div class="amount-name-container">
          <span class="name"> {{translations["Loan amount"]}} </span>
        </div>
        <div class="amount-value-container">
          <span class="value-wrapper">
            
            <input type="text" @blur="getAmountManually" @keyup.enter="getAmountManually" class="value" 
            :value="filterParams.amount" :min="arr.minAmount" :max="arr.maxAmount" name="amount-label"/>
            
            <span class="currency">{{arr.currency}}</span>
          </span>
        </div>
        <div class="aclr"></div>
        <div class="input-wrapper">
          <input type="range" v-model.number.lazy="filterParams.amount" @input="getAmount" @change="green_blocks"
            :class="'a44-amount-'+arr.hash +' costslider'" name="amount-costslider"
            step="50" :min="arr.minAmount" :max="arr.maxAmount"/>
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

    <div class="free-amount-container" ref="freeAmount">
      <input type="checkbox" :id="'chck-free-amount-'+arr.hash"
       v-model="filterParams.free_amount"/>
      <span class="checkmark"></span>
      <label :for="'chck-free-amount-'+arr.hash"> {{ translations["Show only free loans"] }}</label>
      <input type="hidden" class="translations" value="" />
    </div>

  </div>

</template>

<script>

import { computed, onMounted, ref } from "vue" 
import { useStore } from "vuex" 

import $ from "jquery";

export default ({
  
    setup() {

        const store = useStore();
        const translations = computed(()=>store.state.translations);
        const arr = computed(()=>store.state.arr); 
        const offers = computed(()=>store.state.offers); 
        const filterParams = computed(()=>store.state.filterParams); 

        const amountContainer = ref(null)
        const periodContainer = ref(null)
        const freeAmount = ref(null)

        const suffix = computed(()=>arr.value.suffix)
        const category = computed(()=>arr.value.category)

        function getPeriod(e){
            const elem = e.target
            const oldSuffix =  suffix.value == undefined ? ''  : ( suffix.value == ' dni' ? ' ' + translations.value['days'] : ' ' + translations.value['months']);
            const sliderPeriodLabel = periodContainer.value.querySelector('input[type=text].value')
            sliderMoveAnimation(sliderPeriodLabel, elem, oldSuffix)
        } 
        
        function getAmount(e){   
            const elem = e.target        
            const sliderAmountLabel = amountContainer.value.querySelector('input[type=text].value')
            sliderMoveAnimation(sliderAmountLabel, elem)    
        }

        onMounted(()=>{
          green_blocks()
        })

        function green_blocks(){

            const widget = document.querySelector('.a44-widget');

            const widgetNodeList = widget.querySelectorAll('.amount, .installment, .apr')
            widgetNodeList.forEach( el => el.innerHTML = '-')

            const slugs = [];
            offers.value.forEach( offer => slugs.push(offer['loando_slug']) )

            if (slugs.length > 0) {

                const prefix = suffix.value === ' dni' ? 'day' : 'month'
                const period = periodContainer.value.querySelector('input[type=range].costslider').value
                const amount = amountContainer.value.querySelector('input[type=range].costslider').value

                $.getJSON('https://loando.pl/api/json/costs', {
                    slug: slugs,
                    amount: parseInt(amount),
                    period: parseInt(period),
                    time_type: prefix
                }, function(data) {
                    // console.log(data);
                    slugs.forEach( slug => {
                      if (typeof data.costs !== 'undefined' && typeof data.costs[slug] !== 'undefined') {

                          const container = widget.querySelector('[data-costs="' + slug + '"]');
                          

                          if(container){
                            
                              const amountContainer = container.querySelector('.amount');
                              amountContainer.innerHTML = `*  ${parseInt(amount)} ${arr.value['currency']} / ${parseInt(period)} 
                                    ${(prefix == 'month' 
                                      ? ` ${typeof translations.value['months'] !== 'undefined' ? translations.value['months'] : 'months'}`
                                      : ` ${typeof translations.value['days'] !== 'undefined' ? translations.value['days'] : 'days'}`)}`;
                             

                              const installmentContainer = container.querySelector('.installment');
                              const href = container.querySelector('.cta-link').getAttribute('href')

                              //zobacz
                              installmentContainer.innerHTML = `<a href=${href}" target="_blank" style="color:#fff;">${translations.value['see']}</a>`
                     
                              if (typeof data.costs[slug].installment !== 'undefined' && prefix == 'month')
                                  installmentContainer.innerHTML = `${data.costs[slug].installment} ${arr.value['currency']}`;
                              if (typeof data.costs[slug].cost !== 'undefined' && prefix == 'day')
                                  installmentContainer.innerHTML = `${data.costs[slug].cost} ${arr.value['currency']}`;


                              const aprContainer = container.querySelector('.apr');

                              // SPRAWDŹ
                              aprContainer.innerHTML = ` ${ 
                                typeof data.costs[slug].apr !== 'undefined' && data.costs[slug].apr != null 
                                ? `${data.costs[slug].apr} %` 
                                : `<a href=${href}" target="_blank" style="color:#fff;">${translations.value['check']}</a>`
                              }`;
                              
                              if (typeof data.costs[slug].amount !== 'undefined' && typeof data.costs[slug].cost !== 'undefined') {                             
                                  installmentContainer.innerHTML += ` /  ${ Math.round( (data.costs[slug].cost + data.costs[slug].amount) * 100) / 100 }  ${arr.value['currency']}`;                       
                              }
                          }


                      }

                    })
                });
            }
          
        }

        function sliderMoveAnimation(fromElement, toElement, oldSuffix){
          
            const from = parseInt(fromElement.value);
            const to = parseInt(toElement.value);

            $({
                counter: from
            }).animate({
                counter: to
            }, {
                duration: 500,
                easing: 'swing',
                step: function() {
                    fromElement.value = Math.round(this.counter);
                },
                done: function() {
                    if(oldSuffix){
                      
                      const suffixContainer = periodContainer.value.querySelector('span.suffix')
  
                      if (category.value == 3 && to == 2) {
                          fromElement = '61';
                          const newSuffix = ` 
                              ${ 
                                typeof translations.value['days'] !== 'undefined'
                                ? translations.value['days'] 
                                : 'days'                             
                              }`
                          suffixContainer.innerHTML = newSuffix
  
  
                     } else {
  
                          const newSuffix = ` 
                              ${ 
                                oldSuffix == ' dni' 
                                ? ( typeof translations.value['days'] !== 'undefined' ? translations.value['days'] : 'days' )
                                : ( typeof translations.value['months'] !== 'undefined' ? translations.value['months'] : 'months' )
                              }
                          `
                          suffixContainer.innerHTML = newSuffix
                      
                      }
                    }
                    else{
                      fromElement.value = parseInt( Math.round ( parseInt(toElement.value) / 50) * 50);
                    }
                }
            });
        
        }

        function getAmountManually(e){
         
            const elem = e.target;
            const sliderAmountLabel = amountContainer.value.querySelector('input[type=range].costslider')
            
            elem.value = parseInt( Math.round ( parseInt(elem.value) / 50) * 50);

            // greater than max 60000
            if (parseInt(elem.value) > parseInt(elem.max)) {
              elem.value = parseInt(elem.max);
            }

            // lower than min 100
            if (parseInt(elem.value) < parseInt(elem.min) || isNaN(parseInt(elem.value))) {
              elem.value = parseInt(elem.min);
            }
            
            sliderMoveAnimation(sliderAmountLabel, elem)    
            filterParams.value.amount = parseInt(elem.value)
            
        }
        
        return {
          arr,
          translations,
          filterParams,
          green_blocks,

          getPeriod,
          getAmount,
          getAmountManually,

          amountContainer,
          periodContainer,
          freeAmount
        }
    }
    
})

</script>
