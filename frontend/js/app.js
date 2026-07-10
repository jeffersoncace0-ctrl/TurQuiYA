import { router } from './router.js';

window.navigate = async (page, data = null) => {
    await router(page, data);
};

router('home');