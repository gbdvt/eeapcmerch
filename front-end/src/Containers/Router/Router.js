import React, { Suspense } from 'react'

import styles from './Router.module.css'

import {
    Switch,
    Route,
} from "react-router-dom";

import UnderConstruction from '../../Components/Contruction/Contruction'
import FrontPage from '../FrontPage/FrontPage'
import StorePage from '../StorePage/StorePage'
import SingleItem from '../SingleItem/SingleItem'
import Loading from '../../Components/Loaders/Circle/Circle'
import About from '../About/About'

import Authrouter from './NestedRouters/Auth'
const RouterLazy = React.lazy(() => import('./NestedRouters/User'))
const UserRouter = () => (
    <Suspense fallback={<Loading />}>
        <RouterLazy />
    </Suspense>
)

const Router = () => {
    return (
        <div className={styles.outerContainer}>
            <div className={styles.container}>
                    <Switch>

                        <Route path="/" exact>
                            <FrontPage />
                        </Route>

                        <Route path="/auth" exact={false}>
                            <Authrouter />
                        </Route>

                        <Route path="/user" exact={false} component={UserRouter} />

                        <Route path="/about">
                            <About />
                        </Route>

                        <Route path="/Store">
                            <StorePage />
                        </Route>

                        <Route path="/items/:id">
                            <SingleItem />
                        </Route>

                    </Switch>
            </div>
        </div>
    )
}

export default Router