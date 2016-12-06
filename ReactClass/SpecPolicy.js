/**
 * Policies that describe methods in `ReactClassInterface`.
 * ReactClassInterface描述方法的策略
 */
var SpecPolicy = keyMirror({
  /**
   * These methods may be defined only once by the class specification or mixin.
   * 这些方法只能在类规范或者mixins中被定义一次
   */
  DEFINE_ONCE: null,
  /**
   * These methods may be defined by both the class specification and mixins.
   * Subsequent definitions will be chained. These methods must return void.
   * 这些方法可以在类规范或mixins中定义多次，后续定义的方法将会连起来调用，这些方法必须返回void
   */
  DEFINE_MANY: null,
  /**
   * These methods are overriding the base class.
   * 这些方法可以覆写父类方法
   */
  OVERRIDE_BASE: null,
  /**
   * These methods are similar to DEFINE_MANY, except we assume they return
   * objects. We try to merge the keys of the return values of all the mixed in
   * functions. If there is a key conflict we throw.
   * 这些方法类似于DEFINE_MANY中定义的方法，只是这些方法会返回一个对象。
   * 我们会在方法中尝试合并所有mixin中返回值的key。
   * 如果有key冲突的话，我们会抛出异常的
   */
  DEFINE_MANY_MERGED: null
});

/*
SpecPolicy的结果就是: 

var SpecPolicy = {
	DEFINE_ONCE: 'DEFINE_ONCE',
	DEFINE_MANY: 'DEFINE_MANY',
	OVERRIDE_BASE: 'OVERRIDE_BASE',
	DEFINE_MANY_MERGED: 'DEFINE_MANY_MERGED'
};
 */



