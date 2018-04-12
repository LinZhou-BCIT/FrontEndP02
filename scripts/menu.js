// Show Mobile Menu Script
document.addEventListener("DOMContentLoaded",  function() {
    let hamburger = document.querySelector('.hamburger');
    hamburger.onclick = function () {
        let body = document.querySelector('body');
        body.classList.toggle('show');
    }
});
