import {readFileSync} from "fs"

type OpponentPlayType = "A" | "B" | "C";
type MyPlayType = "X" | "Y" | "Z";

const parseFile = () => {
  const file = readFileSync("./input.txt", "utf-8");
  return file.split('\n');
}

const determineScore = (opponentPlay: OpponentPlayType, myPlay: MyPlayType ) => {
  let score = myPlay === "X" ? 1 : myPlay === "Y" ? 2 : 3;

  if ((opponentPlay === "A" && myPlay === "X") || (opponentPlay === "B" && myPlay === "Y") || (opponentPlay === "C" && myPlay === "Z")) {
    score += 3;
  } else if ((opponentPlay === "A" && myPlay === "Y") || (opponentPlay === "B" && myPlay === "Z") || (opponentPlay === "C" && myPlay === "X")) {
    score += 6;
  } 

  return score;
}

const determineScore2 = (opponentPlay: OpponentPlayType, myPlay: MyPlayType ) => {
  let score = myPlay === "X" ? 0 : myPlay === "Y" ? 3 : 6;

  if (myPlay === "X") {
    if (opponentPlay === "A") {
      score += 3;
    } else if (opponentPlay === "B") {
      score += 1;
    } else {
      score += 2;
    }
  } else if (myPlay === "Y") {
    if (opponentPlay === "A") {
      score += 1;
    } else if (opponentPlay === "B") {
      score += 2;
    } else {
      score +=3;
    }
  } else {
    if (opponentPlay === "A") {
      score += 2;
    } else if (opponentPlay === "B") {
      score += 3;
    } else {
      score += 1;
    }
  }

  return score;
}

const playGame = (data: Array<string>) => {
  return data.map(game => {
    const [opponentPlay, myPlay] = game.split(" ");

    return determineScore(opponentPlay as OpponentPlayType, myPlay as MyPlayType);
  })
}

const playGame2 = (data: Array<string>) => {
  return data.map(game => {
    const [opponentPlay, myPlay] = game.split(" ");

    return determineScore2(opponentPlay as OpponentPlayType, myPlay as MyPlayType)
  })
}

const calculateFinalScore = (scores: Array<number>) => {
  let finalScore = 0;

  scores.forEach(score => finalScore += score);

  return finalScore;
}

const data = parseFile();
const gameScores = playGame(data);
const gameScores2 = playGame2(data);
const finalScore = calculateFinalScore(gameScores);
const finalScore2 = calculateFinalScore(gameScores2)

console.log({finalScore, finalScore2});