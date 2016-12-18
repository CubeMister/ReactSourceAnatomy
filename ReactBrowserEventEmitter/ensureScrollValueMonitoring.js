/**
   * Listens to window scroll and resize events. We cache scroll values so that
   * application code can access them without triggering reflows.
   *
   * ViewportMetrics is only used by SyntheticMouse/TouchEvent and only when
   * pageX/pageY isn't supported (legacy browsers).
   *
   * NOTE: Scroll events do not bubble.
   *
   * @see http://www.quirksmode.org/dom/events/scroll.html
   */
 
// var hasEventPageXY;
// var isMonitoringScrollValue = false;

function ensureScrollValueMonitoring() {
  if (hasEventPageXY === undefined) {
    hasEventPageXY = ReactBrowserEventEmitter.supportsEventPageXY();
  }

  if (!hasEventPageXY && !isMonitoringScrollValue) {
    var refresh = ViewportMetrics.refreshScrollValues;
    ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
    isMonitoringScrollValue = true;
  }
}