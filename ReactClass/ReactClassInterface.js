/**
 * Composite components are higher-level components that compose other composite
 * or host components.
 * 复合组件是高级组件，可以组成其他的复合或者根组件
 * To create a new type of `ReactClass`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 * 为了创建一个ReactClass新类型, 需要给ReactClass传递一个新的规范。
 * 在传递的规范中，你至少需要实现一个render方法
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactClassInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will be available on the prototype.
 *
 * 类规范支持一个方法的特殊协议，并且有特别的方法(例如: render).
 * 查看ReactClassInterface来得到更全面的协议。
 * 
 * 类规范中的任何其他属性和方法将在原型中可用。
 * @interface ReactClassInterface
 * @internal
 */
var ReactClassInterface = {

  /**
   * An array of Mixin objects to include when defining your component.
   * Mixin对象的一个数组包含在你定义的组件中
   * @type {array}
   * @optional
   */
  mixins: SpecPolicy.DEFINE_MANY,

  /**
   * An object containing properties and methods that should be defined on
   * the component's constructor instead of its prototype (static methods).
   * 包含属性和方法的对象应该被定义在组件的构造器中，而不是prototype(静态方法)
   * @type {object}
   * @optional
   */
  statics: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of prop types for this component.
   * 定义组件的prop类型
   * @type {object}
   * @optional
   */
  propTypes: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of context types for this component.
   * 定义组件的context类型
   * @type {object}
   * @optional
   */
  contextTypes: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of context types this component sets for its children.
   * 定义组件children的context类型
   * @type {object}
   * @optional
   */
  childContextTypes: SpecPolicy.DEFINE_MANY,

  // ==== Definition methods ====

  /**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   * 组件被挂载时调用，如果prop没有被指定(例如使用in检查一下)，该方法返回的值将会被设置到this.props上
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   * 该方法会在getInitialState之前调用，所以不能在该方法中使用this.state或者this.setState
   * @return {object}
   * @optional
   */
  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   * 组件挂载之前调用一次，返回的值将被作为this.state的初始值
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */
  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * @return {object}
   * @optional
   */
  getChildContext: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   * 使用this.props和this.state来渲染组件
   * 
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   * 不能保证该方法什么时候调用以及怎样调用，因此在该方法中不能进行其他有影响的操作
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @nosideeffects
   * @required
   */
  render: SpecPolicy.DEFINE_ONCE,

  // ==== Delegate methods ====
  // 委托方法
  /**
   * Invoked when the component is initially created and about to be mounted.
   * 组件初始创建时并即将挂载组件时调用。
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   * 该方法中可能会有一些其他的影响，任何外部订阅或通过此方法创建的数据必须在`componentWillUnmount`中清除
   * @optional
   */
  componentWillMount: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   * 当组件被挂载并且有一个DOM代表时被调用。
   * 
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   * 在组件已经被挂载时，使用该方法是一个机会来在DOM上操作
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidMount: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked before the component receives new props.
   * 在组件接收新的props之前被调用
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   * 可以在该方法中使用this.setState来更新state。 当前的props依旧通过this.props来访问
   *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   * 注意：是没有componentWillReceiveState这个方法的，过渡到一个新的prop也许会造成一个state的改变
   * 但是反过来就不是这样的。如果你需要这个方法，你可以看一下componentWillUpdate
   * @param {object} nextProps
   * @optional
   */
  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props, state and/or context.
   * 该方法用来决定，当接收新的props/ state / context时组件是否应该被更新
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props/state/context will not require a component
   * update.
   *
   * 可以在该方法中返回false，当你非常确定这次props/state/context的改变将不必导致组件的更新
   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @return {boolean} True if the component should update.
   * @optional
   */
  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,

  /**
   * Invoked when the component is about to update due to a transition from
   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
   * and `nextContext`.
   * 当组件即将被更新时调用，this.props/this.state/this.context将会过渡到nextProps/nextState/nextContext
   * Use this as an opportunity to perform preparation before an update occurs.
   * 可以在发生更新之前执行一些预先的操作
   * NOTE: You **cannot** use `this.setState()` in this method.
   * 注意: 你不能在该方法中使用this.setState()方法
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */
  componentWillUpdate: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component's DOM representation has been updated.
   * 组件的DOM元素被更新时，被调用
   * 
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   * 当组件完成更新，可以在该方法中操作DOM
   * 
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {?object} prevContext
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidUpdate: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   * 组件即将从它的父节点上删除时被调用
   * Use this as an opportunity to deallocate any external resources.
   * 可以在该方法中释放一些额外的资源
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   * 注意：这里没有componentDidUnmount方法, 因为你的组件在此时还没有被销毁
   * @optional
   */
  componentWillUnmount: SpecPolicy.DEFINE_MANY,

  // ==== Advanced methods ====

  /**
   * Updates the component's currently mounted DOM representation.
   * 更新组件当前挂载的DOM节点
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   * 默认的，这实现了React的渲染和对比算法。
   * 复杂的前端也许希望覆写这个
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */
  updateComponent: SpecPolicy.OVERRIDE_BASE
};

// 简化后的状态
// 
var ReactClassInterface = {
  mixins: SpecPolicy.DEFINE_MANY,
  statics: SpecPolicy.DEFINE_MANY,
  propTypes: SpecPolicy.DEFINE_MANY,
  contextTypes: SpecPolicy.DEFINE_MANY,
  childContextTypes: SpecPolicy.DEFINE_MANY,
  // ==== Definition methods ====
  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,
  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,
  getChildContext: SpecPolicy.DEFINE_MANY_MERGED,
  render: SpecPolicy.DEFINE_ONCE,
  // ==== Delegate methods ====
  componentWillMount: SpecPolicy.DEFINE_MANY,
  componentDidMount: SpecPolicy.DEFINE_MANY,
  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,
  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,
  componentWillUpdate: SpecPolicy.DEFINE_MANY,
  componentDidUpdate: SpecPolicy.DEFINE_MANY,
  componentWillUnmount: SpecPolicy.DEFINE_MANY,
  // ==== Advanced methods ====
  updateComponent: SpecPolicy.OVERRIDE_BASE
};