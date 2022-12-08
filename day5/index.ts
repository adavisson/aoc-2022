import {readFileSync} from "fs";

const initialSetup: Array<Array<string>> = [
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

const parseFile = () => {
  const file = readFileSync("./steps.txt", "utf-8");
  return file.split("\n");
} 

const buildStepObjects = (stepList: Array<string>) => {
  return stepList.map(step => {
    const test = step.split(" ");
    return {
      [test[0]]: parseInt(test[1]),
      [test[2]]: parseInt(test[3]),
      [test[4]]: parseInt(test[5]),
    };
  });
}

const performStep = (step: Record<string, number>, stack: Array<Array<string>>) => {
  for (let i = 0; i < step.move; i++){
    stack[step.to - 1].push(stack[step.from - 1].pop()!);
  }
}

const performEnhancedStep = (step: Record<string, number>, stack: Array<Array<string>>) => {
  const removedBoxes = stack[step.from - 1].splice(-(step.move))
  for(const box of removedBoxes) {
    stack[step.to - 1].push(box);
  }
}

const moveStacks = (steps: Array<Record<string, number>>) => {
  const copyOfInitialSetup = JSON.parse(JSON.stringify(initialSetup));

  steps.forEach(step => performStep(step, copyOfInitialSetup));

  return copyOfInitialSetup;
}

const moveStacksEnhanced = (steps: Array<Record<string, number>>) => {
  const copyOfInitialSetup = JSON.parse(JSON.stringify(initialSetup));

  steps.forEach(step => performEnhancedStep(step, copyOfInitialSetup));

  return copyOfInitialSetup;
}

const getTopBoxes = (stacks: Array<Array<string>>) => {
  return stacks.map(stack => stack[stack.length-1]).join("");
}

const stepList = parseFile();
const steps = buildStepObjects(stepList);

// part 1
const finalSetup = moveStacks(steps);
const topBoxes = getTopBoxes(finalSetup);

// part 2
const finalSetup2 = moveStacksEnhanced(steps);
const topBoxes2 = getTopBoxes(finalSetup2)

console.log({topBoxes, topBoxes2});
