"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var parseFile = function () {
    var file = (0, fs_1.readFileSync)("./input.txt", "utf-8");
    return file.split('\n');
};
var determineScore = function (opponentPlay, myPlay) {
    var score = myPlay === "X" ? 1 : myPlay === "Y" ? 2 : 3;
    if ((opponentPlay === "A" && myPlay === "X") || (opponentPlay === "B" && myPlay === "Y") || (opponentPlay === "C" && myPlay === "Z")) {
        score += 3;
    }
    else if ((opponentPlay === "A" && myPlay === "Y") || (opponentPlay === "B" && myPlay === "Z") || (opponentPlay === "C" && myPlay === "X")) {
        score += 6;
    }
    return score;
};
var determineScore2 = function (opponentPlay, myPlay) {
    var score = myPlay === "X" ? 0 : myPlay === "Y" ? 3 : 6;
    if (myPlay === "X") {
        if (opponentPlay === "A") {
            score += 3;
        }
        else if (opponentPlay === "B") {
            score += 1;
        }
        else {
            score += 2;
        }
    }
    else if (myPlay === "Y") {
        if (opponentPlay === "A") {
            score += 1;
        }
        else if (opponentPlay === "B") {
            score += 2;
        }
        else {
            score += 3;
        }
    }
    else {
        if (opponentPlay === "A") {
            score += 2;
        }
        else if (opponentPlay === "B") {
            score += 3;
        }
        else {
            score += 1;
        }
    }
    return score;
};
var playGame = function (data) {
    return data.map(function (game) {
        var _a = game.split(" "), opponentPlay = _a[0], myPlay = _a[1];
        return determineScore(opponentPlay, myPlay);
    });
};
var playGame2 = function (data) {
    return data.map(function (game) {
        var _a = game.split(" "), opponentPlay = _a[0], myPlay = _a[1];
        return determineScore2(opponentPlay, myPlay);
    });
};
var calculateFinalScore = function (scores) {
    var finalScore = 0;
    scores.forEach(function (score) { return finalScore += score; });
    return finalScore;
};
var data = parseFile();
var gameScores = playGame(data);
var gameScores2 = playGame2(data);
var finalScore = calculateFinalScore(gameScores);
var finalScore2 = calculateFinalScore(gameScores2);
console.log({ finalScore: finalScore, finalScore2: finalScore2 });
