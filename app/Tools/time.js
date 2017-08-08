class Time {
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

module.exports = Time;