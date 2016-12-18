/**
 * @param {DOMElement|DOMDocument} container DOM element that may contain
 * a React component
 * 包含一个React组件的container DOM元素
 * @return {?*} DOM element that may have the reactRoot ID, or null.
 */
// document.getElmenetById('app')
function getReactRootElementInContainer(container) {
  if (!container) {
    return null;
  }

  if (container.nodeType === DOC_NODE_TYPE) { // var DOC_NODE_TYPE = 9; document.nodeType === 9
    return container.documentElement; // html标签, document.documentElement.firstChild is head tag
  } else {
    return container.firstChild; // null
  }
}