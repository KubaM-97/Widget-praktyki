<template>
    
    <div class="a44-offers" v-for="offer in sourceOffers" :key="offer.id">
   
      <div class='a44-offer pl promo' :data-id="offer.id" :data-costs="offer.loando_slug"
        :data-minamount="offer.min_amount" :data-maxamount="offer.max_amount"
        :data-minperiod="offer.min_period" :data-maxperiod="offer.max_period" 
        :data-freeamount="offer.first_free_amount"
      >   
          <div class="d-none">
            <p>{{ offer.min_amount }}, {{ offer.max_amount }}, {{ offer.min_period }}, {{ offer.max_period }}, {{ offer.first_free_amount }}</p>
          </div>
        
          <div class="offer-details">

            <div class="offer-name-details">
                <span v-html="ss(offer.thumbnail)"></span>
              <div class="offer-logo">
                  <!-- <img :src="$emit(ss, $event)"> -->
                <!-- <img ref="aa" :src="offer.thumbnail" /> -->
                <img ref="aa" :src="ss(offer.thumbnail)" />
                <!-- <img src='../assets/img/default.png' /> -->
              </div>
              <div class="offer-rates">
                <div class="offer-rate" v-html="parseInt(offer.rate).toFixed(1) || 'gsdfgsd'"></div>
                <div class="offer-name-container">
                  <div class="offer-name">
                    {{ offer.display_name }}
                  </div>
                  <div class="offer-url">
                    {{ offer.domain }}
                  </div>
                </div>
                <div class="offer-rates-widget">
                  <div class="stars-container">
                    <div class="stars">
                      <div class="rank-rate">
                        <span>
                          <div class="rating" @click="ratingClick" @mouseleave="ratingLeave" @mousemove="ratingHover">
                            <div class="rate" :style="{width: getFirstRateWidth( offer.rate , offer.votes_count ) + '%'}"></div>
                          </div>
                        </span>
                      </div>
                    </div>
                    <div class="votes-count" v-html="get_votes_count_container(offer.votes_count || 0)"></div>
                  </div>
                  <div class="likes-container">
                    <div class="likes">{LOANS-SOLD}</div>
                  </div>
                </div>
              </div>
              <div class="aclr"></div>
            </div>
            <div class="offer-params">
              <div class="offer-param-container">
                <div class="offer-param">
                  <div class="offer-param-name"> {{ translations["Amount / period"] }} </div>
                  <div class="offer-param-value amount"></div>
                </div>
              </div>
              <div class="offer-param-container">
                <div class="offer-param">
                  <div class="offer-param-name"> {{ translations["COST / TOTAL"] }} </div>
                  <div class="offer-param-value installment"></div>
                  <div class="total"></div>
                </div>
              </div>
              <div class="offer-param-container">
                <div class="offer-param">
                  <div class="offer-param-name"> {{ translations.APR }} </div>
                  <div class="offer-param-value apr"></div>
                </div>
                <div class="aclr"></div>
              </div>
              <div class="aclr"></div>
              
            </div>

            <div class="offer-cta">
              <a :href="offer.cta_url" class="cta-link" target="_blank">
                <span class="cta-icon"></span>
                <span class="cta-text"> {{ translations["Take a loan"] }} </span>
              </a>
              <div class="aclr"></div>
            </div>
            <div class="aclr"></div>
          </div>
          
          <div class="offer-description">
            {{ offer.description }}
            <br>
            *{{ translations["Minimal APR"] }} {{ rrso[offer.category].apr_min }}%, 
             {{ translations["maximal APR"] }} {{ rrso[offer.category].apr_max }}%
          </div>

          <div class="aclr"></div>

      </div>

    </div>
    
    
</template>

<script>

import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import mixinRating from "../assets/mixins/rating.js"
export default {
  
    name: "offers",
    props: {
        sourceOffers: Array
    },
    setup() {

        const store = useStore();
        const translations = computed(()=>store.state.translations);
        const rrso = computed(()=>store.state.rrso);
        const arr = computed(()=>store.state.arr);
        const aa = ref(null)
        const defaultImage = require('../assets/img/default.png')
        console.log(defaultImage)
        const { ratingHover, ratingLeave, ratingClick, getFirstRateWidth, get_votes_count_container } = mixinRating();
function ss(x){
    return x ? `<img src="${x}" />` : `<img src="${defaultImage}" />`
    // console.log(x == null)
}          
// '../assets/img/default.png'
        // onMounted(()=>{
        //     // aa.value=""
        // })
        return {
            aa,
ss,
          translations,
          rrso,
          arr,

          ratingHover,
          ratingLeave,
          ratingClick,
          getFirstRateWidth,
          get_votes_count_container

        };

    },
  
};

</script>

<style scoped>


.a44-widget .a44-offer {
    font-family: 'Open Sans';
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
    border: 1px solid rgba(255, 255, 255, .1);
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
    background-color: rgba(0, 0, 0, .1);
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
    line-height: 50px
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
    background: url('~@/assets/img/stars-empty.png') no-repeat 0 0;
    cursor: pointer;
}

.a44-widget .rating .rate {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 14px;
    background: url('~@/assets/img/stars-filled.png') no-repeat 0 0;
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