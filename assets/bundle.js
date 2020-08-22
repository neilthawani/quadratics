(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
let SVGPathEditor = window.SVGPathEditor;
// mouse range of motion
const xMin = 0;
const xMax = 158; // gc-bird-obj:cx + 20
const yMin = 0;
const yMax = 300;
document.addEventListener("DOMContentLoaded", function (event) {
    // define query selectors, get related attributes
    var svg = document.getElementById("game-canvas"), svgWidth = svg.getAttribute("width"), svgHeight = svg.getAttribute("height");
    var birdGroup = document.getElementById("gc-bird"), bird = birdGroup.children[1], initialX = bird.getAttribute("cx"), initialY = bird.getAttribute("cy");
    console.log("initialX", initialX, "initialY", initialY);
    var rubberbandEl = document.querySelector("#gc-rubberband line");
    var trajectoryEl = document.querySelector("#gc-trajectory path");
    var scaffoldContainer = document.getElementsByClassName("scaffold-container")[0];
    var isDragging = false;
    // toggle bird/slingshot drag event on mousedown/mouseup
    bird.addEventListener("mousedown", function (event) {
        event.preventDefault();
        isDragging = true;
    });
    // reset sprite positions on mouseup
    bird.addEventListener("mouseup", function (event) {
        event.preventDefault();
        isDragging = false;
        resetSpritePosition(bird, { "cx": initialX }, { "cy": initialY });
        resetSpritePosition(rubberbandEl, { "x2": rubberbandEl.getAttribute("x1") }, { "y2": rubberbandEl.getAttribute("y1") });
        drawTrajectory(trajectoryEl, 0, 0, 0, 0, 0, 0);
    });
    // main slingshot dragging logic
    bird.addEventListener("mousemove", function (event) {
        if (!isDragging) {
            return;
        }
        event.preventDefault();
        // get bird (x, y) position
        var x = event.offsetX, y = event.offsetY;
        // allow player to move the bird within pre-defined (x, y) bounds
        // if the bounds are exceeded, reset sprite positions
        var validXBounds = x > xMin && x < xMax, validYBounds = y > yMin && y < yMax;
        if (validXBounds && validYBounds) {
            var mouseX = x.toString(), mouseY = y.toString();
            this.setAttribute("cx", mouseX);
            this.setAttribute("cy", mouseY);
            rubberbandEl.setAttribute("x2", mouseX);
            rubberbandEl.setAttribute("y2", mouseY);
            // (x0, y0): ball/mouse coords
            // (x1, y1): trajectory coords, based on slingshot angle
            // (x2, y2): predicted target
            // upward-facing slingshot, draw arc
            var x0 = x, y0 = y, [x1, y1] = findThirdPoint(x0, y0, parseInt(rubberbandEl.getAttribute("x1"), 10), parseInt(rubberbandEl.getAttribute("y1"), 10)), x2 = parseInt(document.getElementById("gc-ground").children[1].getAttribute("width"), 10) - 2 * parseInt(bird.getAttribute("r"), 10), y2 = yMax - parseInt(document.getElementById("gc-ground").children[1].getAttribute("height"), 10);
            // downward-facing slingshot, draw straight line
            if (y0 < parseInt(rubberbandEl.getAttribute("y1"), 10)) {
                y1 = yMax - parseInt(document.getElementById("gc-ground").children[1].getAttribute("height"), 10);
                x1 = findThirdX(x0, y0, parseInt(rubberbandEl.getAttribute("x1"), 10), parseInt(rubberbandEl.getAttribute("y1"), 10), y1);
                x2 = x1;
                y2 = y1;
            }
            drawTrajectory(trajectoryEl, x0, y0, x1, y1, x2, y2);
        }
        else {
            this.dispatchEvent(new Event("mouseup"));
        }
    });
    // let the bird fly
    svg.addEventListener("click", function (event) {
        console.log("click");
        if (!isDragging) {
            return;
        }
        event.preventDefault();
        console.log("trajectoryEl.getAttribute(\"d\")", trajectoryEl.getAttribute("d"));
        var birdPath = trajectoryEl.getAttribute("d");
        // trajectoryEl.classList.add("hidden");
        // var pathMx = rubberbandEl.getAttribute("x2");
        // var pathMy = rubberbandEl.getAttribute("y2");
        // console.log("path", path, "pathMx", pathMx, "pathMy", pathMy);
        // var SVGPathEditor = {
        //   normalize: normalizePath,
        //   reverseNormalized: reverseNormalizedPath,
        //   reverse: reverseSubPath
        // };
        var normalizedPath = window.SVGPathEditor.normalize(birdPath);
        var trajectoryRetractedPath = window.SVGPathEditor.reverse(normalizedPath);
        trajectoryEl.style.offsetPath = `path('${trajectoryRetractedPath}')`;
        var animationDuration = 4000;
        bird.setAttribute("cx", "0");
        bird.setAttribute("cy", "0");
        birdGroup.style.animationDuration = `${animationDuration}ms`;
        birdGroup.style.animationTimingFunction = "ease-out";
        birdGroup.style.animationIterationCount = "1";
        birdGroup.style.animationFillMode = "forwards";
        birdGroup.style.offsetPath = `path('${birdPath}')`;
        // cannot change 'display' attributes while animation is in progress
        setTimeout(function () {
            scaffoldContainer.classList.remove("hidden");
        }, animationDuration);
    });
    // reset activity when student clicks "Fly again?"
    scaffoldContainer.children[1].addEventListener("click", function (event) {
        bird.dispatchEvent(new Event("mouseup"));
        this.parentElement.classList.add("hidden");
    });
    // roll credits when student clicks "Roll credits"
    scaffoldContainer.children[2].addEventListener("click", function (event) {
        this.parentElement.classList.add("hidden");
        document.getElementsByClassName("credits-container")[0].classList.remove("hidden");
    });
});
function resetSpritePosition(el, x, y) {
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
function findThirdPoint(x0, y0, x1, y1, x2, y2) {
    var x2 = x2 || 620;
    var y2 = y2 || 0;
    if (x0 === x1) {
        throw new Error("Divide by zero (same input x coords)");
        return;
    }
    var x2 = x2 || ((y2 - y0) * (x1 - x0)) / (y1 - y0) + x0;
    var y2 = y2 || ((y1 - y0) / (x1 - x0)) * (x2 - x0) + y0;
    return [x2, y2];
}
function findThirdX(x0, y0, x1, y1, y2) {
    if (x0 === x1) {
        throw new Error("Divide by zero (same input x coords)");
        return;
    }
    var x2 = ((y2 - y0) * (x1 - x0)) / (y1 - y0) + x0;
    return x2;
}

},{}]},{},[1]);
