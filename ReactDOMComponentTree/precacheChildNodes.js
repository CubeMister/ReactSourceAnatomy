/**
 * Populate `_hostNode` on each child of `inst`, assuming that the children
 * match up with the DOM (element) children of `node`
 * 在每一个inst的子节点上, 填充_hostNode, 假设子节点与node的DOM子节点匹配
 *
 * We cache entire levels at once to avoid an n^2 problem where we access the
 * children of a node sequentially and have to walk from the start to our target node every time.
 * 我们一次缓存整个级别, 避免 n^2 问题(我们顺序访问节点的子元素并且每次必须从开始走到目标节点)
 *
 * 因为我们在不同时间(时间间隔很短)更新`_renderedChildren`和实际的DOM，我们可以在这里比赛，看到一个比我们看到的DOM节点更 新的`_renderedChildren`。 为了避免这种情况，ReactMultiChild在我们改变`_renderedChildren`之前调用`prepareToManageChildren`，这时容器的子节点总是被缓存（直到卸载）。
 * Since we update `_renderedChildren` and the actual DOM at (slightly)
 * different times, we could race here and see a newer `_renderedChildren` than
 * the DOM nodes we see. To avoid this, ReactMultiChild calls
 * `prepareToManageChildren` before we change `_renderedChildren`, at which
 * time the container's child nodes are always cached (until it unmounts).
 * 
 */
function precacheChildNodes(inst, node) {
    // inst._flags必须大于0
    if (inst._flags & Flags.hasCachedChildNodes) { // hasCachedChildNodes: 1
        return;
    }

    // 被渲染的children
    var children = inst._renderedChildren;
    // 原生节点的第一个子元素
    var childNode = node.firstChild;

    // 
    outer: for (var name in children) {
        if (!children.hasOwnProperty(name)) {
            continue;
        }
        var childInst = children[name];
        var childID = getRenderedHostOrTextFromComponent(childInst)._domID;
        if (childID === 0) {
            // We're currently unmounting this child in ReactMultiChild; skip it.
            // 我们正在ReactMultiChild中卸载这个child时, 跳过这步
            continue;
        }
        // We assume the child nodes are in the same order as the child instances.
        // 我们假设子节点与子实例的顺序相同
        // 当childNode是DOM元素时, 并且它的data-reactid属性等于String(childID)
        // 当childNode是注释时, 并且它的nodeValue等于' react-text: sdfdsf  '时
        // 当childNode是注释时, 并且它的nodeValue等于' react-empty:  sdfdsf  '时
        // 以上这些条件满足时, 提前缓存Node节点
        for (; childNode !== null; childNode = childNode.nextSibling) {
            if (childNode.nodeType === 1 && // 1说明是DOM节点
                childNode.getAttribute('data-reactid') === String(childID) || 
                childNode.nodeType === 8 && // 8说明是注释
                childNode.nodeValue === ' react-text: ' + childID + ' ' || 
                childNode.nodeType === 8 && 
                childNode.nodeValue === ' react-empty: ' + childID + ' '
            ) {
                precacheNode(childInst, childNode);
                continue outer;
            }
        }

        // We reached the end of the DOM children without finding an ID match.
        // 我们到达了DOM子节点的末端，没有找到ID匹配
        !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Unable to find element with ID %s.', childID) : _prodInvariant('32', childID) : void 0;
    }
    inst._flags |= Flags.hasCachedChildNodes; // 1
}