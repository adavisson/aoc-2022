import {readFileSync} from "fs";

const parseFile = () => {
  const file = readFileSync('./input.txt', 'utf-8');
  return file.split('\n');
}

const splitPairs = (pair: string) => {
  return pair.split(",");
}

const buildRange = (elfAssignment: string) => {
  const [beginningIndex, finalIndex] = elfAssignment.split("-");
  
  let range: Array<number> = [];

  for (let i = parseInt(beginningIndex); i <= parseInt(finalIndex); i++){
    range.push(i);
  } 

  return range;
}

const compareRangesForFullOverlap = (range1: Array<number>, range2: Array<number>) => {
  return range1.every(section => range2.includes(section)) || range2.every(section => range1.includes(section));
}

const compareRangesForPartialOverlap = (range1: Array<number>, range2: Array<number>) => {
  return range1.find(section => range2.includes(section)) || range2.find(section => range1.includes(section))
}

const determineFullOverlaps = (pairs: Array<string>) => {
  let overlaps = 0
  for (const pair of pairs) {
    const [firstPair, secondPair] = splitPairs(pair);
    const [range1, range2] = [buildRange(firstPair), buildRange(secondPair)];
    if (compareRangesForFullOverlap(range1, range2)) overlaps++ ;
  }

  return overlaps
}

const determinePartialOverlaps = (pairs: Array<string>) => {
  let overlaps = 0
  for (const pair of pairs) {
    const [firstPair, secondPair] = splitPairs(pair);
    const [range1, range2] = [buildRange(firstPair), buildRange(secondPair)];
    if (compareRangesForPartialOverlap(range1, range2)) overlaps++ ;
  }

  return overlaps
}



const elfPairs = parseFile();

const numberOfFullOverlaps = determineFullOverlaps(elfPairs);
const numberOfPartialOverlaps = determinePartialOverlaps(elfPairs);

console.log({numberOfFullOverlaps, numberOfPartialOverlaps});