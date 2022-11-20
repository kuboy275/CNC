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
        var imageColor = $(this).parent().attr('data-image') ? $(this).parent().data('image') : false;

        var urlImage = './assets/images/color-image/';

        if (imageColor != false) {
            $('.image-by-color img').attr('src',urlImage + imageColor);
        } else {
            $('.image-by-color img').attr('src','./assets/images/color-image/pink.jpg');
        }

        textShow.removeClass( function(index,className){
            return (className.match (/(^|\s)shadow-\S+/g) || []).join('');
        });
        textShow.addClass('shadow-'+ classNameColor );
        $('.js-click-color').find('span').css('color','');
        $(this).find('span').css('color',$(this).data('value'));
        
    });


    var ele =  $('.text-suggestion span');
    for (var i = 0; i < ele.length; i++) {
        ele.eq(i).addClass('shadow-' + get_random());
    }

});

function changeFontSize(element,sizeValue) {
    element.css('font-size',sizeValue + 'px');
}

function get_random () {
    var arr = [];
    $('.js-click-color').each(function(i,val){
        var color = $(val).data('name');
        arr.push(color);
    })
    return arr[Math.floor((Math.random()*arr.length))];
}