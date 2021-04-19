import $ from "jquery";
import { useStore } from 'vuex';
import { computed } from 'vue'

export default function mixinRating(){
  
  const store = useStore();
  const messages = computed(()=>store.state.messages).value;

    function ratingClick(e){
      // let messages = $('.translations').val(JSON.stringify(messages.value));

        const elem = $(this);
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
                        elem.parents('.a44-offer').find('.votes-count').html('(<b>' + data.votes_count + '</b> ' + (last_char == '1' ? (typeof messages['vote'] !== 'undefined' ? messages['vote'] : 'vote') : (['2', '3', '4'].includes(last_char) ? (typeof messages['votes'] !== 'undefined' ? messages['votes'] : 'votes') : (typeof messages['votes2'] !== 'undefined' ? messages['votes2'] : 'głosów'))) + ')');
                        elem.parents('.a44-offer').find('.rate').css('width', (new_rate.toFixed(1) / 5 * 100) + '%')
                    }
                });
            }, Math.random() * 300);
    }

    function ratingHover(e, x){
        console.log(e)
        
        const fill = calculateFill(e, x);
        // const fill = calculateFill(x);
        console.log(fill)
        $(this).find('.rate').css('width', round(fill, 20, 0) + '%');
        // const fill = calculateFill(e, $(this));
    }

    function ratingLeave(e){
        $(this).find('.rate').css('width', $(this).parents('.a44-offer').find('.offer-rate').html() / 5 * 100 + '%');
        e.target.style.width = $(this).parents('.a44-offer').find('.offer-rate').html() / 5 * 100 + '%';
    }

  //   function calculateFill(e, container) {
  //     console.log(container)
  //     var startCoord = container.offset().left;
  //     var endCoord = container.offset().left + container.width();
  //     console.log(startCoord, endCoord)
  //     var cursorPosX = e.pageX;
  //     var relativeWidth = endCoord - startCoord;
  //     var relativeCursorPosX = cursorPosX - startCoord;
  //     // console.log(startCoord, endCoord)
  //     var percentFilled = relativeCursorPosX / relativeWidth * 100;
  //     return percentFilled;
  // }
    function calculateFill(e, container) {
      // const aa = []
      // console.log(container.offsetLeft)
      // console.log(container.offset().left)
      const startCoord = container.offset().left;
      const endCoord = startCoord + container.width();
      const cursorPosX = e.pageX;
      const relativeWidth = endCoord - startCoord;
      const relativeCursorPosX = cursorPosX - startCoord;
      // console.log(e.target.style.width)
      // console.log(container.offsetLeft)
      // console.log(container.offsetWidth)
      // console.log(document.getElementsByTagName("BODY")[0].offsetWidth)
      // console.log(e.target.parentNode)
      
      // console.log(aa)
      console.log(e, relativeWidth, relativeCursorPosX)
      const percentFilled = relativeCursorPosX / relativeWidth * 100;
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