window.addEventListener("load", function() {
    Array.from(document.getElementsByClassName("button")).forEach(function(elem) {
        elem.addEventListener("click", function() {
            elem.classList.remove("btn-click-animatable");
            elem.classList.add("btn-click-animatable");
            setTimeout(function() {
                elem.classList.remove("btn-click-animatable");
            }, 250);
        });
    });
});
