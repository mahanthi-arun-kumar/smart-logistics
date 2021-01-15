import React from 'react';
import AppAnimation from "./components/pageLayOut/AppAnimation";
import SmartLogistics from "./components/pageLayOut/SmartLogistics";
import Navbar from "./components/header/NavBar";
import Footer from "./components/footer/Footer";
import { Redirect, useHistory } from "react-router-dom";

let loggedIn = localStorage.getItem("loggedIn") ;
let pathName = window.location.pathname;
let redirect = false;
let data;
const userType = window.localStorage.getItem("userType");
let redirectPage;
if(loggedIn===true){
    redirectPage=window.getItem("redirectPage");
   
}
else{
    redirectPage=pathName;
    
}


function Home() {
    return (
      <>

        {redirect ? (
            <Redirect to={{
                pathname: redirectPage,
                state: data,
              }}
            />
          ):(
        <>
        <Navbar />
        <main>
            <AppAnimation />
      <SmartLogistics />
        </main>
         <Footer />
         </>)}
         </>
    )
}

export default Home
