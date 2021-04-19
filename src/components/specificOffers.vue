<template>
    
    <div class="a44-offers" v-for="offer in sourceOffers" :key="offer.id">
   
      <div class='a44-offer pl promo' :data-id="offer.id" :data-costs="offer.loando_slug"
        :data-minamount="offer.min_amount" :data-maxamount="offer.max_amount"
        :data-minperiod="offer.min_period" :data-maxperiod="offer.max_period" 
        :data-freeamount="offer.first_free_amount"
      >
        
          <div class="offer-details">

            <div class="offer-name-details">
              <div class="offer-logo">
                <img :src="offer.thumbnail" />
              </div>
              <div class="offer-rates">
                <div class="offer-rate">{{ offer.rate }}</div>
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
                          <div class="rating" @mousemove="ratingHover" @mouseleave="ratingLeave">
                            <div class="rate" @click="ratingClick"></div>
                          </div>
                        </span>
                      </div>
                    </div>
                    <div class="votes-count">
                      (<b>{{ offer.votes_count }}</b> głosów)
                    </div>
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
                  <div class="offer-param-name">Kwota / okres</div>
                  <div class="offer-param-value amount"> *1000 zł /12dni</div>
                </div>
              </div>
              <div class="offer-param-container">
                <div class="offer-param">
                  <div class="offer-param-name">KOSZT / ŁĄCZNIE</div>
                  <div class="offer-param-value installment">
                    <a href="#" style="color:#fff">Zobacz</a>
                  </div>
                  <div class="total"></div>
                </div>
              </div>
              <div class="offer-param-container">
                <div class="offer-param">
                  <div class="offer-param-name">RRSO</div>
                  <div class="offer-param-value apr">
                    <a href="#" style="color:#fff">Sprawdź</a>
                  </div>
                </div>
                <div class="aclr"></div>
              </div>
              <div class="aclr"></div>
              
            </div>

            <div class="offer-cta">
              <a href="#" class="cta-link" target="_blank">
                <span class="cta-icon"></span>
                <span class="cta-text">Weź pożyczkę</span>
              </a>
              <div class="aclr"></div>
            </div>
            <div class="aclr"></div>
          </div>
          
          <div class="offer-description">
            {{ offer.description }}
            <br>
            *Minimalne RRSO: 0%, maksymalne RRSO: 000000%
          </div>

          <div class="aclr"></div>

      </div>

    </div>
    
    
</template>

<script>

import { computed, onMounted} from 'vue';
import { useStore } from 'vuex';
import mixinRating from "../assets/mixins/rating.js"

// import $ from "jquery";
export default {
  
  name: "offers",
props: {
    sourceOffers: Array
  },
  setup(props) {
    console.log(props)

  const store = useStore();
  const messages = computed(()=>store.state.messages);


  onMounted(()=>{
    // console.log(mixinRating().ratingHover)
    setTimeout(()=>{
        // $('.rating').on('mousemove', mixinRating.ratingHover);
        // $('.rating').on('mouseleave', mixinRating.ratingLeave);
        // $(".rate").on('click', mixinRating.ratingClick)
        // console.log(111)
        // $('.rating').trigger('mousemove');
        // console.log(222)
    },2200)
    
     
  })

      return {
        messages,
         ...mixinRating(),
      };
  },
  
};


</script>
<style scoped>
 .a44-offer {
    font-family: 'Open Sans';
    margin-bottom: 16px;
}

 .offer-details {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 16px 16px 8px 16px;
}

 .offer-name-details {
    max-width: 30%;
    width: 100%;
    float: left;
}

 .offer-logo {
    max-width: 30%;
    width: 100%;
    float: left;
    text-align: center;
}

 .offer-logo img {
    border-radius: 10px;
    max-width: 93px;
    border: 1px solid rgba(255, 255, 255, .1);
    width: 100%;
    height: auto;
    display: block;
    background-color: #fff;
}

 .a44-offer.recommended .offer-logo img {
    /*background-color:#fd9937;*/
}

 .offer-rates {
    max-width: 70%;
    width: 100%;
    float: left;
    padding: 4px;
    padding-top: 0;
}

 .recom {
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

 .offer-name-container {
    max-width: 75%;
    width: 100%;
    float: left;
    padding-left: 16px;
    padding-top: 0;
}

 .offer-name {
    font-weight: bold;
    font-size: 18px;
}

 .offer-url {
    font-size: 012px;
}

 .offer-rate {
    font-size: 24px;
    font-weight: 700;
    float: left;
    text-align: center;
    line-height: 100%;
}

 .offer-rates-widget {
    max-width: 100%;
    width: 100%;
    float: left;
    padding: 12px 8px 0 8px;
    font-size: 012px;
}

 .offer-params {
    max-width: 50%;
    width: 100%;
    float: left;
}

 .offer-param-container {
    padding: 8.8px;
    max-width: 33%;
    width: 100%;
    float: left;
}

 .offer-param {
    border-radius: 10px;
    font-weight: bold;
    width: 100%;
    min-height: 93px;
    position: relative;
    padding: 8px;
    max-height: 200px;
}

 .offer-param-container:nth-child(2) .offer-param-value,
 .offer-param-container:nth-child(3) .offer-param-value {
    font-size: 18px;
}

 .offer-param-name {
    text-transform: uppercase;
    position: absolute;
    top: 10.4px;
    left: 13.6px;
    font-size: 012px;
}

 .offer-param-value {
    font-size: 18px;
    position: absolute;
    bottom: 10.4px;
    right: 13.6px;
}

 .offer-cta {
    max-width: 20%;
    width: 100%;
    min-height: 50px;
    float: left;
    text-align: center;
    line-height: 50px
}

 .cta-icon {
    display: inline-block;
    border-radius: 50%;
    padding: 8px;
    vertical-align: middle;
}

 .cta-link {
    border-radius: 50px;
    font-weight: bold;
    text-decoration: none;
    padding: 10.4px 16px 13.6px 8px;
    max-width: 185px;
    width: 100%;
    vertical-align: middle;
}

 .cta-text {
    padding-left: 8px;
    vertical-align: middle;
    font-size: 16px;
}

 .offer-description {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    font-size: 11.2px;
    padding: 8px 14px;
}

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

 .stars {
    display: inline-block;
}

 .rating {
    position: relative;
    display: block;
    margin: auto;
    width: 79px;
    height: 14px;
    background: url('~@/assets/img/stars-empty.png') no-repeat 0 0;
    cursor: pointer;
}

 .rating .rate {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 14px;
    background: url('~@/assets/img/stars-filled.png') no-repeat 0 0;
}

 .votes-count {
    text-align: center;
    display: inline-block;
    padding-left: 5px;
    line-height: 14px;
    margin-top: -5px;
}

 .likes-container {
    display: none;
}

.a44-xl .offer-details {
    padding: 8px;
}

.a44-xl .offer-name-details {
    max-width: 30%;
}

.a44-xl .offer-params {
    max-width: 50%;
}

.a44-xl .offer-param-container {
    padding: 4.8px;
}

.a44-xl .offer-param-container:nth-child(1) {
    max-width: 40%;
}

.a44-xl .offer-param-container:nth-child(2) {
    max-width: 40%;
}

.a44-xl .offer-param-container:nth-child(3) {
    max-width: 20%;
}

.a44-xl .offer-param {
    min-height: 80px;
}

.a44-xl .offer-param-name {
    font-size: 14.4px;
    top: 12px;
    left: 12px;
}

.a44-xl .offer-param-value {
    font-size: 14px !important;
    bottom: 12px;
    right: 12px;
}

.a44-xl .offer-cta {
    max-width: 20%;
    padding: 16px;
}

.a44-xl .cta-text {
    padding-left: 8px;
    font-size: 17.6px;
}

.a44-xl .a44-offer.es .cta-text {
    padding-left: 8px;
    font-size: 12.8px;
}

.a44-xl .a44-offer.ua .cta-text {
    padding-left: 8px;
    font-size: 12.3px;
}

.a44-xl .offer-description {
    padding: 8px;
}

 .offer-details {
    padding: 8px;
}

 .offer-name-details {
    max-width: 35%;
}

 .offer-params {
    max-width: 40%;
}

 .offer-param-container {
    padding: 4.8px;
}

 .offer-param-container:nth-child(1) {
    max-width: 50%;
}

 .offer-param-container:nth-child(2) {
    max-width: 50%;
}

 .offer-param-container:nth-child(3) {
    max-width: 100%;
}

 .offer-param {
    min-height: 70px;
}

 .offer-param-container:nth-child(3) .offer-param {
    min-height: 50px;
}

 .offer-param-name {
    font-size: 14px;
    top: 12px;
    left: 12px;
}

 .offer-param-value {
    font-size: 16px !important;
    bottom: 12px;
    right: 12px;
}

 .offer-cta {
    max-width: 25%;
    padding: 16px;
}

 .cta-text {
    padding-left: 8px;
    font-size: 17.6px;
}

 .offer-description {
    padding: 8px;
}

.offer-details {
    display: block;
}

.offer-name-details {
    max-width: 50%;
}

.offer-param-container {
    max-width: 100%;
    padding: 4px;
}

.offer-param {
    min-height: 70px;
    padding: 16px;
}

.offer-cta {
    max-width: 50%;
}


/*.cta-icon{display:block;float:left;}*/

.cta-link {
    text-align: center;
}

.cta-text {
    padding-left: 0;
    padding-top: 4px;
}

.offer-logo {
    max-width: 50%;
    float: left;
    margin-bottom: 32px;
}

.offer-rates {
    max-width: 50%;
    float: left;
    padding-top: 18px;
}

.offer-rate {
    max-width: 50%;
    height: 100%;
}

.offer-logo img {
    max-width: 150px;
    margin: auto;
}

.offer-logo .recom {
    max-width: 135px;
    margin: -35px auto 0 auto;
    left: 0;
}

.offer-rates {
    text-align: center;
    height: 50px;
}

.offer-rate {
    display: inline-block;
    float: none;
}

.offer-name-container {
    max-width: 100%;
    display: inline-block;
}

.stars-container {
    display: inline-block;
    padding-right: 8px;
    margin-top: 8px;
    width: 50%;
    text-align: center;
}


/*.likes-container{display:inline-block;padding-left:8px;margin-top:8px;width:50%;text-align:center;}*/

.offer-name-details {
    max-width: 100%;
    margin-bottom: 0;
}

.offer-param-container {
    max-width: 100%;
    padding: 4px;
    margin: auto;
}

.offer-params {
    max-width: 480px;
    margin: auto;
    margin-top: 16px;
    float: none;
    clear: both;
}

.offer-param {
    min-height: 50px;
    padding: 18px;
}

.offer-param-value {
    font-size: 21.6px;
}

.offer-param-container:nth-child(2) .offer-param-value,
 .offer-param-container:nth-child(3) .offer-param-value {
    font-size: 14.8px;
}

.offer-cta {
    max-width: 100%;
    padding-top: 8px;
    padding-bottom: 8px;
    text-align: center;
}


/*.cta-icon{display:block;float:left;}*/

.cta-link {
    text-align: center;
}

.cta-text {
    padding-left: 8px;
    padding-top: 4px;
}

.offer-logo {
    max-width: 100%;
    margin-bottom: 32px;
    float: none;
}

.offer-rates {
    max-width: 100%;
    float: none;
}

.offer-rate {
    max-width: 50%;
    height: 100%;
}

.offer-logo img {
    max-width: 150px;
    margin: auto;
}

.offer-logo .recom {
    max-width: 135px;
    margin: -35px auto 0 auto;
    left: 0;
}

.offer-rates {
    text-align: center;
    height: 50px;
}

.offer-rate {
    display: inline-block;
    float: none;
}

.offer-name-container {
    max-width: 100%;
    display: inline-block;
}

.stars-container {
    display: inline-block;
    padding-right: 4px;
}


/*.likes-container{display:inline-block;padding-left:4px;}*/

.offer-details {
    display: block;
}

.offer-name-details {
    max-width: 100%;
    margin-bottom: 16px;
}

.offer-param-container {
    max-width: 100%;
    padding: 4px;
    margin: auto;
}

.offer-params {
    max-width: 100%;
    margin: auto;
    float: none;
    clear: both;
}

.offer-param {
    min-height: 70px;
    padding: 8px;
}

.offer-param-container:nth-child(2) .offer-param-value,
 .offer-param-container:nth-child(3) .offer-param-value {
    font-size: 14.8px;
}

.offer-cta {
    max-width: 100%;
    text-align: center;
    padding-top: 8px;
}

.offer-param-value {
    font-size: 21.6px;
}


/*.cta-icon{display:block;float:left;}*/

.cta-link {
    text-align: center;
}

.cta-text {
    padding-left: 8px;
    padding-top: 4px;
}


</style>
