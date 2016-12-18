/**
 * 可视化未期望的参数
 * 如果参数不是object类型的话, 直接返回, 如果是object类型, 尝试得到构造器的名字或者直接使用参数的类型
 * 然后与对象中的key拼接起来，返回
 * @param arg
 * @returns {*}
 */
function formatUnexpectedArgument(arg) {
  var type = typeof arg; // 得到参数的类型
  if (type !== 'object') { // 如果类型不是object, 则直接返回
    return type;
  }

  // 得到函数的constructor名字或者不是函数的话, 直接返回type
  var displayName = arg.constructor && arg.constructor.name || type;

  // 将对象的key拿到, 与displayName拼接起来, 然后返回displayName
  var keys = Object.keys(arg);
  if (keys.length > 0 && keys.length < 20) {
    return displayName + ' (keys: ' + keys.join(', ') + ')';
  }
  return displayName;
}