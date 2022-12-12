import Home from '~/pages/Home';
// import LiveRadio from '~/pages/LiveRadio';
import config from '~/config';
// import Follow from '~/pages/Follow';
import Search from '~/pages/Search';
import Cart from '~/pages/Cart';
import List from '~/pages/List';
import Detail from '~/pages/Detail';
// import Personal from '~/pages/Personal';
const publicRoutes = [
    // { path: config.routes.personal, component: Personal},
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: Search },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.list, component: List},
    { path: config.routes.detail, component: Detail},
    // { path: config.routes.follow, component: Follow },
    // { path: '/liveradio', component: LiveRadio, layout: null },
];

//Khi không đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };
