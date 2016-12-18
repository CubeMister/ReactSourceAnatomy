/**
 * @providesModule Transaction
 */

'use strict';
var _prodInvariant = require('./reactProdInvariant');
var invariant = require('fbjs/lib/invariant');
var Mixin = {
  _isInTransaction: false,
  /**
   * @abstract
   * @return {Array<TransactionWrapper>} Array of transaction wrappers.
   * 返回值是一个事务包装器的数组
   */
  getTransactionWrappers: null,
  isInTransaction: function () {
    return !!this._isInTransaction;
  }
};

var Transaction = {
  Mixin: Mixin,
  /**
   * Token to look for to determine if an error occurred.
   * 监视以确定是否发生错误
   */
  OBSERVED_ERROR: {}
};

module.exports = Transaction;