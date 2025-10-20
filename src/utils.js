export function shuffle(array) {
  for (let i = 1; i < array.length; i++) {
    const index = Math.floor(Math.random() * (i + 1));
    if (i !== index) {
      const swap = array[i];
      array[i] = array[index];
      array[index] = swap;
    }
  }
  return array;
}


export function choice(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}
