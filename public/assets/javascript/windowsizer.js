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
    vph = $(window).height() - 50;
    $(".scroll-sub-app").css({"height": vph + "px"});
}
