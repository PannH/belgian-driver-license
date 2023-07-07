import React from 'react';
import ReactDOM from 'react-dom/client';
import {
   createBrowserRouter,
   RouterProvider
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './routes/Home';
import Quiz from './routes/Quiz';
import Exam from './routes/Exam';

const router = createBrowserRouter([{
   path: '/',
   element: <Home />
}, {
   path: '/quiz/:groupTitleSlang/:titleSlang',
   element: <Quiz />
}, {
   path: '/examen',
   element: <Exam />
}]);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
