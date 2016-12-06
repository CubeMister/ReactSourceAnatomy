/**
 * 验证方法是否覆盖了父类的方法以及方法是否定义了多次，这两个条件任意一个触发React都将抛出error
 * @param  {Boolean} isAlreadyDefined [description]
 * @param  {[type]}  name             [description]
 * @return {[type]}                   [description]
 */
function validateMethodOverride(isAlreadyDefined, name) {
  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? 
	ReactClassInterface[name] : null;

  // Disallow overriding of base class methods unless explicitly allowed.
  // 不允许重写父类的方法, 除非明确声明允许重写
  if (ReactClassMixin.hasOwnProperty(name)) {
  	// override_base
    !(specPolicy === SpecPolicy.OVERRIDE_BASE) ? 
		process.env.NODE_ENV !== 'production' ? 
			// ReactClassInterface: 你尝试去重写你父类中定义的某个方法，请确保你的方法名与React方法的方法名不重叠
			invariant(
				false, 
				'ReactClassInterface: \
				You are attempting to override `%s` from your class specification. \
				Ensure that your method names do not overlap with React methods.', 
				name
			) : _prodInvariant('73', name) : void 0;
  }

  // Disallow defining methods more than once unless explicitly allowed.
  // 不允许定义方法多次除非明确声明允许定义多次
  if (isAlreadyDefined) {
  	// define_many || define_many_merged
	!(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED) ? 
		process.env.NODE_ENV !== 'production' ? 
			// ReactClassInterface: 你正在试图去在你的组件中对某个方法定义多次
			invariant(
				false, 
				'ReactClassInterface: You are attempting to define `%s` on your component more than once. \ 
				This conflict may be due to a mixin.', 
				name) : _prodInvariant('74', name) : void 0;
  }
}