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
    var svg = document.getElementById("game-canvas");

    var birdGroup = document.getElementById("gc-bird"),
        bird = birdGroup.children[1],
        initialX = bird.getAttribute("cx"),
        initialY = bird.getAttribute("cy");

    const rubberbandEl = document.querySelector("#gc-rubberband line");

    var isDragging = false;

    // reset sprite positions if svg is clicked
    svg.addEventListener("click", function(event: MouseEvent) {
        resetSpritePositions(bird, rubberbandEl, initialX, initialY);
    });

    // toggle bird/slingshot drag event on mousedown/mouseup
    bird.addEventListener("mousedown", function(event: MouseEvent) {
        event.preventDefault();
        isDragging = isDragging ? false : true;
    });

    // reset sprite positions on mouseup
    // TODO: bezier logic probably goes here
    bird.addEventListener("mouseup", function(event: MouseEvent) {
        event.preventDefault();
        resetSpritePositions(this, rubberbandEl, initialX, initialY);
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
        if (x > xMin && x < xMax) {
            this.setAttribute("cx", x.toString());
            rubberbandEl.setAttribute("x2", x.toString())
        } else if (x < xMin || x > xMax) {
            resetSpritePositions(this, rubberbandEl, initialX, initialY);
        }

        if (y > yMin && y < yMax) {
            this.setAttribute("cy", y.toString());
            rubberbandEl.setAttribute("y2", y.toString());
        } else if (y < yMin || y > yMax) {
            resetSpritePositions(this, rubberbandEl, initialX, initialY);
        }
    });
});

function resetSpritePositions(context, rubberbandEl, x, y) {
    context.setAttribute("cx", x);
    context.setAttribute("cy", y);

    resetRubberbandPosition(rubberbandEl);
}

function resetRubberbandPosition(rubberbandEl) {
    rubberbandEl.setAttribute("x2", rubberbandEl.getAttribute("x1"));
    rubberbandEl.setAttribute("y2", rubberbandEl.getAttribute("y1"));
}
