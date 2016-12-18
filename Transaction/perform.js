/**
   * Executes the function within a safety window. Use this for the top level
   * methods that result in large amounts of computation/mutations that would
   * need to be safety checked. The optional arguments helps prevent the need
   * to bind in many cases.
   *
   * scope的属性
   * @param {function} method Member of scope to call.
   * 在哪个作用域上调用
   * @param {Object} scope Scope to invoke from.
   * 下面这些都是传入方法的参数
   * @param {Object?=} a Argument to pass to the method.
   * @param {Object?=} b Argument to pass to the method.
   * @param {Object?=} c Argument to pass to the method.
   * @param {Object?=} d Argument to pass to the method.
   * @param {Object?=} e Argument to pass to the method.
   * @param {Object?=} f Argument to pass to the method.
   *
   * @return {*} Return value from `method`.
   */
  function perform(method, scope, a, b, c, d, e, f) {

  	// 判断是否在事务内部了
    !!this.isInTransaction()? 
    	process.env.NODE_ENV !== 'production' ? 
    		// 当已经有一个未完成的事务时，不能初始化事务
    		invariant(
    			false, 
    			'Transaction.perform(...): \
    			Cannot initialize a transaction \
    			when there is already an outstanding transaction.'
    		) : _prodInvariant('27') : void 0;

    var errorThrown; // 错误抛出
    var ret; // 定义返回值
    try {
      this._isInTransaction = true;
      // 捕获错误会使调试起来更加困难, 因此我们开始的时候设置errorThrown变量为true，
      // 在调用一系列方法之后会被设置为false，如果在finally块中依旧是true, 则说明在调用方法的过程中报错了。
      // Catching errors makes debugging more difficult, so we start with
      // errorThrown set to true before setting it to false after calling
      // close -- if it's still set to true in the finally block, it means
      // one of these calls threw.
      errorThrown = true;
      this.initializeAll(0);
      ret = method.call(scope, a, b, c, d, e, f); // 调用方法之后的返回值，这其实就是一个包装器
      errorThrown = false;
    } finally {
      try {
        if (errorThrown) {
        	// 如果方法报错了，则通过调用closeAll来抛出错误，显示堆栈追踪
          // If `method` throws, prefer to show that stack trace over any thrown
          // by invoking `closeAll`.
          try {
            this.closeAll(0);
          } catch (err) {}
        } else {
			//因为`method`没有抛出，所以我们不想在这里沉默异常
          // Since `method` didn't throw, we don't want to silence the exception
          // here.
          this.closeAll(0);
        }
      } finally {
        this._isInTransaction = false;
      }
    }
    return ret;
  }