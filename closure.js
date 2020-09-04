function outer() {
  let counter = 0;
  function incrementCounter() {
    if (counter === 2) return;
    counter++;
    console.log(counter);
  }
  return incrementCounter;
}

const genFunc = outer();
genFunc();
genFunc();
genFunc();
