// var Bezier = require('bezier-js');

// TypeScript Reference: https://tony-scialo.github.io/react-typescript-slides/
// boolean, number, string, array, any
// void, null, undefined, Object
//
// interface User {
//     firstName: string,
//     lastName: string
// }
//
// function sayHello(user: User) {
//     return `Hi ${user.firstName} ${user.lastName}`
// }
//
// $> npx create-react-app my-first-ts --typescript
//
// Design patterns: https://tony-scialo.github.io/react-typescript-slides/#/41

const xMin = 0;
const xMax = 158; // gc-bird-obj:cx + 20
const yMin = 0;
const yMax = 300;

document.addEventListener("DOMContentLoaded", function(event: MouseEvent) { // DOM-ready
    // define query selectors, get related attributes
    var svg = document.getElementById("game-canvas"),
        svgWidth = svg.getAttribute("width"),
        svgHeight = svg.getAttribute("height");

    var birdGroup = document.getElementById("gc-bird"),
        bird = birdGroup.children[1],
        initialX = bird.getAttribute("cx"),
        initialY = bird.getAttribute("cy");

    const rubberbandEl = document.querySelector("#gc-rubberband line");
    const trajectoryEl = document.querySelector("#gc-trajectory path");

    var isDragging = false;

    // reset sprite positions if svg is clicked
    svg.addEventListener("click", function(event: MouseEvent) {
        resetSpritePositions(bird, rubberbandEl, trajectoryEl, initialX, initialY);
    });

    // toggle bird/slingshot drag event on mousedown/mouseup
    bird.addEventListener("mousedown", function(event: MouseEvent) {
        event.preventDefault();
        isDragging = isDragging ? false : true;
    });

    // reset sprite positions on mouseup
    bird.addEventListener("mouseup", function(event: MouseEvent) {
        event.preventDefault();
        resetSpritePositions(this, rubberbandEl, trajectoryEl, initialX, initialY);
        isDragging = false;
    });

    // main slingshot dragging logic
    bird.addEventListener("mousemove", function(event: MouseEvent) {
        if (!isDragging) {
            return;
        }

        event.preventDefault();

        // get bird (x, y) position
        var x = event.offsetX,
            y = event.offsetY;

        // allow player to move the bird within pre-defined (x, y) bounds
        // if the bounds are exceeded, reset the slingshot
        var validXBounds = x > xMin && x < xMax;
        var validYBounds = y > yMin && y < yMax;

        if (validXBounds && validYBounds) {
            this.setAttribute("cx", x.toString());
            this.setAttribute("cy", y.toString());

            rubberbandEl.setAttribute("x2", x.toString())
            rubberbandEl.setAttribute("y2", y.toString());

            var x0 = x,
                y0 = y,
                x1 = parseInt(rubberbandEl.getAttribute("x1"), 10),
                y1 = parseInt(rubberbandEl.getAttribute("y2"), 10) - parseInt(rubberbandEl.getAttribute("y1"), 10),
                x2 = parseInt(svgWidth, 10) - x,
                y2 = y;

            drawCurve(trajectoryEl,
              x, y,
              x1, y1,
              x2, y2);
        } else {
            resetSpritePositions(this, rubberbandEl, trajectoryEl, initialX, initialY);
        }
    });
});

function drawCurve(el, x0, y0, x1, y1, x2, y2) {
    el.setAttribute("d", `M${x0},${y0} Q${x1},${y1} ${x2},${y2}`);
}

function resetSpritePositions(bird: Element, rubberbandEl: Element, trajectoryEl: Element, x: string, y: string) {
    bird.setAttribute("cx", x);
    bird.setAttribute("cy", y);

    resetRubberbandPosition(rubberbandEl);
    drawCurve(trajectoryEl, 0, 0, 0, 0, 0, 0);
}

function resetRubberbandPosition(rubberbandEl: Element) {
    rubberbandEl.setAttribute("x2", rubberbandEl.getAttribute("x1"));
    rubberbandEl.setAttribute("y2", rubberbandEl.getAttribute("y1"));
}
