function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let flag = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = true;
      }
    }
    // If no swaps occurred, the array is already sorted
    if (!flag) break;
  }
  return arr;
}

// Example usage:
const arr = [5, 3, 8, 4, 2];
console.log(bubbleSort(arr)); // [2, 3, 4, 5, 8]
