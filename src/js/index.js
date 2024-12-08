import "./import/modules";

const windowHeight = document.documentElement.clientHeight;

function showVisible() {
    let elems = document.querySelectorAll('.animate-visible');
    for (let i = 0; i < elems.length; i++) {
        let elem = elems[i];
        if (isVisible(elem)) {
            elem.classList.remove('animate-visible');
        }
    }
}

function isVisible(elem) {
    let coords = elem.getBoundingClientRect();
    let topVisible = coords.top >= 0 && coords.top < windowHeight;
    let bottomVisible = coords.bottom < windowHeight && coords.bottom >= 0;
    return topVisible || bottomVisible;
}

showVisible();

export { showVisible };