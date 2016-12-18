/**
 * Creates a function that invokes two functions and ignores their return vales.
 * 创建一个函数用来调用两个函数并且忽略它们的返回值
 * @param {function} one Function to invoke first.第一个调用的方法
 * @param {function} two Function to invoke second. 第二个调用的方法
 * @return {function} Function that invokes the two argument functions. 返回调用传入的两个函数的函数
 * @private
 */
function createChainedFunction(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}