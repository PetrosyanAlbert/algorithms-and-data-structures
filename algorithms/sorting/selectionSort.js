function selectionSort(arr) {
    let n = arr.length;

    // Loop through each element of the array (except the last one)
    for (let i = 0; i < n - 1; ++i) {
        // Assume the current index has the smallest value
        let minIndex = i;

        // Look for the smallest element in the unsorted part
        for (let j = i + 1; j < n; ++j) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j; // Update minIndex if a smaller value is found
            }
        }

        // If a smaller element was found, swap it with the current element
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    // Return the sorted array
    return arr;
}

// Example usage
const arr = [64, 25, 12, 22, 11];
console.log(selectionSort(arr)); // Output: [11, 12, 22, 25, 64]
