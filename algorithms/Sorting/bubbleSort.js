function bubbleSort(arr){
    let size = arr.length;
    if(arr.length === 0) return -1;
    for(let i = 0; i < size - 1; ++i){
        let flag = false;
        for(let j = 0; j < size - 1 - i; ++j){
            if(arr[j] > arr[j + 1]){
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                flag = true;
            }
        }
         if(!flag){
            break;
        }    
    }
    return arr;
}

let arr = [9, 3, 4, 5, 6, 7, 8];
console.log(bubbleSort(arr));