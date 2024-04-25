window.onscroll = function() {
    var navbar = document.getElementById("navbar");
    if (document.documentElement.scrollTop > 500) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
};

//Scrollspy
var navLinks = document.querySelectorAll(".nav a");

function scrollSpy() {
    for (var i = 0; i < navLinks.length; i++) {
        var section = document.querySelector(navLinks[i].getAttribute("href"));
        var top = section.offsetTop - 230;
        if (document.documentElement.scrollTop >= top &&
            document.documentElement.scrollTop < top + section.offsetHeight) {
            navLinks[i].classList.add("active");
        } else {
            navLinks[i].classList.remove("active");
        }
    }
}

document.addEventListener("scroll", scrollSpy);

