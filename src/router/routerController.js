
import router from "@/router/router"
import bcBridge from "@/utils/bcBridge.js"

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        bcBridge.updateTitle(to.meta.title);
    }
    next();
})