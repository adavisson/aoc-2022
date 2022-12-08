"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var caloriesByElf = [{ calories: 0 }];
var parseFile = function () {
    var file = (0, fs_1.readFileSync)('./input.txt', 'utf-8');
    var data = file.split('\n');
    var index = 0;
    data.forEach(function (calorie) {
        if (!calorie) {
            index++;
            caloriesByElf.push({ calories: 0 });
            return;
        }
        caloriesByElf[index].calories += parseInt(calorie);
    });
};
var sortElvesByCalories = function () {
    caloriesByElf.sort(function (a, b) { return a.calories > b.calories ? -1 : 1; });
};
parseFile();
sortElvesByCalories();
console.log("Most calories: ".concat(caloriesByElf[0].calories));
console.log("Total of top 3 elves: ".concat(caloriesByElf[0].calories + caloriesByElf[1].calories + caloriesByElf[2].calories));
