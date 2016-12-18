var REACT_ELEMENT_TYPE = 
    typeof Symbol === 'function' && 
    Symbol['for'] && Symbol['for']('react.element') || 0xeac7;
    
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && 
    object !== null && 
    object.$$typeof === REACT_ELEMENT_TYPE;
};