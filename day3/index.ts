import {readFileSync} from "fs"

const items = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const parseFile = () => {
  const file = readFileSync("./input.txt", "utf-8");
  return file.split("\n");
}

const splitRuckSack = (rucksack: string) => {
  const midPoint = rucksack.length / 2;
  return [rucksack.slice(0, midPoint), rucksack.slice(midPoint)];
}

const findOutlier = (compartment1: string, compartment2: string) => {
  const compartment1Array = compartment1.split("");
  const compartment2Array = compartment2.split("");

  for (const item1 of compartment1Array) {
    for (const item2 of compartment2Array) {
      if (item1 === item2) return item1;
    }
  }
}

const findBadge = (elf1: string, elf2: string, elf3: string) => {
  const elf1Array = elf1.split("");
  const elf2Array = elf2.split("");
  const elf3Array = elf3.split("");

  for (const item1 of elf1Array) {
    for (const item2 of elf2Array) {
      for (const item3 of elf3Array) {
        if (item1 === item2 && item2 === item3) return item1;
      }
    }
  }
}

const getElfBadges = (elves: Array<string>) => {
  const badges: Array<string | undefined> = []
  for (let i = 0; i < elves.length; i += 3) {
    badges.push(findBadge(elves[i], elves[i+1], elves[i+2]));
  }

  return badges;
}

const getAllOutliers = (rucksacks: Array<string>) => {
  return rucksacks.map(rucksack => {
    const [compartment1, compartment2] = splitRuckSack(rucksack);
    return findOutlier(compartment1, compartment2);
  })
}

const calculatePriority = (unsortedItems: Array<string | undefined>) => {
  let priority = 0;

  unsortedItems.forEach(unsortedItem => priority += (items.findIndex(item => item === unsortedItem) + 1));

  return priority;
}

const rucksacks = parseFile();
const outliers = getAllOutliers(rucksacks);
const totalPriority1 = calculatePriority(outliers);

const elfBadges = getElfBadges(rucksacks);
const totalPriority2 = calculatePriority(elfBadges)



console.dir({totalPriority1, totalPriority2});


