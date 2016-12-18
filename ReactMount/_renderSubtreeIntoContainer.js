// null, React.createElement('h1', null, 'Mr.Cube'), document.getElementById('app'), ()=> {console.log('render success')}

function _renderSubtreeIntoContainer(parentComponent, nextElement, container, callback) {
    // 验证最后的一个参数callback是否是函数类型
    ReactUpdateQueue.validateCallback(callback, 'ReactDOM.render'); // √
    // √
    // 验证nextElement是否是有效的React元素
    !ReactElement.isValidElement(nextElement) ? 
        process.env.NODE_ENV !== 'production' ?
            // ReactDOM.render(): Invalid component element. Instead of passing a string like 'div', pass React.createElement('div') or <div />
            // ReactDOM.render(): Invalid component element. Instead of passing a class like Foo, pass React.createElement(Foo) or <Foo />
            invariant(
                false, 'ReactDOM.render(): Invalid component element.%s', 
                typeof nextElement === 'string' ? 
                    ' Instead of passing a string like \'div\', pass ' + 'React.createElement(\'div\') or <div />.' : 
                    typeof nextElement === 'function' ? 
                        ' Instead of passing a class like Foo, pass ' + 'React.createElement(Foo) or <Foo />.' :
                        // Check if it quacks like an element
                        // 检查它是否像一个元素
                        // 这可能是由于无意地加载了两个独立的React副本
                        nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : 
            _prodInvariant('39', typeof nextElement === 'string' ? ' Instead of passing a string like \'div\', pass ' + 'React.createElement(\'div\') or <div />.' : typeof nextElement === 'function' ? ' Instead of passing a class like Foo, pass ' + 'React.createElement(Foo) or <Foo />.' : nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : void 0;

  // √
    // render(): 直接把组件渲染到document.body上是不支持的, 因为它的子元素会经常被第三方脚本和浏览器扩展
    // 这可能会导致一些细微的冲突问题, 应该在你的app中渲染组件到一个被创建的container元素上
    process.env.NODE_ENV !== 'production' ? 
    warning(
      !container || !container.tagName || container.tagName.toUpperCase() !== 'BODY', 
      'render(): Rendering components directly into document.body is ' + 
        'discouraged, since its children are often manipulated by third-party ' + 
        'scripts and browser extensions. This may lead to subtle ' + 
        'reconciliation issues. Try rendering into a container element created ' + 
        'for your app.'
    ) : void 0;

    var nextWrappedElement = ReactElement(TopLevelWrapper, null, null, null, null, null, nextElement);

    var nextContext;
    if (parentComponent) { // null
      var parentInst = ReactInstanceMap.get(parentComponent);
      nextContext = parentInst._processChildContext(parentInst._context);
    } else {
      nextContext = emptyObject;
    }

    var prevComponent = getTopLevelWrapperInContainer(container); // null

    if (prevComponent) {
      var prevWrappedElement = prevComponent._currentElement;
      var prevElement = prevWrappedElement.props;
      if (shouldUpdateReactComponent(prevElement, nextElement)) {
        var publicInst = prevComponent._renderedComponent.getPublicInstance();
        var updatedCallback = callback && function () {
          callback.call(publicInst);
        };
        ReactMount._updateRootComponent(prevComponent, nextWrappedElement, nextContext, container, updatedCallback);
        return publicInst;
      } else {
        ReactMount.unmountComponentAtNode(container);
      }
    }

// simple
    var reactRootElement = getReactRootElementInContainer(container); // null
    var containerHasReactMarkup = reactRootElement && !!internalGetID(reactRootElement); // null
    var containerHasNonRootReactChild = hasNonRootReactChild(container); // null

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!containerHasNonRootReactChild, 'render(...): Replacing React-rendered children with a new root ' + 'component. If you intended to update the children of this node, ' + 'you should instead have the existing children update their state ' + 'and render the new components instead of calling ReactDOM.render.') : void 0;

      if (!containerHasReactMarkup || reactRootElement.nextSibling) {
        var rootElementSibling = reactRootElement;
        while (rootElementSibling) {
          if (internalGetID(rootElementSibling)) {
            process.env.NODE_ENV !== 'production' ? warning(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.') : void 0;
            break;
          }
          rootElementSibling = rootElementSibling.nextSibling;
        }
      }
    }

    var shouldReuseMarkup = containerHasReactMarkup && !prevComponent && !containerHasNonRootReactChild;
    var component = ReactMount._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, nextContext)._renderedComponent.getPublicInstance();
    if (callback) {
      callback.call(component);
    }
    return component;
  }
