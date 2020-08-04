// 和实现call基本一样
// 不同的是第二个参数可以为无/数组/类数组
Function.prototype.myApply = function(context) {
    context = context || window;
    // 唯一名
    const thisFn = Symbol();
    context.thisFn = this;
    let res
    if(arguments[1]) {
        res = context.thisFn(...arguments[1]);
    } else {
        res = context.thisFn();
    }
    delete context.thisFn;
    return res;
};
let obj1 = {
    name: 'gzl',
    school: 'sspku'
}

let obj2 = {
    name: 'hy',
    nickName: 'myBabyFish'
}

function whoAreU(){
    console.log('arguments=', arguments);
    console.log('this is ', this);
}

whoAreU.myApply(obj1);
whoAreU.myApply(obj2,[06,29]);