/**
 * Drill down (through composites and empty components) until we get a host or
 * host text component.
 * 向下钻取（通过复合和空组件），直到我们获得主组件或主文本组件
 * This is pretty polymorphic but unavoidable with the current structure we have
 * for `_renderedChildren`.
 * 这是相当多态，但不可避免的当前结构我们为`_renderedChildren`。
 */
function getRenderedHostOrTextFromComponent(component) {
  var rendered;
  while (rendered = component._renderedComponent) {
    component = rendered;
  }
  return component;
}
