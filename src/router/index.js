import Vue from 'vue';
import Router from 'vue-router';
import Home from 'pages/home';
import Category from 'pages/category';
import Cart from 'pages/cart';
import Personal from 'pages/personal';
import Search from 'pages/search';
import Product from 'pages/product';

Vue.use(Router);

const routes = [
  {
    name:'home',
    path:'/home',
    component:Home,
    children:[
      {
        name:'home-product',
        path:'product/:id',
        component:Product
      }
    ]
  },
  {
    name:'category',
    path:'/category',
    component:Category
  },
  {
    name:'cart',
    path:'/cart',
    component:Cart
  },
  {
    name:'personal',
    path:'/personal',
    component:Personal
  },
  {
    name:'search',
    path:'/search',
    component:Search
  },
  {
    path:'*',
    redirect:'/home'
  }
]

export default new Router({
  routes
});
