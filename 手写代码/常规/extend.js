// 原型式继承
function object(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}

// 寄生式继承
function create(obj) {
  const newObj = Object.create(obj)
  newObj.sayHi = () => console.log('hi')
  return newObj
}

// 寄生组合式继承
function inherit(subType, superType) {
  const prototype = Object.create(superType.prototype)
  prototype.constructor = subType
  subType.prototype = prototype
}

// 继承多个类
class SuperClass {}
class OtherSuperClass {}
function MyClass() {
  SuperClass.call(this)
  OtherSuperClass.call(this)
}

MyClass.prototype = Object.create(SuperClass.prototype)
Object.assign(MyClass.prototype, OtherSuperClass.prototype)
MyClass.prototype.constructor = MyClass

function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age){
  SuperType.call(this, name);
  this.age = age;
}

inherit(SubType, SuperType)

SubType.prototype.sayAge = function(){
  alert(this.age);
}

var instance1 = new SubType("xyc", 23);
var instance2 = new SubType("lxy", 23);

instance1.colors.push("2"); // ["red", "blue", "green", "2"]
instance1.colors.push("3"); // ["red", "blue", "green", "3"]

console.log(instance1)
console.log(instance2)
