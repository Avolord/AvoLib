const avosort_initialized = true;

function avo_sort(List) {

  let Arr = List;
  let lowest;
  let result = [];
  let index = 0;

  while (Arr.length > 0) {
    lowest = Arr[0];
    for (let i = 0; i < Arr.length; i++) {
      if (Arr[i] <= lowest) {
        index = i;
        lowest = Arr[i];
      }
    }
    result.push(Arr[index]);
    console.log(Arr);
    Arr.splice(index, 1);
    console.log(Arr);
    if (Arr.length == 0) {
      return result
    }
  }
}

function bubble_sort(List) {
  for (let z = 0, n = List.length; z < n; z++) {
    for (let i = 0; i < n; i++) {
      if (List[i] > List[i + 1]) {
        const temp = List[i];
        List[i] = List[i + 1];
        List[i + 1] = temp;
      }
    }
  }
  return List
}
