function selectionSort(arr){
    let size = arr.length;
    for(let i = 0; i < size; ++i){
        let minIndex = i;
        for(let j = i + 1; j < size; ++j){
            if(arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}

let 