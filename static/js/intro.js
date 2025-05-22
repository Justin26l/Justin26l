// $('body').addClass("overflow-hidden");
$(document).ready(() => {
    const len = $('.intro-bar').length;

    let pos = Math.floor(len / 2);
    let neg = Math.floor(len / 2);
    let curr = 0;
    // inseatd .each, make it process from middle, to both end, like 9 bars will go from 5,6,4,7,3,8 ...
    for (let i = 0; i < len; i++) {
        setTimeout(() => {
            if (i == 0) {
                curr = neg;
            }
            else if (i % 2 == 0) {
                pos += 1;
                curr = pos;
                console.log('pos', curr);
            } else {
                neg -= 1;
                curr = neg;
                console.log('neg', curr);
            }

            const bar = $('.intro-bar').eq(curr);
            bar.addClass("!bg-lime-500");
            setTimeout(() => {
                bar.css("opacity", "0");
            }, i * 20);
        }, i * 20);
    };
    // $('.intro-bar').each(function(i) {
    //     setTimeout(() => {
    //         $(this).addClass("!bg-lime-500")
    //         setTimeout(() => {
    //             $(this).css("opacity", "0");
    //         }, i * 30);
    //     }, i * 30);
    // });

    setTimeout(() => {
        $('#intro').css("display", "none");
    }, $('.intro-bar').length * 90);
});