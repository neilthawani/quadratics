var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// mouse range of motion
const xMin = -12;
const xMax = 150; // gc-bird-obj:cx + 12
const yMin = -12;
const yMax = 300 + 12; // svgHeight
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
    bird.addEventListener("click", function (event) {
        console.log("no rly");
    });
    // catch-all handler for resetting the game state
    bird.addEventListener("mouseup", function (event) {
        console.log('orly');
        event.preventDefault();
        if (!scaffoldContainer.classList.contains("hidden")) {
            return;
        }
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
            var x0 = x, y0 = y, slingshotLength = Math.sqrt(Math.pow((initialX - x), 2) + Math.pow((initialY - y), 2)), calculatedX2 = (slingshotLength / initialX) * svgWidth, x2 = calculatedX2 < svgWidth ? calculatedX2 : svgWidth, y2 = yMax - parseInt(ground.getAttribute("height"), 10), [x1, y1] = findThirdPoint(x2, x0, y0, parseInt(rubberbandEl.getAttribute("x1"), 10), parseInt(rubberbandEl.getAttribute("y1"), 10));
            // downward-facing slingshot, draw straight line
            if (y0 < parseInt(rubberbandEl.getAttribute("y1"), 10)) {
                y1 = yMax - parseInt(ground.getAttribute("height"), 10);
                x1 = findThirdX(x0, y0, parseInt(rubberbandEl.getAttribute("x1"), 10), parseInt(rubberbandEl.getAttribute("y1"), 10), y1);
                x2 = x1;
                y2 = y1;
            }
            if (slingshotLength > 40) {
                drawTrajectory(trajectoryEl, x0, y0, x1, y1, x2, y2);
            }
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
        var birdPath = trajectoryEl.getAttribute("d"), gcBirdFlyAnimationDuration = trajectoryEl.getTotalLength();
        function snapSlingshot() {
            return __awaiter(this, void 0, void 0, function* () {
                var snappingSlingshot = rubberbandEl.parentElement.appendChild(document.createElement("line"));
                snappingSlingshot.setAttribute("d", `M${rubberbandEl.getAttribute("x1")},${rubberbandEl.getAttribute("y1")} L${rubberbandElx2},${rubberbandEly2}`);
                snappingSlingshot.style.strokeDasharray = "200";
                snappingSlingshot.style.strokeDashoffset = "0";
                snappingSlingshot.style.animation = "retractSlingshot 1s linear forwards";
                // debugger;
                // Developer's Note:
                // It's pretty easy to see the bug here.
                // Uncomment the `debugger`, run `npm run build` in Terminal, and have `node server.js` running.
                // In your browser's console, print 'rubberbandEl' and then print 'snappingSlingshot.'
                // 'rubberbandEl' (printed, and visually) contains the pulled slingshot values
                // 'snappingSlingshot' contains x1===x2 and y1===y2
                // After this is resolved, add the following to styles.css near the rubberbandEl styling:
                // @keyframes retractSlingshot {
                //   to {
                //     stroke-dashoffset: 200;
                //   }
                // }
            });
        }
        function prepareToFly() {
            return __awaiter(this, void 0, void 0, function* () {
                // send slingshot back to original position
                rubberbandEl.setAttribute("x2", rubberbandElx2);
                rubberbandEl.setAttribute("y2", rubberbandEly2);
                // set cx, cy to 0 so the bird can follow the trajectory path relative to the svg
                bird.setAttribute("cx", "0");
                bird.setAttribute("cy", "0");
            });
        }
        var fly = function () {
            birdGroup.style.animationName = "gcBirdFly";
            birdGroup.style.animationDuration = `${gcBirdFlyAnimationDuration}ms`;
            birdGroup.style.animationTimingFunction = "ease-out";
            birdGroup.style.animationIterationCount = "1";
            birdGroup.style.animationFillMode = "forwards";
            birdGroup.style.offsetPath = `path('${birdPath}')`;
        };
        snapSlingshot()
            .then(prepareToFly)
            .then(function () {
            fly();
        }).then(function () {
            // cannot change 'display' attributes while animation is in progress
            // reveal the next step after the animation is over
            setTimeout(function () {
                scaffoldContainer.classList.remove("hidden");
            }, gcBirdFlyAnimationDuration);
        });
    });
    // reset activity when student clicks "Fly again?"
    scaffoldContainer.children[1].addEventListener("click", function (event) {
        this.parentElement.classList.add("hidden");
        creditsContainer.classList.add("hidden");
        bird.dispatchEvent(new Event("mouseup"));
    });
    // roll credits when student clicks "Roll credits"
    scaffoldContainer.children[2].addEventListener("click", function (event) {
        creditsContainer.classList.remove("hidden");
    });
});
function initializeSvg(svg, ground) {
    var svgWidth = 1240;
    if (window.outerWidth < 1240) {
        svgWidth = window.outerWidth - 16;
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
function findThirdPoint(predictedWidth, x0, y0, x1, y1, x2, y2) {
    var x2 = x2 || predictedWidth / 2;
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
