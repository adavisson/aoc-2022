"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var items = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var parseFile = function () {
    var file = (0, fs_1.readFileSync)("./input.txt", "utf-8");
    return file.split("\n");
};
var splitRuckSack = function (rucksack) {
    var midPoint = rucksack.length / 2;
    return [rucksack.slice(0, midPoint), rucksack.slice(midPoint)];
};
var findOutlier = function (compartment1, compartment2) {
    var compartment1Array = compartment1.split("");
    var compartment2Array = compartment2.split("");
    for (var _i = 0, compartment1Array_1 = compartment1Array; _i < compartment1Array_1.length; _i++) {
        var item1 = compartment1Array_1[_i];
        for (var _a = 0, compartment2Array_1 = compartment2Array; _a < compartment2Array_1.length; _a++) {
            var item2 = compartment2Array_1[_a];
            if (item1 === item2)
                return item1;
        }
    }
};
var findBadge = function (elf1, elf2, elf3) {
    var elf1Array = elf1.split("");
    var elf2Array = elf2.split("");
    var elf3Array = elf3.split("");
    for (var _i = 0, elf1Array_1 = elf1Array; _i < elf1Array_1.length; _i++) {
        var item1 = elf1Array_1[_i];
        for (var _a = 0, elf2Array_1 = elf2Array; _a < elf2Array_1.length; _a++) {
            var item2 = elf2Array_1[_a];
            for (var _b = 0, elf3Array_1 = elf3Array; _b < elf3Array_1.length; _b++) {
                var item3 = elf3Array_1[_b];
                if (item1 === item2 && item2 === item3)
                    return item1;
            }
        }
    }
};
var getElfBadges = function (elves) {
    var badges = [];
    for (var i = 0; i < elves.length; i += 3) {
        badges.push(findBadge(elves[i], elves[i + 1], elves[i + 2]));
    }
    return badges;
};
var getAllOutliers = function (rucksacks) {
    return rucksacks.map(function (rucksack) {
        var _a = splitRuckSack(rucksack), compartment1 = _a[0], compartment2 = _a[1];
        return findOutlier(compartment1, compartment2);
    });
};
var calculatePriority = function (unsortedItems) {
    var priority = 0;
    unsortedItems.forEach(function (unsortedItem) { return priority += (items.findIndex(function (item) { return item === unsortedItem; }) + 1); });
    return priority;
};
var rucksacks = parseFile();
var outliers = getAllOutliers(rucksacks);
var totalPriority1 = calculatePriority(outliers);
var elfBadges = getElfBadges(rucksacks);
var totalPriority2 = calculatePriority(elfBadges);
console.dir({ totalPriority1: totalPriority1, totalPriority2: totalPriority2 });
