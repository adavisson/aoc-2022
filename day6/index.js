"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var parseFile = function () {
    return (0, fs_1.readFileSync)("./input.txt", "utf-8");
};
var findFirstMarker = function (buffer, markerLength) {
    var marker = markerLength;
    while (marker < buffer.length) {
        var section = buffer.slice(marker - markerLength, marker);
        if (!/(.).*\1/.test(section))
            return marker;
        marker++;
    }
};
var data = parseFile();
var packetMarker = findFirstMarker(data, 4);
var messageMarker = findFirstMarker(data, 14);
console.log({ packetMarker: packetMarker, messageMarker: messageMarker });
