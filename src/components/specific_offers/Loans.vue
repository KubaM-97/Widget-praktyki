<template>

  <div class="a44-offers">
    <div
      class="a44-offer pl promo"
      v-for="offer in sourceOffers"
      :key="offer.id"
      :data-id="offer.id"
      :data-costs="offer.loando_slug || 'default_slug'"
      :class="{ recommended: offer.recommended }"
      :data-minamount="offer.min_amount"
      :data-maxamount="offer.max_amount"
      :data-minperiod="offer.min_period"
      :data-maxperiod="offer.max_period"
      :data-freeamount="offer.first_free_amount"
    >
      <div class="d-none">
        <p>
          {{ offer.min_amount }}, {{ offer.max_amount }},
          {{ offer.min_period }}, {{ offer.max_period }},
          {{ offer.first_free_amount }}
        </p>
      </div>

      <div class="offer-details">
        <div class="offer-name-details">
          <div class="offer-logo">
            <img :src="offer.thumbnail || defaultImage" :alt="offer.display_name">
            <div v-if="offer.recommended" class="recom">Polecamy!</div>
          </div>

          <div class="offer-rates">
            <div
              class="offer-rate"
              v-if="offer.rate"
              v-html="parseFloat(offer.rate || 0).toFixed(1)"
            ></div>
            <div class="offer-rate" v-else></div>
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
                      <div
                        class="rating"
                        @click="ratingClick"
                        @mouseleave="ratingLeave"
                        @mousemove="ratingHover"
                      >
                        <div class="rate" :style="{
                            width:
                              getFirstRateWidth(offer.rate, offer.votes_count) +
                              '%',
                          }"
                        ></div>
                      </div>
                     </span>
                  </div>
                </div>
                <div
                  class="votes-count"
                  v-html="get_votes_count_container(offer.votes_count || 0)"
                ></div>
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
              <div class="offer-param-name">
                {{ translations["Amount / period"] }}
              </div>
              <div class="offer-param-value amount"></div>
            </div>
          </div>
          <div class="offer-param-container">
            <div class="offer-param">
              <div class="offer-param-name">
                {{ translations["COST / TOTAL"] }}
              </div>
              <div class="offer-param-value installment"></div>
              <div class="total"></div>
            </div>
          </div>
          <div class="offer-param-container">
            <div class="offer-param">
              <div class="offer-param-name">{{ translations.APR }}</div>
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
        <br />
        *{{ translations["Minimal APR"] }} {{ rrso[offer.category].apr_min }}%,
        {{ translations["maximal APR"] }} {{ rrso[offer.category].apr_max }}%
      </div>

      <div class="aclr"></div>

      <div class="scriptjson" v-html="jsonSchema(offer)"></div>

    </div>
  </div>
</template>

<script>

import { computed } from 'vue';
import { useStore } from 'vuex';
import mixinRating from "../../assets/mixins/rating.js"

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

        const defaultImage = require('../../assets/img/default.png');

        const { ratingHover, ratingLeave, ratingClick, getFirstRateWidth, get_votes_count_container } = mixinRating();

        function jsonSchema(offer){

            const schema = {
                '@context': 'http://schema.org/',
                '@type': 'Product',
                'image': '',
                'name': offer.name,
                'aggregateRating': {
                    '@type': 'AggregateRating',
                    'ratingValue': offer.rate,
                    'reviewCount': offer.votes_count,
                    'worstRating': '1',
                    'bestRating': '5',
                }
            };
            
            return "<script type=\'application/ld+json\'>" + JSON.stringify(schema) + "<\/script>";
        
        }

        return {

            jsonSchema,

            translations,
            rrso,
            arr,

            defaultImage,
            
            ratingHover,
            ratingLeave,
            ratingClick,
            getFirstRateWidth,
            get_votes_count_container

        };

    },

};
</script>

