<template>
{{typeof parseInt(arr.initPeriodValue)}}
{{typeof arr.initAmountValue}}
{{typeof arr.free_amount}}
{{arr.initPeriodValue}}
{{arr.initAmountValue}}
{{arr.free_amount}}

{{typeof test}}
{{test}}

{{filterPeriod}}
{{aa}}
  <div class="a44-slider">

    <div class="period-container" ref="periodContainer">
      <div class="range-wrapper">

        <div class="period-name-container">
          <span class="name"> {{translations["Loan period"]}} </span>
        </div>

        <div class="period-value-container">
          <span class="value-wrapper">
            <input type="text" class="value" readonly :value="aa.period" 
            :min="arr.minPeriod" :max="arr.maxPeriod" name="period-label"/>
            <span class="suffix">{{arr.suffix}}</span>
          </span>
        </div>

        <div class="aclr"></div>

        <div class="input-wrapper">
          <input type="range" v-model.number.lazy="aa.period" @input="getPeriod" @change="update_amount_inst_apr"
            :class="'a44-period-'+arr.hash +' costslider'" name="period-costslider"
            :step="arr.stepPeriodSlider" :min="arr.minPeriod" :max="arr.maxPeriod"/>
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
            :value="arr.initAmountValue" :min="arr.minAmount" :max="arr.maxAmount" name="amount-label"/>
            
            <span class="currency">{{arr.currency}}</span>
          </span>
        </div>
        <div class="aclr"></div>
        <div class="input-wrapper">
          <input type="range" v-model.number.lazy="arr.initAmountValue" @input="getAmount" @change="update_amount_inst_apr"
            :class="'a44-amount-'+arr.hash +' costslider'" name="amount-costslider"
            :step="arr.stepAmountSlider" :min="arr.minAmount" :max="arr.maxAmount"/>
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
       v-model="arr.free_amount"/>
      <span class="checkmark"></span>
      <label :for="'chck-free-amount-'+arr.hash"> {{ translations["Show only free loans"] }}</label>
    </div>

  </div>

</template>

<script>

import { computed, onMounted, ref } from "vue" 
import { useStore } from "vuex" 

import $ from "jquery";

export default ({
  
    async setup() {
        console.log(222)

        const store = useStore();
        const translations = computed(()=>store.state.translations);
        const arr = computed(()=>store.state.arr); 
        const offers = computed(()=>store.state.offers); 
        const suffix = computed(()=>arr.value.suffix)
        const category = computed(()=>arr.value.category)
        // input v-model=filterPeriod works
        const filterPeriod = computed(()=>store.state.filterPeriod)
        // const filterPeriod = store.state.filterPeriod
        const aa = computed(()=>store.getters.filterParams())
        console.log(aa.value)
    // console.log(store.state.arr)
        const amountContainer = ref(null)
        const periodContainer = ref(null)
        setTimeout(()=>{
            // arr.value.initPeriodValue = 20000
        },2000)
        onMounted(()=>{
            const test_string = ""+arr.value.initPeriodValue
            console.log(test_string)
        })
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
          update_amount_inst_apr()
        })

        function update_amount_inst_apr(){

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

                              installmentContainer.innerHTML = `<a href=${href}" target="_blank" style="color:#fff;">Zobacz</a>`
                     
                              if (typeof data.costs[slug].installment !== 'undefined' && prefix == 'month')
                                  installmentContainer.innerHTML = `${data.costs[slug].installment} ${arr.value['currency']}`;
                              if (typeof data.costs[slug].cost !== 'undefined' && prefix == 'day')
                                  installmentContainer.innerHTML = `${data.costs[slug].cost} ${arr.value['currency']}`;


                              const aprContainer = container.querySelector('.apr');

                              aprContainer.innerHTML = ` ${ 
                                typeof data.costs[slug].apr !== 'undefined' && data.costs[slug].apr != null 
                                ? `${data.costs[slug].apr} %` 
                                : `<a href=${href}" target="_blank" style="color:#fff;">Sprawdź</a>`
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

            if (parseInt(elem.value) > parseInt(elem.max)) {
              elem.value = parseInt(elem.max);
            }

            if (parseInt(elem.value) < parseInt(elem.min) || isNaN(parseInt(elem.value))) {
              elem.value = parseInt(elem.min);
            }
            
            sliderMoveAnimation(sliderAmountLabel, elem)    
            arr.value.initAmountValue = parseInt(elem.value)
            
        }
        
        const test = computed(()=>arr.value.initPeriodValue)
        console.log(test.value)
        return {
            aa,
test,
          translations,
          arr,

          amountContainer,
          periodContainer,
          filterPeriod,

          getPeriod,
          getAmount,
          getAmountManually,
          update_amount_inst_apr
        }
    }
    
})

</script>

<style>

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