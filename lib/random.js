export function randomInit(min, max) {
  const p = Math.random();
  return Math.floor(min * (1 - p) + max * p);
}

export function createRandomPicker(arr) {
  arr = [...arr];
  function randomPick() {
    const len = arr.length - 1;
    const randomIndex = randomInit(0, len);
    const picked = arr[randomIndex];
    [arr[randomIndex], arr[len]] = [arr[len], arr[randomIndex]];
    return picked;
  }
  randomPick();
  return randomPick;
}
