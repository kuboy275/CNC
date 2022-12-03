$(document).ready(function() {
    $(".text-show").draggable({
        containment: ".show-result",
        cursor: "all-scroll"
    });  

    $(".image-preview").draggable({
        containment: ".show-result",
        cursor: "all-scroll"
    });

    $(".image-preview").resizable();
    
    const textShow = $('.text-show');

    $('body').on('input','#inputRangeSize',function(){
        let val = $(this).val();
        $('.label-ranger .js-font-size').text(val)
        changeFontSize(textShow,val);
    });

    /* Upload Icon */
    $("#photo").change(function () {
        const file = this.files[0];
        /* validation file */
        var ext = $(this).val().split('.').pop().toLowerCase();
        if($.inArray(ext, ['gif','png','jpg','jpeg','svg']) == -1) {
            alert('File không đúng định dạng, vui lòng tải lại!');
        } else {
            if (file) {
                $('.image-preview .ui-icon').css('opacity','.8')
                let reader = new FileReader();
                reader.onload = function (event) {
                    var img = $('<img id="image-draggable">');
                    img.attr('src', event.target.result);
                    img.appendTo('.image-preview');
                };
                reader.readAsDataURL(file);
            }
        }
    });

    $('body').on('keyup','#text-area',function() {
        var val = $(this).val().trim();
        textShow.text(val);
        // lines = val.split(" ");
        // $.each(lines,function(i,line) {
        //     $(`<span class="shadow-${get_random()}"> ${line} </span>`).appendTo(".text-suggestion");
        // })
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

        /* Change background */
        var urlImage = './assets/images/color-image/';
        if (imageColor != false) {
            $('.image-by-color img').attr('src',urlImage + imageColor);
        } else {
            $('.image-by-color img').attr('src','./assets/images/color-image/pink.jpg');
        }

        /* Change Color */
        textShow.removeClass( function(index,className){
            return (className.match (/(^|\s)shadow-\S+/g) || []).join('');
        });
        textShow.addClass('shadow-'+ classNameColor );
        $('.js-click-color').find('span').css('color','');
        $(this).find('span').css('color',$(this).data('value'));
        
    });

    suggestionsText();

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

/* Suggestions color section */
function suggestionsText() {
    var ele =  $('.text-suggestion span');
    for (var i = 0; i < ele.length; i++) {
        ele.eq(i).addClass('shadow-' + get_random());
    }
    $('.text-suggestion').on('click',function(evt){
        $('.text-show').empty().append($(this).html());
    });
}