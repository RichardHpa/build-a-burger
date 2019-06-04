$(document).ready(function(){
    var totalPrice = 0;
    var burgerValid = false, salidsValid = false, cheeseValid = false, meatValid = false;

    function createDraggable(){
        $('.draggable').draggable({
            containment: "#burgerContainer",
            helper: "clone",
            drag: function(event, ui){
                if(ui.helper.hasClass('added')){
                    if(hovering === false){
                        ui.helper.addClass('remove');
                    } else {
                        ui.helper.removeClass('remove');
                    }
                }
            },
            stop: function(event, ui){
                if(ui.helper.hasClass('added')){
                    if(hovering === false){
                        $(this).remove();
                        var removingPrice = $(this).data('price');
                        console.log(removingPrice);
                        totalPrice = totalPrice - removingPrice;
                        ui.helper.remove();
                        if($('#saladDroppable').children().length === 0){
                            salidsValid = false;
                            $('#saladDroppable').addClass('bashedBorder invalid').removeClass('valid').append('<p>Choose your salads</p>');
                        }
                    }
                } else {
                    var price = $(this).data('price');
                    totalPrice = totalPrice + price;
                }

                if(burgerValid == true && salidsValid == true && cheeseValid == true && meatValid == true){
                    $('#makeBurger').removeClass('d-none');
                } else {
                    $('#makeBurger').addClass('d-none')
                }
                $('#totalPrice').text(totalPrice.toFixed(2))
            }
        });
    }
    createDraggable()

    $('#topDroppable').droppable({
        accept: '.buns',
        over: function(event, ui){
            $(this).addClass('hovering');
        },
        out: function(event, ui){
            $(this).removeClass('hovering');
        },
        drop: function( event, ui ) {
            if($(this).hasClass('invalid')){
                $(this).removeClass('invalid').addClass('valid');
                burgerValid = true;
            } else {
                var priceRemove = $(this).find('.buns').first().data('price');
                totalPrice = totalPrice - priceRemove;
            }
            $( this ).removeClass( 'bashedBorder hovering' );
            var element= $(ui.draggable).clone().removeClass('col-4').addClass('col');
            var id = element.data('bun');
            if($(this).children().length){

                $(this).empty();
            }
            $(this).append(element);
            $('#bunBottom').empty().append('<div class="col p-1"><img class="img-fluid" src="images/bun'+id+'-bottom.png"></div>');
            checkHeight();
        }
    });

    $('#meatDroppable').droppable({
        accept: '.meat',
        over: function(event, ui){
            $(this).addClass('hovering');
        },
        out: function(event, ui){
            $(this).removeClass('hovering');
        },
        drop: function( event, ui ) {
            if($(this).hasClass('invalid')){
                meatValid = true;
                $(this).removeClass('invalid').addClass('valid');
            } else {
                var priceRemove = $(this).find('.meat').first().data('price');
                totalPrice = totalPrice - priceRemove;
            }
            $( this ).removeClass( 'bashedBorder hovering' );
            var element= $(ui.draggable).clone().removeClass('col-4').addClass('col');
            if($(this).children().length){
                $(this).empty();
            }
            $(this).append(element);
            checkHeight();
        }
    });

    $('#cheeseDroppable').droppable({
        accept: '.cheese',
        over: function(event, ui){
            $(this).addClass('hovering');
        },
        out: function(event, ui){
            $(this).removeClass('hovering');
        },
        drop: function( event, ui ) {
            if($(this).hasClass('invalid')){
                cheeseValid = true;
                $(this).removeClass('invalid').addClass('valid');
            } else {
                var priceRemove = $(this).find('.cheese').first().data('price');
                totalPrice = totalPrice - priceRemove;
            }
            $( this ).removeClass( 'bashedBorder hovering' );
            var element= $(ui.draggable).clone().removeClass('col-4').addClass('col');
            if($(this).children().length){
                $(this).empty();
            }
            $(this).append(element);
            checkHeight();
        }
    });
// salidsValid
    var hovering = false;
    $('#saladDroppable').droppable({
        accept: '.salad',
        over: function(event, ui){
            $(this).addClass('hovering');
            hovering = true;
        },
        out: function(event, ui){
            $(this).removeClass('hovering');
            hovering = false;
        },
        drop: function( event, ui ) {
            $( this ).removeClass( 'bashedBorder hovering' );
            console.log($(this).children().length);
            if($(this).children().length > 0){
                $('#saladDroppable').removeClass('invalid').addClass('valid');
                salidsValid = true;
            }
            if(!ui.draggable.hasClass('added')){
                $(this).find('p').remove();
                var element= $(ui.draggable).clone().removeClass('col-4').addClass('added');
                $(this).append(element);
                checkHeight();
                createDraggable()
            }
        }
    });



    function checkHeight(){
        var containerHeight = $('#yourBurgerContainer').height();
        var contentHeight = $('#burger').height();
        if(contentHeight > containerHeight){
            var scale = containerHeight / contentHeight;
            $('#burger').css('transform', 'scale('+scale+')');
        }
    }

    $('#makeBurger').click(function(){
        var container = $('#burger');
        var areas  = $('#burger').find('.droppableArea');
        areas.each(function(i){
            $(this).addClass('transition').css('margin-bottom', 0);
            $(this).css('min-height', 0);
        });
        $('#bunBottom').find('.col').addClass('transition px-1').removeClass('p-1');
        var items = container.find('.draggable');
        console.log(items);
        items.each(function(i){
            $(this).addClass('transition px-1').removeClass('p-1');
        });
    })


});
