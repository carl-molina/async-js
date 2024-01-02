"use strict";


//  #1 showNumberTrivia

const NUMBERS_BASE_URL = 'http://numbersapi.com';

/** showNumberTrivia: logs trivia of requested number. */

async function showNumberTrivia() {

  const fixed_num = 7;

  // console.log('Before resp');
  const resp = await fetch(`${NUMBERS_BASE_URL}/${fixed_num}/trivia?json`);
  // console.log('After resp', resp);

  const data = await resp.json();
  console.log('This is data', data);

  // console.log('This is data', data);
  console.log(`showNumberTrivia:`, data.text);
}


// #2 showNumberRace

/** showNumberRace: fetches trivia from Numbers API; logs first request that
 *  returns.
 */

async function showNumberRace() {

  const p1 = fetch(`${NUMBERS_BASE_URL}/1/trivia?json`);
  const p2 = fetch(`${NUMBERS_BASE_URL}/2/trivia?json`);
  const p3 = fetch(`${NUMBERS_BASE_URL}/3/trivia?json`);
  const p4 = fetch(`${NUMBERS_BASE_URL}/4/trivia?json`);

  const answerPromise = await Promise.race([p1, p2, p3, p4]);

  const trivia = await answerPromise.json();

  console.log(`showNumberRace:`, trivia.text);

}


// #3 showNumberAll

/** showNumberAll: fetches json trivia values; filters requests to good results
 *  arr and bad results arr; console.logs good arr and bad arr results.
 */
async function showNumberAll() {

  const p1 = fetch(`${NUMBERS_BASE_URL}/1/trivia?json`);
  const p2 = fetch(`${NUMBERS_BASE_URL}/2/trivia?json`);
  const p3 = fetch(`${NUMBERS_BASE_URL}/3/trivia?json`);
  const p4 = fetch(`${NUMBERS_BASE_URL}/WRONG/trivia?json`);
  const p5 = fetch(`WRONGTWO`);

  const results = await Promise.allSettled([p1, p2, p3, p4, p5]);

  const goodRes = results.filter(x => x.status === "fulfilled" &&
                                x.value.status === 200);

  const badRes = results.filter(x => x.status === "rejected" ||
                                x.value.status !== 200);

  const goodTrivia = [];
  for (const trivia of goodRes) {
    const triviaObj = await trivia.value.json();
    goodTrivia.push(triviaObj.text);
  }

  const badResults = [];
  for (const res of badRes) {
    if (res.status === 'rejected') {
      badResults.push(res.reason);
    }
    else {
      badResults.push(res.value.statusText + ' ' + res.value.status);
    }
  }

  console.log(`showNumberAll fulfilled:`, goodTrivia);
  console.log(`showNumberAll rejected:`, badResults);
}


// #4  main

/**
 * main: conductor function that calls all three helper functions in order:
 * showNumberTrivia, showNumberRace, showNumberAll
 */
async function main () {

  await showNumberTrivia();
  await showNumberRace();
  await showNumberAll();

}

main();