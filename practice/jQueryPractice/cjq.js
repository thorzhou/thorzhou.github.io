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
        },
        jquery: "1.1.0",
        selector:"",
        length: 0,
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        toArray: function () {
            return [].slice.call(this);
        },
        get: function (num) {
            if (arguments.length == 0){
                return this.toArray();
            } else if (num >= 0){
                return this[num];
            } else {
                return this[this.length + num];
            }
        },
        eq: function (num) {
            if (arguments.length == 0){
                return new cjQuery();
            } else {
                return cjQuery(this.get(num));
            }
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        each: function (fn) {
            return cjQuery.each(this, fn);
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
        },
        each: function (obj, fn) {
            //判断是否数组
            if (cjQuery.isArray(obj)){
                for (var i=0; i< obj.length; i++){
                    var res = fn.call(obj[i],i, obj[i]);
                    if (res === false){
                        break;
                    }
                }
            }
            //判断是否对象
            else{
                for (var key in obj){
                    var tmp = fn.call(obj[key],key, obj[key]);
                    if (tmp === false){
                        break;
                    }
                }
            }
            return obj;
        },
        map: function (obj, fn) {
            //默认返回空数组
            var res = [];
            if (cjQuery.isArray(obj)){
                for (var i = 0; i < obj.length; i++){
                    var val = fn(obj[i], i);
                    if (val){
                        res.push(val);
                    }
                } 
            }
            else if (cjQuery.isObject(obj)){
                for (var key in obj){
                    var tmp = fn(obj[key], key);
                    if (tmp){
                        res.push(tmp);
                    }
                }
            }
            return res;
        },
        appendTo: function (sel) {
            var $sel = $(sel);
            var $this = this;
            var res = [];
            // for (var i = 0; i < $sel.length; i++) {
            //     var targetEle = $sel[i];
            //     for (var j = 0; j < $this.length; j++) {
            //         var $source = $this[j];
            //         if (i === 0) {
            //             targetEle.appendChild($source);
            //         }
            //         else{
            //             var tmp = $source.cloneNode(true);
            //             targetEle.appendChild(tmp);
            //         }
            //     }
            // }
            $.each($sel,function (key, value) {
                $.each($this, function (k, v) {
                    if (key === 0) {
                        value.appendChild(v);
                        res.push(v);
                    }
                    else{
                        var tmp = v.cloneNode(true);
                        value.appendChild(tmp);
                        res.push(tmp);
                    }
                })
            });
            return $(res);
        },
        prependTo: function (sel) {
            var $this = this;
            var $sel = $(sel);
            var res = [];
            $.each($sel, function (key, value) {
                $.each($this, function (k, v) {
                    if (key === 0) {
                        value.insertBefore(v, value.firstChild);
                        res.push(v);
                    }
                    else {
                        var tmp = v.cloneNode(true);
                        value.insertBefore(tmp, value.firstChild);
                        res.push(tmp);
                    }
                });
                return $(res);
            })
        },
        append: function (str) {
            //参数是字符串时,直接添加到元素内html最后
            if (cjQuery.isString(str)) {
                this[0].html += str;
            }
            //方法调用对象和参数对象顺序不同
            else {
                $(str).appendTo(this);
            }
            //返回值不同
            return this;
        },
        prepend: function (str) {
            if (cjQuery.isString(str)) {
                this[0].html = str + this[0].html;
            }else{
                $(str).prependTo(this);
            }
            return this;
        }
    });
    cjQuery.prototype.extend({
        empty:function () {
            this.each(function (key, value) {
                value.innerHTML = "";
            });
            //方便链式编程
            return this;
        },
        remove: function (sel) {
            if (arguments.length === 0){
                this.each(function (key, value) {
                    //根据遍历到的元素找到父元素，才能删除该元素
                    var parent = value.parentNode;
                    parent.removeChild(value);
                });
            }
            else{
                var $this = this;
                //1.根据传入的选择器找到对应的元素
                $(sel).each(function (key, value) {
                    //2.遍历找到的元素，获取对应的类型
                    var type = value.tagName;
                    //3.遍历指定的元素
                    $this.each(function (k, v) {
                        //4.获取指定元素的类型
                        var t = v.tagName;
                        if (t === type) {
                            //根据遍历到的元素找到父元素，才能删除该元素
                            var parent = value.parentNode;
                            parent.removeChild(value);
                        }
                    })
                })
                //5.判断找到的元素的类型和指定元素的类型是否相同
            }

        },
        html: function (content) {
            if(arguments.length === 0){
                return this[0].innerHTML;
            }
            else{
                this.each(function (key, value) {
                    value.innerHTML = content;
                })
            }
        },
        text: function (content) {
            if (arguments.length === 0) {
                var res = "";
                this.each(function (key, value) {
                    res += value.innerText;
                })
            }
            else{
                this.each(function (key, value) {
                    value.innerText = content;
                })
            }
        }
    });
    cjQuery.prototype.init.prototype = cjQuery.prototype;
    window.cjQuery = window.$ = cjQuery;
})(window);