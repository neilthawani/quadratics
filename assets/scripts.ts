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

// interface SVGElement extends Element {
//     getTotalLength(): SVGElement;
// }

// mouse range of motion
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
    var trajectoryEl = <SVGPathElement>document.querySelector("#gc-trajectory path");

    var isDragging = false;

    // toggle bird/slingshot drag event on mousedown/mouseup
    bird.addEventListener("mousedown", function(event: MouseEvent) {
        event.preventDefault();
        isDragging = true;
    });

    // reset sprite positions on mouseup
    bird.addEventListener("mouseup", function(event: MouseEvent) {
        event.preventDefault();
        isDragging = false;
        resetSpritePosition(bird, {"cx": initialX}, {"cy": initialY});
        resetSpritePosition(rubberbandEl, {"x2": rubberbandEl.getAttribute("x1")}, {"y2": rubberbandEl.getAttribute("y1")})
        drawTrajectory(trajectoryEl, 0, 0, 0, 0, 0, 0);
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
        // if the bounds are exceeded, reset sprite positions
        var validXBounds = x > xMin && x < xMax,
            validYBounds = y > yMin && y < yMax;

        if (validXBounds && validYBounds) {
            var mouseX = x.toString(),
                mouseY = y.toString();

            this.setAttribute("cx", mouseX);
            this.setAttribute("cy", mouseY);

            rubberbandEl.setAttribute("x2", mouseX)
            rubberbandEl.setAttribute("y2", mouseY);

            // (x0, y0): ball/mouse coords
            // (x1, y1): trajectory coords, based on slingshot angle
            // (x2, y2): predicted target

            // upward-facing slingshot, draw arc
            var x0 = x,
                y0 = y,
                [x1, y1] = findThirdPoint(x0,
                                          y0,
                                          parseInt(rubberbandEl.getAttribute("x1"), 10), parseInt(rubberbandEl.getAttribute("y1"), 10)),
                x2 = parseInt(document.getElementById("gc-ground").children[1].getAttribute("width"), 10),
                y2 = yMax - parseInt(document.getElementById("gc-ground").children[1].getAttribute("height"), 10);

            // downward-facing slingshot, draw straight line
            if (y0 < parseInt(rubberbandEl.getAttribute("y1"), 10)) {
                y1 = yMax - parseInt(document.getElementById("gc-ground").children[1].getAttribute("height"), 10);
                x1 = findThirdX(x0,
                                y0,
                                parseInt(rubberbandEl.getAttribute("x1"), 10),
                                parseInt(rubberbandEl.getAttribute("y1"), 10),
                                y1);
                x2 = x1;
                y2 = y1;
            }

            drawTrajectory(trajectoryEl,
                      x0, y0,
                      x1, y1,
                      x2, y2);
        } else {
            this.dispatchEvent(new Event("mouseup"));
        }
    });

    // let the bird fly
    svg.addEventListener("click", function(event: MouseEvent) {
        if (!isDragging) {
            return;
        }
        event.preventDefault();
        console.log("click");
        var pathLength = trajectoryEl.getTotalLength();
        var pathPoints = [];
        for (var i = 0; i < Math.floor(pathLength); i++) {
            var svgCoords = trajectoryEl.getPointAtLength(i),
                svgX = svgCoords["x"].toString(),
                svgY = svgCoords["y"].toString();
            // console.log("coords", svgX, svgY);

            setTimeout(function() {
                bird.setAttribute("cx", svgX);
                bird.setAttribute("cy", svgY);
            }, 1000);
            pathPoints.push([<number>coords["x"], <number>coords["y"]])
        }
        // console.log("pathPoints", pathPoints);
        // debugger;
        // for (var i = 0; i < pathPoints.length; i++) {
        //     var coords = pathPoints[i];
            // console.log("coords", coords);
            // setTimeout(function() {
            //     console.log("pathPoints[i][0]", pathPoints[i][0], "pathPoints[i][1]", pathPoints[i][1]);
            //     bird.setAttribute("cx", pathPoints[i][0]);
            //     bird.setAttribute("cy", pathPoints[i][1]);
            // }, 500);
        // }
    });
});

function resetSpritePosition(el: Element, x: Object, y: Object) {
    el.setAttribute(Object.keys(x)[0], Object.values(x)[0]);
    el.setAttribute(Object.keys(y)[0], Object.values(y)[0]);
}

function drawTrajectory(el, x0, y0, x1, y1, x2, y2) {
    // downward-facing slingshot, draw straight line
    if (x1 === x2 && y1 === y2) {
        el.setAttribute("d", `M${x0} ${y0} L${x1} ${y1}`);
        return;
    }

    // upward-facing slingshot, draw arc
    el.setAttribute("d", `M${x0},${y0} Q${x1},${y1} ${x2},${y2}`);
}

function findThirdPoint(x0: number, y0: number, x1: number, y1: number, x2?: number, y2?: number) {
    var x2 = x2 || 620;
    var y2 = y2 || 0;

    if (x0 === x1) {
        throw new Error("Divide by zero (same input x coords)");
        return;
    }

    var x2 = x2 || ((y2 - y0) * (x1 - x0)) / (y1 - y0) + x0
    var y2 = y2 || ((y1 - y0) / (x1 - x0)) * (x2 - x0) + y0

    return [x2, y2];
}

function findThirdX(x0: number, y0: number, x1: number, y1: number, y2: number) {
    if (x0 === x1) {
        throw new Error("Divide by zero (same input x coords)");
        return;
    }

    var x2 = ((y2 - y0) * (x1 - x0)) / (y1 - y0) + x0

    return x2;
}
