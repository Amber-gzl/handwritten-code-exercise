// call用来改变调用方法的this指向
// 使函数的this和传入的contex的作用域保持一致
// 常用来封装一些方法/做一些源码框架
// 还可以和toString配合使用，来判断变量类型（JQurey/Vue/React源码都是用这种方法）

// typeof操作符返回一个字符串，表示未经计算的操作数的类型；
// typeof测试如下：
console.log("typeof undefined = ",typeof undefined);
console.log("typeof Null = ",typeof null);
console.log("typeof Boolean = ",typeof true);
console.log("typeof Number = ",typeof 666);
console.log("typeof String = ",typeof "gzl");
console.log("typeof Function = ",typeof ((a,b)=>{a+b;}));
// Symbol是ES6新引入的基本数据类型，表示独一无二的值。
// 理解和使用ES6中的Symbol：https://www.jianshu.com/p/f40a77bbd74e
// 创建方法
var s = Symbol("sym");
console.log("typeof Symbol = ",typeof s);

// 除了上述类型，其余对象（如Array）均返回Object，故用typeof判断函数类型并不准确
// instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置。
// 但是js是弱类型语言，字面量产出的原始数据类型无法使用instanceof判断。
// 因此使用toString+call判断是最准确的
console.log(Object.prototype.toString.call("zpp"));//[object String]
console.log(Object.prototype.toString.call(4));//[object Number]
console.log(Object.prototype.toString.call(true));//[object Boolean]
console.log(Object.prototype.toString.call(undefined));//[object Undefined]
console.log(Object.prototype.toString.call(null));//[object Null]
console.log(Object.prototype.toString.call({name: "zpp"}));//[object Object]
console.log(Object.prototype.toString.call(function(){}));//[object Function]
console.log(Object.prototype.toString.call([]));//[object Array]
console.log(Object.prototype.toString.call(new Date));//[object Date]
console.log(Object.prototype.toString.call(/\d/));//[object RegExp]
function Product(){};
console.log(Object.prototype.toString.call(new Product));//[object Object]


Function.prototype.myCall = function(){

}