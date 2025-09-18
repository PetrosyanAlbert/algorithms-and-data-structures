function merge(arr, left, mid, right) {
    // Create copies of the two subarrays to merge
    let a1 = arr.slice(left, mid + 1);       // from left to mid (inclusive)
    let a2 = arr.slice(mid + 1, right + 1);  // from mid+1 to right (inclusive)

    // Initialize pointers for a1, a2, and the main array (arr)
    let i = 0;        // Pointer for a1
    let j = 0;        // Pointer for a2
    let k = left;     // Pointer for original array, starting at index `left`

    // Merge the two arrays into arr[left..right]
    while (i < a1.length && j < a2.length) {
        if (a1[i] <= a2[j]) {
            arr[k++] = a1[i++];  // Take from a1 if smaller or equal
        } else {
            arr[k++] = a2[j++];  // Take from a2 if smaller
        }
    }

    // Copy remaining elements from a1 (if any)
    while (i < a1.length) {
        arr[k++] = a1[i++];
    }

    // Copy remaining elements from a2 (if any)
    while (j < a2.length) {
        arr[k++] = a2[j++];
    }
}

function mergeSort(arr, left, right) {
    // Base case: if there's only one element or invalid range, return
    if (left >= right) return;

    // Find the middle index to divide the array into halves
    let mid = Math.floor((left + right) / 2);

    // Recursively sort the left half
    mergeSort(arr, left, mid);

    // Recursively sort the right half
    mergeSort(arr, mid + 1, right);

    // Merge the two sorted halves
    merge(arr, left, mid, right);
}


// --- Example usage ---

// Unsorted array
const myArray = [
    6, 1, 5, 2, 123, 149, 1, 3, 4, 5, 23, 345,
    52, 1234, 21451, 82498, 214, 2134, 1324, 1234, 239065, 309232495
];

console.log("Original array:", myArray);

// Sort the array using merge sort
mergeSort(myArray, 0, myArray.length - 1);

console.log("Sorted array:", myArray);