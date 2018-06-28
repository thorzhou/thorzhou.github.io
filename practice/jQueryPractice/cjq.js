(function (window, undefined) {
    var cjQuery = function (selector) {
        return new cjQuery.prototype.init(selector);
    };
    cjQuery.prototype = {
        constructor:cjQuery,
        init:function (selector) {
            /*
            1.传入'', NaN, undefined, false, 0, null : 返回空JQ对象
            2.字符串
            代码片段:会将创建好的DOM元素保存为JQ对象返回
            选择器:会将所有找到的元素保存为JQ对象返回
            3.数组
            会将数组/伪数组中的元素依次存储到JQ对象中返回
            4.除上述类型以外的
            会将传入的数据存储到JQ对象中返回
             */
            selector = cjQuery.trim(selector);
            //1.传入'', NaN, undefined, false, 0, null : 返回空JQ对象
            if (!selector) {
                return this;
            }
            else if (cjQuery.isFunction(selector)){
                cjQuery.ready(selector);
            }
            //2.字符串
            else if (cjQuery.isString(selector)) {
                //判断是否html代码
                if (cjQuery.isHTML(selector)) {
                    //1.创建所有元素
                    var temp = document.createElement("div");
                    temp.innerHTML = selector;
                    //2.将创建好的一级元素都保存到cjq对象中
                    // for (var i=0; i < temp.children.length; i++){
                    //     this[i] = temp.children[i];
                    // }
                    // //3.给cjq添加length属性
                    // this.length = temp.children.length;
                    [].push.apply(this,temp.children);
                    //4.返回cjq对象
                    return this;
                }
                //是否选择器
                else {
                    //1.根据参数选择器找到对应的元素
                    var tmp = document.querySelectorAll(selector);
                    //2.将找到的元素添加到cjq上
                    [].push.apply(this, tmp);
                    //3.返回加工好的cjq对象
                    return this;
                }
                //都不是怎么办，不怎么办
            }
            //3.数组
            else if (cjQuery.isArray(selector)){
                // //真数组
                // if (({}).toString().apply(selector) === "[object Array]"){
                //     [].push.apply(this,selector);
                //     return this;
                // }
                // //伪数组
                // else {
                //     var arr = [].slice.call(selector);
                //     [].push.apply(this,arr);
                //     return this;
                // }
                var arr = [].slice.call(selector);//转化为真数组，因为IE8以下不支持伪数组的转化
                [].push.apply(this,arr);
                return this;
            }
            //4.其他类型
            else{
                this[0] = selector;
                this.length = 1;
                return this;
            }
        }
    };
    cjQuery.extend = cjQuery.prototype.extend = function(obj){
        for (var key in obj){
            this[key] = obj[key];
        }
    };
    cjQuery.extend({
        isString : function(obj){
        return typeof obj === "string";
    },
        isHTML : function(obj){
            return obj.charAt(0) === "<" && obj.charAt(obj.length-1) === ">" && obj.length >=3;
        },
        trim : function(str){
            if (!cjQuery.isString(str)){
                return str;
            }
            if (str.trim){
                return str.trim();
            } else{
                // reg包含在//中， ^表示开头，\s表示空格，+表示一个或多个，$表示结尾，|表示或者，g表示全局匹配因为默认找到一个就不找了
                return str.replace(/^\s+|\s+$/g,'');
            }
        },
        isObject : function(obj){
            return typeof obj === "object";
        },
        isWindow : function(obj){
            return obj === window;
        },
        isArray : function(arr){
            return cjQuery.isObject(arr) && !cjQuery.isWindow(arr) && "length" in arr;
        },
        isFunction : function(sel){
            return typeof sel === "function";
        },
        ready: function(fn){
            if (document.readyState == "complete"){
                fn();
            } else if (document.addEventListener){
                document.addEventListener("DOMContentLoaded", function () {
                    fn();
                })
            } else {
                document.attachEvent("onreadystatechange", function () {
                    if (document.readyState == "complete"){
                        fn();
                    }
                })
            }
        }
    });

    cjQuery.prototype.init.prototype = cjQuery.prototype;
    window.cjQuery = window.$ = cjQuery;
})(window);