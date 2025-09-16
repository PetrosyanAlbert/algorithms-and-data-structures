function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i;

    // Move elements of arr[0..i-1], that are greater than key,
    // to one position ahead of their current position
    while (j > 0 && arr[j - 1] > key) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = key;
  }
  return arr;
}

// Example usage:
const arr = [12, 11, 13, 5, 6];
console.log(insertionSort(arr)); // [5, 6, 11, 12, 13]
