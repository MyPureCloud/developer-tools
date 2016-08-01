$(document).ready(function(){
    resizeDiv();
});

window.onresize = function(event) {
    resizeDiv();
};

window.onhashchange = function(event) {
    resizeDiv();
};

function resizeDiv() {
    console.log("resizeDiv");
    vph = $(window).height() - 75;
    $(".scroll-sub-app").css({"height": vph + "px"});
}
