function mixStaticSpecIntoComponent(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    var isReserved = name in RESERVED_SPEC_KEYS;
    !!isReserved ? 
      process.env.NODE_ENV !== 'production' ? 
        // 你正在试图去定义一个被保留的属性，它不应该定义在statics中, 而是把它作为一个实例属性定义
        // 它仍然可以在构造函数中访问
        invariant(
          false, 
          'ReactClass: You are attempting to define a reserved property, `%s`, \
          that shouldn\'t be on the "statics" key. \
          Define it as an instance property instead; \
          it will still be accessible on the constructor.', 
          name
        ) : _prodInvariant('78', name) : void 0;    

    var isInherited = name in Constructor;
    !!isInherited ? 
      process.env.NODE_ENV !== 'production' ? 
        // ReactClass: 你正在试图在你的组件中定义某个属性多次, 这可能是由于mixin冲突了
        invariant(
          false, 
          'ReactClass: You are attempting to define `%s` on your component more than once. \
          This conflict may be due to a mixin.', 
          name
        ) : _prodInvariant('79', name) : void 0;
    Constructor[name] = property;
  }
}

// 简化后的代码
function mixStaticSpecIntoComponent(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }
    Constructor[name] = property;
  }
}


