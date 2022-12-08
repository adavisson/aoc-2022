import {readFileSync} from "fs";

type ElfCaloriesType ={
  calories: number
};

const caloriesByElf: Array<ElfCaloriesType> = [{calories: 0}]

const parseFile = () => {
  const file = readFileSync('./input.txt', 'utf-8')
  const data = file.split('\n')

  let index = 0;
  data.forEach((calorie: string) => {
    if (!calorie) {
      index++
      caloriesByElf.push({calories: 0})
      return
    }
    caloriesByElf[index].calories += parseInt(calorie)
  })
} 

const sortElvesByCalories = () => {
  caloriesByElf.sort((a, b) => a.calories > b.calories ? -1 : 1 )
}

parseFile();
sortElvesByCalories()
console.log(`Most calories: ${caloriesByElf[0].calories}`)
console.log(`Total of top 3 elves: ${caloriesByElf[0].calories + caloriesByElf[1].calories + caloriesByElf[2].calories}`)