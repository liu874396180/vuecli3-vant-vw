const ctx = '@@InfiniteScroll';

// 节流函数
var throttle = function (fn, delay) {
    var now, lastExec, timer, context, args; //eslint-disable-line

    var execute = function () {
        fn.apply(context, args);
        lastExec = now;
    };

    return function () {
        context = this;
        args = arguments;

        now = Date.now();

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        if (lastExec) {
            var diff = delay - (now - lastExec);
            if (diff < 0) {
                execute();
            } else {
                timer = setTimeout(() => {
                    execute();
                }, diff);
            }
        } else {
            execute();
        }
    };
};

var getScrollTop = function (element) {
    if (element === window) {
        return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
    }

    return element.scrollTop;
};

var getComputedStyle = document.defaultView.getComputedStyle;

/*
* 获取可以垂直滚动的元素
*/
var getScrollEventTarget = function (element) {
    var currentNode = element;
    // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {//Element
        var overflowY = getComputedStyle(currentNode).overflowY;
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
        }
        currentNode = currentNode.parentNode;
    }
    return window;
};

var getVisibleHeight = function (element) {
    if (element === window) {
        return document.documentElement.clientHeight || document.body.clientHeight;
    }

    return element.clientHeight;
};

var getElementTop = function (element) {
    if (element === window) {
        return getScrollTop(window);
    }
    return element.getBoundingClientRect().top + getScrollTop(window);
};

// 检查指令元素是否在HTML父节点内
var isAttached = function (element) {
    var currentNode = element.parentNode;
    while (currentNode) {
        if (currentNode.tagName === 'HTML') {
            return true;
        }
        if (currentNode.nodeType === 11) {//DocumentFragment
            return false;
        }
        currentNode = currentNode.parentNode;
    }
    return false;
};

var doBind = function () {
    if (this.binded) return; // eslint-disable-line
    this.binded = true;
    var directive = this;
    var element = directive.el;

    directive.scrollEventTarget = getScrollEventTarget(element);
    directive.scrollListener = throttle(doCheck.bind(directive), 200);
    directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener);

    // watch监控infinite-scroll-disabled绑定的数据变化 决定是否禁用
    var disabledExpr = element.getAttribute('infinite-scroll-disabled');
    var disabled = false;

    if (disabledExpr) {
        this.vm.$watch(disabledExpr, function (value) {
            directive.disabled = value;
            if (!value && directive.immediateCheck) {
                doCheck.call(directive);
            }
        });
        disabled = Boolean(directive.vm[disabledExpr]);
    }
    directive.disabled = disabled;

    // 获取infinite-scroll-distance绑定的数字 判断距离底部的距离
    var distanceExpr = element.getAttribute('infinite-scroll-distance');
    var distance = 0;
    if (distanceExpr) {
        distance = Number(directive.vm[distanceExpr] || distanceExpr);
        if (isNaN(distance)) {
            distance = 0;
        }
    }
    directive.distance = distance;

    var immediateCheckExpr = element.getAttribute('infinite-scroll-immediate-check');
    var immediateCheck = true;
    if (immediateCheckExpr == "true") immediateCheck = true;
    if (immediateCheckExpr == "false") immediateCheck = false;
    directive.immediateCheck = immediateCheck;
    if (immediateCheck) {
        doCheck.call(directive);
    }

    var eventName = element.getAttribute('infinite-scroll-listen-for-event');
    if (eventName) {
        directive.vm.$on(eventName, function () {
            doCheck.call(directive);
        });
    }
};

/*
* 判断是否达到可触发loadMore条件
*/
var doCheck = function (force) {
    var scrollEventTarget = this.scrollEventTarget;
    var element = this.el;
    var distance = this.distance;

    if (force !== true && this.disabled) return; //eslint-disable-line
    var viewportScrollTop = getScrollTop(scrollEventTarget);
    var viewportBottom = viewportScrollTop + getVisibleHeight(scrollEventTarget);

    var shouldTrigger = false;

    if (scrollEventTarget === element) {
        shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance;
    } else {
        var elementBottom = getElementTop(element) - getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop;
        shouldTrigger = viewportBottom + distance >= elementBottom;
    }

    if (shouldTrigger && this.expression) {
        this.expression();
    }
};

export default {
    bind (el, binding, vnode) {//bind (el, binding, vnode, oldVnode)

        el[ctx] = {
            el,// 指令绑定的DOM元素
            vm: vnode.context,// 指令绑定的组件
            expression: binding.value // 指令的值
        };
        const args = arguments;
        // 监听组件的 mounted 事件
        el[ctx].vm.$on('hook:mounted', function () {

            console.log("hook:mounted")
            el[ctx].vm.$nextTick(function () {
                if (isAttached(el)) {
                    doBind.call(el[ctx], args);
                }

                el[ctx].bindTryCount = 0;

                var tryBind = function () {
                    if (el[ctx].bindTryCount > 10) return; //eslint-disable-line
                    el[ctx].bindTryCount++;
                    if (isAttached(el)) {
                        doBind.call(el[ctx], args);
                    } else {
                        setTimeout(tryBind, 50);
                    }
                };

                tryBind();
            })

        });

        // 解决路由在keep-alive缓存下，不会触发unbind，所造成无法移除scroll事件带来的问题
        let isKeepAlive = false;
        el[ctx].vm.$on('hook:activated', function () {
            if (isKeepAlive) {
                el[ctx].vm.$nextTick(function () {
                    el[ctx].scrollEventTarget.addEventListener('scroll', el[ctx].scrollListener);
                })
            }
        })

        el[ctx].vm.$on('hook:deactivated', function () {
            isKeepAlive = true;
            el[ctx].scrollEventTarget.removeEventListener('scroll', el[ctx].scrollListener);
        })
    },

    unbind (el) {
        console.log("removeEventListener")
        el[ctx].scrollEventTarget.removeEventListener('scroll', el[ctx].scrollListener);
    }
};