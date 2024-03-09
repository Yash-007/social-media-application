import { Route,Routes } from "react-router-dom";
import { lazy,Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";

const Home = lazy(()=> import('./pages/Home'));
const Signup= lazy(()=> import('./pages/auth/Signup'));
const ProtectedPage= lazy(()=>import('./components/ProtectedPage'));
const VerifyEmailUrl= lazy(()=> import('./pages/VerifyEmailUrl'));
const Signin= lazy(()=> import('./pages/auth/Signin'));

function App() {
  return (
   <>
   <Toaster></Toaster>
  <Suspense fallback={<Loader></Loader>}>
 <Routes>
  <Route path="/"  element={<ProtectedPage><Home/></ProtectedPage>}/>
  <Route path="/signup"  element={<Signup></Signup>}/>
  <Route path="/signin"  element={<Signin></Signin>}/>
  <Route path="/user/:id/verify/:token"  element={<VerifyEmailUrl></VerifyEmailUrl>}/>
 </Routes>
  </Suspense>
   </>
  );
}

export default App;
