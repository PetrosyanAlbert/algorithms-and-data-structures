function quickSort(arr, low, high) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi);
        quickSort(arr, pi + 1, high);
    }
}

// Function to select pivot using Median-of-Three method
function medianOfThree(arr, low, high) {
    const mid = Math.floor((low + high) / 2);
    const a = arr[low];
    const b = arr[mid];
    const c = arr[high];

    // Check which of a, b, c is the median
    if ((a - b) * (c - a) >= 0) return low;   // a is median
    if ((b - a) * (c - b) >= 0) return mid;   // b is median
    return high;                              // otherwise c is median
}

function partition(arr, low, high) {

    // 1️⃣ Classic middle element pivot:
    // Picks the middle element of the current subarray as pivot

    // const pivotIndex = low + Math.floor((high - low) / 2);
    // const pivot = arr[pivotIndex];

    // 2️⃣ Random pivot:
    // Picks a random element in the current subarray as pivot

    // const pivotIndex = low + Math.floor(Math.random() * (high - low + 1));
    // const pivot = arr[pivotIndex];

    // 3️⃣ Median-of-Three pivot (currently used):
    // Picks the median of first, middle, last element as pivot
    const pivotIndex = medianOfThree(arr, low, high);
    const pivot = arr[pivotIndex];

    let i = low - 1;
    let j = high + 1;

    while (true) {
        // Move i right until arr[i] >= pivot
        do { i++; } while (arr[i] < pivot);

        // Move j left until arr[j] <= pivot
        do { j--; } while (arr[j] > pivot);

        // If pointers crossed, return j as partition index
        if (i >= j) return j;

        // Swap elements on wrong side
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Utility function to check if array is sorted
function isSorted(arr) {
    for (let i = 1; i < arr.length; ++i) {
        if (arr[i] < arr[i - 1]) return false;
    }
    return true;
}

// Test array
let arr = [10, 5, 8, 130, 34, 84, 42, 2];

quickSort(arr, 0, arr.length - 1);

console.log("Is the array sorted:", isSorted(arr));
console.log(arr);
