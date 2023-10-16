const findArrIndex = (arr, target) =>
{
      let index;
      for(let i in arr){
          if(arr[i][0] == target){
              index= i
              break;
          }
      }
      return index;
}
// 
export {
    findArrIndex
}