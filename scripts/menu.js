document.addEventListener("DOMContentLoaded",  function() {
    // toggle mobile hamburger
    let hamburger = document.querySelector('.hamburger');
    let body = document.querySelector('body');
    hamburger.onclick = function () {
        body.classList.toggle('show');
    }

    // generate to top button
    let toTopBtn = document.createElement('button');
    toTopBtn.appendChild(document.createTextNode("Top"));
    toTopBtn.className = "to-top-btn";
    body.appendChild(toTopBtn);

    let header = document.querySelector('header');
    toTopBtn.onclick = function() {
        header.scrollIntoView({behavior: 'smooth'});
    }
});
