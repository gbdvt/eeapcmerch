import React, { Suspense } from "react";
import {
    Route,
} from "react-router-dom";

import UnderConstruction from '../../../Components/Contruction/Contruction'
import Dashboard from '../../User/Dashboard/Dashboard'
import Cart from '../../User/Cart/Cart'
import MyOrders from '../../User/MyOrders/Orders'
import SingleOrder from '../../User/SingleOrder/SingleOrder'
import Loading from '../../../Components/Loaders/Circle/Circle'

const StatsLazy = React.lazy(() => import('../../User/Stats/Stats'))
const Stats = () => (
    <Suspense fallback={<Loading />}>
        <StatsLazy />
    </Suspense>
)

const NewItemLazy = React.lazy(() => import('../../User/Items/NewItem/NewItem'))
const NewItem = () => (
    <Suspense fallback={<Loading />}>
        <NewItemLazy />
    </Suspense>
);

const ModStockLazy = React.lazy(() => import('../../User/Items/ModStock/ModStock'))
const ModStock = () => (
    <Suspense fallback={<Loading />}>
        <ModStockLazy />
    </Suspense>
);

const App = () => {
    return (
        <>
            <Route path='/user' exact={true}>
                <Dashboard />
            </Route>

            <Route path='/user/cart' >
                <Cart />
            </Route>

            <Route path='/user/new-item' exact={true} component={NewItem} />

            <Route path='/user/orders' exact={true}>
                <MyOrders />
            </Route>

            <Route path='/user/stats' exact={true} component={Stats} />

            <Route path='/user/all-orders' exact={true}>
                <MyOrders all={true} />
            </Route>

            <Route path='/user/order/:id' exact={true}>
                <SingleOrder />
            </Route>

            <Route path='/user/modStock/:id' exact={true}>
                <ModStock />
            </Route>


        </>
    )
}

export default App