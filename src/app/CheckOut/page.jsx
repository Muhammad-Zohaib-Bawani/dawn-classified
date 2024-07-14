import React from "react";
import HeaderApp from '../_lib/Components/Header/Header';
import Receipt from "../_lib/Components/Reciept/Reciept";
import  Footer  from "../_lib/Components/Footer/Footer";


export default function Home() {

  return (
    <div>
   
      <HeaderApp />
      <Receipt />
      <Footer/>
    </div>
  );
}