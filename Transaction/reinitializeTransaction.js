/**
   * Sets up this instance so that it is prepared for collecting metrics. Does
   * so such that this setup method may be used on an instance that is already
   * initialized, in a way that does not consume additional memory upon reuse.
   * That can be useful if you decide to make your subclass of this mixin a
   * "PooledClass".
   * 设置此实例，以便准备收集指标。 
   * 这样做使得该设置方法可以在已经被初始化的实例上以在重用时不消耗附加存储器的方式使用。 
   * 如果你决定将这个混合的子类化为“PooledClass”，这将是有用的。
   */
  function reinitializeTransaction() {
    this.transactionWrappers = this.getTransactionWrappers();
    if (this.wrapperInitData) {
      this.wrapperInitData.length = 0;
    } else {
      this.wrapperInitData = [];
    }
    this._isInTransaction = false;
  }