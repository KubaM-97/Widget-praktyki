import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
      offers: [],
      filterParams: {
        period: 12,
        amount: 1000,
        free_amount: false
      },
      rrso: [],
      translations: [],
      arr: []
  },
  getters: {

    filteredOffers: state => () => {
      
      // const stateFilterParams = state.arr.initValue.period
      // const stateFilterParams = state.arr.initValue.amount

      // const stateFilterParams = state.arr.initValuePeriod
      // const stateFilterParams = state.arr.initValueAmount

      const stateFilterParams = state.filterParams
      
      const filteredOffers = state.offers
      .filter( offer => offer.min_amount <= stateFilterParams.amount )
      .filter( offer => offer.max_amount >= stateFilterParams.amount )
      .filter( offer => offer.min_period <= stateFilterParams.period )
      .filter( offer => offer.max_period >= stateFilterParams.period )
      .filter( offer => stateFilterParams.free_amount ? offer.first_free_amount >= stateFilterParams.amount : true)
        
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
    setMainSettings( state, arr ){
      state.arr = arr;
    }
  },
  actions: {
    async fetchOffers ( { commit } ) {
      await axios.get("https://panel-dev.aff44.com/widget-json/718f1b61")
        .then( response =>  {
          commit("setOffers", response.data.offers);
          commit("setRRSO", response.data.rrso);
          commit("setTranslations", response.data.translations);
          commit("setMainSettings", response.data.arr);
        })
    }
  },
})
