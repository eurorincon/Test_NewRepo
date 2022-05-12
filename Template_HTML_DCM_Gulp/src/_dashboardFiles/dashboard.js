// btn Grid to List
$(function() {
    $('.grid .titleBanner a').each(function() {
        len = $(this).text().length;
        str = $(this).text().substr(0, 34);
        lastIndexOf = str.lastIndexOf('');
        if (len > 34) {
            $(this).text(str.substr(0, lastIndexOf) + '…');
        }
    });

    $('button').on('click', function(e) {
        if ($(this).hasClass('grid')) {
            $(this).addClass('active');
            $('.btn_list').removeClass('active');
            $('#container ul').removeClass('list').addClass('grid');
        } else if ($(this).hasClass('list')) {
            $(this).addClass('active');
            $('.btn_grid').removeClass('active');
            $('#container ul').removeClass('grid').addClass('list');
        }
    });
});
