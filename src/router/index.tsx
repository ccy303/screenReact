import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { defaultViewItemContext } from 'dw/views/ViewItem/index'
import ViewItem from 'dw/views/ViewItem/index'

export default [{ path: '/', element: <ViewItem {...defaultViewItemContext} /> }]
