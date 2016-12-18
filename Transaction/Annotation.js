/**
 `Transaction` creates a black box that is able to wrap any method such that
 certain invariants are maintained before and after the method is invoked
 (Even if an exception is thrown while invoking the wrapped method). Whoever
 instantiates a transaction can provide enforcers of the invariants at
 creation time. The `Transaction` class itself will supply one additional
 automatic invariant for you - the invariant that any transaction instance
 should not be run while it is already being run. You would typically create a
 single instance of a `Transaction` for reuse multiple times, that potentially
 is used to wrap several different methods. Wrappers are extremely simple -
 they only require implementing two methods.
 *
 * <pre>
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 * </pre>
 *
Use cases:
- Preserving the input selection ranges before/after reconciliation.
  Restoring selection even in the event of an unexpected error.
- Deactivating events while rearranging the DOM, preventing blurs/focuses,
  while guaranteeing that afterwards, the event system is reactivated.
- Flushing a queue of collected DOM mutations to the main UI thread after a
  reconciliation takes place in a worker thread.
- Invoking any collected `componentDidUpdate` callbacks after rendering new
  content.
- (Future use case): Wrapping particular flushes of the `ReactWorker` queue
  to preserve the `scrollTop` (an automatic scroll aware DOM).
- (Future use case): Layout calculations before and after DOM updates.
 *
Transactional plugin API:
- A module that has an `initialize` method that returns any precomputation.
- and a `close` method that accepts the precomputation. `close` is invoked
  when the wrapped process is completed, or has failed.
 *
 * @param {Array<TransactionalWrapper>} transactionWrapper Wrapper modules
 * that implement `initialize` and `close`.
 * @return {Transaction} Single transaction for reuse in thread.
 *
 * @class Transaction
 */


/*
`Transaction`创建一个黑盒子，它能够包装任何方法，使得某些不变量在调用方法之前和之后被维护（即使在调用被包装的方法时抛出异常）。 
实例化事务的任何人都可以在创建时提供不变量的执行者。 
“Transaction`类本身将为您提供一个额外的自动不变量 - 任何事务实例在其已经运行时不应该运行的不变量。
您通常会创建一个“事务”的单个实例来重用多次，这可能用于包装几个不同的方法。 
包装器非常简单 - 它们只需要实现两种方法。

用例：
- 保留对帐前/后的输入选择范围。
   即使在发生意外错误时也恢复选择。
- 重新安排DOM时停用活动，防止模糊/焦点，
   同时保证事后系统被重新激活。
- 将一个收集的DOM突变的队列刷新到主UI线程之后
   对调发生在工作线程中。
- 在渲染new之后调用任何收集的`componentDidUpdate`回调
   内容。
- （将来的用例）：包装“ReactWorker”队列的特定刷新
   保存`scrollTop`（一个自动滚动感知的DOM）。
- （未来用例）：DOM更新之前和之后的布局计算。

事务插件API：
- 具有返回任何预计算的`initialize`方法的模块。
- 和一个接受预先计算的“close”方法。 `close'被调用
   当包装过程完成或失败时。
 */





