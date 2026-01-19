import { createBrowserRouter } from "react-router";
import Homepage from "./components/homepage";
import React from "react";


const routes = [
    {
        path:'/',
        component:<Homepage/>
    }
]

export const router = createBrowserRouter (routes)