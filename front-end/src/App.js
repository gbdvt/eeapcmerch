import styles from './App.module.css';
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux'

import 'react-toastify/dist/ReactToastify.css';

import store from './Utils/Redux/StoreConfig'

import Router from './Containers/Router/Router'
import Header from './Containers/Nav/Nav'

import skate from './Assets/Images/skate.png'

import {
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <div className={styles.outerContainier}>
      <Provider store={store}>
        <BrowserRouter>
          <img src={skate} className={styles.image} />
          <Header />
          <div className={styles.routerContainer}>
            <Router />
          </div>
          <ToastContainer position={"bottom-right"} />
        </BrowserRouter>
        <footer className={styles.footer}>
          <h4>Website by <a href='mailto: mateusz.alicante@gmail.com'>Mateusz Kazimierczak</a></h4>
        </footer>
      </Provider>
    </div>
  )
}

export default App;
