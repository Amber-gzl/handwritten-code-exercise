// 1 理解
// 1.1 apply、call与bind特点分析：
// 三者都是为了改变this的指向
// apply和call的主要作用是改变对象的执行上下文，并且是立即执行的，没有返回值
// 调用apply和call的对象必须是函数fun，他们的第一个参数必须是一个对象obj，即这时fun的调用者是obj
// apply和call的区别是参数写法略有不同：
//     call可以接受任意个参数并映射到相应位置的function参数上
//     apply只接受2个参数，第二参数必须是数组或者类数组，用于映射function参数
//         [类数组]是 具有与数组特征类似的 对象（具有length，可for遍历...）但是不能用数组原型链上的方法
// bind返回函数（重新绑定对象），需要调用才会执行(a,c是立即执行的，并没有存下来),只接受2个参数
// 1.2 使用场景：
//     A对象有方法a，而对象B也需要用到a的方法，这时可以改变a的执行上下文为B，使B借用A的a
//     这样既完成了需求，又减少了内存的占用
// 1.3 使用例子
// 1.3.1 理解例子
// 猫吃鱼，狗啃骨头，狗突然想吃鱼，狗每顿都想吃鱼
// 猫-吃鱼
var cat = {
    name:"喵~",
    eatFish:function(param1, param2){
        console.log(this, "在吃鱼");
        console.log(param1, param2);
    }
}
// 狗-啃骨头
var dog = {
    name:"汪！",
    eatBone:function(param1, param2){
        console.log(this, "在啃骨头");
        console.log(param1, param2);
    }
}
// 狗突然想吃鱼
// 猫“现场剔好骨头”再“喂”给狗
// (1) 用call的方法吃鱼，直接传参
cat.eatFish.call(dog, "旺财", "call");
// (2) 用apply的方法吃鱼，数组/类数组传参
cat.eatFish.apply(dog, ["旺财", "apply"]);
// 狗每顿都想吃鱼
// 猫把吃鱼方法“教”给狗
var eatFishFun = cat.eatFish.bind(dog, "旺财", "bind");
console.log("bind返回：", eatFishFun);
// 狗纸会自己吃鱼啦！
eatFishFun();
// cat.eatFish.bind(dog, "旺财", "bind")();//这时相当于apply

// 1.3.2 some 妙用
// 代替es6扩展符
var arr1 = [1,2,3,4,5];

var max1 = Math.max(...arr1);
var max2 = Math.max.apply(null, arr1);

console.log("扩展符...结果：", max1);
console.log("apply结果：",max2)

// 合并数组
// cancat不改变原数组，返回一个新数组，某些场景会造成很大的内存浪费
// for循环 hard coding
// apply调用push，将arr2合并到arr1上
var arr2 = [6,7,8];

arr1.push.apply(arr1,arr2);
// Array.prototype.push.apply(arr1, arr2);
console.log(arr1);

// 类数组用数组原型的方法
function sumOnlyNumber() {
    var args = arguments;//类数组
    var numbers = filterNumber();
    return numbers.reduce((sum,element) => sum + element);
    
    function filterNumber(){
        // 类数组args使用filter方法
        return Array.prototype.filter.call(
            args,
            element => typeof element === 'number'
        );
    }
}
console.log(sumOnlyNumber(1, "hello", 5, false));

// 2 js实现
// 2.1 只用ES6实现
// 优点：可以使用const、...操作符，代码简洁
// 缺点：不兼容IE
// (1) 定义
var myBind_1 = function(asThis, ...args) {
    // ...args剩余数组,把不定数量的参数表示为一个数组args
    // 这里的args = [[param1,param2]]
    // 所以...args = [param1,param2]
    const fn = this;
    return function(...arg2){
        return fn.apply(asThis, ...args, ...arg2);
        // ...args,...arg2 解构赋值
    }
};
// (2) 在函数Funtion的原型上添加方法
Function.prototype.myBind_1 = myBind_1;
// Function.prototype.myBind_1 = function(){...}；
// (3) 使用
var myEatFishFun_1 = cat.eatFish.myBind_1(dog, ["小黄","myBind_1"]);
myEatFishFun_1();

// 2.2 使用ES5实现(即不用const和...)
// 优点：兼容IE
// 缺点：参数要用Array.prorotypr.slice取，复杂且不支持new
// (1) 定义
var myBind_2 = function bind_2 (asThis) {
    // args为bind_2参数类数组argument的第二位往后所有
    // argument是类数组不能直接使用slice方法，需要call绑定
    var slice = Array.prototype.slice;
    var args = slice.call(arguments,1,2)[0].concat(slice.call(arguments,2));
    // console.log(args);
    var fn = this;
    return function() {
        var args2 = Array.prototype.slice.call(arguments,0);
        // console.log(args.concat(args2));
        return fn.apply(asThis, args.concat(args2));
        // args.concat(args2)返回新数组，args与args2本身不变，相当于[...args, args2]
    };
}
// (2) 在函数Funtion的原型上添加方法
Function.prototype.myBind_2 = myBind_2;
// (3) 使用
var myEatFishFun_2 = cat.eatFish.myBind_2(dog, ["小黄","myBind_2"]);
myEatFishFun_2();

  
// 参考：https://blog.csdn.net/u010176097/article/details/80348447
// 参考：https://segmentfault.com/a/1190000018017796
// 参考：https://zhuanlan.zhihu.com/p/160315811