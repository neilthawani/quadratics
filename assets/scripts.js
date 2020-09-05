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
const birdRadius = 12; // circle:r
const xMin = -birdRadius / 2;
const xMax = 138 + birdRadius / 2; // gc-bird-obj:cx + 6
const yMin = -birdRadius / 2;
const yMax = 300 + birdRadius / 2; // svgHeight + 6
document.addEventListener("DOMContentLoaded", function (event) {
    // define query selectors, get related attributes
    var svg = document.getElementById("game-canvas");
    var ground = document.querySelector("#gc-ground rect");
    var birdGroup = document.getElementById("gc-bird"), bird = birdGroup.children[1], initialX = parseInt(bird.getAttribute("cx"), 10), initialY = parseInt(bird.getAttribute("cy"), 10);
    var rubberbandEl = document.querySelector("#gc-rubberband line"), rubberbandInitialX = parseInt(rubberbandEl.getAttribute("x1"), 10), rubberbandInitialY = parseInt(rubberbandEl.getAttribute("y2"), 10);
    var trajectoryEl = document.querySelector("#gc-trajectory path");
    var scaffoldContainer = document.getElementsByClassName("scaffold-container")[0];
    var creditsContainer = document.getElementsByClassName("credits-container")[0];
    var isDragging = false;
    // initialize the game
    initializeSvg(svg, ground);
    initializeBird(bird, 1000);
    var svgWidth = parseInt(svg.getAttribute("width"), 10), svgHeight = parseInt(svg.getAttribute("height"), 10);
    // toggle bird/slingshot drag event on mousedown/mouseup
    bird.addEventListener("mousedown", function (event) {
        isDragging = true;
    });
    // main slingshot dragging logic
    bird.addEventListener("mousemove", function (event) {
        if (!isDragging) {
            return;
        }
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
            // (x1, y1): bezier trajectory coords, based on slingshot angle
            // (x2, y2): predicted target
            // upward-facing slingshot, draw arc
            var x0 = x, y0 = y, slingshotXLength = Math.abs(rubberbandInitialX - x), slingshotYLength = Math.abs(rubberbandInitialY - y), x2 = (rubberbandInitialX - slingshotXLength) + (slingshotXLength / rubberbandInitialX) * svgWidth, y2 = yMax - parseInt(ground.getAttribute("height"), 10), x1 = (rubberbandInitialX - slingshotXLength) + (x2 - x0) / 2, y1 = (-svgHeight + birdRadius) * (slingshotYLength / (300 - rubberbandInitialY));
            // downward-facing slingshot, draw straight line
            if (y0 < rubberbandInitialY) {
                y1 = yMax - parseInt(ground.getAttribute("height"), 10);
                x1 = ((y1 - y0) * (rubberbandInitialX - x0)) / (rubberbandInitialY - y0) + x0,
                    x2 = x1;
                y2 = y1;
            }
            drawTrajectory(trajectoryEl, x0, y0, x1, y1, x2, y2);
        }
        else {
            resetGameState();
        }
    });
    // let the bird fly
    svg.addEventListener("click", function (event) {
        var rubberbandInitialX = parseInt(rubberbandEl.getAttribute("x1"), 10), rubberbandInitialY = parseInt(rubberbandEl.getAttribute("y1"), 10), rubberbandMouseX = parseInt(rubberbandEl.getAttribute("x2"), 10), rubberbandMouseY = parseInt(rubberbandEl.getAttribute("y2"), 10);
        var slingshotPulled = (rubberbandInitialX !== rubberbandMouseX) &&
            (rubberbandInitialY !== rubberbandMouseY), gcBirdFlyAnimationDuration = trajectoryEl.getTotalLength();
        if (!isDragging || !slingshotPulled || !gcBirdFlyAnimationDuration) {
            return;
        }
        var fly = function () {
            var slingshotYLength = Math.abs(rubberbandInitialY - rubberbandMouseY);
            var trajectoryPath = trajectoryEl.getAttribute("d");
            var pathLength = trajectoryEl.getTotalLength();
            var pointArray = [];
            for (var i = 0; i < Math.ceil(pathLength); i++) {
                var coords = trajectoryEl.getPointAtLength(i);
                pointArray.push({ x: coords.x, y: coords.y });
            }
            var finalCoords = trajectoryEl.getPointAtLength(pathLength);
            pointArray.push({ x: finalCoords.x, y: finalCoords.y });
            var birdPathArray = [{
                    x: pointArray[0].x,
                    y: pointArray[0].y
                }];
            var i = 0;
            var j = 0;
            for (var index = 0; index < pointArray.length; index++) {
                var nextCoordsIndex = 0;
                if (index < pointArray.length / 2) {
                    // console.log("lt");
                    nextCoordsIndex = pointArray.findIndex((item) => {
                        // console.log("item.y", item.y, "((rubberbandMouseY - slingshotYLength) - (10 * i++))", ((rubberbandMouseY - slingshotYLength) - (10 * i)));
                        // return item.y <= birdPathArray[length - 1].y - ((rubberbandMouseY - slingshotYLength) - (10 * i));
                        return item.y <= birdPathArray[birdPathArray.length - 1].y - (10 * i);
                    });
                    // console.log("first half, nextCoords", nextCoordsIndex, pointArray[nextCoordsIndex]);
                    if (nextCoordsIndex === -1) {
                        // console.log("birdPathArray", birdPathArray);
                        continue;
                    }
                    i++;
                    index = nextCoordsIndex + 1;
                    // console.log("index i", i);
                }
                else if (index > pointArray.length / 2) {
                    // console.log("gt");
                    nextCoordsIndex = pointArray.findIndex((item) => {
                        // return item.y >= ((rubberbandMouseY - slingshotYLength) + (10 * j));
                        return item.y >= birdPathArray[birdPathArray.length - 1].y + (10 * j);
                    });
                    console.log("second half, nextCoords", nextCoordsIndex);
                    console.log("pointArray[nextCoordsIndex].y", pointArray[nextCoordsIndex].y, "pointArray[pointArray.length - 1].y", pointArray[pointArray.length - 1].y);
                    if (pointArray[nextCoordsIndex].y === pointArray[pointArray.length - 1].y) {
                        break;
                    }
                    j++;
                    index = nextCoordsIndex + 1;
                    // console.log("index j", j);
                }
                // console.log("index", index);
                // console.log("nextCoords", nextCoords);
                var pointArrayIndex = pointArray.indexOf(nextCoords);
                // console.log("pointArrayIndex", pointArrayIndex);
                var nextCoords = pointArray[nextCoordsIndex];
                birdPathArray.push({
                    x: nextCoords.x,
                    y: nextCoords.y
                });
            }
            // debugger;
            var birdPath = `M${pointArray[0].x},${pointArray[0].y}`;
            birdPath = birdPath.concat(` L${nextCoords.x},${nextCoords.y}`);
            birdGroup.style.animationName = "gcBirdFly";
            birdGroup.style.animationDuration = `${gcBirdFlyAnimationDuration}ms`;
            birdGroup.style.animationTimingFunction = "ease-out";
            birdGroup.style.animationIterationCount = "1";
            birdGroup.style.animationFillMode = "forwards";
            birdGroup.style.offsetPath = `path('${birdPath}')`;
        };
        prepareToFly()
            .then(fly)
            .then(function () {
            // cannot change 'display' attributes while animation is in progress
            // reveal the next step after the animation is over
            setTimeout(function () {
                scaffoldContainer.classList.remove("hidden");
            }, gcBirdFlyAnimationDuration);
        });
    });
    function prepareToFly() {
        return __awaiter(this, void 0, void 0, function* () {
            // send slingshot back to original position
            rubberbandEl.setAttribute("x2", rubberbandInitialX.toString());
            rubberbandEl.setAttribute("y2", rubberbandInitialY.toString());
            // set cx, cy to 0 so the bird can follow the trajectory path relative to the svg
            bird.setAttribute("cx", "0");
            bird.setAttribute("cy", "0");
        });
    }
    // race condition catch - sometimes cx/cy aren't updated in time for the animation
    // this prevents that bug from occurring
    svg.addEventListener("animationstart", function (event) {
        if (event.animationName !== "gcBirdFly") {
            return;
        }
        var birdObjHtml = event.path[0].outerHTML, circleTag = birdObjHtml.substring(birdObjHtml.indexOf("<circle>"), birdObjHtml.indexOf("</circle>")), cxIs0 = circleTag.includes('cx="0"'), cyIs0 = circleTag.includes('cx="0"');
        if (!(cxIs0 && cyIs0)) {
            prepareToFly();
            birdGroup.style.offsetPath = `path('${trajectoryEl.getAttribute("d")}')`;
        }
    });
    // reset activity when student clicks "Fly again?"
    scaffoldContainer.children[1].addEventListener("click", function (event) {
        this.parentElement.classList.add("hidden");
        creditsContainer.classList.add("hidden");
        resetGameState();
    });
    // roll credits when student clicks "Roll credits"
    scaffoldContainer.children[2].addEventListener("click", function (event) {
        creditsContainer.classList.remove("hidden");
    });
    function resetGameState() {
        if (!scaffoldContainer.classList.contains("hidden")) {
            return;
        }
        isDragging = false;
        initializeSvg(svg, ground);
        birdGroup.style.animation = "";
        birdGroup.style.offsetPath = "";
        resetSpritePosition(bird, { "cx": initialX }, { "cy": initialY });
        resetSpritePosition(rubberbandEl, { "x2": rubberbandInitialX }, { "y2": rubberbandInitialY });
        drawTrajectory(trajectoryEl, 0, 0, 0, 0, 0, 0);
        initializeBird(bird, 1000);
        svgWidth = parseInt(svg.getAttribute("width"), 10),
            svgHeight = parseInt(svg.getAttribute("height"), 10);
    }
});
function initializeSvg(svg, ground) {
    var svgWidth = 1240;
    if (window.outerWidth < 1240) {
        svgWidth = window.outerWidth - 16; // body { -webkit-margin: 8px; }
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
