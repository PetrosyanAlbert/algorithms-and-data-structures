function insertionSort(arr){
    if(arr.length === 0) return -1;
    for(let i = 1; i < arr.length; ++i){
        let key = arr[i];
        let j = i;
        while(j > 0 && arr[j - 1] > key){
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = key;
    }
    return arr;
}

let arr = [10, 3, 2, 5, 7, 4];
console.log(insertionSort(arr));