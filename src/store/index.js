import { createStore } from 'vuex'

import axios from 'axios'

export default createStore({
    state: {
      offers: [],
      
      input_hidden: {
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
  mutations: {
    setOffers( state, offers){
      state.offers = offers
    }
  },
  actions: {
    fetchOffers:( { commit } )=>{
        axios.get("https://panel-dev.aff44.com/widget-json/718f1b61")
        .then( response => {
          commit("setOffers", response.data);
        })
    }
  },
})