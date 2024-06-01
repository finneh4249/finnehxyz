let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('nav a');
const hamburger = document.querySelector('#hamburger');

window.onscroll = function() {
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

function toggleNav () {
    
    const navMenu = document.querySelector('#nav-panel')
    // hamburger.classList.toggle('active')
    navMenu.classList.toggle('active')
  }

//   function navInit() {
//     hamburger.addEventListener('click', toggleNav)
//   }
//   navInit()