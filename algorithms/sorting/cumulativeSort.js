function countingSort(arr) {
  // Step 1: Find the minimum and maximum values in the array
  let min = Math.min(...arr);
  let max = Math.max(...arr);

  // Step 2: Calculate the range of values
  let range = max - min + 1;

  // Step 3: Create a counting array initialized with 0s
  let countingArr = new Array(range).fill(0);

  // Step 4: Count the frequency of each element in the input array
  for (let item of arr) {
    countingArr[item - min]++;
  }

  // Step 5: Convert the counting array to a cumulative count array
  // This tells us how many elements are less than or equal to the current index
  for (let i = 1; i < countingArr.length; ++i) {
    countingArr[i] += countingArr[i - 1];
  }

  // Step 6: Create a new array to hold the sorted result
  let newArr = new Array(arr.length).fill(0);

  // Step 7: Build the sorted array (in a stable way) by placing each element at its correct position
  // We go backwards to ensure stability — elements with the same value keep their original order
  for (let i = arr.length - 1; i >= 0; --i) {
    const elem = arr[i];
    const idx = countingArr[elem - min] - 1; // Get the correct position
    newArr[idx] = elem;                      // Place the element
    countingArr[elem - min]--;              // Decrease the count
  }

  // Step 8: Return the sorted array
  return newArr;
}

// Example usage:
const arr = [20, 18, 4, 3, 15, 16, 10, 17];
console.log(countingSort(arr)); // Output: [3, 4, 10, 15, 16, 17, 18, 20]
