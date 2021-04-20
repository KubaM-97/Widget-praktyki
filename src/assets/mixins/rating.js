import $ from "jquery";
import { useStore } from 'vuex';
import { computed } from 'vue'

export default function mixinRating(){
  
  const store = useStore();

    function ratingClick(e){
      const translations = computed(()=>store.state.translations).value;
      // let translations = $('.translations').val(JSON.stringify(translations.value));

        const elem = $(this);
        console.log(elem)
            const fill = calculateFill(e, $(this).parents('.rating'));
            const rate = Math.ceil(fill / 100 * 5);
            setTimeout(function() {
                $.ajax({
                    url: 'https://widgets.aff44.com/vote?save_rate=' + elem.parents('.a44-offer').attr('data-id') + '&rate=' + rate,
                    dataType: 'jsonp',
                }).done(function(data) {
                    if (data.status === 'success') {
                        const new_rate = Number(data.new_rate);
                        elem.parents('.a44-offer').find('.offer-rate').html(new_rate.toFixed(1));
                        const vote_count = data.votes_count.toString();
                        const last_char = vote_count.slice(-1);
                        elem.parents('.a44-offer').find('.votes-count').html('(<b>' + data.votes_count + '</b> ' + (last_char == '1' ? (typeof translations['vote'] !== 'undefined' ? translations['vote'] : 'vote') : (['2', '3', '4'].includes(last_char) ? (typeof translations['votes'] !== 'undefined' ? translations['votes'] : 'votes') : (typeof translations['votes2'] !== 'undefined' ? translations['votes2'] : 'głosów'))) + ')');
                        elem.parents('.a44-offer').find('.rate').css('width', (new_rate.toFixed(1) / 5 * 100) + '%')
                    }
                });
            }, Math.random() * 300);
    }

    function ratingHover(e){
      const fill = calculateFill(e, e.target);
      $(this).find('.rate').css('width', round(fill, 20, 0) + '%');
    }

    function ratingLeave(){
        $(this).find('.rate').css('width', $(this).parents('.a44-offer').find('.offer-rate').html() / 5 * 100 + '%'); 
    }

    function calculateFill(e, container) {
      var startCoord = container.offset().left;
      var endCoord = container.offset().left + container.width();
      var cursorPosX = e.pageX;
      var relativeWidth = endCoord - startCoord;
      var relativeCursorPosX = cursorPosX - startCoord;
      var percentFilled = relativeCursorPosX / relativeWidth * 100;
      return percentFilled;
  }

    function round(number, increment, offset) {
      return Math.ceil((number - offset) / increment) * increment + offset;
    }

    return{
      ratingClick,
      ratingHover,
      ratingLeave,
      calculateFill,
      round
    }

}