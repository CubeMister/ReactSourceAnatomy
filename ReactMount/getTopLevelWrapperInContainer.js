// document.getElmenetById('app')

function getTopLevelWrapperInContainer(container) {
  var root = getHostRootInstanceInContainer(container); // null
  return root ? root._hostContainerInfo._topLevelWrapper : null; // null
}