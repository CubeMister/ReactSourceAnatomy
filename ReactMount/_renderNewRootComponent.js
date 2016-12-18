/**
    * Render a new component into the DOM. Hooked by hooks!
    *
    * @param {ReactElement} nextElement element to render
    * @param {DOMElement} container container to render into
    * @param {boolean} shouldReuseMarkup if we should skip the markup insertion
    * @return {ReactComponent} nextComponent
    */
function _renderNewRootComponent(nextElement, container, shouldReuseMarkup, context) {
    // Various parts of our code (such as ReactCompositeComponent's
    // _renderValidatedComponent) assume that calls to render aren't nested;
    // verify that that's the case.
    process.env.NODE_ENV !== 'production' ? 
        warning(
            ReactCurrentOwner.current == null, 
            '_renderNewRootComponent(): Render methods should be a pure function ' + 
                'of props and state; triggering nested component updates from ' + 
                'render is not allowed. If necessary, trigger nested updates in ' + 
                'componentDidUpdate. Check the render method of %s.', 
            ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent'
        ) : void 0;

    !isValidContainer(container) ? 
        process.env.NODE_ENV !== 'production' ? 
            invariant(
                false, 
                '_registerComponent(...): Target container is not a DOM element.'
            ) : _prodInvariant('37') : void 0;

    ReactBrowserEventEmitter.ensureScrollValueMonitoring();
    var componentInstance = instantiateReactComponent(nextElement, false);

    // The initial render is synchronous but any updates that happen during
    // rendering, in componentWillMount or componentDidMount, will be batched
    // according to the current batching strategy.

    ReactUpdates.batchedUpdates(batchedMountComponentIntoNode, componentInstance, container, shouldReuseMarkup, context);

    var wrapperID = componentInstance._instance.rootID;
    instancesByReactRootID[wrapperID] = componentInstance;

    return componentInstance;
  }