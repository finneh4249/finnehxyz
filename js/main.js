let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('nav a');

window.onscroll = function() {
    var navbar = document.getElementById("navbar");
    if (document.documentElement.scrollTop > 60) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }

    section.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('nav a[href*=' + id + ']').classList.add('active');
            });}
    })
};