/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";

import ListPlats from "./ListPlats";
import Plat from "./Plat";
import ListIngredients from "./ListIngredients";
import FormIngredient from "./FormIngredient";

const dashboardRoutes = [
    {
        path: "/listPlats",
        name: "liste des Plats",
        icon: Dashboard,
        component: ListPlats,
        layout: ""
    },
    {
        path: '/plat',
        name: "Créer un Plat",
        icon: Dashboard,
        component: Plat,
        layout: "",
        param: '/:pathParam?'
    },
    {
        path: "/listIngredients",
        name: "Liste des ingrédients",
        icon: Dashboard,
        component: ListIngredients,
        layout: ""
    },
    {
        path: "/ingredient",
        name: "Créer nouvel Ingredient",
        icon: Dashboard,
        component: FormIngredient,
        layout: "",
        param: '/:pathParam?'
    },


];

export default dashboardRoutes;
