/**
 * 模态框辅助器
 * 场景：模态框打开或关闭
 * 问题：解决模态框打开滚动穿透问题。
 */

export default (function (bodyCls) {
    var scrollTop;
    return {
        open: function () {
            scrollTop = document.scrollingElement.scrollTop;
            document.body.classList.add(bodyCls);
            document.body.style.top = -scrollTop + 'px';
        },
        close: function () {
            document.body.classList.remove(bodyCls);
            // scrollTop lost after set position:fixed, restore it back.
            document.scrollingElement.scrollTop = scrollTop;
            document.body.style.top = "auto";
        }
    };
})('modal-open');