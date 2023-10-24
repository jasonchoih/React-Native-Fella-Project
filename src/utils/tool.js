import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)
// 
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
const toNow = (date) =>
{
    return dayjs(date).toNow(true)
}
// 
export {
    findArrIndex,
    toNow
}