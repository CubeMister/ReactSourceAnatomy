/**
 * 验证回调函数, 如果不是函数类型, 则会报错
 * @param callback
 * @param callerName
 */
function validateCallback(callback, callerName) {
  !(!callback || typeof callback === 'function') ? 
    process.env.NODE_ENV !== 'production' ? 
        invariant(
            false,
            // 被期望的最后可选的参数callback应该是一个函数类型, 而不是接收一个其他类型的参数
            '%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.', 
            callerName, 
            formatUnexpectedArgument(callback)
        ) : _prodInvariant('122', callerName, formatUnexpectedArgument(callback)) : void 0;
}