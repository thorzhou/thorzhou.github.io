(function (window, undefined) {
    var cjQuery = function () {
        return new cjQuery.fn.init();
    };
    cjQuery.prototype = {               //原形
        constructor:cjQuery
    };
    cjQuery.prototype.init.prototype = cjQuery.prototype;
    window.cjQuery = window.$ = cjQuery;
})(window);