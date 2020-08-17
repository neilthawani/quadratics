(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xMin = 0;
var xMax = 158; // cx + 20
var yMin = 0;
var yMax = 300;
document.addEventListener("DOMContentLoaded", function (event) {
    var svg = document.getElementById("game-canvas");
    var birdGroup = document.getElementById("gc-bird"), bird = birdGroup.children[1], isDragging = false;
    var rubberbandEl = document.querySelector("#gc-rubberband line");
    var initialX = bird.getAttribute("cx"), initialY = bird.getAttribute("cy");
    svg.addEventListener("click", function (event) {
        resetSpritePositions(bird, rubberbandEl, initialX, initialY);
    });
    bird.addEventListener("mousedown", function (event) {
        // console.log("mousedown");
        event.preventDefault();
        isDragging = isDragging ? false : true;
    });
    bird.addEventListener("mousemove", function (event) {
        // console.log("mousemove");
        if (!isDragging) {
            return;
        }
        event.preventDefault();
        var x = event.offsetX, y = event.offsetY;
        // console.log(x, y);
        // debugger;
        if (x > xMin && x < xMax) {
            this.setAttribute("cx", x.toString());
            // debugger;
            rubberbandEl.setAttribute("x2", x.toString());
        }
        else if (x < xMin || x > xMax) {
            resetSpritePositions(this, rubberbandEl, initialX, initialY);
        }
        if (y > yMin && y < yMax) {
            this.setAttribute("cy", y.toString());
            rubberbandEl.setAttribute("y2", y.toString());
        }
        else if (y < yMin || y > yMax) {
            resetSpritePositions(this, rubberbandEl, initialX, initialY);
        }
    });
    bird.addEventListener("mouseup", function (event) {
        // console.log("mouseup");
        event.preventDefault();
        resetSpritePositions(this, rubberbandEl, initialX, initialY);
        isDragging = false;
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

},{"@mathigon/fermat":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// =============================================================================
// Core.ts | Utility Functions
// (c) Mathigon
// =============================================================================
/** Creates a random UID string of a given length. */
function uid(n = 10) {
    return Math.random().toString(36).substr(2, n);
}
/** Executes a function or returns the default value. */
function run(val, ...args) {
    if (val instanceof Function)
        return val(...args);
    return val;
}
/** Checks if x is strictly equal to any one of the following arguments. */
function isOneOf(x, ...values) {
    return values.includes(x);
}
/** Applies default keys to an object. */
function applyDefaults(obj, defaults) {
    for (const key of Object.keys(defaults)) {
        if (!Object.prototype.hasOwnProperty.call(obj, key))
            obj[key] = defaults[key];
    }
    return obj;
}
const defaultMerge = ((a, b) => a.concat(b));
/** Deep extends obj1 with obj2, using a custom array merge function. */
function deepExtend(obj1, obj2, arrayMergeFn = defaultMerge) {
    for (const i of Object.keys(obj2)) {
        if (i in obj1 && Array.isArray(obj1[i]) && Array.isArray(obj2[i])) {
            obj1[i] = arrayMergeFn(obj1[i], obj2[i]);
        }
        else if (i in obj1 && obj1[i] instanceof Object &&
            obj2[i] instanceof Object) {
            deepExtend(obj1[i], obj2[i]);
        }
        else {
            obj1[i] = obj2[i];
        }
    }
}
/** Replacement for setTimeout() that is synchronous for time 0. */
function delay(fn, t = 0) {
    if (t) {
        return +setTimeout(fn, t);
    }
    else {
        fn();
        return 0;
    }
}
/** Returns a promise that resolves after a fixed time. */
function wait(t) {
    return new Promise(resolve => setTimeout(resolve, t));
}
/** Creates a new promise together with functions to resolve or reject. */
function defer() {
    let resolve = () => undefined;
    let reject = () => undefined;
    const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });
    // This prevents exceptions when promises without .catch are rejected:
    promise.catch((error) => error);
    return { promise, resolve, reject };
}
/**
 * Function wrapper that modifies a function to cache its return values. This
 * is useful for performance intensive functions which are called repeatedly
 * with the same arguments. However it can reduce performance for functions
 * which are always called with different arguments. Note that argument
 * comparison doesn't not work with Objects or nested arrays.
 */
function cache(fn) {
    const cached = new Map();
    return function (...args) {
        const argString = args.join('--');
        if (!cached.has(argString))
            cached.set(argString, fn(...args));
        return cached.get(argString);
    };
}
/**
 * Function wrapper that prevents a function from being executed more than once
 * every t ms. This is particularly useful for optimising callbacks for
 * continues events like scroll, resize or slider move. Setting `forceDelay`
 * to `true` means that even the first function call is after the minimum
 * timout, rather than instantly.
 */
function throttle(fn, t = 0, forceDelay = false) {
    let delay = false;
    let repeat = false;
    return (...args) => {
        if (delay) {
            repeat = true;
        }
        else {
            if (forceDelay) {
                repeat = true;
            }
            else {
                fn(...args);
            }
            delay = true;
            setTimeout(() => {
                if (repeat)
                    fn(...args);
                delay = repeat = false;
            }, t);
        }
    };
}
/** Safe wrapper for JSON.parse. */
function safeToJSON(str, fallback = {}) {
    if (!str)
        return fallback;
    try {
        return JSON.parse(str) || fallback;
    }
    catch (e) {
        return fallback;
    }
}

// =============================================================================
// Core.ts | Array Functions
// (c) Mathigon
// =============================================================================
/** Creates an array of size `n`, containing `value` at every entry. */
function repeat(value, n) {
    return new Array(n).fill(value);
}
/** Creates a matrix of size `x` by `y`, containing `value` at every entry. */
function repeat2D(value, x, y) {
    const result = [];
    for (let i = 0; i < x; ++i) {
        result.push(repeat(value, y));
    }
    return result;
}
/** Creates an array of size `n`, with the result of `fn(i)` at position i. */
function tabulate(fn, n) {
    const result = [];
    for (let i = 0; i < n; ++i) {
        result.push(fn(i));
    }
    return result;
}
/**
 * Creates a matrix of size `x` by `y`, with the result of `fn(i, j)` at
 * position (i, j.
 */
function tabulate2D(fn, x, y) {
    const result = [];
    for (let i = 0; i < x; ++i) {
        const row = [];
        for (let j = 0; j < y; ++j) {
            row.push(fn(i, j));
        }
        result.push(row);
    }
    return result;
}
/** Creates an array of numbers from 0 to a, or from a to b. */
function list(a, b, step = 1) {
    const arr = [];
    if (b === undefined && a >= 0) {
        for (let i = 0; i < a; i += step)
            arr.push(i);
    }
    else if (b === undefined) {
        for (let i = 0; i > a; i -= step)
            arr.push(i);
    }
    else if (a <= b) {
        for (let i = a; i <= b; i += step)
            arr.push(i);
    }
    else {
        for (let i = a; i >= b; i -= step)
            arr.push(i);
    }
    return arr;
}
/** Returns the last item in an array, or the ith item from the end. */
function last(array, i = 0) {
    return array[array.length - 1 - i];
}
/** Finds the sum of all elements in an numeric array. */
function total(array) {
    return array.reduce((t, v) => t + v, 0);
}
/** Sorts an array by the return value when evaluating a given function. */
function sortBy(array, fn, reverse = false) {
    return array.slice(0).sort((a, b) => {
        const x = fn(a);
        const y = fn(b);
        return x < y ? (reverse ? 1 : -1) : x > y ? (reverse ? -1 : 1) : 0;
    });
}
/**
 * Returns a function that can be called repeatedly, and returns items of the
 * array, continuously looping
 */
function loop(array) {
    let i = 0;
    return () => array[(i++) % array.length];
}
/** Filters all duplicate elements from an array. */
function unique(array) {
    return array.filter((a, i) => array.indexOf(a) === i);
}
/** Flattens a nested array into a single list. */
function flatten(array) {
    return array.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
}
/** Creates a cumulative array by adding its elements. */
function cumulative(array) {
    let total = 0;
    return array.map(a => total += a);
}
/** Breaks an array into chunks of size at most n. */
function chunk(array, n) {
    const chunks = [];
    for (let i = 0; i < array.length; i += n) {
        chunks.push(array.slice(i, i + n));
    }
    return chunks;
}
/** Rotates the elements of an array by offset. */
function rotate(array, offset = 1) {
    const n = array.length;
    offset = ((offset % n) + n) % n; // Offset could initially be negative...
    const start = array.slice(0, offset);
    const end = array.slice(offset);
    return end.concat(start);
}
/** Returns all elements that are in both a1 and a2.  */
function intersect(a1, a2) {
    return a1.filter(x => a2.includes(x));
}
/** Returns all elements that are only in one of a1 and a2. */
function difference(a1, a2) {
    const notIn1 = a2.filter(a => !a1.includes(a));
    const notIn2 = a1.filter(a => !a2.includes(a));
    return [...notIn1, ...notIn2];
}
/** Join multiple Arrays */
function join(...arrays) {
    return arrays.reduce((a, x) => a.concat(x), []);
}
/** Converts an array to a linked list data structure. */
function toLinkedList(array) {
    const result = array.map(a => ({ val: a, next: undefined }));
    const n = result.length;
    for (let i = 0; i < n - 1; ++i) {
        result[i].next = result[i + 1];
    }
    result[n - 1].next = result[0];
    return result;
}

// =============================================================================
/** Splits a string into space separated words. */
function words(str, divider = /\s+/) {
    if (!str)
        return [];
    return str.trim().split(divider);
}
/** Converts a string to title case. */
function toTitleCase(str) {
    return str.replace(/\S+/g, a => a.charAt(0).toUpperCase() + a.slice(1));
}
/** Converts a string to camel case. */
function toCamelCase(str) {
    return str.toLowerCase().replace(/^-/, '')
        .replace(/-(.)/g, (_, g) => g.toUpperCase());
}
/** Checks if a string is a palindrome. */
function isPalindrome(str) {
    return str === str.split('').reverse().join('');
}
/**
 * Determines the Levenshtein distance between two strings. If ignoreTrailing
 * is true, we will ignore any additional, trailing characters in s2.
 */
function stringDistance(s1, s2, ignoreTrailing = false) {
    const arr = repeat2D(0, s1.length + 1, s2.length + 1);
    for (let i = 0; i <= s1.length; i++)
        arr[i][0] = i;
    for (let i = 0; i <= s2.length; i++)
        arr[0][i] = i;
    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++) {
            arr[i][j] = Math.min(arr[i - 1][j - 1] + (s1.charAt(i - 1) === s2.charAt(j - 1) ? 0 : 1), arr[i - 1][j] + 1, arr[i][j - 1] + 1);
        }
    }
    if (ignoreTrailing)
        return Math.min(...arr[s1.length]);
    return arr[s1.length][s2.length];
}
/** Tries to auto-correct a word from a dictionary. */
function autoCorrect(word, dict) {
    const maxDistance = word.length / 2;
    const distances = dict.map(w => ({ w, d: stringDistance(word, w) }))
        .filter(({ d }) => d < maxDistance);
    const bestMatch = sortBy(distances, d => d.d)[0];
    return bestMatch ? bestMatch.w : undefined;
}

// =============================================================================
/** Base class for event management. */
class EventTarget {
    constructor() {
        this.events = new Map();
    }
    /** Adds an event listener for one or more events. */
    on(events, fn) {
        for (const e of words(events)) {
            if (!this.events.has(e))
                this.events.set(e, []);
            this.events.get(e).push(fn);
        }
    }
    /** Adds a one-time event listener to one or more events. */
    one(events, fn) {
        const callback = (e) => {
            this.off(events, callback);
            fn(e);
        };
        this.on(events, callback);
    }
    /** Removes an event listener from one or more events. */
    off(events, fn) {
        for (const e of words(events)) {
            if (this.events.has(e)) {
                this.events.set(e, this.events.get(e).filter(x => x !== fn));
            }
        }
    }
    /** Triggers one or more events, and executes all bound event listeners. */
    trigger(events, arg) {
        for (const e of words(events)) {
            if (this.events.has(e)) {
                for (const callback of this.events.get(e)) {
                    callback(arg);
                }
            }
        }
    }
}

// =============================================================================
const shortHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const longHexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
const rgbaRegex = /rgba?\(([0-9,]+), ?([0-9,]+), ?([0-9,]+)(, ?([0-9,]+))?\)/;
const rainbow = ['#22ab24', '#0f82f2', '#cd0e66', '#fd8c00'];
function pad2(str) {
    return str.length === 1 ? '0' + str : str;
}
/** Gets the colour of a multi-step gradient at a given percentage p */
function getColourAt(gradient, p) {
    if (p <= 0)
        return Color.from(gradient[0]);
    if (p >= 1)
        return Color.from(last(gradient));
    const r = Math.floor(p * (gradient.length - 1));
    const q = p * (gradient.length - 1) - r;
    return Color.mix(gradient[r + 1], gradient[r], q);
}
/** Colour generation and conversion class. */
class Color {
    constructor(r, g, b, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    /** Converts this colour to a hex string. */
    get hex() {
        const c = [this.r, this.g, this.b].map(x => pad2(Math.round(x).toString(16)));
        return '#' + c.join('');
    }
    /** Converts this colour to an rgba string. */
    get rgb() {
        const c = [this.r, this.g, this.b].map(x => Math.round(x)).join(',');
        return 'rgba(' + c + ',' + this.a + ')';
    }
    /** Converts this colour to an hsl string. */
    get hsl() {
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h;
        let s;
        const l = (max + min) / 2;
        if (max === min) {
            h = s = 0; // achromatic
        }
        else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                default: // b
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return 'hsl(' + [h, s, l].join(',') + ')';
    }
    toString() {
        return this.rgb;
    }
    /** Creates a copy of this colour. */
    copy() {
        return new Color(this.r, this.g, this.b, this.a);
    }
    // ---------------------------------------------------------------------------
    static from(color) {
        if (typeof color !== 'string')
            return color;
        return color.startsWith('#') ? Color.fromHex(color) : Color.fromRgb(color);
    }
    static fromRgb(color) {
        const match = color.match(rgbaRegex);
        if (!match)
            return new Color(0, 0, 0);
        const a = match[4] ? (+match[5] || 0) : 1;
        return new Color(+match[1], +match[2], +match[3], a);
    }
    /** Creates a Colour instance from a hex string. */
    static fromHex(hex) {
        hex = hex.replace(shortHexRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        const rgbParts = longHexRegex.exec(hex);
        if (!rgbParts)
            return new Color(0, 0, 0);
        return new Color(parseInt(rgbParts[1], 16), parseInt(rgbParts[2], 16), parseInt(rgbParts[3], 16));
    }
    /** Generates a rainbow gradient with a given number of steps. */
    static rainbow(steps) {
        return tabulate(x => getColourAt(rainbow, x / (steps - 1)), steps);
    }
    /** Generates a rainbow gradient with a given number of steps. */
    static gradient(from, to, steps) {
        return tabulate(x => getColourAt([from, to], x / (steps - 1)), steps);
    }
    /** Linearly interpolates two colours or hex strings. */
    static mix(c1, c2, p = 0.5) {
        c1 = Color.from(c1);
        c2 = Color.from(c2);
        return new Color(p * c1.r + (1 - p) * c2.r, p * c1.g + (1 - p) * c2.g, p * c1.b + (1 - p) * c2.b, p * c1.a + (1 - p) * c2.a);
    }
}

// =============================================================================
// Core.ts | Cache Functions
// (c) Mathigon
// =============================================================================
/** A basic LRU cache implementation. */
class Cache {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.store = new Map();
        this.list = [];
    }
    has(a) {
        return this.store.has(a);
    }
    get(a) {
        const item = this.store.get(a);
        if (item)
            this.touch(a, item);
        return item ? item.val : undefined;
    }
    set(a, b) {
        // Update an existing item, if it already exists.
        const item = this.store.get(a);
        if (item) {
            item.val = b;
            this.touch(a, item);
            return;
        }
        // Add a new item.
        this.list.push(a);
        this.store.set(a, { val: b, i: this.list.length });
        // Remove the last item if necessary.
        if (this.list.length > this.maxSize) {
            const a1 = this.list.shift();
            this.store.delete(a1);
        }
    }
    getOrSet(a, callback) {
        const cached = this.get(a);
        if (cached)
            return cached;
        const calculated = callback(a);
        this.set(a, calculated);
        return calculated;
    }
    touch(a, item) {
        this.list.splice(item.i, 1).push(a);
        item.i = this.list.length;
    }
}

exports.Cache = Cache;
exports.Color = Color;
exports.EventTarget = EventTarget;
exports.applyDefaults = applyDefaults;
exports.autoCorrect = autoCorrect;
exports.cache = cache;
exports.chunk = chunk;
exports.cumulative = cumulative;
exports.deepExtend = deepExtend;
exports.defer = defer;
exports.delay = delay;
exports.difference = difference;
exports.flatten = flatten;
exports.intersect = intersect;
exports.isOneOf = isOneOf;
exports.isPalindrome = isPalindrome;
exports.join = join;
exports.last = last;
exports.list = list;
exports.loop = loop;
exports.repeat = repeat;
exports.repeat2D = repeat2D;
exports.rotate = rotate;
exports.run = run;
exports.safeToJSON = safeToJSON;
exports.sortBy = sortBy;
exports.stringDistance = stringDistance;
exports.tabulate = tabulate;
exports.tabulate2D = tabulate2D;
exports.throttle = throttle;
exports.toCamelCase = toCamelCase;
exports.toLinkedList = toLinkedList;
exports.toTitleCase = toTitleCase;
exports.total = total;
exports.uid = uid;
exports.unique = unique;
exports.wait = wait;
exports.words = words;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@mathigon/core');

// ============================================================================
// Fermat.js | Utility Functions
// (c) Mathigon
// ============================================================================
const PRECISION = 0.000001;
// -----------------------------------------------------------------------------
// Checks and Comparisons
/** Checks if two numbers are nearly equals. */
function nearlyEquals(x, y, t = PRECISION) {
    if (isNaN(x) || isNaN(y))
        return false;
    return Math.abs(x - y) < t;
}
/* Checks if an object is an integer. */
function isInteger(x, t = PRECISION) {
    return nearlyEquals(x % 1, 0, t);
}
/** Checks if a number x is between two numbers a and b. */
function isBetween(x, a, b, t = PRECISION) {
    if (a > b)
        [a, b] = [b, a];
    return x > a + t && x < b - t;
}
/** Returns the sign of a number x, as +1, 0 or –1. */
function sign(x, t = PRECISION) {
    return nearlyEquals(x, 0, t) ? 0 : (x > 0 ? 1 : -1);
}
// -----------------------------------------------------------------------------
// String Conversion
const NUM_REGEX = /(\d+)(\d{3})/;
const POWER_SUFFIX = ['', 'k', 'm', 'b', 't', 'q'];
function addThousandSeparators(x) {
    let [n, dec] = x.split('.');
    while (NUM_REGEX.test(n)) {
        n = n.replace(NUM_REGEX, '$1,$2');
    }
    return n + (dec ? '.' + dec : '');
}
function addPowerSuffix(n, places = 6) {
    if (!places)
        return '' + n;
    // Trim short numbers to the appropriate number of decimal places.
    const d = ('' + Math.abs(Math.floor(n))).length;
    const m = n < 0 ? 1 : 0;
    if (d <= places - m)
        return '' + round(n, places - d - m - 1);
    // Append a power suffix to longer numbers.
    const x = Math.floor(Math.log10(Math.abs(n)) / 3);
    return (round(n / Math.pow(10, 3 * x), places - ((d % 3) || 3) - m - 1)) +
        POWER_SUFFIX[x];
}
/**
 * Converts a number to a clean string, by rounding, adding power suffixes, and
 * adding thousands separators. `places` is the number of digits to show in the
 * result.
 */
function numberFormat(n, places = 0, seperators = true) {
    const str = addPowerSuffix(n, places).replace('-', '–');
    return seperators ? addThousandSeparators(str) : str;
}
// Numbers like 0,123 are decimals, even though they match POINT_DECIMAL.
const SPECIAL_DECIMAL = /^-?0,[0-9]+$/;
// Points as decimal points, Commas as 1k separators, allow starting .
const POINT_DECIMAL = /^-?([0-9]+(,[0-9]{3})*)?\.?[0-9]*$/;
// Commas as decimal points, Points as 1k separators, don't allow starting ,
const COMMA_DECIMAL = /^-?[0-9]+(\.[0-9]{3})*,?[0-9]*$/;
/**
 * Converts a number to a string, including . or , decimal points and
 * thousands separators.
 * @param {string} str
 * @returns {number}
 */
function parseNumber(str) {
    str = str.replace(/^–/, '-').trim();
    if (!str || str.match(/[^0-9.,-]/))
        return NaN;
    if (SPECIAL_DECIMAL.test(str)) {
        return parseFloat(str.replace(/,/, '.'));
    }
    if (POINT_DECIMAL.test(str)) {
        return parseFloat(str.replace(/,/g, ''));
    }
    if (COMMA_DECIMAL.test(str)) {
        return parseFloat(str.replace(/\./g, '').replace(/,/, '.'));
    }
    return NaN;
}
/**
 * Converts a number to an ordinal.
 * @param {number} x
 * @returns {string}
 */
function toOrdinal(x) {
    if (Math.abs(x) % 100 >= 11 && Math.abs(x) % 100 <= 13) {
        return x + 'th';
    }
    switch (x % 10) {
        case 1:
            return x + 'st';
        case 2:
            return x + 'nd';
        case 3:
            return x + 'rd';
        default:
            return x + 'th';
    }
}
// TODO Translate this function into other languages.
const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
    'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
    'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty',
    'seventy', 'eighty', 'ninety'];
const MULTIPLIERS = ['', ' thousand', ' million', ' billion', ' trillion',
    ' quadrillion', ' quintillion', ' sextillion'];
function toWordSingle(number) {
    const [h, t, o] = number.split('');
    const hundreds = (h === '0') ? '' : ' ' + ONES[+h] + ' hundred';
    if (t + o === '00')
        return hundreds;
    if (+t < 2)
        return hundreds + ' ' + ONES[+(t + o)];
    if (o === '0')
        return hundreds + ' ' + TENS[+t];
    return hundreds + ' ' + TENS[+t] + '-' + ONES[+o];
}
/** Spells a number as an English word. */
function toWord(n) {
    if (n === 0)
        return 'zero';
    const str = Math.round(Math.abs(n)).toString();
    const chunks = Math.ceil(str.length / 3);
    const padded = str.padStart(3 * chunks, '0');
    let result = '';
    for (let i = 0; i < chunks; i += 1) {
        const chunk = padded.substr(i * 3, 3);
        if (chunk === '000')
            continue;
        result += toWordSingle(chunk) + MULTIPLIERS[chunks - 1 - i];
    }
    return result.trim();
}
// -----------------------------------------------------------------------------
// Rounding, Decimals and Decimals
/** Returns the digits of a number n. */
function digits(n) {
    const str = '' + Math.abs(n);
    return str.split('').reverse().map(x => +x);
}
/** Rounds a number `n` to `precision` decimal places. */
function round(n, precision = 0) {
    const factor = Math.pow(10, precision);
    return Math.round(n * factor) / factor;
}
/** Round a number `n` to the nearest multiple of `increment`. */
function roundTo(n, increment = 1) {
    return Math.round(n / increment) * increment;
}
/**
 * Returns an [numerator, denominator] array that approximated a `decimal` to
 * `precision`. See http://en.wikipedia.org/wiki/Continued_fraction
 */
function toFraction(decimal, precision = PRECISION) {
    let n = [1, 0];
    let d = [0, 1];
    let a = Math.floor(decimal);
    let rem = decimal - a;
    while (d[0] <= 1 / precision) {
        if (nearlyEquals(n[0] / d[0], precision))
            return [n[0], d[0]];
        n = [a * n[0] + n[1], n[0]];
        d = [a * d[0] + d[1], d[0]];
        a = Math.floor(1 / rem);
        rem = 1 / rem - a;
    }
    // No nice rational representation so return an irrational "fraction"
    return [decimal, 1];
}
// -----------------------------------------------------------------------------
// Simple Operations
/** Bounds a number between a lower and an upper limit. */
function clamp(x, min = -Infinity, max = Infinity) {
    return Math.min(max, Math.max(min, x));
}
/** Linear interpolation */
function lerp(a, b, t = 0.5) {
    return a + (b - a) * t;
}
/** Squares a number. */
function square(x) {
    return x * x;
}
/** Cubes a number. */
function cube(x) {
    return x * x * x;
}
/**
 * Calculates `a mod m`. The JS implementation of the % operator returns the
 * symmetric modulo. Both are identical if a >= 0 and m >= 0 but the results
 * differ if a or m < 0.
 */
function mod(a, m) {
    return ((a % m) + m) % m;
}
/** Calculates the logarithm of `x` with base `b`. */
function log(x, b) {
    return (b === undefined) ? Math.log(x) : Math.log(x) / Math.log(b);
}
/** Solves the quadratic equation a x^2 + b x + c = 0 */
function quadratic(a, b, c) {
    const p = -b / 2 / a;
    const q = Math.sqrt(b * b - 4 * a * c) / 2 / a;
    return [p + q, p - q];
}

// ============================================================================
// Fermat.js | Combinatorics
// (c) Mathigon
// ============================================================================
/** Calculates the factorial of a number x. */
function factorial(x) {
    if (x === 0)
        return 1;
    if (x < 0)
        return NaN;
    let n = 1;
    for (let i = 2; i <= x; ++i)
        n *= i;
    return n;
}
/** Calculates the binomial coefficient nCk of two numbers n and k. */
function binomial(n, k) {
    if (k < 0 || k > n)
        return 0;
    if (k === 0)
        return 1;
    if (2 * k > n)
        return binomial(n, n - k);
    let coeff = 1;
    for (let i = 1; i <= k; ++i)
        coeff *= ((n - i + 1) / i);
    return Math.round(coeff);
}
/**
 * Returns an array of all possible permutations of an input array arr. In this
 * implementation, we always have permutations(arr)[0] == arr. From
 * http://stackoverflow.com/questions/9960908/permutations-in-javascript
 */
function permutations(arr) {
    const permArr = [];
    const usedChars = [];
    permuteHelper(arr, permArr, usedChars);
    return permArr;
}
function permuteHelper(input, permArr, usedChars) {
    for (let i = 0; i < input.length; i++) {
        const term = input.splice(i, 1)[0];
        usedChars.push(term);
        if (input.length === 0) {
            permArr.push(usedChars.slice());
        }
        permuteHelper(input, permArr, usedChars);
        input.splice(i, 0, term);
        usedChars.pop();
    }
}
/**
 * Returns an array of all possible subsets of an input array (of given length).
 */
function subsets(array, length = 0) {
    const copy = array.slice(0);
    const results = subsetsHelper(copy);
    return length ? results.filter(x => x.length === length) : results;
}
function subsetsHelper(array) {
    if (array.length === 1)
        return [[], array];
    const last = array.pop();
    const subsets = subsetsHelper(array);
    const result = [];
    for (const s of subsets) {
        result.push(s, [...s, last]);
    }
    return result;
}

// =============================================================================
const absStr = (n, suffix) => {
    const prefix = n < 0 ? '–' : '';
    if (Math.abs(n) === 1 && suffix)
        return prefix + suffix;
    return prefix + Math.abs(n) + (suffix || '');
};
/**  Complex number class. */
class Complex {
    constructor(re = 0, im = 0) {
        this.re = re;
        this.im = im;
    }
    get modulus() {
        return Math.sqrt(this.re * this.re + this.im * this.im);
    }
    get argument() {
        return Math.atan2(this.im, this.re);
    }
    get conjugate() {
        return new Complex(this.re, -this.im);
    }
    /** Returns the ith nth-root of this complex number. */
    root(n, i = 0) {
        const r = Math.pow(this.modulus, 1 / n);
        const th = (this.argument + i * 2 * Math.PI) / n;
        return new Complex(r * Math.cos(th), r * Math.sin(th));
    }
    toString(precision = 2) {
        const re = round(this.re, precision);
        const im = round(this.im, precision);
        if (im === 0)
            return absStr(re);
        if (re === 0)
            return absStr(im, 'i');
        return [absStr(re), im < 0 ? '–' : '+', absStr(Math.abs(im), 'i')].join(' ');
    }
    // ---------------------------------------------------------------------------
    add(a) {
        return Complex.sum(this, a);
    }
    subtract(a) {
        return Complex.difference(this, a);
    }
    multiply(a) {
        return Complex.product(this, a);
    }
    divide(a) {
        return Complex.quotient(this, a);
    }
    /** Calculates the sum of two complex numbers c1 and c2. */
    static sum(c1, c2) {
        if (typeof c1 === 'number')
            c1 = new Complex(c1, 0);
        if (typeof c2 === 'number')
            c2 = new Complex(c2, 0);
        return new Complex(c1.re + c2.re, c1.im + c2.im);
    }
    /** Calculates the difference of two complex numbers c1 and c2. */
    static difference(c1, c2) {
        if (typeof c1 === 'number')
            c1 = new Complex(c1, 0);
        if (typeof c2 === 'number')
            c2 = new Complex(c2, 0);
        return new Complex(c1.re - c2.re, c1.im - c2.im);
    }
    /** Calculates the product of two complex numbers c1 and c2. */
    static product(c1, c2) {
        if (typeof c1 === 'number')
            c1 = new Complex(c1, 0);
        if (typeof c2 === 'number')
            c2 = new Complex(c2, 0);
        const re = c1.re * c2.re - c1.im * c2.im;
        const im = c1.im * c2.re + c1.re * c2.im;
        return new Complex(re, im);
    }
    /** Calculates the quotient of two complex numbers c1 and c2. */
    static quotient(c1, c2) {
        if (typeof c1 === 'number')
            c1 = new Complex(c1, 0);
        if (typeof c2 === 'number')
            c2 = new Complex(c2, 0);
        if (Math.abs(c2.re) < Number.EPSILON || Math.abs(c2.im) < Number.EPSILON) {
            return new Complex(Infinity, Infinity);
        }
        const denominator = c2.re * c2.re + c2.im * c2.im;
        const re = (c1.re * c2.re + c1.im * c2.im) / denominator;
        const im = (c1.im * c2.re - c1.re * c2.im) / denominator;
        return new Complex(re, im);
    }
    /** Calculates e^c for a complex number c. */
    static exp(c) {
        if (typeof c === 'number')
            c = new Complex(c, 0);
        const r = Math.exp(c.re);
        return new Complex(r * Math.cos(c.im), r * Math.sin(c.im));
    }
}

// ============================================================================
/** Calculates the greatest common divisor of multiple numbers. */
function gcd(...numbers) {
    const [first, ...rest] = numbers;
    if (rest.length > 1)
        return gcd(first, gcd(...rest));
    let a = Math.abs(first);
    let b = Math.abs(rest[0]);
    while (b)
        [a, b] = [b, a % b];
    return a;
}
/** Calculates the lowest common multiple of multiple numbers. */
function lcm(...numbers) {
    const [first, ...rest] = numbers;
    if (rest.length > 1)
        return lcm(first, lcm(...rest));
    return Math.abs(first * rest[0]) / gcd(first, rest[0]);
}
/** Checks if a number n is prime. */
function isPrime(n) {
    if (n % 1 !== 0 || n < 2)
        return false;
    if (n % 2 === 0)
        return (n === 2);
    if (n % 3 === 0)
        return (n === 3);
    const m = Math.sqrt(n);
    for (let i = 5; i <= m; i += 6) {
        if (n % i === 0)
            return false;
        if (n % (i + 2) === 0)
            return false;
    }
    return true;
}
/** Finds the prime factorisation of a number n. */
function primeFactorisation(n) {
    if (n === 1)
        return [];
    if (isPrime(n))
        return [n];
    const maxf = Math.sqrt(n);
    for (let f = 2; f <= maxf; ++f) {
        if (n % f === 0) {
            return primeFactorisation(f).concat(primeFactorisation(n / f));
        }
    }
    return [];
}
/** Finds all prime factors of a number n. */
function primeFactors(n) {
    return core.unique(primeFactorisation(n));
}
/** Lists all prime numbers between 0 and n. */
function listPrimes(n = 100) {
    if (n < 2)
        return [];
    const result = [2];
    for (let i = 3; i <= n; i++) {
        let notMultiple = false;
        for (const r of result) {
            notMultiple = notMultiple || (0 === i % r);
        }
        if (!notMultiple)
            result.push(i);
    }
    return result;
}
/** Generates a random prime number with d digits, where 2 <= d <= 16. */
function generatePrime(d) {
    if (d < 2 || d > 16)
        throw new Error('Invalid number of digits.');
    const lastDigit = [1, 3, 7, 9];
    const pow = Math.pow(10, d - 2);
    while (true) {
        const n = Math.floor(Math.random() * 9 * pow) + pow;
        const x = 10 * n + lastDigit[Math.floor(4 * Math.random())];
        if (isPrime(x))
            return x;
    }
}
/** Tries to write a number x as the sum of two primes. */
function goldbach(x) {
    if (x === 4)
        return [2, 2];
    let a = x / 2;
    let b = x / 2;
    if (a % 2 === 0) {
        a--;
        b++;
    }
    while (a >= 3) {
        if (isPrime(a) && isPrime(b))
            return [a, b];
        a -= 2;
        b += 2;
    }
}
/** Computes Euler's totient function (phi) for a given natural number x. */
function eulerPhi(x) {
    if (x <= 0)
        throw Error('Number should be greater than zero');
    let n = x;
    for (const p of primeFactors(x))
        n *= (p - 1) / p;
    return n;
}

// =============================================================================
/**  Fraction class. */
class Fraction {
    constructor(n, d = 1) {
        this.n = n;
        this.d = d;
    }
    get decimal() {
        return this.n / this.d;
    }
    get sign() {
        if (this.n === 0 || this.d === 0)
            return 0;
        if (this.n < 0 && this.d < 0)
            return 1;
        if (this.n < 0 || this.d < 0)
            return -1;
        return 1;
    }
    get simplified() {
        const n = Math.abs(this.n);
        const d = Math.abs(this.d);
        const factor = lcm(n, d);
        return new Fraction(this.sign * n / factor, d / factor);
    }
    get inverse() {
        return new Fraction(this.d, this.n);
    }
    toMathML() {
        return `<mfrac><mn>${this.n}</mn><mn>${this.d}</mn></mfrac>`;
    }
    toString() {
        const minus = this.sign < 0 ? '–' : '';
        if (Math.abs(this.d) === 1)
            return `${minus}${Math.abs(this.n)}`;
        return `${minus}${Math.abs(this.n)}/${Math.abs(this.d)}`;
    }
    // ---------------------------------------------------------------------------
    static fromDecimal(x, max = 20) {
        let a = 0;
        let b = 1;
        let c = 1;
        let d = 1;
        while (b <= max && d <= max) {
            const mediant = (a + c) / (b + d);
            if (x === mediant) {
                if (b + d <= max) {
                    return new Fraction(a + c, b + d);
                }
                else if (d > b) {
                    return new Fraction(c, d);
                }
                else {
                    return new Fraction(a, b);
                }
            }
            else if (x > mediant) {
                [a, b] = [a + c, b + d];
            }
            else {
                [c, d] = [a + c, b + d];
            }
        }
        return (b > max) ? new Fraction(c, d) : new Fraction(a, b);
    }
    // ---------------------------------------------------------------------------
    add(a) {
        return Fraction.sum(this, a);
    }
    subtract(a) {
        return Fraction.difference(this, a);
    }
    multiply(a) {
        return Fraction.product(this, a);
    }
    divide(a) {
        return Fraction.quotient(this, a);
    }
    /** Calculates the sum of two fractions a and b. */
    static sum(a, b) {
        if (typeof a === 'number')
            a = new Fraction(a);
        if (typeof b === 'number')
            b = new Fraction(b);
        return new Fraction(a.n * b.d + b.n * a.d, a.d * b.d).simplified;
    }
    /** Calculates the difference of two fractions a and b. */
    static difference(a, b) {
        if (typeof a === 'number')
            a = new Fraction(a);
        if (typeof b === 'number')
            b = new Fraction(b);
        return new Fraction(a.n * b.d - b.n * a.d, a.d * b.d).simplified;
    }
    /** Calculates the product of two fractions a and b. */
    static product(a, b) {
        if (typeof a === 'number')
            a = new Fraction(a);
        if (typeof b === 'number')
            b = new Fraction(b);
        return new Fraction(a.n * b.n, a.d * b.d).simplified;
    }
    /** Calculates the quotient of two fractions a and b. */
    static quotient(a, b) {
        if (typeof a === 'number')
            a = new Fraction(a);
        if (typeof b === 'number')
            b = new Fraction(b);
        return new Fraction(a.n * b.d, a.d * b.n).simplified;
    }
}

// =============================================================================
// -----------------------------------------------------------------------------
// Points
/** A single point class defined by two coordinates x and y. */
class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.type = 'point';
    }
    get unitVector() {
        if (nearlyEquals(this.length, 0))
            return new Point(1, 0);
        return this.scale(1 / this.length);
    }
    get length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    get inverse() {
        return new Point(-this.x, -this.y);
    }
    get flip() {
        return new Point(this.y, this.x);
    }
    get perpendicular() {
        return new Point(-this.y, this.x);
    }
    get array() {
        return [this.x, this.y];
    }
    /** Finds the perpendicular distance between this point and a line. */
    distanceFromLine(l) {
        return Point.distance(this, l.project(this));
    }
    /** Clamps this point to specific bounds. */
    clamp(bounds, padding = 0) {
        const x = clamp(this.x, bounds.xMin + padding, bounds.xMax - padding);
        const y = clamp(this.y, bounds.yMin + padding, bounds.yMax - padding);
        return new Point(x, y);
    }
    /** Transforms this point using a 2x3 matrix m. */
    transform(m) {
        const x = m[0][0] * this.x + m[0][1] * this.y + m[0][2];
        const y = m[1][0] * this.x + m[1][1] * this.y + m[1][2];
        return new Point(x, y);
    }
    /** Rotates this point by a given angle (in radians) around c. */
    rotate(angle, c = ORIGIN) {
        const x0 = this.x - c.x;
        const y0 = this.y - c.y;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x = x0 * cos - y0 * sin + c.x;
        const y = x0 * sin + y0 * cos + c.y;
        return new Point(x, y);
    }
    /** Reflects this point across a line l. */
    reflect(l) {
        const v = l.p2.x - l.p1.x;
        const w = l.p2.y - l.p1.y;
        const x0 = this.x - l.p1.x;
        const y0 = this.y - l.p1.y;
        const mu = (v * y0 - w * x0) / (v * v + w * w);
        const x = this.x + 2 * mu * w;
        const y = this.y - 2 * mu * v;
        return new Point(x, y);
    }
    scale(sx, sy = sx) {
        return new Point(this.x * sx, this.y * sy);
    }
    shift(x, y = x) {
        return new Point(this.x + x, this.y + y);
    }
    translate(p) {
        return this.shift(p.x, p.y); // Alias for .add()
    }
    changeCoordinates(originCoords, targetCoords) {
        const x = targetCoords.xMin + (this.x - originCoords.xMin) /
            (originCoords.dx) * (targetCoords.dx);
        const y = targetCoords.yMin + (this.y - originCoords.yMin) /
            (originCoords.dy) * (targetCoords.dy);
        return new Point(x, y);
    }
    add(p) {
        return Point.sum(this, p);
    }
    subtract(p) {
        return Point.difference(this, p);
    }
    equals(other) {
        return nearlyEquals(this.x, other.x) && nearlyEquals(this.y, other.y);
    }
    round(inc = 1) {
        return new Point(roundTo(this.x, inc), roundTo(this.y, inc));
    }
    floor() {
        return new Point(Math.floor(this.x), Math.floor(this.y));
    }
    mod(x, y = x) {
        return new Point(this.x % x, this.y % y);
    }
    angle(c = ORIGIN) {
        return rad(this, c);
    }
    /** Calculates the average of multiple points. */
    static average(...points) {
        const x = core.total(points.map(p => p.x)) / points.length;
        const y = core.total(points.map(p => p.y)) / points.length;
        return new Point(x, y);
    }
    /** Calculates the dot product of two points p1 and p2. */
    static dot(p1, p2) {
        return p1.x * p2.x + p1.y * p2.y;
    }
    static sum(p1, p2) {
        return new Point(p1.x + p2.x, p1.y + p2.y);
    }
    static difference(p1, p2) {
        return new Point(p1.x - p2.x, p1.y - p2.y);
    }
    /** Returns the Euclidean distance between two points p1 and p2. */
    static distance(p1, p2) {
        return Math.sqrt(square(p1.x - p2.x) + square(p1.y - p2.y));
    }
    /** Returns the Manhattan distance between two points p1 and p2. */
    static manhattan(p1, p2) {
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }
    /** Interpolates two points p1 and p2 by a factor of t. */
    static interpolate(p1, p2, t = 0.5) {
        return new Point(lerp(p1.x, p2.x, t), lerp(p1.y, p2.y, t));
    }
    /** Interpolates a list of multiple points. */
    static interpolateList(points, t = 0.5) {
        const n = points.length - 1;
        const a = Math.floor(clamp(t, 0, 1) * n);
        return Point.interpolate(points[a], points[a + 1], n * t - a);
    }
    /** Creates a point from polar coordinates. */
    static fromPolar(angle, r = 1) {
        return new Point(r * Math.cos(angle), r * Math.sin(angle));
    }
}
const ORIGIN = new Point(0, 0);
// -----------------------------------------------------------------------------
// Bounds
class Bounds {
    constructor(xMin, xMax, yMin, yMax) {
        this.xMin = xMin;
        this.xMax = xMax;
        this.yMin = yMin;
        this.yMax = yMax;
    }
    get dx() {
        return this.xMax - this.xMin;
    }
    get dy() {
        return this.yMax - this.yMin;
    }
    get xRange() {
        return [this.xMin, this.xMax];
    }
    get yRange() {
        return [this.yMin, this.yMax];
    }
    get rect() {
        return new Rectangle(new Point(this.xMin, this.xMin), this.dx, this.dy);
    }
}
// -----------------------------------------------------------------------------
// Angles
const TWO_PI = 2 * Math.PI;
/** A 2-dimensional angle class, defined by three points. */
class Angle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.type = 'angle';
    }
    transform(m) {
        return new Angle(this.a.transform(m), this.b.transform(m), this.c.transform(m));
    }
    /** The size, in radians, of this angle. */
    get rad() {
        const phiA = Math.atan2(this.a.y - this.b.y, this.a.x - this.b.x);
        const phiC = Math.atan2(this.c.y - this.b.y, this.c.x - this.b.x);
        let phi = phiC - phiA;
        if (phi < 0)
            phi += TWO_PI;
        return phi;
    }
    /** The size, in degrees, of this angle. */
    get deg() {
        return this.rad * 180 / Math.PI;
    }
    /** Checks if this angle is right-angled. */
    get isRight() {
        // Within 1 deg of 90 deg.
        return nearlyEquals(this.rad, Math.PI / 2, Math.PI / 360);
    }
    /** The bisector of this angle. */
    get bisector() {
        if (this.b.equals(this.a))
            return undefined;
        if (this.b.equals(this.c))
            return undefined;
        const phiA = Math.atan2(this.a.y - this.b.y, this.a.x - this.b.x);
        const phiC = Math.atan2(this.c.y - this.b.y, this.c.x - this.b.x);
        let phi = (phiA + phiC) / 2;
        if (phiA > phiC)
            phi += Math.PI;
        const x = Math.cos(phi) + this.b.x;
        const y = Math.sin(phi) + this.b.y;
        return new Line(this.b, new Point(x, y));
    }
    /** Returns the smaller one of this and its supplementary angle. */
    get sup() {
        return (this.rad < Math.PI) ? this : new Angle(this.c, this.b, this.a);
    }
    /** Returns the Arc element corresponding to this angle. */
    get arc() {
        return new Arc(this.b, this.a, this.rad);
    }
    equals(_a) {
        return false; // TODO
    }
    // Only required to have a common API with Line, Polygon, etc.
    project() {
        return this.b;
    }
    at() {
        return this.b;
    }
}
function rad(p, c = ORIGIN) {
    const a = Math.atan2(p.y - c.y, p.x - c.x);
    return (a + TWO_PI) % TWO_PI;
}
// -----------------------------------------------------------------------------
// Lines, Rays and Line Segments
/** An infinite straight line that goes through two points. */
class Line {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.type = 'line';
    }
    make(p1, p2) {
        return new Line(p1, p2);
    }
    /* The distance between the two points defining this line. */
    get length() {
        return Point.distance(this.p1, this.p2);
    }
    /** The midpoint of this line. */
    get midpoint() {
        return Point.average(this.p1, this.p2);
    }
    /** The slope of this line. */
    get slope() {
        return (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
    }
    /** The y-axis intercept of this line. */
    get intercept() {
        return this.p1.y + this.slope * this.p1.x;
    }
    /** The angle formed between this line and the x-axis. */
    get angle() {
        return rad(this.p2, this.p1);
    }
    /** The point representing a unit vector along this line. */
    get unitVector() {
        return this.p2.subtract(this.p1).unitVector;
    }
    /** The point representing the perpendicular vector of this line. */
    get perpendicularVector() {
        return new Point(this.p2.y - this.p1.y, this.p1.x - this.p2.x).unitVector;
    }
    /** Finds the line parallel to this one, going though point p. */
    parallel(p) {
        const q = Point.sum(p, Point.difference(this.p2, this.p1));
        return new Line(p, q);
    }
    /** Finds the line perpendicular to this one, going though point p. */
    perpendicular(p) {
        return new Line(p, Point.sum(p, this.perpendicularVector));
    }
    /** The perpendicular bisector of this line. */
    get perpendicularBisector() {
        return this.perpendicular(this.midpoint);
    }
    /** Projects this point onto the line `l`. */
    project(p) {
        const a = Point.difference(this.p2, this.p1);
        const b = Point.difference(p, this.p1);
        const proj = a.scale(Point.dot(a, b) / this.length ** 2);
        return Point.sum(this.p1, proj);
    }
    /** Checks if a point p lies on this line. */
    contains(p) {
        // det([[p.x, p.y, 1],[p1.x, p1.y, 1],[p2.x, ,p2.y 1]])
        const det = p.x * (this.p1.y - this.p2.y) + this.p1.x * (this.p2.y - p.y) +
            this.p2.x * (p.y - this.p1.y);
        return nearlyEquals(det, 0);
    }
    at(t) {
        return Point.interpolate(this.p1, this.p2, t);
    }
    transform(m) {
        return new this.constructor(this.p1.transform(m), this.p2.transform(m));
    }
    rotate(a, c = ORIGIN) {
        return new this.constructor(this.p1.rotate(a, c), this.p2.rotate(a, c));
    }
    reflect(l) {
        return new this.constructor(this.p1.reflect(l), this.p2.reflect(l));
    }
    scale(sx, sy = sx) {
        return this.make(this.p1.scale(sx, sy), this.p2.scale(sx, sy));
    }
    shift(x, y = x) {
        return this.make(this.p1.shift(x, y), this.p2.shift(x, y));
    }
    translate(p) {
        return this.shift(p.x, p.y);
    }
    equals(other) {
        return this.contains(other.p1) && this.contains(other.p2);
    }
}
/** An infinite ray defined by an endpoint and another point on the ray. */
class Ray extends Line {
    constructor() {
        super(...arguments);
        this.type = 'ray';
    }
    make(p1, p2) {
        return new Ray(p1, p2);
    }
    equals(other) {
        if (other.type !== 'ray')
            return false;
        return this.p1.equals(other.p1) && this.contains(other.p2);
    }
}
/** A finite line segment defined by its two endpoints. */
class Segment extends Line {
    constructor() {
        super(...arguments);
        this.type = 'segment';
    }
    contains(p) {
        if (!Line.prototype.contains.call(this, p))
            return false;
        if (nearlyEquals(this.p1.x, this.p2.x)) {
            return isBetween(p.y, this.p1.y, this.p2.y);
        }
        else {
            return isBetween(p.x, this.p1.x, this.p2.x);
        }
    }
    make(p1, p2) {
        return new Segment(p1, p2);
    }
    project(p) {
        const a = Point.difference(this.p2, this.p1);
        const b = Point.difference(p, this.p1);
        const q = clamp(Point.dot(a, b) / square(this.length), 0, 1);
        return Point.sum(this.p1, a.scale(q));
    }
    /** Contracts (or expands) a line by a specific ratio. */
    contract(x) {
        return new Segment(this.at(x), this.at(1 - x));
    }
    equals(other, oriented = false) {
        if (other.type !== 'segment')
            return false;
        return (this.p1.equals(other.p1) && this.p2.equals(other.p2)) ||
            (!oriented && this.p1.equals(other.p2) && this.p2.equals(other.p1));
    }
    /** Finds the intersection of two line segments l1 and l2 (or undefined). */
    static intersect(s1, s2) {
        return simpleIntersection(s1, s2)[0] || undefined;
    }
}
// -----------------------------------------------------------------------------
// Circles, Ellipses and Arcs
/** A circle with a given center and radius. */
class Circle {
    constructor(c = ORIGIN, r = 1) {
        this.c = c;
        this.r = r;
        this.type = 'circle';
    }
    /** The length of the circumference of this circle. */
    get circumference() {
        return TWO_PI * this.r;
    }
    /** The area of this circle. */
    get area() {
        return Math.PI * this.r ** 2;
    }
    get arc() {
        const start = this.c.shift(this.r, 0);
        return new Arc(this.c, start, TWO_PI);
    }
    transform(m) {
        const scale = Math.abs(m[0][0]) + Math.abs(m[1][1]);
        return new Circle(this.c.transform(m), this.r * scale / 2);
    }
    rotate(a, c = ORIGIN) {
        return new Circle(this.c.rotate(a, c), this.r);
    }
    reflect(l) {
        return new Circle(this.c.reflect(l), this.r);
    }
    scale(sx, sy = sx) {
        return new Circle(this.c.scale(sx, sy), this.r * (sx + sy) / 2);
    }
    shift(x, y = x) {
        return new Circle(this.c.shift(x, y), this.r);
    }
    translate(p) {
        return this.shift(p.x, p.y);
    }
    contains(p) {
        return Point.distance(p, this.c) <= this.r;
    }
    equals(other) {
        return nearlyEquals(this.r, other.r) && this.c.equals(other.c);
    }
    project(p) {
        const proj = p.subtract(this.c).unitVector.scale(this.r);
        return Point.sum(this.c, proj);
    }
    at(t) {
        const a = 2 * Math.PI * t;
        return this.c.shift(this.r * Math.cos(a), this.r * Math.sin(a));
    }
    tangentAt(t) {
        const p1 = this.at(t);
        const p2 = this.c.rotate(Math.PI / 2, p1);
        return new Line(p1, p2);
    }
}
/** An arc segment of a circle, with given center, start point and angle. */
class Arc {
    constructor(c, start, angle) {
        this.c = c;
        this.start = start;
        this.angle = angle;
        this.type = 'arc';
    }
    get radius() {
        return Point.distance(this.c, this.start);
    }
    get end() {
        return this.start.rotate(this.angle, this.c);
    }
    transform(m) {
        return new this.constructor(this.c.transform(m), this.start.transform(m), this.angle);
    }
    rotate(a, c = ORIGIN) {
        return new this.constructor(this.c.rotate(a, c), this.start.rotate(a, c), this.angle);
    }
    reflect(l) {
        return new this.constructor(this.c.reflect(l), this.start.reflect(l), this.angle);
    }
    scale(sx, sy = sx) {
        return new this.constructor(this.c.scale(sx, sy), this.start.scale(sx, sy), this.angle);
    }
    shift(x, y = x) {
        return new this.constructor(this.c.shift(x, y), this.start.shift(x, y), this.angle);
    }
    translate(p) {
        return this.shift(p.x, p.y);
    }
    get startAngle() {
        return rad(this.start, this.c);
    }
    project(p) {
        const start = this.startAngle;
        const end = start + this.angle;
        let angle = rad(p, this.c);
        if (end > TWO_PI && angle < end - TWO_PI)
            angle += TWO_PI;
        angle = clamp(angle, start, end);
        return this.c.shift(this.radius, 0).rotate(angle, this.c);
    }
    at(t) {
        return this.start.rotate(this.angle * t, this.c);
    }
    contract(p) {
        return new this.constructor(this.c, this.at(p / 2), this.angle * (1 - p));
    }
    get minor() {
        if (this.angle <= Math.PI)
            return this;
        return new this.constructor(this.c, this.end, 2 * Math.PI - this.angle);
    }
    get major() {
        if (this.angle >= Math.PI)
            return this;
        return new this.constructor(this.c, this.end, 2 * Math.PI - this.angle);
    }
    get center() {
        return this.at(0.5);
    }
    equals() {
        // TODO Implement
        return false;
    }
}
class Sector extends Arc {
    constructor() {
        super(...arguments);
        this.type = 'sector';
    }
}
// -----------------------------------------------------------------------------
// Polygons
/** A polygon defined by its vertex points. */
class Polygon {
    constructor(...points) {
        this.type = 'polygon';
        this.points = points;
    }
    get circumference() {
        let C = 0;
        for (let i = 1; i < this.points.length; ++i) {
            C += Point.distance(this.points[i - 1], this.points[i]);
        }
        return C;
    }
    /**
     * The (signed) area of this polygon. The result is positive if the vertices
     * are ordered clockwise, and negative otherwise.
     */
    get signedArea() {
        const p = this.points;
        const n = p.length;
        let A = p[n - 1].x * p[0].y - p[0].x * p[n - 1].y;
        for (let i = 1; i < n; ++i) {
            A += p[i - 1].x * p[i].y - p[i].x * p[i - 1].y;
        }
        return A / 2;
    }
    get area() {
        return Math.abs(this.signedArea);
    }
    get centroid() {
        const p = this.points;
        const n = p.length;
        let Cx = 0;
        for (let i = 0; i < n; ++i)
            Cx += p[i].x;
        let Cy = 0;
        for (let i = 0; i < n; ++i)
            Cy += p[i].y;
        return new Point(Cx / n, Cy / n);
    }
    get edges() {
        const p = this.points;
        const n = p.length;
        const edges = [];
        for (let i = 0; i < n; ++i)
            edges.push(new Segment(p[i], p[(i + 1) % n]));
        return edges;
    }
    get radius() {
        const c = this.centroid;
        const radii = this.points.map(p => Point.distance(p, c));
        return Math.max(...radii);
    }
    transform(m) {
        return new this.constructor(...this.points.map(p => p.transform(m)));
    }
    rotate(a, center = ORIGIN) {
        const points = this.points.map(p => p.rotate(a, center));
        return new this.constructor(...points);
    }
    reflect(line) {
        const points = this.points.map(p => p.reflect(line));
        return new this.constructor(...points);
    }
    scale(sx, sy = sx) {
        const points = this.points.map(p => p.scale(sx, sy));
        return new this.constructor(...points);
    }
    shift(x, y = x) {
        const points = this.points.map(p => p.shift(x, y));
        return new this.constructor(...points);
    }
    translate(p) {
        return this.shift(p.x, p.y);
    }
    /**
     * Checks if a point p lies inside this polygon, by using a ray-casting
     * algorithm and calculating the number of intersections.
     */
    contains(p) {
        let inside = false;
        for (const e of this.edges) {
            // Exclude points lying *on* the edge.
            if (e.p1.equals(p) || e.contains(p))
                return false;
            if ((e.p1.y > p.y) === (e.p2.y > p.y))
                continue;
            const det = (e.p2.x - e.p1.x) / (e.p2.y - e.p1.y);
            if (p.x < det * (p.y - e.p1.y) + e.p1.x)
                inside = !inside;
        }
        return inside;
    }
    equals(_other) {
        // TODO Implement
        return false;
    }
    project(p) {
        let q = undefined;
        let d = Infinity;
        for (const e of this.edges) {
            const q1 = e.project(p);
            const d1 = Point.distance(p, q1);
            if (d1 < d) {
                q = q1;
                d = d1;
            }
        }
        return q || this.points[0];
    }
    at(t) {
        return Point.interpolateList([...this.points, this.points[0]], t);
    }
    /** The oriented version of this polygon (vertices in clockwise order). */
    get oriented() {
        if (this.signedArea >= 0)
            return this;
        const points = [...this.points].reverse();
        return new this.constructor(...points);
    }
    /**
     * The intersection of this and another polygon, calculated using the
     * Weiler–Atherton clipping algorithm
     */
    intersect(polygon) {
        // TODO Support intersections with multiple disjoint overlapping areas.
        // TODO Support segments intersecting at their endpoints
        const points = [core.toLinkedList(this.oriented.points),
            core.toLinkedList(polygon.oriented.points)];
        const max = this.points.length + polygon.points.length;
        const result = [];
        let which = 0;
        let active = points[which].find(p => polygon.contains(p.val));
        if (!active)
            return undefined; // No intersection
        while (active.val !== result[0] && result.length < max) {
            result.push(active.val);
            const nextEdge = new Segment(active.val, active.next.val);
            active = active.next;
            for (const p of points[1 - which]) {
                const testEdge = new Segment(p.val, p.next.val);
                const intersect = intersections(nextEdge, testEdge)[0];
                if (intersect) {
                    which = 1 - which; // Switch active polygon
                    active = { val: intersect, next: p.next };
                    break;
                }
            }
        }
        return new Polygon(...result);
    }
    /** Checks if two polygons p1 and p2 collide. */
    static collision(p1, p2) {
        // Check if any of the edges overlap.
        for (const e1 of p1.edges) {
            for (const e2 of p2.edges) {
                if (Segment.intersect(e1, e2))
                    return true;
            }
        }
        // Check if one of the vertices is in one of the polygons.
        return p2.contains(p1.points[0]) || p1.contains(p2.points[0]);
    }
    /** Creates a regular polygon. */
    static regular(n, radius = 1) {
        const da = 2 * Math.PI / n;
        const a0 = Math.PI / 2 - da / 2;
        const points = core.tabulate((i) => Point.fromPolar(a0 + da * i, radius), n);
        return new Polygon(...points);
    }
    /** Interpolates the points of two polygons */
    static interpolate(p1, p2, t = 0.5) {
        // TODO support interpolating polygons with different numbers of points
        const points = p1.points.map((p, i) => Point.interpolate(p, p2.points[i], t));
        return new Polygon(...points);
    }
}
/** A polyline defined by its vertex points. */
class Polyline extends Polygon {
    constructor() {
        super(...arguments);
        this.type = 'polyline';
        // TODO Other methods and properties
    }
    /** @returns {Segment[]} */
    get edges() {
        const edges = [];
        for (let i = 0; i < this.points.length - 1; ++i) {
            edges.push(new Segment(this.points[i], this.points[i + 1]));
        }
        return edges;
    }
}
/** A triangle defined by its three vertices. */
class Triangle extends Polygon {
    constructor() {
        super(...arguments);
        this.type = 'triangle';
    }
    get circumcircle() {
        const [a, b, c] = this.points;
        const d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
        const ux = (a.x ** 2 + a.y ** 2) * (b.y - c.y) +
            (b.x ** 2 + b.y ** 2) * (c.y - a.y) +
            (c.x ** 2 + c.y ** 2) * (a.y - b.y);
        const uy = (a.x ** 2 + a.y ** 2) * (c.x - b.x) +
            (b.x ** 2 + b.y ** 2) * (a.x - c.x) +
            (c.x ** 2 + c.y ** 2) * (b.x - a.x);
        const center = new Point(ux / d, uy / d);
        const radius = Point.distance(center, this.points[0]);
        return new Circle(center, radius);
    }
    get incircle() {
        const edges = this.edges;
        const sides = edges.map(e => e.length);
        const total = sides[0] + sides[1] + sides[2];
        const [a, b, c] = this.points;
        const ux = sides[1] * a.x + sides[2] * b.x + sides[0] * c.x;
        const uy = sides[1] * a.y + sides[2] * b.y + sides[0] * c.y;
        const center = new Point(ux / total, uy / total);
        const radius = center.distanceFromLine(edges[0]);
        return new Circle(center, radius);
    }
    get orthocenter() {
        const [a, b, c] = this.points;
        const h1 = new Line(a, b).perpendicular(c);
        const h2 = new Line(a, c).perpendicular(b);
        return intersections(h1, h2)[0];
    }
}
// -----------------------------------------------------------------------------
// Rectangles and Squares
/** A rectangle, defined by its top left vertex, width and height. */
class Rectangle {
    constructor(p, w = 1, h = w) {
        this.p = p;
        this.w = w;
        this.h = h;
        this.type = 'rectangle';
    }
    static aroundPoints(...points) {
        const xs = points.map(p => p.x);
        const ys = points.map(p => p.y);
        const x = Math.min(...xs);
        const w = Math.max(...xs) - x;
        const y = Math.min(...ys);
        const h = Math.max(...ys) - y;
        return new Rectangle(new Point(x, y), w, h);
    }
    get center() {
        return new Point(this.p.x + this.w / 2, this.p.y + this.h / 2);
    }
    get centroid() {
        return this.center;
    }
    get circumference() {
        return 2 * Math.abs(this.w) + 2 * Math.abs(this.h);
    }
    get area() {
        return Math.abs(this.w * this.h);
    }
    /** @returns {Segment[]} */
    get edges() {
        return this.polygon.edges;
    }
    /** @returns {Point[]} */
    get points() {
        return this.polygon.points;
    }
    /**
     * A polygon class representing this rectangle.
     * @returns {Polygon}
     */
    get polygon() {
        const b = new Point(this.p.x + this.w, this.p.y);
        const c = new Point(this.p.x + this.w, this.p.y + this.h);
        const d = new Point(this.p.x, this.p.y + this.h);
        return new Polygon(this.p, b, c, d);
    }
    transform(m) {
        return this.polygon.transform(m);
    }
    rotate(a, c = ORIGIN) {
        return this.polygon.rotate(a, c);
    }
    reflect(l) {
        return this.polygon.reflect(l);
    }
    scale(sx, sy = sx) {
        return new Rectangle(this.p.scale(sx, sy), this.w * sx, this.h * sy);
    }
    shift(x, y = x) {
        return new Rectangle(this.p.shift(x, y), this.w, this.h);
    }
    translate(p) {
        return this.shift(p.x, p.y);
    }
    contains(p) {
        return isBetween(p.x, this.p.x, this.p.x + this.w) &&
            isBetween(p.y, this.p.y, this.p.y + this.h);
    }
    equals(_other) {
        // TODO Implement
        return false;
    }
    project(p) {
        // TODO Use the generic intersections() function
        // bottom right corner of rect
        const rect1 = { x: this.p.x + this.w, y: this.p.y + this.h };
        const center = { x: this.p.x + this.w / 2, y: this.p.y + this.h / 2 };
        const m = (center.y - p.y) / (center.x - p.x);
        if (p.x <= center.x) { // check left side
            const y = m * (this.p.x - p.x) + p.y;
            if (this.p.y < y && y < rect1.y)
                return new Point(this.p.x, y);
        }
        if (p.x >= center.x) { // check right side
            const y = m * (rect1.x - p.x) + p.y;
            if (this.p.y < y && y < rect1.y)
                return new Point(rect1.x, y);
        }
        if (p.y <= center.y) { // check top side
            const x = (this.p.y - p.y) / m + p.x;
            if (this.p.x < x && x < rect1.x)
                return new Point(x, this.p.y);
        }
        if (p.y >= center.y) { // check bottom side
            const x = (rect1.y - p.y) / m + p.x;
            if (this.p.x < x && x < rect1.x)
                return new Point(x, rect1.y);
        }
        return this.p;
    }
    at(_t) {
        // TODO Implement
    }
}
function isPolygonLike(shape) {
    return core.isOneOf(shape.type, 'polygon', 'polyline', 'rectangle');
}
function isLineLike(shape) {
    return core.isOneOf(shape.type, 'line', 'ray', 'segment');
}
function isCircle(shape) {
    return shape.type === 'circle';
}
function isArc(shape) {
    return shape.type === 'arc';
}
function isSector(shape) {
    return shape.type === 'sector';
}
function isAngle(shape) {
    return shape.type === 'angle';
}
function isPoint(shape) {
    return shape.type === 'point';
}
// -----------------------------------------------------------------------------
// Intersections
function liesOnSegment(s, p) {
    if (nearlyEquals(s.p1.x, s.p2.x))
        return isBetween(p.y, s.p1.y, s.p2.y);
    return isBetween(p.x, s.p1.x, s.p2.x);
}
function liesOnRay(r, p) {
    if (nearlyEquals(r.p1.x, r.p2.x)) {
        return (p.y - r.p1.y) / (r.p2.y - r.p1.y) > 0;
    }
    return (p.x - r.p1.x) / (r.p2.x - r.p1.x) > 0;
}
function lineLineIntersection(l1, l2) {
    const d1x = l1.p1.x - l1.p2.x;
    const d1y = l1.p1.y - l1.p2.y;
    const d2x = l2.p1.x - l2.p2.x;
    const d2y = l2.p1.y - l2.p2.y;
    const d = d1x * d2y - d1y * d2x;
    if (nearlyEquals(d, 0))
        return []; // Colinear lines never intersect
    const q1 = l1.p1.x * l1.p2.y - l1.p1.y * l1.p2.x;
    const q2 = l2.p1.x * l2.p2.y - l2.p1.y * l2.p2.x;
    const x = q1 * d2x - d1x * q2;
    const y = q1 * d2y - d1y * q2;
    return [new Point(x / d, y / d)];
}
function circleCircleIntersection(c1, c2) {
    const d = Point.distance(c1.c, c2.c);
    // Circles are separate:
    if (d > c1.r + c2.r)
        return [];
    // One circles contains the other:
    if (d < Math.abs(c1.r - c2.r))
        return [];
    // Circles are the same:
    if (nearlyEquals(d, 0) && nearlyEquals(c1.r, c2.r))
        return [];
    // Circles touch:
    if (nearlyEquals(d, c1.r + c2.r))
        return [new Line(c1.c, c2.c).midpoint];
    const a = (square(c1.r) - square(c2.r) + square(d)) / (2 * d);
    const b = Math.sqrt(square(c1.r) - square(a));
    const px = (c2.c.x - c1.c.x) * a / d + (c2.c.y - c1.c.y) * b / d + c1.c.x;
    const py = (c2.c.y - c1.c.y) * a / d - (c2.c.x - c1.c.x) * b / d + c1.c.y;
    const qx = (c2.c.x - c1.c.x) * a / d - (c2.c.y - c1.c.y) * b / d + c1.c.x;
    const qy = (c2.c.y - c1.c.y) * a / d + (c2.c.x - c1.c.x) * b / d + c1.c.y;
    return [new Point(px, py), new Point(qx, qy)];
}
// From http://mathworld.wolfram.com/Circle-LineIntersection.html
function lineCircleIntersection(l, c) {
    const dx = l.p2.x - l.p1.x;
    const dy = l.p2.y - l.p1.y;
    const dr2 = square(dx) + square(dy);
    const cx = c.c.x;
    const cy = c.c.y;
    const D = (l.p1.x - cx) * (l.p2.y - cy) - (l.p2.x - cx) * (l.p1.y - cy);
    const disc = square(c.r) * dr2 - square(D);
    if (disc < 0)
        return []; // No solution
    const xa = D * dy / dr2;
    const ya = -D * dx / dr2;
    if (nearlyEquals(disc, 0))
        return [c.c.shift(xa, ya)]; // One solution
    const xb = dx * (dy < 0 ? -1 : 1) * Math.sqrt(disc) / dr2;
    const yb = Math.abs(dy) * Math.sqrt(disc) / dr2;
    return [c.c.shift(xa + xb, ya + yb), c.c.shift(xa - xb, ya - yb)];
}
/** Returns the intersection of two or more geometry objects. */
function intersections(...elements) {
    if (elements.length < 2)
        return [];
    if (elements.length > 2) {
        return core.flatten(subsets(elements, 2).map(e => intersections(...e)));
    }
    let [a, b] = elements;
    if (isPolygonLike(b))
        [a, b] = [b, a];
    if (isPolygonLike(a)) {
        // This hack is necessary to capture intersections between a line and a
        // vertex of a polygon. There are more edge cases to consider!
        const vertices = isLineLike(b) ?
            a.points.filter(p => b.contains(p)) : [];
        return [...vertices, ...intersections(b, ...a.edges)];
    }
    // TODO Handle arcs, sectors and angles!
    return simpleIntersection(a, b);
}
/** Finds the intersection of two lines or circles. */
function simpleIntersection(a, b) {
    let results = [];
    // TODO Handle Arcs and Rays
    if (isLineLike(a) && isLineLike(b)) {
        results = lineLineIntersection(a, b);
    }
    else if (isLineLike(a) && isCircle(b)) {
        results = lineCircleIntersection(a, b);
    }
    else if (isCircle(a) && isLineLike(b)) {
        results = lineCircleIntersection(b, a);
    }
    else if (isCircle(a) && isCircle(b)) {
        results = circleCircleIntersection(a, b);
    }
    for (const x of [a, b]) {
        if (x.type === 'segment') {
            results = results.filter(i => liesOnSegment(x, i));
        }
        if (x.type === 'ray')
            results = results.filter(i => liesOnRay(x, i));
    }
    return results;
}

// =============================================================================
// ---------------------------------------------------------------------------
// Constructors
/** Fills a matrix of size x, y with a given value. */
function fill(value, x, y) {
    return core.repeat2D(value, x, y);
}
/** Returns the identity matrix of size n. */
function identity(n = 2) {
    const x = fill(0, n, n);
    for (let i = 0; i < n; ++i)
        x[i][i] = 1;
    return x;
}
function rotation(angle) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    return [[cos, -sin], [sin, cos]];
}
function shear(lambda) {
    return [[1, lambda], [0, 1]];
}
function reflection(angle) {
    const sin = Math.sin(2 * angle);
    const cos = Math.cos(2 * angle);
    return [[cos, sin], [sin, -cos]];
}
// ---------------------------------------------------------------------------
// Matrix Operations
/** Calculates the sum of two or more matrices. */
function sum(...matrices) {
    const [M1, ...rest] = matrices;
    const M2 = rest.length > 1 ? sum(...rest) : rest[0];
    if (M1.length !== M2.length || M1[0].length !== M2[0].length) {
        throw new Error('Matrix sizes don’t match');
    }
    const S = [];
    for (let i = 0; i < M1.length; ++i) {
        const row = [];
        for (let j = 0; j < M1[i].length; ++j) {
            row.push(M1[i][j] + M2[i][j]);
        }
        S.push(row);
    }
    return S;
}
/** Multiplies a matrix M by a scalar v. */
function scalarProduct(M, v) {
    return M.map(row => row.map(x => x * v));
}
/** Calculates the matrix product of multiple matrices. */
function product(...matrices) {
    const [M1, ...rest] = matrices;
    const M2 = rest.length > 1 ? product(...rest) : rest[0];
    if (M1[0].length !== M2.length) {
        throw new Error('Matrix sizes don’t match.');
    }
    const P = [];
    for (let i = 0; i < M1.length; ++i) {
        const row = [];
        for (let j = 0; j < M2[0].length; ++j) {
            let value = 0;
            for (let k = 0; k < M2.length; ++k) {
                value += M1[i][k] * M2[k][j];
            }
            row.push(value);
        }
        P.push(row);
    }
    return P;
}
// ---------------------------------------------------------------------------
// Matrix Properties
/** Calculates the transpose of a matrix M. */
function transpose(M) {
    const T = [];
    for (let j = 0; j < M[0].length; ++j) {
        const row = [];
        for (let i = 0; i < M.length; ++i) {
            row.push(M[i][j]);
        }
        T.push(row);
    }
    return T;
}
/** Calculates the determinant of a matrix M. */
function determinant(M) {
    if (M.length !== M[0].length)
        throw new Error('Not a square matrix.');
    const n = M.length;
    // Shortcuts for small n
    if (n === 1)
        return M[0][0];
    if (n === 2)
        return M[0][0] * M[1][1] - M[0][1] * M[1][0];
    let det = 0;
    for (let j = 0; j < n; ++j) {
        let diagLeft = M[0][j];
        let diagRight = M[0][j];
        for (let i = 1; i < n; ++i) {
            diagRight *= M[i][j + i % n];
            diagLeft *= M[i][j - i % n];
        }
        det += diagRight - diagLeft;
    }
    return det;
}
/** Calculates the inverse of a matrix M. */
function inverse(M) {
    // Perform Gaussian elimination:
    // (1) Apply the same operations to both I and C.
    // (2) Turn C into the identity, thereby turning I into the inverse of C.
    const n = M.length;
    if (n !== M[0].length)
        throw new Error('Not a square matrix.');
    const I = identity(n);
    const C = core.tabulate2D((x, y) => M[x][y], n, n); // Copy of original matrix
    for (let i = 0; i < n; ++i) {
        // Loop over the elements e in along the diagonal of C.
        let e = C[i][i];
        // If e is 0, we need to swap this row with a lower row.
        if (!e) {
            for (let ii = i + 1; ii < n; ++ii) {
                if (C[ii][i] !== 0) {
                    for (let j = 0; j < n; ++j) {
                        [C[ii][j], C[i][j]] = [C[i][j], C[ii][j]];
                        [I[ii][j], I[i][j]] = [I[i][j], I[ii][j]];
                    }
                    break;
                }
            }
            e = C[i][i];
            if (!e)
                throw new Error('Matrix not invertible.');
        }
        // Scale row by e, so that we have a 1 on the diagonal.
        for (let j = 0; j < n; ++j) {
            C[i][j] = C[i][j] / e;
            I[i][j] = I[i][j] / e;
        }
        // Subtract a multiple of this row from all other rows,
        // so that they end up having 0s in this column.
        for (let ii = 0; ii < n; ++ii) {
            if (ii === i)
                continue;
            const f = C[ii][i];
            for (let j = 0; j < n; ++j) {
                C[ii][j] -= f * C[i][j];
                I[ii][j] -= f * I[i][j];
            }
        }
    }
    return I;
}

var matrix = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fill: fill,
    identity: identity,
    rotation: rotation,
    shear: shear,
    reflection: reflection,
    sum: sum,
    scalarProduct: scalarProduct,
    product: product,
    transpose: transpose,
    determinant: determinant,
    inverse: inverse
});

// ============================================================================
/** Randomly shuffles the elements in an array a. */
function shuffle(a) {
    a = a.slice(0); // create copy
    for (let i = a.length - 1; i > 0; --i) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
/** Generates a random integer between 0 and a, or between a and b. */
function integer(a, b) {
    const start = (b === undefined ? 0 : a);
    const length = (b === undefined ? a : b - a + 1);
    return start + Math.floor(length * Math.random());
}
/** Chooses a random index value from weights [2, 5, 3] */
function weighted(weights) {
    const x = Math.random() * core.total(weights);
    let cum = 0;
    return weights.findIndex((w) => (cum += w) >= x);
}
// ---------------------------------------------------------------------------
// Smart Random Number Generators
const SMART_RANDOM_CACHE = new Map();
/**
 * Returns a random number between 0 and n, but avoids returning the same
 * number multiple times in a row.
 */
function smart(n, id) {
    if (!id)
        id = core.uid();
    if (!SMART_RANDOM_CACHE.has(id))
        SMART_RANDOM_CACHE.set(id, core.repeat(1, n));
    const cache = SMART_RANDOM_CACHE.get(id);
    const x = weighted(cache.map(x => x * x));
    cache[x] -= 1;
    if (cache[x] <= 0)
        SMART_RANDOM_CACHE.set(id, cache.map(x => x + 1));
    return x;
}
// ---------------------------------------------------------------------------
// Probability Distribution
/** Generates a Bernoulli random variable. */
function bernoulli(p = 0.5) {
    return (Math.random() < p ? 1 : 0);
}
/** Generates a Binomial random variable. */
function binomial$1(n = 1, p = 0.5) {
    let t = 0;
    for (let i = 0; i < n; ++i)
        t += bernoulli(p);
    return t;
}
/** Generates a Poisson random variable. */
function poisson(l = 1) {
    if (l <= 0)
        return 0;
    const L = Math.exp(-l);
    let p = 1;
    let k = 0;
    for (; p > L; ++k)
        p *= Math.random();
    return k - 1;
}
/** Generates a uniform random variable. */
function uniform(a = 0, b = 1) {
    return a + (b - a) * Math.random();
}
/** Generates a normal random variable with mean m and variance v. */
function normal(m = 0, v = 1) {
    const u1 = Math.random();
    const u2 = Math.random();
    const rand = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return rand * Math.sqrt(v) + m;
}
/** Generates an exponential random variable. */
function exponential(l = 1) {
    return l <= 0 ? 0 : -Math.log(Math.random()) / l;
}
/** Generates a geometric random variable. */
function geometric(p = 0.5) {
    if (p <= 0 || p > 1)
        return undefined;
    return Math.floor(Math.log(Math.random()) / Math.log(1 - p));
}
/** Generates an Cauchy random variable. */
function cauchy() {
    let rr;
    let v1;
    let v2;
    do {
        v1 = 2 * Math.random() - 1;
        v2 = 2 * Math.random() - 1;
        rr = v1 * v1 + v2 * v2;
    } while (rr >= 1);
    return v1 / v2;
}
// ---------------------------------------------------------------------------
// PDFs and CDFs
/** Generates pdf(x) for the normal distribution with mean m and variance v. */
function normalPDF(x, m = 1, v = 0) {
    return Math.exp(-((x - m) ** 2) / (2 * v)) / Math.sqrt(2 * Math.PI * v);
}
const G = 7;
const P = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
];
function gamma(z) {
    if (z < 0.5)
        return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    z -= 1;
    let x = P[0];
    for (let i = 1; i < G + 2; i++)
        x += P[i] / (z + i);
    const t = z + G + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}
/** Riemann-integrates fn(x) from xMin to xMax with an interval size dx. */
function integrate(fn, xMin, xMax, dx = 1) {
    let result = 0;
    for (let x = xMin; x < xMax; x += dx) {
        result += (fn(x) * dx || 0);
    }
    return result;
}
/** The chi CDF function. */
function chiCDF(chi, deg) {
    const int = integrate(t => Math.pow(t, (deg - 2) / 2) * Math.exp(-t / 2), 0, chi);
    return 1 - int / Math.pow(2, deg / 2) / gamma(deg / 2);
}

var random = /*#__PURE__*/Object.freeze({
    __proto__: null,
    shuffle: shuffle,
    integer: integer,
    weighted: weighted,
    smart: smart,
    bernoulli: bernoulli,
    binomial: binomial$1,
    poisson: poisson,
    uniform: uniform,
    normal: normal,
    exponential: exponential,
    geometric: geometric,
    cauchy: cauchy,
    normalPDF: normalPDF,
    integrate: integrate,
    chiCDF: chiCDF
});

// =============================================================================
function evaluatePolynomial(regression, x) {
    let xs = 1;
    let t = regression[0];
    for (let i = 1; i < regression.length; ++i) {
        xs *= x;
        t += xs * regression[i];
    }
    return t;
}
/**
 * Finds a linear regression that best approximates a set of data. The result
 * will be an array [c, m], where y = m * x + c.
 */
function linear(data, throughOrigin = false) {
    let sX = 0;
    let sY = 0;
    let sXX = 0;
    let sXY = 0;
    const len = data.length;
    for (let n = 0; n < len; n++) {
        sX += data[n][0];
        sY += data[n][1];
        sXX += data[n][0] * data[n][0];
        sXY += data[n][0] * data[n][1];
    }
    if (throughOrigin) {
        const gradient = sXY / sXX;
        return [0, gradient];
    }
    const gradient = (len * sXY - sX * sY) / (len * sXX - sX * sX);
    const intercept = (sY / len) - (gradient * sX) / len;
    return [intercept, gradient];
}
/**
 * Finds an exponential regression that best approximates a set of data. The
 * result will be an array [a, b], where y = a * e^(bx).
 */
function exponential$1(data) {
    const sum = [0, 0, 0, 0, 0, 0];
    for (const d of data) {
        sum[0] += d[0];
        sum[1] += d[1];
        sum[2] += d[0] * d[0] * d[1];
        sum[3] += d[1] * Math.log(d[1]);
        sum[4] += d[0] * d[1] * Math.log(d[1]);
        sum[5] += d[0] * d[1];
    }
    const denominator = (sum[1] * sum[2] - sum[5] * sum[5]);
    const a = Math.exp((sum[2] * sum[3] - sum[5] * sum[4]) / denominator);
    const b = (sum[1] * sum[4] - sum[5] * sum[3]) / denominator;
    return [a, b];
}
/**
 * Finds a logarithmic regression that best approximates a set of data. The
 * result will be an array [a, b], where y = a + b * log(x).
 */
function logarithmic(data) {
    const sum = [0, 0, 0, 0];
    const len = data.length;
    for (const d of data) {
        sum[0] += Math.log(d[0]);
        sum[1] += d[1] * Math.log(d[0]);
        sum[2] += d[1];
        sum[3] += Math.pow(Math.log(d[0]), 2);
    }
    const b = (len * sum[1] - sum[2] * sum[0]) /
        (len * sum[3] - sum[0] * sum[0]);
    const a = (sum[2] - b * sum[0]) / len;
    return [a, b];
}
/**
 * Finds a power regression that best approximates a set of data. The result
 * will be an array [a, b], where y = a * x^b.
 */
function power(data) {
    const sum = [0, 0, 0, 0];
    const len = data.length;
    for (const d of data) {
        sum[0] += Math.log(d[0]);
        sum[1] += Math.log(d[1]) * Math.log(d[0]);
        sum[2] += Math.log(d[1]);
        sum[3] += Math.pow(Math.log(d[0]), 2);
    }
    const b = (len * sum[1] - sum[2] * sum[0]) /
        (len * sum[3] - sum[0] * sum[0]);
    const a = Math.exp((sum[2] - b * sum[0]) / len);
    return [a, b];
}
/**
 * Finds a polynomial regression of given `order` that best approximates a set
 * of data. The result will be an array giving the coefficients of the
 * resulting polynomial.
 */
function polynomial(data, order = 2) {
    // X = [[1, x1, x1^2], [1, x2, x2^2], [1, x3, x3^2]
    // y = [y1, y2, y3]
    const X = data.map(d => core.list(order + 1).map(p => Math.pow(d[0], p)));
    const XT = transpose(X);
    const y = data.map(d => [d[1]]);
    const XTX = product(XT, X); // XT*X
    const inv = inverse(XTX); // (XT*X)^(-1)
    const r = product(inv, XT, y); // (XT*X)^(-1) * XT * y
    return r.map(x => x[0]); // Flatten matrix
}
// ---------------------------------------------------------------------------
// Regression Coefficient
/**
 * Finds the regression coefficient of a given data set and regression
 * function.
 */
function coefficient(data, fn) {
    const total = data.reduce((sum, d) => sum + d[1], 0);
    const mean = total / data.length;
    // Sum of squares of differences from the mean in the dependent variable
    const ssyy = data.reduce((sum, d) => sum + (d[1] - mean) ** 2, 0);
    // Sum of squares of residuals
    const sse = data.reduce((sum, d) => sum + (d[1] - fn(d[0])) ** 2, 0);
    return 1 - (sse / ssyy);
}
// ---------------------------------------------------------------------------
// Multi-Regression
/** Finds the most suitable polynomial regression for a given dataset. */
function bestPolynomial(data, threshold = 0.85, maxOrder = 8) {
    if (data.length <= 1)
        return undefined;
    for (let i = 1; i < maxOrder; ++i) {
        const reg = polynomial(data, i);
        const fn = (x) => evaluatePolynomial(reg, x);
        const coeff = coefficient(data, fn);
        if (coeff >= threshold)
            return { order: i, coefficients: reg, fn };
    }
    return undefined;
}

var regression = /*#__PURE__*/Object.freeze({
    __proto__: null,
    linear: linear,
    exponential: exponential$1,
    logarithmic: logarithmic,
    power: power,
    polynomial: polynomial,
    coefficient: coefficient,
    bestPolynomial: bestPolynomial
});

// ============================================================================
/** Calculates the mean of an array of numbers. */
function mean(values) {
    return values.length ? core.total(values) / values.length : 0;
}
/** Calculates the median of an array of numbers. */
function median(values) {
    const n = values.length;
    if (!n)
        return 0;
    const sorted = values.slice(0).sort();
    return (n % 2 === 1) ? sorted[Math.floor(n / 2)] :
        (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
}
/**
 * Calculates the mode of an array of numbers. Returns undefined if no mode
 * exists, i.e. there are multiple values with the same largest count.
 */
function mode(values) {
    const counts = new Map();
    let maxCount = -1;
    let result = undefined;
    for (const v of values) {
        if (!counts.has(v)) {
            counts.set(v, 1);
        }
        else {
            const newCount = counts.get(v) + 1;
            counts.set(v, newCount);
            if (newCount === maxCount) {
                result = undefined;
            }
            else if (newCount > maxCount) {
                maxCount = newCount;
                result = v;
            }
        }
    }
    return result;
}
/** Calculates the variance of an array of numbers. */
function variance(values) {
    if (!values.length)
        return undefined;
    const m = mean(values);
    const sum = values.reduce((a, v) => a + (v - m) ** 2, 0);
    return sum / (values.length - 1);
}
/** Calculates the standard deviation of an array of numbers. */
function stdDev(values) {
    const v = variance(values);
    return v ? Math.sqrt(v) : 0;
}
/** Calculates the covariance of the numbers in two arrays aX and aY. */
function covariance(aX, aY) {
    if (aX.length !== aY.length)
        throw new Error('Array length mismatch.');
    const sum = aX.reduce((a, v, i) => a + v * aY[i], 0);
    return (sum - core.total(aX) * core.total(aY) / aX.length) / aX.length;
}
/** Calculates the correlation between the numbers in two arrays aX and aY. */
function correlation(aX, aY) {
    if (aX.length !== aY.length)
        throw new Error('Array length mismatch.');
    const covarXY = covariance(aX, aY);
    const stdDevX = stdDev(aX);
    const stdDevY = stdDev(aY);
    return covarXY / (stdDevX * stdDevY);
}

// =============================================================================
/** A n-dimensional Vector class. */
class Vector extends Array {
    constructor(...args) {
        super();
        for (const i of args)
            this.push(i);
    }
    /** Returns the magnitude of the Vector */
    get magnitude() {
        let squares = 0;
        for (let i = 0; i < this.length; ++i)
            squares += this[i] ** 2;
        return Math.sqrt(squares);
    }
    /** Returns the unitVector of the Vector */
    get unitVector() {
        return this.scale(1 / this.magnitude);
    }
    /** Scales this vector by a factor q. */
    scale(q) {
        return this.map((x) => q * x);
    }
    // -------------------------------------------------------------------------
    /** Calculates the sum of two vectors v1 and v2. */
    static sum(v1, v2) {
        if (v1.length !== v2.length)
            throw new Error('Mismatched vector sizes.');
        return v1.map((v, i) => v + v2[i]);
    }
    /** Calculates the difference of two vectors v1 and v2. */
    static difference(v1, v2) {
        if (v1.length !== v2.length)
            throw new Error('Mismatched vector sizes.');
        return v1.map((v, i) => v - v2[i]);
    }
    /** Calculates the element-wise product of two vectors v1 and v2. */
    static product(v1, v2) {
        if (v1.length !== v2.length)
            throw new Error('Mismatched vector sizes.');
        return v1.map((v, i) => v * v2[i]);
    }
    /** Calculates the dot product of two vectors v1 and v2. */
    static dot(v1, v2) {
        return core.total(Vector.product(v1, v2));
    }
    /** Finds the cross product of two 3-dimensional vectors v1 and v2. */
    static cross(v1, v2) {
        if (v1.length !== 3 || v2.length !== 3) {
            throw new Error('Cross product requires vectors of size 3.');
        }
        return new Vector(v1[1] * v2[2] - v1[2] * v2[1], v1[2] * v2[0] - v1[0] * v2[2], v1[0] * v2[1] - v1[1] * v2[0]);
    }
    /** Checks if two vectors are equal. */
    static equals(v1, v2) {
        const n = v1.length;
        if (n !== v2.length)
            return false;
        for (let i = 0; i < n; ++i)
            if (!nearlyEquals(v1[i], v2[i]))
                return false;
        return true;
    }
}

exports.Angle = Angle;
exports.Arc = Arc;
exports.Bounds = Bounds;
exports.Circle = Circle;
exports.Complex = Complex;
exports.Fraction = Fraction;
exports.Line = Line;
exports.Matrix = matrix;
exports.Point = Point;
exports.Polygon = Polygon;
exports.Polyline = Polyline;
exports.Random = random;
exports.Ray = Ray;
exports.Rectangle = Rectangle;
exports.Regression = regression;
exports.Sector = Sector;
exports.Segment = Segment;
exports.Triangle = Triangle;
exports.Vector = Vector;
exports.binomial = binomial;
exports.clamp = clamp;
exports.correlation = correlation;
exports.covariance = covariance;
exports.cube = cube;
exports.digits = digits;
exports.eulerPhi = eulerPhi;
exports.factorial = factorial;
exports.gcd = gcd;
exports.generatePrime = generatePrime;
exports.goldbach = goldbach;
exports.intersections = intersections;
exports.isAngle = isAngle;
exports.isArc = isArc;
exports.isBetween = isBetween;
exports.isCircle = isCircle;
exports.isInteger = isInteger;
exports.isLineLike = isLineLike;
exports.isPoint = isPoint;
exports.isPolygonLike = isPolygonLike;
exports.isPrime = isPrime;
exports.isSector = isSector;
exports.lcm = lcm;
exports.lerp = lerp;
exports.listPrimes = listPrimes;
exports.log = log;
exports.mean = mean;
exports.median = median;
exports.mod = mod;
exports.mode = mode;
exports.nearlyEquals = nearlyEquals;
exports.numberFormat = numberFormat;
exports.parseNumber = parseNumber;
exports.permutations = permutations;
exports.primeFactorisation = primeFactorisation;
exports.primeFactors = primeFactors;
exports.quadratic = quadratic;
exports.round = round;
exports.roundTo = roundTo;
exports.sign = sign;
exports.square = square;
exports.stdDev = stdDev;
exports.subsets = subsets;
exports.toFraction = toFraction;
exports.toOrdinal = toOrdinal;
exports.toWord = toWord;
exports.variance = variance;

},{"@mathigon/core":2}]},{},[1]);
