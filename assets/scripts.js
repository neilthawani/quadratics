"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    var disc = b * b - 4 * a * c;
    if (disc < 0)
        return [];
    if (fermat_1.nearlyEquals(disc, 0, 0.1))
        return [-b / (2 * a)];
    var x1 = (-b + Math.sqrt(disc)) / (2 * a);
    var x2 = (-b - Math.sqrt(disc)) / (2 * a);
    return [x1, x2];
}
// function bezier()
module.exports = {
    zeros: zeros
};
