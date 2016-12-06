/**
 * 合并两个没有重复key的对象
 * Merge two objects, but throw if both contain the same key.
 * 合并两个对象, 如果出现相同的key将会抛出错误
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */
function mergeIntoWithNoDuplicateKeys(one, two) {
  !(one && two && typeof one === 'object' && typeof two === 'object') ? 
	process.env.NODE_ENV !== 'production' ? 
		// mergeIntoWithNoDuplicateKeys: 不能合并非对象类型
		invariant(
			false, 
			'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
		) : _prodInvariant('80') : void 0;

  for (var key in two) {
    if (two.hasOwnProperty(key)) {
    	!(one[key] === undefined) ? 
	process.env.NODE_ENV !== 'production' ? 
		// mergeIntoWithNoDuplicateKeys: 试图合并两个对象中相同的key: key
		// 这可能是由于mixin冲突;
		// 特别这可能是由于两个getInitialState()或getDefaultProps()方法
		// 返回对象key冲突造成的
		invariant(
			false, 
			'mergeIntoWithNoDuplicateKeys(): \ 
			Tried to merge two objects with the same key: `%s`. \ 
			This conflict may be due to a mixin; \ 
			in particular, this may be caused by two getInitialState() or getDefaultProps() methods \
			returning objects with clashing keys.', 
			key) : _prodInvariant('81', key) : void 0;

    	one[key] = two[key];
    }
  }
  return one;
}



