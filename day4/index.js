"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var parseFile = function () {
    var file = (0, fs_1.readFileSync)('./input.txt', 'utf-8');
    return file.split('\n');
};
var splitPairs = function (pair) {
    return pair.split(",");
};
var buildRange = function (elfAssignment) {
    var _a = elfAssignment.split("-"), beginningIndex = _a[0], finalIndex = _a[1];
    var range = [];
    for (var i = parseInt(beginningIndex); i <= parseInt(finalIndex); i++) {
        range.push(i);
    }
    return range;
};
var compareRangesForFullOverlap = function (range1, range2) {
    return range1.every(function (section) { return range2.includes(section); }) || range2.every(function (section) { return range1.includes(section); });
};
var compareRangesForPartialOverlap = function (range1, range2) {
    return range1.find(function (section) { return range2.includes(section); }) || range2.find(function (section) { return range1.includes(section); });
};
var determineFullOverlaps = function (pairs) {
    var overlaps = 0;
    for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
        var pair = pairs_1[_i];
        var _a = splitPairs(pair), firstPair = _a[0], secondPair = _a[1];
        var _b = [buildRange(firstPair), buildRange(secondPair)], range1 = _b[0], range2 = _b[1];
        if (compareRangesForFullOverlap(range1, range2))
            overlaps++;
    }
    return overlaps;
};
var determinePartialOverlaps = function (pairs) {
    var overlaps = 0;
    for (var _i = 0, pairs_2 = pairs; _i < pairs_2.length; _i++) {
        var pair = pairs_2[_i];
        var _a = splitPairs(pair), firstPair = _a[0], secondPair = _a[1];
        var _b = [buildRange(firstPair), buildRange(secondPair)], range1 = _b[0], range2 = _b[1];
        if (compareRangesForPartialOverlap(range1, range2))
            overlaps++;
    }
    return overlaps;
};
var elfPairs = parseFile();
var numberOfFullOverlaps = determineFullOverlaps(elfPairs);
var numberOfPartialOverlaps = determinePartialOverlaps(elfPairs);
console.log({ numberOfFullOverlaps: numberOfFullOverlaps, numberOfPartialOverlaps: numberOfPartialOverlaps });
