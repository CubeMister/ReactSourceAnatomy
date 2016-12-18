/**
 * Binds all auto-bound methods in a component.
 * 绑定组件中所有自动绑定的方法
 * @param {object} component 要绑定方法的组件.
 */
function bindAutoBindMethods(component) {
  var pairs = component.__reactAutoBindPairs;
  for (var i = 0; i < pairs.length; i += 2) {
    var autoBindKey = pairs[i];
    var method = pairs[i + 1];
    component[autoBindKey] = bindAutoBindMethod(component, method);
  }
}