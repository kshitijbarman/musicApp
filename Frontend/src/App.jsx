// import React from 'react'
// import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import Home from './pages/Home';
// import AlbumDetails from './pages/AlbumDetails';
// import SignUpPage from './pages/SignUpPage';
// import LoginPage from './pages/LoginPage';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Home/>}></Route>
//         <Route path='/albums/:id' element={<AlbumDetails/>}></Route>
//         <Route path='/sign-up' element={<SignUpPage/>}></Route>
//         <Route path='/Login' element={<LoginPage/>}></Route>

//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App









import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import PlayListPage from './pages/PlayListPage';
import ArtistPage from './pages/ArtistPage';
import AlbumDetails from './pages/AlbumDetails';

const App = () => {
  // const isSignUp = localStorage.getItem('userInfo') ? true : false;
  const isSignUp = localStorage.getItem('userInfo')!== null;
  console.log(isSignUp);

  const router = createBrowserRouter([
    {
      path: "/sign-up",
      element: <SignUpPage />
    },
    {
      path: "/playlist",
      element: <PlayListPage/>
    },
    {
      path: "/artist",
      element: <ArtistPage/>
    },
    {
      path: "/album",
      element: <AlbumDetails/>
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/",
      element: isSignUp ? <Home /> : <Home /> // Moved inside App to access isSignUp
    },
   
  ]);

  return <RouterProvider router={router} />;
};

export default App;






































