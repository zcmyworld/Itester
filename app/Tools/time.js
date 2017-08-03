export default class Time {
  static getTimestamp() {
    return ~~(new Date().getTime() / 1000);
  }
}