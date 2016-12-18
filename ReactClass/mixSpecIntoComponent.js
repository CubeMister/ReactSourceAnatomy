/**
 * Mixin helper which handles policy validation and reserved
 * specification keys when building React classes.
 * Mixin帮助器，当构建React类时，用来处理策略验证以及保留的规范key验证
 */
function mixSpecIntoComponent(Constructor, spec) {
  if (!spec) {
    if (process.env.NODE_ENV !== 'production') {
      var typeofSpec = typeof spec;
      var isMixinValid = typeofSpec === 'object' && spec !== null;

      process.env.NODE_ENV !== 'production' ? 
      	// ReactClass: 你正尝试去引入一个null或者非对象类型的mixin.
      	// 检查组件包含的mixins，以及检查这些mixins中它们自己包含的mixins
      	// 期望是一个对象类型但是得到的是其他类型
		warning(
			isMixinValid, 
			'%s: You\'re attempting to include a mixin that is either null ' + 
			'or not an object. Check the mixins included by the component, ' + 
			'as well as any mixins they include themselves. ' + 
			'Expected object but got %s.', 
			Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec
			) : void 0;
    }
    return;
  }
  
 !(typeof spec !== 'function') ? 
	process.env.NODE_ENV !== 'production' ?
		// 你正在试图去使用一个组件类或者一个函数作为mixin，
		// 相反，只需使用一个常规的对象
		invariant(
			false, 
			'ReactClass: You\'re attempting to use a component class or function as a mixin. \
			Instead, just use a regular object.'
		) : _prodInvariant('75') : void 0;

!!ReactElement.isValidElement(spec)? 
	process.env.NODE_ENV !== 'production'? 
		// 你正在试图去使用一个组件作为mixin，
		// 相反，只需使用一个常规的对象
		invariant(
			false, 
			'ReactClass: You\'re attempting to use a component as a mixin. \
			Instead, just use a regular object.'
		) : _prodInvariant('76') : void 0;

  var proto = Constructor.prototype;
  var autoBindPairs = proto.__reactAutoBindPairs;

  // By handling mixins before any other properties, we ensure the same
  // chaining order is applied to methods with DEFINE_MANY policy, whether
  // mixins are listed before or after these methods in the spec.
  // 通过在任何其他属性之前处理mixins, 
  // 我们确保将相同的链接顺序应用于使用DEFINE_MANY策略的方法
  // 无论mixins是在规范中的这些方法之前还是之后。
  if (spec.hasOwnProperty(MIXINS_KEY)) {
    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) {
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === MIXINS_KEY) {
      // We have already handled mixins in a special case above.
      // 我们已经在上面的特殊情况下处理了mixins
      continue;
    }

    var property = spec[name];
    var isAlreadyDefined = proto.hasOwnProperty(name);
    validateMethodOverride(isAlreadyDefined, name);

    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
      RESERVED_SPEC_KEYS[name](Constructor, property);
    } else {
      // Setup methods on prototype:
      // The following member methods should not be automatically bound:
      // 1. Expected ReactClass methods (in the "interface").
      // 2. Overridden methods (that were mixed in).
      // 在原型中设置方法:
      // 下面的成员方法不应该被自动绑定
      // 1. 被期望是ReactClass方法(在接口中定义的)
      // 2. 被重载的方法(被混合的)
      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
      var isFunction = typeof property === 'function';
      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

      if (shouldAutoBind) {
        autoBindPairs.push(name, property);
        proto[name] = property;
      } else {
        if (isAlreadyDefined) {
          var specPolicy = ReactClassInterface[name];

          // These cases should already be caught by validateMethodOverride.
          // 这些情况应该已经被validateMethodOverride捕获。
          !(isReactClassMethod && 
  			(specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY))? 
  	 			process.env.NODE_ENV !== 'production' ? 
  					// ReactClass: 当在组件规范中混合时, 对于key...,不是期望的规范策略...
  					invariant(
  						false, 
  						'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', 
  						specPolicy, 
  						name
  					) : _prodInvariant('77', specPolicy, name) : void 0;

          // For methods which are defined more than once, call the existing
          // methods before calling the new property, merging if appropriate.
          // 对于定义多次的方法, 在调用新属性之前调用现有方法，如果合适，则进行合并
          if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
            proto[name] = createMergedResultFunction(proto[name], property);
          } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
            proto[name] = createChainedFunction(proto[name], property);
          }
        } else {
          proto[name] = property;
          if (process.env.NODE_ENV !== 'production') {
            // Add verbose displayName to the function, which helps when looking
            // at profiling tools.
            // 为函数增加一个详细的displayName属性, 当我们在分析工具中查看的时候对我们是有帮助的
            if (typeof property === 'function' && spec.displayName) {
              proto[name].displayName = spec.displayName + '_' + name;
            }
          }
        }
      }
    }
  }
}


function mixSpecIntoComponent(Constructor, spec) {
  if (!spec) {
    return ;
  }
  var proto = Constructor.prototype;
  var autoBindPairs = proto.__reactAutoBindPairs;

  // By handling mixins before any other properties, we ensure the same
  // chaining order is applied to methods with DEFINE_MANY policy, whether
  // mixins are listed before or after these methods in the spec.
  // 通过在任何其他属性之前处理mixins, 
  // 我们确保将相同的链接顺序应用于使用DEFINE_MANY策略的方法
  // 无论mixins是在规范中的这些方法之前还是之后。
  if (spec.hasOwnProperty(MIXINS_KEY)) { // var MIXINS_KEY = keyOf({ mixins: null }); MIXINS_KEY: 'mixins'
    // 将spec.mixins中的方法挨个再执行一次mixSpecIntoComponent
    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) { // 该属性确实不是spec原型链中的属性时
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === MIXINS_KEY) { // key是mixins的属性已经在上面执行过了
      // We have already handled mixins in a special case above.
      // 我们已经在上面的特殊情况下处理了mixins
      continue;
    }

    var property = spec[name];
    var isAlreadyDefined = proto.hasOwnProperty(name); // 原型链中的属性
    validateMethodOverride(isAlreadyDefined, name); // 验证方法是否覆盖了父类的方法以及方法是否定义了多次，这两个条件任意一个触发React都将抛出error

    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
      RESERVED_SPEC_KEYS[name](Constructor, property); // RESERVED_SPEC_KEYS中的方法都接收两个参数
    } else {
      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
      var isFunction = typeof property === 'function';
      // 如果是一个函数, 并且在接口中没有定义, 并且在原型中也没有定义, 并且也没有明确声明不可以自动绑定
      // 那就进行自动绑定
      var shouldAutoBind = 
        isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

      if (shouldAutoBind) {
        autoBindPairs.push(name, property);
        proto[name] = property; // 绑定在原型对象上
      } else { // 如果自动绑定条件不满足时
        if (isAlreadyDefined) {
          var specPolicy = ReactClassInterface[name]; // 拿到该方法的规范策略

          // For methods which are defined more than once, call the existing
          // methods before calling the new property, merging if appropriate.
          // 对于定义多次的方法, 在调用新属性之前调用现有方法，如果合适，则进行合并
          if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) { // 返回一个函数,包含原型链中的方法和当前属性的方法, 合并两个方法返回的值
            proto[name] = createMergedResultFunction(proto[name], property);
          } else if (specPolicy === SpecPolicy.DEFINE_MANY) { // 返回一个函数,包含原型链中的方法和当前属性的方法, 并不合并两个方法返回的值
            proto[name] = createChainedFunction(proto[name], property);
          }
        } else {
          proto[name] = property; // 如果没有定义，则直接在当前原型上定义
        }
      }
    }
  }
}









