window.onload = function() {
    bindArrows();
};

function bindArrows() {
    const arrows = [
        {
            element: document.querySelector('#arrow-0'),
            icon: document.querySelector('#arrow-0 i'),
            pressed: false
        }, {
            element: document.querySelector('#arrow-1'),
            icon: document.querySelector('#arrow-1 i'),
            pressed: false
        }
    ];

    arrows.forEach((arrow) => {
        arrow.element.addEventListener('click', () => {
            const topOfArrow = arrow.element.offsetTop + arrow.element.parentElement.offsetTop;
            const topOfPrevPage = arrow.element.parentElement.offsetTop - arrow.element.offsetHeight;

            if (arrow.pressed) {
                document.getElementById('cells').style.top = Math.min(-topOfPrevPage, 0);
            } else {
                document.getElementById('cells').style.top = -topOfArrow;
            }

            arrow.icon.toggleClass('Img--upsideDown');

            arrow.pressed = !arrow.pressed;
        });
    });
}

Element.prototype.toggleClass = function (className) {
    if (this.className.indexOf(className) > -1) {
        this.className = this.className.replace(` ${className}`, '');
    } else {
        this.className += ` ${className}`;
    }
};
