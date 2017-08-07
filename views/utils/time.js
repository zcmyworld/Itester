
export default class Time {
  static subTime(current, second) {
    return plusTime(current, (-second))
  }

  static plusTime(current, second) {
    let rs_time = current.timestamp + (second * 1000);
    return getTime(new Date(rs_time))
  }


  static getTime(dateObj) {
    if (!dateObj) {
      dateObj = new Date();
    }
    var h = dateObj.getHours()
    var m = dateObj.getMinutes()
    var s = dateObj.getSeconds()

    m = checkTime(m)
    s = checkTime(s)
    function checkTime(i) {
      if (i < 10)
      { i = "0" + i }
      return i
    }
    return {
      timestamp: dateObj.getTime(),
      formattime: h + ":" + m + ":" + s
    }
  }
}


// let rs = getTime(new Date());
// console.log(rs)
// console.log(plusTime(rs, 30));
// console.log(subTime(rs, 30));