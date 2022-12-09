"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var directoryStructure = [];
var parentDirectory = undefined;
var fileList = {};
var parseFile = function () {
    var file = (0, fs_1.readFileSync)('./input.txt', 'utf-8');
    return file.split('\n');
};
var formatTerminalData = function (terminalData) {
    return terminalData.map(function (line) {
        var command = line.split(' ');
        return command[0] === '$' ? command.slice(1).join(' ') : command.join(' ');
    });
};
var addToParent = function (_a) {
    var structure = _a.structure, type = _a.type, name = _a.name, size = _a.size;
    return structure.some(function (directory) {
        if (directory.name === parentDirectory) {
            switch (type) {
                case 'DIRECTORY':
                    directory.directories.push({
                        name: name,
                        directories: [],
                        files: [],
                        size: 0,
                        type: type
                    });
                    break;
                case 'FILE':
                    directory.files.push({
                        name: name,
                        type: type,
                        size: size
                    });
            }
        }
        else {
            addToParent({ structure: directory.directories, name: name, type: type, size: size });
        }
    });
};
var getNewParent = function (structure, parentDirectory) {
    return structure.some(function (level) {
        if (!!parentDirectory &&
            level.directories.map(function (dir) { return dir.name; }).includes(parentDirectory)) {
            parentDirectory = level.name;
        }
        else {
            getNewParent(level.directories, parentDirectory);
        }
    });
};
var changeDirectory = function (directoryName) {
    if (directoryName === '..') {
        getNewParent(directoryStructure, parentDirectory);
    }
    else if (directoryName === '/') {
        directoryStructure.push({
            type: 'DIRECTORY',
            name: '/',
            directories: [],
            files: [],
            size: 0
        });
        parentDirectory = directoryName;
    }
    else {
        addToParent({
            type: 'DIRECTORY',
            name: directoryName,
            size: 0,
            structure: directoryStructure
        });
        parentDirectory = directoryName;
    }
};
var handleCommand = function (command) {
    var _a = command.split(' '), arg1 = _a[0], arg2 = _a[1];
    switch (arg1) {
        case 'cd':
            changeDirectory(arg2);
        case 'ls':
        case 'dir':
            break;
        default: // number
            addToParent({
                structure: directoryStructure,
                size: parseInt(arg1),
                name: arg2,
                type: 'FILE'
            });
    }
};
var readDirectory = function (terminalData) {
    var output = formatTerminalData(terminalData);
    output.forEach(function (command) { return handleCommand(command); });
};
var getDirectoriesToRemove = function (structure) {
    return structure.forEach(function (level) {
        if (level.type === 'DIRECTORY') {
            if (level.size <= 100000) {
                fileList[level.name] = level.size;
            }
            getDirectoriesToRemove(level.directories);
        }
    });
};
var getTotalSize = function (objects) {
    var sizesArray = objects.map(function (_) { return _.size; });
    var totalSize = 0;
    sizesArray.forEach(function (size) { return (totalSize += size); });
    return totalSize;
};
var calculateSizes = function (structure) {
    return structure.forEach(function (level) {
        if (!!level.directories.length) {
            calculateSizes(level.directories);
            level.size =
                level.size +
                    getTotalSize(level.directories) +
                    getTotalSize(level.files);
        }
        else {
            if (!!level.files.length) {
                level.size += getTotalSize(level.files);
            }
        }
    });
};
var totalSizeOfFilesToRemove = function (filesToRemove) {
    var sizes = Object.values(filesToRemove);
    var totalSize = 0;
    sizes.forEach(function (size) { return (totalSize += size); });
    return totalSize;
};
var data = parseFile();
readDirectory(data);
calculateSizes(directoryStructure);
getDirectoriesToRemove(directoryStructure);
var totalSize = totalSizeOfFilesToRemove(fileList);
console.log(totalSize);
