// noop 空操作
function validateTypeDef(Constructor, typeDef, location) {
  for (var propName in typeDef) {
    if (typeDef.hasOwnProperty(propName)) {
      // 这里使用的是打印警告而不是报错，因此组件不会出现在生产环境中, 只是在开发环境下显示
      // use a warning instead of an invariant so components
      // don't show up in prod but only in __DEV__
      process.env.NODE_ENV !== 'production' ? 
		// ReactClass: ...的类型...是无效的, 它必须是一个函数, 通常来自React.PropTypes
		warning(
			typeof typeDef[propName] === 'function', 
			'%s: %s type `%s` is invalid; it must be a function, usually from ' + 
			'React.PropTypes.', 
			Constructor.displayName || 'ReactClass', 
			ReactPropTypeLocationNames[location], 
			propName
		) : void 0;
    }
  }
}

/*
ReactPropTypeLocationNames = {
	prop: 'prop',
	context: 'context',
	childContext: 'child context'
};
*/