import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
      offers: [],
      filterPeriod: 12,
      rrso: [],
      translations: [],
      arr: []
  },
  getters: {

    filteredOffers: state => () => {
      
      const initPeriodValue = parseInt(state.arr.initPeriodValue)
      const initAmountValue = parseInt(state.arr.initAmountValue)
      const initFreeAmountValue = state.arr.free_amount

      const filteredOffers = state.offers
      .filter( offer => offer.min_amount <= initAmountValue )
      .filter( offer => offer.max_amount >= initAmountValue )
      .filter( offer => offer.min_period <= initPeriodValue )
      .filter( offer => offer.max_period >= initPeriodValue )
      .filter( offer => initFreeAmountValue ? offer.first_free_amount >= initAmountValue : true)
       return filteredOffers
    },

    filterParams: state =>  () => {
      console.log(state.arr)
      const params = {
        period: 12,
        amount: state.arr.initAmountValue,
        free_amount: state.arr.free_amount,
      }
      return params
    }

  },
  mutations: {
    setOffers( state, offers ){
      state.offers = offers;
    },
    setRRSO( state, rrso ){
      state.rrso = rrso;
    },
    setTranslations( state, translations ){
      state.translations = translations;
    },
    setArr( state, arr ){
      console.log("mutations")
      state.arr = arr;
    }
  },
  actions: {
    async fetchOffers ( { commit } ) {
      console.log("dispatch")
      await axios.get("https://panel-dev.aff44.com/widget-json/718f1b61")
        .then( response =>  {
          commit("setOffers", response.data.offers);
          commit("setRRSO", response.data.rrso);
          commit("setTranslations", response.data.translations);
          commit("setArr", response.data.arr);
        })
    }
  },
})
