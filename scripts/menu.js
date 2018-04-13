// Show Mobile Menu Script
document.addEventListener("DOMContentLoaded",  function() {
    let hamburger = document.querySelector('.hamburger');
    let body = document.querySelector('body');
    hamburger.onclick = function () {
        body.classList.toggle('show');
    }
});
