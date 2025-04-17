
// $('body').addClass("overflow-hidden");
$('.intro-bar').each(function(i) {
    setTimeout(() => {
        $(this).addClass("!bg-lime-500")
        setTimeout(() => {
            $(this).css("opacity", "0");
        }, i * 30);
    }, i * 30);
});

setTimeout(() => {
    $('#intro').css("display", "none");
}, $('.intro-bar').length * 90);