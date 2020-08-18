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

// [{
//     element: bird,
//     attributes: ["cx", "cy"]
// }, {
//     element: rubberbandEl,
//     attributes: [{
//         "x2": rubberbandEl.getAttribute("x1"),
//         "y2": rubberbandEl.getAttribute("y1")
//     }]
// }, {
//     element: trajectoryEl,
//     attributes: ["x0", "y0", "x1", "y1", "x2", "y2"]
// }]

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

    var rubberbandEl = document.querySelector("#gc-rubberband line");
    var trajectoryEl = document.querySelector("#gc-trajectory path");

    var isDragging = false;

    // reset sprite positions if svg is clicked
    svg.addEventListener("click", function(event: MouseEvent) {
        isDragging = false;
        resetSpritePosition(bird, {"cx": initialX}, {"cy": initialY});
        resetSpritePosition(rubberbandEl, {"x2": rubberbandEl.getAttribute("x1")}, {"y2": rubberbandEl.getAttribute("y1")})
        drawCurve(trajectoryEl, 0, 0, 0, 0, 0, 0);
    });

    // toggle bird/slingshot drag event on mousedown/mouseup
    bird.addEventListener("mousedown", function(event: MouseEvent) {
        // console.log("mousedown");
        event.preventDefault();
        isDragging = true;
    });

    // reset sprite positions on mouseup
    bird.addEventListener("mouseup", function(event: MouseEvent) {
        // console.log("mouseup");
        event.preventDefault();
        svg.dispatchEvent(new Event("click"));
    });

    // main slingshot dragging logic
    bird.addEventListener("mousemove", function(event: MouseEvent) {
        // console.log("mousemove", "isDragging", isDragging);
        if (!isDragging) {
            return;
        }

        event.preventDefault();

        // get bird (x, y) position
        var x = event.offsetX,
            y = event.offsetY;

        // allow player to move the bird within pre-defined (x, y) bounds
        // if the bounds are exceeded, reset sprite positions
        var validXBounds = x > xMin && x < xMax,
            validYBounds = y > yMin && y < yMax;

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
              x0, y0,
              x1, y1,
              x2, y2);
        } else {
            svg.dispatchEvent(new Event("click"));
        }
    });
});

function resetSpritePosition(el: Element, x: Object, y: Object) {
    el.setAttribute(Object.keys(x)[0], Object.values(x)[0]);
    el.setAttribute(Object.keys(y)[0], Object.values(y)[0]);
}

function drawCurve(el, x0, y0, x1, y1, x2, y2) {
    el.setAttribute("d", `M${x0},${y0} Q${x1},${y1} ${x2},${y2}`);
}
