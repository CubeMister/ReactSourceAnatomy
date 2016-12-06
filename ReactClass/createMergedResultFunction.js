/**
 * Creates a function that invokes two functions and merges their return values.
 * 创建一个函数来调用两个函数并合并它们的返回值
 * @param {function} one Function to invoke first. 第一个调用的方法
 * @param {function} two Function to invoke second. 第二个调用的方法
 * @return {function} Function that invokes the two argument functions. 返回调用传入的两个函数的函数
 * @private
 */
function createMergedResultFunction(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    var c = {};
    mergeIntoWithNoDuplicateKeys(c, a);
    mergeIntoWithNoDuplicateKeys(c, b);
    return c;
  };
}