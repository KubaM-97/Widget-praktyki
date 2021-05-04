<template>

    <div class="offers_container" v-if="arr.type === 'loan'">

        <slider-component/>

        <loans-component :sourceOffers="filteredOffers"/>
        
        <div class="a44-alert" v-if="showAlert">{{translations['No offers matching criteria']}}</div>
        <div class="a44-promo" v-if="showPromo">{{translations['We also recommend loans with other parameters']}}</div>

        <loans-component v-if="showRemainingOffers" :sourceOffers="remainingOffers"/>
        
        <p class="costs-info">
          {{ translations["offers-params-info"] }}
        </p>

    </div>

    <div class="offers_container" v-else-if="arr.type === 'other'">
       <bookmakers-component :sourceOffers="filteredOffers"/>
    </div>

</template>

<script>

import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Slider from '@/components/Slider.vue';
import Loans from '@/components/specific_offers/Loans.vue';
import Bookmakers from '@/components/specific_offers/Bookmakers.vue';

export default {
  
  name: "offers",
  components: {
    "slider-component": Slider,
    "loans-component": Loans,
    "bookmakers-component": Bookmakers
  },

  setup() {

      const store = useStore();
      const translations = computed(()=>store.state.translations);
      const arr = computed(()=>store.state.arr);
      const filteredOffers = computed(() => store.getters.filteredOffers());
      const showAlert = ref(false);
      const showPromo = ref(false);
      const showRemainingOffers = ref(false);
      const remainingOffers = ref([])
      
      watch(filteredOffers, ()=>{
        manageAlertWindow()
        managePromoWindow()
      })

      function manageAlertWindow(){
          filteredOffers.value.length > 0 ? showAlert.value = false: showAlert.value  = true;
      }

      function managePromoWindow(){
        
        showRemainingOffers.value = false;
        remainingOffers.value = [];

        if (filteredOffers.value.length <= 3) {
              
          showPromo.value = true;
          
          for(const offer of store.state.offers){
            if(!store.getters.filteredOffers().includes(offer)){
              remainingOffers.value.push(offer)
            }
          }
          showRemainingOffers.value = true;

        } else {
            showPromo.value = false
        }

      }

      return {
        filteredOffers,
        translations,
        arr,
        showAlert,
        showPromo,
        showRemainingOffers,
        remainingOffers
      };
      
  },
  
};


</script>

<style>
.a44-alert {
    border: 3px solid red;
    padding: 8px;
    border-radius: 5px;
    margin: auto;
    text-align: center;
    margin-bottom: 16px;
}

.a44-promo {
    border: 3px solid green;
    padding: 8px;
    border-radius: 5px;
    margin: auto;
    text-align: center;
    margin-bottom: 16px;
}
.a44-widget .a44-offer {
  font-family: "Open Sans";
  margin-bottom: 16px;
}

.a44-widget .offer-details {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 16px 16px 8px 16px;
}

.a44-widget .offer-name-details {
  max-width: 30%;
  width: 100%;
  float: left;
}

.a44-widget .offer-logo {
  max-width: 30%;
  width: 100%;
  float: left;
  text-align: center;
}

.a44-widget .offer-logo img {
  border-radius: 10px;
  max-width: 93px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  height: auto;
  display: block;
  background-color: #fff;
}

.a44-widget .a44-offer.recommended .offer-logo img {
  /*background-color:#fd9937;*/
}

.a44-widget .offer-rates {
  max-width: 70%;
  width: 100%;
  float: left;
  padding: 4px;
  padding-top: 0;
}

.a44-widget .recom {
  position: relative;
  margin-top: -30px;
  font-weight: 700;
  z-index: 20;
  border-radius: 5px;
  font-size: 11px;
  letter-spacing: 0;
  max-width: 83px;
  left: 5px;
  color: #000;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 4px 0;
}

.a44-widget .offer-name-container {
  max-width: 75%;
  width: 100%;
  float: left;
  padding-left: 16px;
  padding-top: 0;
}

.a44-widget .offer-name {
  font-weight: bold;
  font-size: 18px;
}

.a44-widget .offer-url {
  font-size: 012px;
}

.a44-widget .offer-rate {
  font-size: 24px;
  font-weight: 700;
  float: left;
  text-align: center;
  line-height: 100%;
}

.a44-widget .offer-rates-widget {
  max-width: 100%;
  width: 100%;
  float: left;
  padding: 12px 8px 0 8px;
  font-size: 012px;
}

.a44-widget .offer-params {
  max-width: 50%;
  width: 100%;
  float: left;
}

.a44-widget .offer-param-container {
  padding: 8.8px;
  max-width: 33%;
  width: 100%;
  float: left;
}

.a44-widget .offer-param {
  border-radius: 10px;
  font-weight: bold;
  width: 100%;
  min-height: 93px;
  position: relative;
  padding: 8px;
  max-height: 200px;
}

.a44-widget .offer-param-container:nth-child(2) .offer-param-value,
.a44-widget .offer-param-container:nth-child(3) .offer-param-value {
  font-size: 18px;
}

.a44-widget .offer-param-name {
  text-transform: uppercase;
  position: absolute;
  top: 10.4px;
  left: 13.6px;
  font-size: 012px;
}

.a44-widget .offer-param-value {
  font-size: 18px;
  position: absolute;
  bottom: 10.4px;
  right: 13.6px;
}

.a44-widget .offer-cta {
  max-width: 20%;
  width: 100%;
  min-height: 50px;
  float: left;
  text-align: center;
  line-height: 50px;
}

.a44-widget .cta-icon {
  display: inline-block;
  border-radius: 50%;
  padding: 8px;
  vertical-align: middle;
}

.a44-widget .cta-link {
  border-radius: 50px;
  font-weight: bold;
  text-decoration: none;
  padding: 10.4px 16px 13.6px 8px;
  max-width: 185px;
  width: 100%;
  vertical-align: middle;
}

.a44-widget .cta-text {
  padding-left: 8px;
  vertical-align: middle;
  font-size: 16px;
}

.a44-widget .offer-description {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 11.2px;
  padding: 8px 14px;
}

.a44-widget .stars {
  display: inline-block;
}

.a44-widget .rating {
  position: relative;
  display: block;
  margin: auto;
  width: 79px;
  height: 14px;
  background: url("~@/assets/img/stars-empty.png") no-repeat 0 0;
  cursor: pointer;
}

.a44-widget .rating .rate {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 14px;
  background: url("~@/assets/img/stars-filled.png") no-repeat 0 0;
}

.a44-widget .votes-count {
  text-align: center;
  display: inline-block;
  padding-left: 5px;
  line-height: 14px;
  margin-top: -5px;
}

.a44-widget .likes-container {
  display: none;
}

.a44-widget.a44-xl .offer-details { 
  display: flex;
  justify-content: space-around;
  /* align-items: center; */
  padding: 8px;
}

.a44-widget.a44-xl .offer-name-details {
  max-width: 30%;
}

.a44-widget.a44-xl .offer-params {
  max-width: 50%;
}

.a44-widget.a44-xl .offer-param-container {
  padding: 4.8px;
}

.a44-widget.a44-xl .offer-param-container:nth-child(1) {
  max-width: 40%;
}

.a44-widget.a44-xl .offer-param-container:nth-child(2) {
  max-width: 40%;
}

.a44-widget.a44-xl .offer-param-container:nth-child(3) {
  max-width: 20%;
}

.a44-widget.a44-xl .offer-param {
  min-height: 80px;
}

.a44-widget.a44-xl .offer-param-name {
  font-size: 14.4px;
  top: 12px;
  left: 12px;
}

.a44-widget.a44-xl .offer-param-value {
  font-size: 14px !important;
  bottom: 12px;
  right: 12px;
}

.a44-widget.a44-xl .offer-cta {
  max-width: 20%;
  padding: 16px;
}

.a44-widget.a44-xl .cta-text {
  padding-left: 8px;
  font-size: 17.6px;
}

.a44-widget.a44-xl .a44-offer.es .cta-text {
  padding-left: 8px;
  font-size: 12.8px;
}

.a44-widget.a44-xl .a44-offer.ua .cta-text {
  padding-left: 8px;
  font-size: 12.3px;
}

.a44-widget.a44-xl .offer-description {
  padding: 8px;
}

.a44-widget.a44-lg .offer-details {
  display: flex;
  justify-content: space-around;
  /* align-items: center; */
  padding: 8px;
}

.a44-widget.a44-lg .offer-name-details {
  max-width: 35%;
}

.a44-widget.a44-lg .offer-params {
  max-width: 40%;
}

.a44-widget.a44-lg .offer-param-container {
  padding: 4.8px;
}

.a44-widget.a44-lg .offer-param-container:nth-child(1) {
  max-width: 50%;
}

.a44-widget.a44-lg .offer-param-container:nth-child(2) {
  max-width: 50%;
}

.a44-widget.a44-lg .offer-param-container:nth-child(3) {
  max-width: 100%;
}

.a44-widget.a44-lg .offer-param {
  min-height: 70px;
}

.a44-widget.a44-lg .offer-param-container:nth-child(3) .offer-param {
  min-height: 50px;
}

.a44-widget.a44-lg .offer-param-name {
  font-size: 14px;
  top: 12px;
  left: 12px;
}

.a44-widget.a44-lg .offer-param-value {
  font-size: 16px !important;
  bottom: 12px;
  right: 12px;
}

.a44-widget.a44-lg .offer-cta {
  max-width: 25%;
  padding: 16px;
}

.a44-widget.a44-lg .cta-text {
  padding-left: 8px;
  font-size: 17.6px;
}

.a44-widget.a44-lg .offer-description {
  padding: 8px;
}

.a44-widget.a44-md .offer-details {
  display: block;
}

.a44-widget.a44-md .offer-name-details {
  max-width: 50%;
}

.a44-widget.a44-md .offer-param-container {
  max-width: 100%;
  padding: 4px;
}

.a44-widget.a44-md .offer-param {
  min-height: 70px;
  padding: 16px;
}

.a44-widget.a44-md .offer-cta {
  max-width: 50%;
}

/*.a44-widget.a44-md .cta-icon{display:block;float:left;}*/

.a44-widget.a44-md .cta-link {
  text-align: center;
}

.a44-widget.a44-md .cta-text {
  padding-left: 0;
  padding-top: 4px;
}

.a44-widget.a44-sm .offer-logo {
  max-width: 50%;
  float: left;
  margin-bottom: 32px;
}

.a44-widget.a44-sm .offer-rates {
  max-width: 50%;
  float: left;
  padding-top: 18px;
}

.a44-widget.a44-sm .offer-rate {
  max-width: 50%;
  height: 100%;
}

.a44-widget.a44-sm .offer-logo img {
  max-width: 150px;
  margin: auto;
}

.a44-widget.a44-sm .offer-logo .recom {
  max-width: 135px;
  margin: -35px auto 0 auto;
  left: 0;
}

.a44-widget.a44-sm .offer-rates {
  text-align: center;
  height: 50px;
}

.a44-widget.a44-sm .offer-rate {
  display: inline-block;
  float: none;
}

.a44-widget.a44-sm .offer-name-container {
  max-width: 100%;
  display: inline-block;
}

.a44-widget.a44-sm .stars-container {
  display: inline-block;
  padding-right: 8px;
  margin-top: 8px;
  width: 50%;
  text-align: center;
}

/*.a44-widget.a44-sm .likes-container{display:inline-block;padding-left:8px;margin-top:8px;width:50%;text-align:center;}*/

.a44-widget.a44-sm .offer-name-details {
  max-width: 100%;
  margin-bottom: 0;
}

.a44-widget.a44-sm .offer-param-container {
  max-width: 100%;
  padding: 4px;
  margin: auto;
}

.a44-widget.a44-sm .offer-params {
  max-width: 480px;
  margin: auto;
  margin-top: 16px;
  float: none;
  clear: both;
}

.a44-widget.a44-sm .offer-param {
  min-height: 50px;
  padding: 18px;
}

.a44-widget.a44-sm .offer-param-value {
  font-size: 21.6px;
}

.a44-widget.a44-sm .offer-param-container:nth-child(2) .offer-param-value,
.a44-widget .offer-param-container:nth-child(3) .offer-param-value {
  font-size: 14.8px;
}

.a44-widget.a44-sm .offer-cta {
  max-width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
}

/*.a44-widget.a44-sm .cta-icon{display:block;float:left;}*/

.a44-widget.a44-sm .cta-link {
  text-align: center;
}

.a44-widget.a44-sm .cta-text {
  padding-left: 8px;
  padding-top: 4px;
}

.a44-widget.a44-xs .offer-logo {
  max-width: 100%;
  margin-bottom: 32px;
  float: none;
}

.a44-widget.a44-xs .offer-rates {
  max-width: 100%;
  float: none;
}

.a44-widget.a44-xs .offer-rate {
  max-width: 50%;
  height: 100%;
}

.a44-widget.a44-xs .offer-logo img {
  max-width: 150px;
  margin: auto;
}

.a44-widget.a44-xs .offer-logo .recom {
  max-width: 135px;
  margin: -35px auto 0 auto;
  left: 0;
}

.a44-widget.a44-xs .offer-rates {
  text-align: center;
  height: 50px;
}

.a44-widget.a44-xs .offer-rate {
  display: inline-block;
  float: none;
}

.a44-widget.a44-xs .offer-name-container {
  max-width: 100%;
  display: inline-block;
}

.a44-widget.a44-xs .stars-container {
  display: inline-block;
  padding-right: 4px;
}

/*.a44-widget.a44-xs .likes-container{display:inline-block;padding-left:4px;}*/

.a44-widget.a44-xs .offer-details {
  display: block;
}

.a44-widget.a44-xs .offer-name-details {
  max-width: 100%;
  margin-bottom: 16px;
}

.a44-widget.a44-xs .offer-param-container {
  max-width: 100%;
  padding: 4px;
  margin: auto;
}

.a44-widget.a44-xs .offer-params {
  max-width: 100%;
  margin: auto;
  float: none;
  clear: both;
}

.a44-widget.a44-xs .offer-param {
  min-height: 70px;
  padding: 8px;
}

.a44-widget.a44-xs .offer-param-container:nth-child(2) .offer-param-value,
.a44-widget .offer-param-container:nth-child(3) .offer-param-value {
  font-size: 14.8px;
}

.a44-widget.a44-xs .offer-cta {
  max-width: 100%;
  text-align: center;
  padding-top: 8px;
}

.a44-widget.a44-xs .offer-param-value {
  font-size: 21.6px;
}

/*.a44-widget.a44-xs .cta-icon{display:block;float:left;}*/

.a44-widget.a44-xs .cta-link {
  text-align: center;
}

.a44-widget.a44-xs .cta-text {
  padding-left: 8px;
  padding-top: 4px;
}
</style>
