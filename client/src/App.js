import React from 'react'
import classes from './App.module.css'
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Catalog from "./components/Catalog/Catalog";
import ProductPage from "./Pages/ProductPage/ProductPage";

function App() {
    return (
        <div className={classes.App}>
            <BrowserRouter>
                <Route path="/product/:id" exact component={ProductPage}/>
                <Route path="/" exact component={Catalog}/>
                <Redirect to="/" />
            </BrowserRouter>
        </div>
    );
}

export default App;
