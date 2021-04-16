import { createStore } from 'vuex'
<<<<<<< HEAD
// import $ from 'jquery'
=======

>>>>>>> 99d6ad9040d92362dd40e477bf93820323fb5cc9
import axios from 'axios'

export default createStore({
    state: {
      offers: [],
<<<<<<< HEAD
      filterParams: {
        period: 12,
        amount: 1000,
        free_amount: false
      },
      communicates: {
=======
      
      input_hidden: {
>>>>>>> 99d6ad9040d92362dd40e477bf93820323fb5cc9
        "No offers matching criteria" : "Nie znaleziono ofert spełniających podane kryteria",
        "We also recommend loans with other parameters":"Polecamy też pożyczki o innych parametrach",
        "days":"dni",
        "months":"m-cy",
        "offers-params-info":"Powyższe wartości są mają charakter orientacyjny i nie stanowią oferty w rozumieniu art. 66 Kodeksu Cywilnego. Aby potwierdzić koszt pożyczki kliknij na \"Weź pożyczkę\". Minimalna kwota pożyczki zaczyna się od {MIN-AMOUNT} zł, a maksymalna do {MAX-AMOUNT} zł. Minimalne RRSO: {MIN-RRSO}%, maksymalne RRSO: {MAX-RRSO}%",
        "Loan period":"Okres pożyczki",
        "Loan amount":"Kwota pożyczki",
        "Show only free loans":"Pokaż tylko darmowe pożyczki",
        "Amount / period":"Kwota / okres",
        "Take a loan":"Weź pożyczkę",
        "COST / TOTAL":"KOSZT / ŁĄCZNIE",
        "INSTALLMENT":"RATA",
        "vote":"głos",
        "votes":"głosy",
        "votes2":"głosów",
        "no":"brak",
        "APR":"RRSO",
        "Minimal APR":"Minimalne RRSO",
        "maximal APR":"maksymalne RRSO"
    }
  },
  getters: {
    filteredOffers: (state) => (p) => {

      console.log(p)
      // const $freeAmount = $('[id^="#chck-free-amount-"');

      const stateFilterParams = state.filterParams

      const filteredOffers = state.offers
      .filter( offer => offer.min_amount <= stateFilterParams.amount )
      .filter( offer => offer.max_amount >= stateFilterParams.amount )
      .filter( offer => offer.min_period <= stateFilterParams.period )
      .filter( offer => offer.max_period >= stateFilterParams.period )
      .filter( offer => stateFilterParams.free_amount ? offer.first_free_amount >= stateFilterParams.free_amount : true)
         
      console.log(filteredOffers.length)
      console.log(filteredOffers)
       return filteredOffers

    }
  },
  mutations: {
    setOffers( state, offers ){
      state.offers = offers;
    },
    updateFilteres(state, value){
      state.filterParams.period = value.period;
      state.filterParams.amount = value.amount;
      state.filterParams.free_amount = value.free_amount;
    }
  },
  actions: {
    fetchOffers ( { commit } ) {
        axios.get("https://panel-dev.aff44.com/widget-json/718f1b61")
        .then( response => commit("setOffers", response.data) )
    }
  },
})
