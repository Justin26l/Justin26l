var loadingElement = '<div style="height: 500px; display: flex;align-items: center;justify-content: center;overflow:hidden;text-align: center;"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"x="0px" y="0px" width="60px" height="70px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;"xml:space="preserve"><rect x="0" y="0" width="5" height="15" fill="#f0a000"><animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0"begin="0" dur="0.6s" repeatCount="indefinite"></animateTransform></rect><rect x="10" y="0" width="5" height="15" fill="#f0a000"><animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0"begin="0.2s" dur="0.6s" repeatCount="indefinite"></animateTransform></rect><rect x="20" y="0" width="5" height="15" fill="#f0a000"><animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0"begin="0.4s" dur="0.6s" repeatCount="indefinite"></animateTransform></rect></svg></div>';
setInterval(()=>{
        console.log("%c\n██╗..██╗██╗..██╗██╗..██╗\n╚██╗██╔╝╚██╗██╔╝╚██╗██╔╝\n.╚███╔╝..╚███╔╝..╚███╔╝.\n.██╔██╗..██╔██╗..██╔██╗.\n██╔╝╚██╗██╔╝╚██╗██╔╝╚██╗\n╚═╝..╚═╝╚═╝..╚═╝╚═╝..╚═╝ ","color:#ff0000;")
        console.log("%cHold Up!\n%cIf someone told you to do something here, he is scamm.\n%cPasting anything in here could give attackers access to your account.\nUnless you understand exactly what you are doing, close this window and stay safe.","color:#ff0000;font-size:32px;font-weight:bold;","color:#f0b400;font-size:16px;font-weight:bold;","font-size:16px;font-weight:bold;")
    },
    30000
);
function loadFrame(path){
    console.log("Loading Frame: "+path);
    $("#MainFrame").html(loadingElement);
    $.get({
        url: "<?=base_url($this->lg.'/dashboard')?>/"+path,
        success: (respone)=>{
            history.pushState(path, '', "<?=base_url($this->lg.'/dashboard')?>?page="+path);
            $("#MainFrame").hide().html(respone).fadeIn(250);
            ImgLazyLoad();
        },
        error:(respone)=>{
            $("#main").html(respone);
        }
    });
}
function refreshNavBar(id) {
    $('#l2nav_home, #l2nav_bot, #l2nav_techlib, #l2nav_article').removeClass('l2navitem-active');
    $(id).addClass('l2navitem-active');
}

$(document).ready(function(){
    $(".l2nav_profile, .l2nav_affiliate, .l2nav_help").attr('onclick','');
    
    $("#l2nav_home").click(()=>{
        loadFrame("home");
        refreshNavBar('#l2nav_home');
    });
    $("#l2nav_bot").click(()=>{
        loadFrame("bot");
        refreshNavBar('#l2nav_bot');
    });
    $("#l2nav_techlib").click(()=>{
        loadFrame("techlib");
        refreshNavBar('#l2nav_techlib');
    });
    $("#l2nav_article").click(()=>{
        loadFrame("article");
        refreshNavBar('#l2nav_article');
    });
    $(".l2nav_profile").click(()=>{
        loadFrame("profile");
        refreshNavBar();
    });
    $(".l2nav_affiliate").click(()=>{
        loadFrame("affiliate");
        refreshNavBar();
    });
    $(".l2nav_help").click(()=>{
        loadFrame("help");
        refreshNavBar();
    });
    $("#l2nav_<?=$page?>, .l2nav_<?=$page?>").click();
});