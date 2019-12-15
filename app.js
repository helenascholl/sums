const NUMBER_OF_SUMS = 10;
const NUMBER_OF_SUMMANDS = 10;
const MAX = 100;
const MIN = -100;
const WANTED_NUMBER = 0;
const NUMBER_OF_CHANGED_NUMBERS = 2;

let generation = 1;
let reached = false;
let best;

while (!reached) {
    console.log(`Generation ${generation}:`);

    let sums = [];
    if (best) {
        for (let i = 0; i < NUMBER_OF_SUMS; i++) {
            sums[i] = best.slice(0);

            for (let j = 0; j < NUMBER_OF_CHANGED_NUMBERS; j++) {
                sums[i][Math.floor(Math.random() * NUMBER_OF_SUMMANDS)] = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
            }

            console.log(`    ${arrayToString(sums[i])}`);
        }
    } else {
        for (let i = 0; i < NUMBER_OF_SUMS; i++) {
            sums[i] = [];

            for (let j = 0; j < NUMBER_OF_SUMMANDS; j++) {
                sums[i][j] = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
            }

            console.log(`   ${arrayToString(sums[i])}`);
        }
    }

    best = sums[0];
    for (let i = 1; i < NUMBER_OF_SUMS; i++) {
        if (getDifference(WANTED_NUMBER, getSum(best)) > getDifference(WANTED_NUMBER, getSum(sums[i]))) {
            best = sums[i];
        }
    }

    console.log(`\n    Best: ${arrayToString(best)}\n`);

    if (getDifference(WANTED_NUMBER, getSum(best)) === 0) {
        console.log(`\nWanted number reached!\nArray: ${JSON.stringify(best)}\nGeneration: ${generation}`);
        reached = true;
    } else {
        generation++;
    }
}

function getSum(array) {
    return array.reduce((a, b) => a + b, 0);
}

function getDifference(a, b) {
    return Math.abs(a - b);
}

function arrayToString(array) {
    return `${JSON.stringify(array)} = ${getSum(array)}`;
}