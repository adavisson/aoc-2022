import { readFileSync } from 'fs';

type FileType = {
  name: string;
  size: number;
  type: 'FILE';
};

type DirectoryType = {
  name: string;
  directories: Array<DirectoryType>;
  files: Array<FileType>;
  size: number;
  type: 'DIRECTORY';
};

const directoryStructure: Array<DirectoryType> = [];
let parentDirectory: string | undefined = undefined;
const fileList: Record<string, number> = {};

const parseFile = () => {
  const file = readFileSync('./input.txt', 'utf-8');
  return file.split('\n');
};

const formatTerminalData = (terminalData: Array<string>) => {
  return terminalData.map(line => {
    const command = line.split(' ');
    return command[0] === '$' ? command.slice(1).join(' ') : command.join(' ');
  });
};

const addToParent = ({
  structure,
  type,
  name,
  size,
}: {
  structure: Array<DirectoryType>;
  type: 'DIRECTORY' | 'FILE';
  name: string;
  size: number;
}) => {
  return structure.some(directory => {
    if (directory.name === parentDirectory) {
      switch (type) {
        case 'DIRECTORY':
          directory.directories.push({
            name,
            directories: [],
            files: [],
            size: 0,
            type,
          });
          break;
        case 'FILE':
          directory.files.push({
            name,
            type,
            size,
          });
      }
    } else {
      addToParent({ structure: directory.directories, name, type, size });
    }
  });
};

const getNewParent = (
  structure: Array<DirectoryType>,
  parentDirectory: string | undefined,
) => {
  return structure.some(level => {
    if (
      !!parentDirectory &&
      level.directories.map(dir => dir.name).includes(parentDirectory)
    ) {
      parentDirectory = level.name;
    } else {
      getNewParent(level.directories, parentDirectory);
    }
  });
};

const changeDirectory = (directoryName: string) => {
  if (directoryName === '..') {
    getNewParent(directoryStructure, parentDirectory);
  } else if (directoryName === '/') {
    directoryStructure.push({
      type: 'DIRECTORY',
      name: '/',
      directories: [],
      files: [],
      size: 0,
    });
    parentDirectory = directoryName;
  } else {
    addToParent({
      type: 'DIRECTORY',
      name: directoryName,
      size: 0,
      structure: directoryStructure,
    });
    parentDirectory = directoryName;
  }
};

const handleCommand = (command: string) => {
  const [arg1, arg2] = command.split(' ');

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
        type: 'FILE',
      });
  }
};

const readDirectory = (terminalData: Array<string>) => {
  const output = formatTerminalData(terminalData);
  output.forEach(command => handleCommand(command));
};

const getDirectoriesToRemove = (structure: Array<DirectoryType>) => {
  return structure.forEach(level => {
    if (level.type === 'DIRECTORY') {
      if (level.size <= 100000) {
        fileList[level.name] = level.size;
      }
      getDirectoriesToRemove(level.directories);
    }
  });
};

const getTotalSize = (objects: Array<{ size: number }>) => {
  const sizesArray = objects.map(_ => _.size);

  let totalSize = 0;

  sizesArray.forEach(size => (totalSize += size));

  return totalSize;
};

const calculateSizes = (structure: Array<DirectoryType>) => {
  return structure.forEach(level => {
    if (!!level.directories.length) {
      calculateSizes(level.directories);
      level.size =
        level.size +
        getTotalSize(level.directories) +
        getTotalSize(level.files);
    } else {
      if (!!level.files.length) {
        level.size += getTotalSize(level.files);
      }
    }
  });
};

const totalSizeOfFilesToRemove = (filesToRemove: Record<string, number>) => {
  const sizes = Object.values(filesToRemove);
  let totalSize = 0;

  sizes.forEach(size => (totalSize += size));

  return totalSize;
};

const data = parseFile();
readDirectory(data);
calculateSizes(directoryStructure);
getDirectoriesToRemove(directoryStructure);
const totalSize = totalSizeOfFilesToRemove(fileList);

console.log(totalSize);
