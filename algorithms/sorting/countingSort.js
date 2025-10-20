function countingSort(arr) {
    // If the input array is empty, return -1 as an error/special case
    if (arr.length === 0) return -1;

    // Find the maximum value in the array to determine the range of the counting array
    const maxValue = Math.max(...arr);

    // Create a new array (counting array) with size equal to maxValue + 1, filled with zeros
    const newArr = new Array(maxValue + 1).fill(0);

    // Count the occurrences of each number in the input array
    for (let i = 0; i < arr.length; ++i) {
        const num = arr[i];
        newArr[num]++;  // Increment the count for the current number
    }

    // Create an array to hold the sorted result
    const sortedArr = [];

    // Go through the counting array
    for (let i = 0; i < newArr.length; ++i) {
        // While the count for the current number is greater than 0,
        // add the number to the sorted array and decrement the count
        while (newArr[i] > 0) {
            sortedArr.push(i);
            newArr[i]--;
        }
    }

    // Return the sorted array
    return sortedArr;
}

// Example usage
let arr = [12, 4, 6, 3, 3, 2, 2, 8, 8, 10];
console.log(countingSort(arr));  // Output: [2, 2, 3, 3, 4, 6, 8, 8, 10, 12]


