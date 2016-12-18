/**
 * Binds a method to the component.
 * 在组件上绑定一个方法
 * @param {object} component 将要被绑定方法的组件
 * @param {function} method 要绑定的方法
 * @return {function} 绑定的方法
 */
function bindAutoBindMethod(component, method) {
  var boundMethod = method.bind(component);
  // 在生产环境下，只是执行上面那句话
  if (process.env.NODE_ENV !== 'production') {
    boundMethod.__reactBoundContext = component;
    boundMethod.__reactBoundMethod = method;
    boundMethod.__reactBoundArguments = null;
    var componentName = component.constructor.displayName;
    var _bind = boundMethod.bind;
    boundMethod.bind = function (newThis) {
      for (
      	var _len = arguments.length, 
      	args = Array(_len > 1 ? _len - 1 : 0), // 第一个参数是this指向
      	_key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // 用户正试图调用bind()方法来绑定一个自动绑定的方法。
      // 我们将有效地忽略用户尝试使用的“this”的值，当使用时，我们会打印警告。
      // User is trying to bind() an autobound method; we effectively will
      // ignore the value of "this" that the user is trying to use, so
      // let's warn.
      if (newThis !== component && newThis !== null) {
        process.env.NODE_ENV !== 'production' ? 
			// bind(): React组件方法也许只能绑定在组件实例上。
			warning(
				false, 
				'bind(): React component methods may only be bound to the ' + 
				'component instance. See %s', 
				componentName
			) : void 0;
      } else if (!args.length) {
        process.env.NODE_ENV !== 'production' ? 
			// bind(): 你正在绑定一个组件方法到组件上, 
			// React会以高性能的方式自动完成此操作, 因此你可以安全的移除掉这次的调用
			warning(
				false, 
				'bind(): You are binding a component method to the component. ' + 
				'React does this for you automatically in a high-performance ' + 
				'way, so you can safely remove this call. See %s', 
				componentName
			) : void 0;
        return boundMethod;
      }
      var reboundMethod = _bind.apply(boundMethod, arguments);
      reboundMethod.__reactBoundContext = component; // bindAutoBindMethod的方法参数
      reboundMethod.__reactBoundMethod = method; // bindAutoBindMethod的方法参数
      reboundMethod.__reactBoundArguments = args; // boundMethod.bind传入的参数
      return reboundMethod;
    };
  }
  return boundMethod;
}

// 简化后的状态
function bindAutoBindMethod(component, method) {
	var boundMethod = method.bind(component);
	return boundMethod;
}