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


// 2 js实现



// 参考：https://blog.csdn.net/u010176097/article/details/80348447
// 参考：https://segmentfault.com/a/1190000018017796
// 参考：https://zhuanlan.zhihu.com/p/160315811