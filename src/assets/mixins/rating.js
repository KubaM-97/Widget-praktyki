import $ from "jquery";
import { useStore } from 'vuex';
import { computed } from 'vue'

export default function mixinRating(){
  
  const store = useStore();
  const translations = computed(()=>store.state.translations);

    function getVotes_count_container(data){

      const vote_count = data.votes_count.toString();
      const last_char = vote_count.slice(-1);
      
      if( vote_count !== 1 && vote_count < 11 || vote_count > 14 ){

          switch(last_char){  

              case '2':
              case '3':
              case '4':
                return `(<b> ${data.votes_count} </b> ${getVoteSuffix('votes')} )`

              default:
                return `(<b> ${data.votes_count} </b> ${getVoteSuffix('votes2')} )`

          }

      }
      else{

          switch(last_char){  

              case '1':
                return `(<b> ${data.votes_count} </b> ${getVoteSuffix('votes')} )`

              case '12':
              case '13':
              case '14':
                return `(<b> ${data.votes_count} </b> ${getVoteSuffix('votes2')})`

              default:
                return `(<b> ${data.votes_count} </b> ${getVoteSuffix('votes2')} )`

          }

      }

    }

    function getVoteSuffix(vote_suffix){
      return typeof translations.value[vote_suffix] !== 'undefined' ? translations.value[vote_suffix] : 'votes';
    }

    function ratingClick(e){
      const elem = $(this);
      const fill = calculateFill(e, $(this).parents('.rating'));
      const rate = Math.ceil(fill / 100 * 5);
      setTimeout(function() {
            $.ajax({
                url: 'https://widgets.aff44.com/vote?save_rate=' + elem.parents('.a44-offer').attr('data-id') + '&rate=' + rate,
                dataType: 'jsonp',
            }).done(function(data) { 
              // console.log(data)
                if (data.status === 'success') {

                    const new_rate = Number(data.new_rate);

                    const offer_rate_container = elem.parents('.a44-offer').find('.offer-rate');
                    offer_rate_container.html(new_rate.toFixed(1));

                    const rate = elem.parents('.a44-offer').find('.rate')
                    rate.css('width', (new_rate.toFixed(1) / 5 * 100) + '%')

                    const votes_count_container = elem.parents('.a44-offer').find('.votes-count');
                    votes_count_container.html(getVotes_count_container(data))   
              
                }
            });
      }, Math.random() * 300);
    }

    function ratingHover(e){
      // GOOD
      const fill = calculateFill(e);
      e.target.style.width = round(fill, 20, 0) + '%'

      // BAD
      // $(this).find('.rate').css('width', round(fill, 20, 0) + '%');
    }

    function ratingLeave(){
      
      // e.target.CHILD(".RATE").style.width = round(fill, 20, 0) + '%'
      // e.target.CHILD(".RATE").style.width = 
      // np.4,8 / 5 *100
      //    $(this).parents('.a44-offer').find('.offer-rate').html()           / 5 * 100 + '%'; 
      //   $(this).find('.rate').css('width', $(this).parents('.a44-offer').find('.offer-rate').html() / 5 * 100 + '%'); 
    }

    function calculateFill(e) {
      const container = e.target;
      const cursorPosX = e.pageX;
      const startCoord = container.getBoundingClientRect().left
      const width = container.getBoundingClientRect().width
      const relativeCursorPosX = cursorPosX - startCoord;
      const percentFilled = relativeCursorPosX / width * 100;
      return percentFilled;
    }

    function round(number, increment, offset) {
      return Math.ceil((number - offset) / increment) * increment + offset;
    }
    function getRateWidth(rate, votes){
      console.log(rate, votes)
      //4.7 / 19
      const totalOfferRate =  rate * votes
      const totalPossibleRate =  5 * votes
      const percentFilled = totalOfferRate / totalPossibleRate * 100
      return percentFilled
    }
    return{
      ratingClick,
      ratingHover,
      ratingLeave,
      calculateFill,
      round,
      getRateWidth
    }

}