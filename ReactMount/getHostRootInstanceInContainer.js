// document.getElmenetById('app')
// 
function getHostRootInstanceInContainer(container) {
  var rootEl = getReactRootElementInContainer(container); // null or document.documentElement
  var prevHostInstance = rootEl && ReactDOMComponentTree.getInstanceFromNode(rootEl);
  return prevHostInstance && !prevHostInstance._hostParent ? prevHostInstance : null;
}