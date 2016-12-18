var internalInstanceKey = '__reactInternalInstance$' + Math.random().toString(36).slice(2);
/**
 * Given a DOM node, return the closest ReactDOMComponent or
 * ReactDOMTextComponent instance ancestor.
 * 给定一个DOM节点, 返回最近的ReactDOMComponent或者ReactDOMTextComponent实例的父级元素
 */
function getClosestInstanceFromNode(node) {
  if (node[internalInstanceKey]) {
    return node[internalInstanceKey];
  }

  // Walk up the tree until we find an ancestor whose instance we have cached.
  // 沿着树向上走，直到找到我们已经缓存的实例的祖先
  var parents = [];
  while (!node[internalInstanceKey]) {
    parents.push(node);
    if (node.parentNode) {
      node = node.parentNode;
    } else {
      // Top of the tree. This node must not be part of a React tree (or is
      // unmounted, potentially).
      // 树的顶部。 此节点不能是React树的一部分（或者可能已被卸载）
      return null;
    }
  }

  var closest;
  var inst;
  for (; node && (inst = node[internalInstanceKey]); node = parents.pop()) {
    closest = inst;
    if (parents.length) {
      precacheChildNodes(inst, node);
    }
  }

  return closest;
}