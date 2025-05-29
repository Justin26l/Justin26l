
$(document).ready(function() {
    const isDarkMode = $('html').class('.dark');
    console.log("Dark mode is " + (isDarkMode ? "enabled" : "disabled"));
    
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
});