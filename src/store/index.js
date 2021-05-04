import { createStore } from "vuex";
import axios from "axios";
const _ = require('lodash');

// const aa = {
//   offers: [
//     { name: "KKK", age: 24 },
//     { name: "LLL", age: 37 },
//     { name: "MMM", age: 17 }
//   ],
//   arr: 
//     { 
//       hash: "sdfs" ,
//       aaa: 111 ,

//     }

  
  
// }
// const bb = {
//   offers: [
//     { name: "KKK", age: 24 },
//     { name: "LLL", age: 37 },
//     { name: "MMM", age: 17 },
//     // { name: "ZZZ", age: 88 }
//   ],
//   arr: 
//     { hash: "sssdfs", aaa: 111 }
  
// }
// customizer(aa, bb)
// const cc = _.isEqualWith(aa, bb, customizer)
// const cc = _.isEqual(aa, bb)
// console.log(cc)

export default createStore({
  state: {
    offers: [],
    rrso: [],
    translations: [],
    arr: [],
  },
  getters: {
    filteredOffers: (state) => () => {
      const initPeriodValue = parseInt(state.arr.initPeriodValue);
      const initAmountValue = parseInt(state.arr.initAmountValue);
      const initFreeAmountValue = state.arr.free_amount;

      const filteredOffers = state.offers
        .filter(
          (offer) =>
            offer.min_period <= initPeriodValue || offer.max_period == null
        )
        .filter(
          (offer) =>
            offer.max_period >= initPeriodValue || offer.max_period == null
        )
        .filter(
          (offer) =>
            offer.min_amount <= initAmountValue || offer.max_amount == null
        )
        .filter(
          (offer) =>
            offer.max_amount >= initAmountValue || offer.max_amount == null
        )
        .filter((offer) =>
          initFreeAmountValue
            ? offer.first_free_amount >= initAmountValue
            : true
        );

      return filteredOffers;
    },
  },
  mutations: {
    setOffers(state, offers) {
      state.offers = offers;
    },
    setRRSO(state, rrso) {
      state.rrso = rrso;
    },
    setTranslations(state, translations) {
      state.translations = translations;
    },
    setArr(state, arr) {
      state.arr = arr;
    },
  },
  actions: {

    async insertDataToState( { commit } , payload){

      const category = payload.arr.category;
      const offers = payload.offers.filter( offer => offer.category === category);

      commit("setOffers", offers);

      commit("setRRSO", payload.rrso);
      commit("setTranslations", payload.translations);
      commit("setArr", payload.arr);

    },

    async fetchFullData({ dispatch }, payload) {

      const fetchedData = JSON.parse(sessionStorage.getItem("aff44-data"));

      if (!fetchedData) {

        await axios.get("https://panel-dev.aff44.com/widget-json/" + payload.offerHash)
          // await axios.get("https://panel-dev.aff44.com/widget-json/f34ee6f3")
          .then( response => {
            dispatch('insertDataToState', response.data)
            sessionStorage.setItem("aff44-data", JSON.stringify(response.data))
          });
      }

      else {

        await dispatch('insertDataToState', fetchedData)
        
        axios.get("https://panel-dev.aff44.com/widget-json/" + payload.offerHash)
        .then( response => {

            dispatch('insertDataToState', response.data)
            sessionStorage.setItem('aff44-data', JSON.stringify(response.data));
            const isEqualData = _.isEqualWith(fetchedData, response.data, customizer)
            if(!isEqualData){
              dispatch('fetchFullData', { offerHash:  payload.offerHash })
            }

        })
      }
    }

  }
});

function customizer(obj1, obj2) {

  const { arr: { hash: hash1 } } = obj1
  const { arr: { hash: hash2 } } = obj2

  delete obj1.arr.hash
  delete obj2.arr.hash

  if(_.isEqual(obj1.offers, obj2.offers)){
    obj1.arr.hash = hash1
    obj2.arr.hash = hash2
    return true
  }

}