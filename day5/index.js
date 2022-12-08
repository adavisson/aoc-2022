"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var initialSetup = [
    ["Q", "S", "W", "C", "Z", "V", "F", "T"],
    ["Q", "R", "B"],
    ["B", "Z", "T", "Q", "P", "M", "S"],
    ["D", "V", "F", "R", "Q", "H"],
    ["J", "G", "L", "D", "B", "S", "T", "P"],
    ["W", "R", "T", "Z"],
    ["H", "Q", "M", "N", "S", "F", "R", "J"],
    ["R", "N", "F", "H", "W"],
    ["J", "Z", "T", "Q", "P", "R", "B"],
];
var parseFile = function () {
    var file = (0, fs_1.readFileSync)("./steps.txt", "utf-8");
    return file.split("\n");
};
var buildStepObjects = function (stepList) {
    return stepList.map(function (step) {
        var _a;
        var test = step.split(" ");
        return _a = {},
            _a[test[0]] = parseInt(test[1]),
            _a[test[2]] = parseInt(test[3]),
            _a[test[4]] = parseInt(test[5]),
            _a;
    });
};
var performStep = function (step, stack) {
    for (var i = 0; i < step.move; i++) {
        stack[step.to - 1].push(stack[step.from - 1].pop());
    }
};
var performEnhancedStep = function (step, stack) {
    var removedBoxes = stack[step.from - 1].splice(-(step.move));
    for (var _i = 0, removedBoxes_1 = removedBoxes; _i < removedBoxes_1.length; _i++) {
        var box = removedBoxes_1[_i];
        stack[step.to - 1].push(box);
    }
};
var moveStacks = function (steps) {
    var copyOfInitialSetup = JSON.parse(JSON.stringify(initialSetup));
    steps.forEach(function (step) { return performStep(step, copyOfInitialSetup); });
    return copyOfInitialSetup;
};
var moveStacksEnhanced = function (steps) {
    var copyOfInitialSetup = JSON.parse(JSON.stringify(initialSetup));
    steps.forEach(function (step) { return performEnhancedStep(step, copyOfInitialSetup); });
    return copyOfInitialSetup;
};
var getTopBoxes = function (stacks) {
    return stacks.map(function (stack) { return stack[stack.length - 1]; }).join("");
};
var stepList = parseFile();
var steps = buildStepObjects(stepList);
// part 1
var finalSetup = moveStacks(steps);
var topBoxes = getTopBoxes(finalSetup);
// part 2
var finalSetup2 = moveStacksEnhanced(steps);
var topBoxes2 = getTopBoxes(finalSetup2);
console.log({ topBoxes: topBoxes, topBoxes2: topBoxes2 });
