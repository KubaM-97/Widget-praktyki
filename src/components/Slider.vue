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
            <input type="text" class="value" readonly :value="filterParams.period" />
            <span class="suffix">{{arr.suffix}}</span>
          </span>
        </div>

        <div class="aclr"></div>

        <div class="input-wrapper">
          <input type="range" v-model.number.lazy="filterParams.period" @input="getPeriod"
            :class="'a44-period-'+arr.hash +' costslider'"
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
            <input type="text" class="value" :value="filterParams.amount"/> {{arr.currency}}
          </span>
        </div>
        <div class="aclr"></div>
        <div class="input-wrapper">
          <input type="range" v-model.number.lazy="filterParams.amount" @input="getAmount" 
            :class="'a44-amount-'+arr.hash +' costslider'" 
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

import { computed, ref } from "vue" 
import { useStore } from "vuex" 

import $ from "jquery";

export default ({

    setup() {

        const store = useStore();

        const translations = computed(()=>store.state.translations);
        const arr = computed(()=>store.state.arr); 
        const filterParams = computed(()=>store.state.filterParams); 

        const amountContainer = ref(null)
        const periodContainer = ref(null)
        const freeAmount = ref(null)

        const suffix = computed(()=>arr.value.suffix)
        const category = computed(()=>arr.value.category)
        // const currency = computed(()=>arr.value.currency)
        
// var $currency = currency.value == undefined ? '' : currency.value;

        function getPeriod(e){
            
            const elem = e.target

            const oldSuffix =  suffix.value == undefined ? ''  : ( suffix.value == ' dni' ? ' ' + translations.value['days'] : ' ' + translations.value['months']);
        
            const sliderPeriodLabel = periodContainer.value.querySelector('input[type=text]')

            const from = parseInt(sliderPeriodLabel.value);
            const to = parseInt(elem.value);
            // filterParams.value.period = to;

            $({
                counter: from
            }).animate({
                counter: to
            }, {
                duration: 500,
                easing: 'swing',
                step: function() {
                    sliderPeriodLabel.value = Math.round(this.counter);
                },
                done: function() {

                    const suffixContainer = periodContainer.value.querySelector('span.suffix')

                    if (category.value == 3 && to == 2) {
                        sliderPeriodLabel.value = '61';
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
            });
        
        }

        function getAmount(e){
            
            const elem = e.target

            // const oldCurrency = currency.value== undefined ? '' : currency.value;
            
            const sliderAmountLabel = amountContainer.value.querySelector('input[type=text]')

            const from = parseInt(sliderAmountLabel.value);
            const to = parseInt(elem.value);

            $({
                counter: from
            }).animate({
                counter: to
            }, {
                duration: 500,
                easing: 'swing',
                step: function() {
                    sliderAmountLabel.value = Math.round(this.counter);
                },
                done: function() {

                  //   const suffixContainer = periodContainer.value.querySelector('span.suffix')

                  //   if (category.value == 3 && to == 2) {
                  //       sliderAmountLabel.value = '61';
                  //       const newCurrency = ` 
                  //           ${ 
                  //             typeof translations.value['days'] !== 'undefined'
                  //             ? translations.value['days'] 
                  //             : 'days'                             
                  //           }`
                  //       suffixContainer.innerHTML = newCurrency


                  //  } else {

                  //       const newCurrency = ` 
                  //           ${ 
                  //             oldCurrency == ' dni' 
                  //             ? ( typeof translations.value['days'] !== 'undefined' ? translations.value['days'] : 'days' )
                  //             : ( typeof translations.value['months'] !== 'undefined' ? translations.value['months'] : 'months' )
                  //           }
                  //       `
                  //       suffixContainer.innerHTML = newCurrency
                    
                  //   }
                  }
            });
        
        }

        
            







        return {
          arr,
          translations,
          filterParams,

          getPeriod,
          getAmount,

          amountContainer,
          periodContainer,
          freeAmount
        }
    }
    
})
</script>
