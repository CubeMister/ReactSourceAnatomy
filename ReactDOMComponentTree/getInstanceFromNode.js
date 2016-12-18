/**
 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
 * instance, or null if the node was not rendered by this React.
 * 给定一个DOM节点, 返回ReactDOMComponent 或者 ReactDOMTextComponent 实例
 * 如果节点不是通过当前这个React渲染, 返回Null
 */
function getInstanceFromNode(node) {
  var inst = getClosestInstanceFromNode(node);
  if (inst != null && inst._hostNode === node) {
    return inst;
  } else {
    return null;
  }
}