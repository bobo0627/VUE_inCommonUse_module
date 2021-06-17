import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: ()=>import('../page/navPage.vue'),
      children:[
        {
          path: 'tableAndPagination',
          name: 'tableAndPagination',
          component: ()=>import('../page/tableAndPagination/index.vue'),
        },
        {
          path: 'canvas',
          name: 'canvas',
          component: ()=>import('../page/canvas/index.vue'),
          children:[
            {
              path: '/canvas/canvas_type1',
              name: 'canvas_type1',
              component: ()=>import('../page/canvas/canvas_type1'),
            },
            {
              path: '/canvas/canvas_type2',
              name: 'canvas_type2',
              component: ()=>import('../page/canvas/canvas_type2'),
            },
            {
              path: '/canvas/canvas_type3',
              name: 'canvas_type3',
              component: ()=>import('../page/canvas/canvas_type3'),
            },
          ]
        }
      ]
    }
  ]
})
export default router
