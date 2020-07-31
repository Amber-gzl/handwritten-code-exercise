const temp = {}
temp.__proto__ = fn.prototype
fn.apply(temp, [...args])
return temp