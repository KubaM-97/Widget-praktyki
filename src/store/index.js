import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
      offers: [],
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
      .filter( offer => offer.min_period <= initPeriodValue || offer.max_period == null )
      .filter( offer => offer.max_period >= initPeriodValue || offer.max_period == null )
      .filter( offer => offer.min_amount <= initAmountValue || offer.max_amount == null )
      .filter( offer => offer.max_amount >= initAmountValue || offer.max_amount == null )
      .filter( offer => initFreeAmountValue ? offer.first_free_amount >= initAmountValue : true)
      
      return filteredOffers

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
      state.arr = arr;
    }
  },
  actions: {
    async fetchOffers ( { commit }, payload ) {
      await axios.get("https://panel-dev.aff44.com/widget-json/" + payload.offerId)    
      // await axios.get("https://panel-dev.aff44.com/widget-json/f34ee6f3")    
      .then( response =>  {
          const category = response.data.arr.category
          const offers = response.data.offers.filter( el => el.category === category)
          
          commit("setOffers", offers);
          
          commit("setRRSO", response.data.rrso);
          commit("setTranslations", response.data.translations);
          commit("setArr", response.data.arr);
        })
    },
    
  },
})
