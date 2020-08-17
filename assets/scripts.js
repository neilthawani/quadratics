"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xMin = 0;
var xMax = 90;
var yMin = 0;
var yMax = 300;
document.addEventListener("DOMContentLoaded", function (event) {
    var birdGroup = document.getElementById("gc-bird"), bird = birdGroup.children[1], isDragging = false;
    // debugger;
    var initialX = bird.getAttribute("cx"), initialY = bird.getAttribute("cy");
    // bird.addEventListener("click", function(event) {
    //     console.log("birb");
    // });
    bird.addEventListener("mousedown", function (event) {
        event.preventDefault();
        console.log("mousedown");
        // debugger;
        isDragging = isDragging ? false : true;
    });
    bird.addEventListener("mousemove", function (event) {
        if (!isDragging) {
            return;
        }
        event.preventDefault();
        console.log("mousemove");
        // debugger;
        var x = event.offsetX, y = event.offsetY;
        console.log(x, y);
        if (x > xMin && x < xMax) {
            this.setAttribute("cx", x.toString());
        }
        if (y > yMin && y < yMax) {
            this.setAttribute("cy", y.toString());
        }
    });
    bird.addEventListener("mouseup", function (event) {
        console.log("mouseup");
        event.preventDefault();
        this.setAttribute("cx", initialX);
        this.setAttribute("cy", initialY);
        isDragging = false;
    });
});
function cutCurve() {
    console.log("cutCurve");
}
var fermat_1 = require("@mathigon/fermat");
// import * as Functions from './functions';
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
// content/quadratics/function.ts
function zeros(a, b, c) {
    console.log("here");
    var disc = b * b - 4 * a * c;
    if (disc < 0)
        return [];
    if (fermat_1.nearlyEquals(disc, 0, 0.1))
        return [-b / (2 * a)];
    var x1 = (-b + Math.sqrt(disc)) / (2 * a);
    var x2 = (-b - Math.sqrt(disc)) / (2 * a);
    return [x1, x2];
}
// var Raphael = require("raphael");
// var R = Raphael(10, 10, 400, 400);
//
// var l = R.path("M100 200L200 200L300 200");
// l.attr({
//     stroke: 'red',
//     'stroke-width': 4
// });
//
// var c = R.circle(200, 200, 10).attr({
//     fill: 'white',
//     stroke: 'red',
//     'stroke-width': 4
// });
//
// function move(dx, dy) {
//     var x = 200 + dx, y = 200 + dy;
//     this.attr({cx: x, cy: y});
//     l.attr({path: "M100 200L"+x+" "+y+"L300 200"});
// }
// function start() {
//     c.stop();
//     l.stop();
// }
// function end() {
//     this.animate({cx: 200, cy: 200}, 2000, "elastic");
//     l.animate({path: "M100 200L200 200L300 200"},
//              2000, "elastic");
// }
// c.drag(move, start, end);
//
// // Example by http://stackoverflow.com/users/613198/rsp
// // for http://stackoverflow.com/questions/5335728
