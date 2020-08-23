// interface SVGElement {
//     x1: any,
//     x2: any,
//     y1: any,
//     y2: any,
// }
// mouse range of motion
const xMin = 0;
const xMax = 158; // gc-bird-obj:cx + 20
const yMin = 0;
const yMax = 300;
document.addEventListener("DOMContentLoaded", function (event) {
    // define query selectors, get related attributes
    var svg = document.getElementById("game-canvas");
    var ground = document.querySelector("#gc-ground rect");
    var birdGroup = document.getElementById("gc-bird"), bird = birdGroup.children[1], initialX = bird.getAttribute("cx"), initialY = bird.getAttribute("cy");
    var rubberbandEl = document.querySelector("#gc-rubberband line"), rubberbandElx2 = rubberbandEl.getAttribute("x2"), rubberbandEly2 = rubberbandEl.getAttribute("y2");
    var trajectoryEl = document.querySelector("#gc-trajectory path");
    var scaffoldContainer = document.getElementsByClassName("scaffold-container")[0];
    var creditsContainer = document.getElementsByClassName("credits-container")[0];
    var isDragging = false;
    // initialize the game
    initializeSvg(svg, ground);
    initializeBird(bird, 1000);
    var svgWidth = svg.getAttribute("width"), svgHeight = svg.getAttribute("height");
    // toggle bird/slingshot drag event on mousedown/mouseup
    bird.addEventListener("mousedown", function (event) {
        event.preventDefault();
        isDragging = true;
    });
    // catch-all handler for resetting the game state
    bird.addEventListener("mouseup", function (event) {
        event.preventDefault();
        isDragging = false;
        initializeSvg(svg, ground);
        birdGroup.style.animation = "";
        birdGroup.style.offsetPath = "";
        resetSpritePosition(bird, { "cx": initialX }, { "cy": initialY });
        resetSpritePosition(rubberbandEl, { "x2": rubberbandEl.getAttribute("x1") }, { "y2": rubberbandEl.getAttribute("y1") });
        drawTrajectory(trajectoryEl, 0, 0, 0, 0, 0, 0);
        initializeBird(bird, 1000);
        svgWidth = svg.getAttribute("width"),
            svgHeight = svg.getAttribute("height");
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
            var x0 = x, y0 = y, [x1, y1] = findThirdPoint(parseInt(svgWidth, 10), x0, y0, parseInt(rubberbandEl.getAttribute("x1"), 10), parseInt(rubberbandEl.getAttribute("y1"), 10)), x2 = parseInt(ground.getAttribute("width"), 10) - 2 * parseInt(bird.getAttribute("r"), 10), y2 = yMax - parseInt(ground.getAttribute("height"), 10);
            // downward-facing slingshot, draw straight line
            if (y0 < parseInt(rubberbandEl.getAttribute("y1"), 10)) {
                y1 = yMax - parseInt(ground.getAttribute("height"), 10);
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
        if (!isDragging) {
            return;
        }
        event.preventDefault();
        rubberbandEl.setAttribute("x2", rubberbandElx2);
        rubberbandEl.setAttribute("y2", rubberbandEly2);
        // console.log("rubberbandEl.x1", rubberbandEl.getAttribute("x1"));
        // console.log("rubberbandEl.y1", rubberbandEl.getAttribute("y1"));
        // console.log("rubberbandEl.x2", rubberbandEl.getAttribute("x2"));
        // console.log("rubberbandEl.y2", rubberbandEl.getAttribute("y2"));
        // console.log("new rubberbandEl.x1", document.querySelector("#gc-rubberband line").getAttribute("x1"));
        // console.log("new rubberbandEl.y1", document.querySelector("#gc-rubberband line").getAttribute("y1"));
        // console.log("new rubberbandEl.x2", document.querySelector("#gc-rubberband line").getAttribute("x2"));
        // console.log("new rubberbandEl.y2", document.querySelector("#gc-rubberband line").getAttribute("y2"));
        // rubberbandEl.getAttribute("x1"), rubberbandEl.getAttribute("x2")
        // rubberbandEl.getAttribute("y1"), rubberbandEl.getAttribute("y2")
        // a bug remains where the browser thinks the slingshot is retracted, but it's not
        // and the bird's position is also miscommunicated (cx != 0, cy != 0, as below)
        var birdPath = trajectoryEl.getAttribute("d"), gcBirdFlyAnimationDuration = 2000;
        // console.log("birdGroup", document.getElementById("gc-bird"));
        // console.log("bird", <SVGElement>document.getElementById("gc-bird").children[1]);
        // console.log("rubberbandEl", <SVGElement>document.querySelector("#gc-rubberband line"));
        // var testRubberbandEl = <SVGElement>document.querySelector("#gc-rubberband line");
        // console.log("testRubberbandEl", testRubberbandEl);
        // debugger;
        // console.log("testRubberbandEl.x1", testRubberbandEl.getAttribute("x1"), testRubberbandEl.x1.baseVal.value);
        // console.log("testRubberbandEl.x2", testRubberbandEl.getAttribute("x2"), testRubberbandEl.x2.baseVal.value);
        // console.log("testRubberbandEl.y1", testRubberbandEl.getAttribute("y1"), testRubberbandEl.y1.baseVal.value);
        // console.log("testRubberbandEl.y2", testRubberbandEl.getAttribute("y2"), testRubberbandEl.y2.baseVal.value);
        // var birdGroup = document.getElementById("gc-bird"),
        //     bird = <SVGElement>document.getElementById("gc-bird").children[1],
        //     initialX = bird.getAttribute("cx"),
        //     initialY = bird.getAttribute("cy");
        //
        // var rubberbandEl = <SVGElement>document.querySelector("#gc-rubberband line"),
        // bird.remove();
        // var newBird = birdGroup.appendChild(document.createElement("circle"));
        // newBird.setAttribute("id", "gc-bird-obj");
        // newBird.setAttribute("cx", initialX);
        // newBird.setAttribute("cy", initialY);
        // newBird.setAttribute("r", "12");
        // newBird.style.fill = "#cd0e66";
        // newBird.style.stroke = "#F6700F";
        // newBird.style.zIndex = "9999";
        // bird = <SVGElement><unknown>newBird;
        bird.setAttribute("cx", "0");
        bird.setAttribute("cy", "0");
        // console.log("bird.cx", bird.getAttribute("cx"));
        // console.log("bird.cy", bird.getAttribute("cy"));
        // console.log("elements");
        // console.log("birdGroup", birdGroup);
        // console.log("bird", bird);
        // console.log("rubberbandEl", rubberbandEl);
        setTimeout(function () {
            birdGroup.style.animationName = "gcBirdFly";
            birdGroup.style.animationDuration = `${gcBirdFlyAnimationDuration}ms`;
            birdGroup.style.animationTimingFunction = "ease-out";
            birdGroup.style.animationIterationCount = "1";
            birdGroup.style.animationFillMode = "forwards";
            birdGroup.style.offsetPath = `path('${birdPath}')`;
        }, 10);
        // cannot change 'display' attributes while animation is in progress
        // reveal the next step after the animation is over
        setTimeout(function () {
            scaffoldContainer.classList.remove("hidden");
        }, gcBirdFlyAnimationDuration);
    });
    // reset activity when student clicks "Fly again?"
    scaffoldContainer.children[1].addEventListener("click", function (event) {
        bird.dispatchEvent(new Event("mouseup"));
        this.parentElement.classList.add("hidden");
        creditsContainer.classList.add("hidden");
    });
    // roll credits when student clicks "Roll credits"
    scaffoldContainer.children[2].addEventListener("click", function (event) {
        creditsContainer.classList.remove("hidden");
    });
});
function initializeSvg(svg, ground) {
    var svgWidth = 1240;
    if (window.innerWidth < 1240) {
        svgWidth = window.innerWidth - 200;
    }
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("viewBox", `0 0 ${svgWidth} 300`);
    ground.setAttribute("width", svgWidth);
}
function initializeBird(bird, duration) {
    bird.style.animationName = "initializeBird";
    bird.style.animationDuration = `${duration}ms`;
    bird.style.animationTimingFunction = "ease-in-out";
    bird.style.animationIterationCount = "1";
    bird.style.animationFillMode = "forwards";
    setTimeout(function () {
        bird.style.animationName = "";
        bird.style.animationDuration = "";
        bird.style.animationTimingFunction = "";
        bird.style.animationIterationCount = "";
        bird.style.animationFillMode = "";
    }, duration);
}
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
function findThirdPoint(svgWidth, x0, y0, x1, y1, x2, y2) {
    var x2 = x2 || svgWidth / 2;
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
function hideCredits() {
    document.getElementsByClassName("credits-container")[0].classList.remove("hidden");
}
