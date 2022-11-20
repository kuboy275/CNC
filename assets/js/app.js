$(document).ready(function() {
    $(".text-show").draggable({
        containment: ".show-result"
    });  
    
    const textShow = $('.text-show');

    $('body').on('input','#inputRangeSize',function(){
        let val = $(this).val();
        $('.label-ranger .js-font-size').text(val)
        changeFontSize(textShow,val);
    });

    $('body').on('keyup','#text-area',function() {
        textShow.text($(this).val());
    })

    $('.js-click-font').on('click',function(e) {
        e.preventDefault();
        $('.js-click-font').removeClass('current');
        $(this).addClass('current');

        textShow.css('font-family',$(this).data('name'));
    })

    $('.js-click-color').on('click',function(e){

        var classNameColor = $(this).data('name');

        textShow.removeClass( function(index,className){
            return (className.match (/(^|\s)shadow-\S+/g) || []).join('');
        });
        textShow.addClass('shadow-'+ classNameColor );
        $('.js-click-color').find('span').css('color','');
        $(this).find('span').css('color',$(this).data('value'));
    });
  
});

function changeFontSize(element,sizeValue) {
    element.css('font-size',sizeValue + 'px');
}