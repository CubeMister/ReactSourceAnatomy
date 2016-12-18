/**
 * Add more to the ReactClass base class. These are all legacy features and
 * therefore not already part of the modern ReactComponent.
 * 添加更多的方法到ReactClass父类中。有许多遗留的特性不会成为现在React组件的一部分
 */
var ReactClassMixin = {

  /**
   * TODO: This will be deprecated because state should always keep a consistent
   * type signature and the only use case for this, is to avoid that.
   * 该方法将会被废弃，因为state应该总是保持一个持久化的类型标识和唯一的this.
   * 废弃该方法是为了避免打破这种情况
   */
  replaceState: function (newState, callback) {
    this.updater.enqueueReplaceState(this, newState);
    if (callback) {
      this.updater.enqueueCallback(this, callback, 'replaceState');
    }
  },

  /**
   * Checks whether or not this composite component is mounted.
   * 检查复合组件是否已经挂载
   * @return {boolean} True if mounted, false otherwise. true表示挂载, false表示未挂载
   * @protected
   * @final
   */
  isMounted: function () {
    return this.updater.isMounted(this);
  }
};