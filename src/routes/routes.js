import Home from '~/pages/Home';
// import LiveRadio from '~/pages/LiveRadio';
import config from '~/config';
// import Follow from '~/pages/Follow';
import Search from '~/pages/Search';
import Cart from '~/pages/Cart';
import List from '~/pages/List';
import Detail from '~/pages/Detail';
import Login from '~/pages/Login';
// import Add from '~/pages/Login';
import Register from '~/pages/Register';

import { AdminLayout } from '~/Layout';
import Dashboard from '~/pages/Dashboard';
import AdjustUser from '~/pages/AdjustUser';
import Order from '~/pages/Order';
import AddProduct from '~/pages/AddProduct';
import TrashProduct from '~/pages/TrashProduct';
import EditProduct from '~/pages/EditProduct';
import AddCategory from '~/pages/AddCategory';
import OrderDetail from '~/pages/OrderDetail';
// import Personal from '~/pages/Personal';
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: Search },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.list, component: List },
    { path: config.routes.detail, component: Detail },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },

    {
        path: config.routes.dashboard,
        component: Dashboard,
        layout: AdminLayout,
    },
    { path: config.routes.order, component: Order, layout: AdminLayout },
    {
        path: config.routes.adjustUser,
        component: AdjustUser,
        layout: AdminLayout,
    },
    {
        path: config.routes.addProduct,
        component: AddProduct,
        layout: AdminLayout,
    },
    {
        path: config.routes.trashProduct,
        component: TrashProduct,
        layout: AdminLayout,
    },
    {
        path: config.routes.editProduct,
        component: EditProduct,
        layout: AdminLayout,
    },
    {
        path: config.routes.addCategory,
        component: AddCategory,
        layout: AdminLayout,
    },
    {
        path: config.routes.orderDetail,
        component: OrderDetail,
        layout: AdminLayout,
    },

    // { path: config.routes.login, component: Login, layout: null  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
