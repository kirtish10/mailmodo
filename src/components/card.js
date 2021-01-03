import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Axios from "axios";
import Tabdisplay from './tabdisplay.js';
 
function Card(props) {
 
   const token = "tTU3gFVUdP";
   const email = "harshyadav94250@gmail.com";
   const config = {
       headers: { Authorization: `Bearer ${token}` }
   };
   let DEL = []
   let INT = []
   let OOD = []
   let DEX = []
   let NFI = []
   const [apiData,setApiData] = useState([]);
   const [filter, setFilter] = useState('DEL');
   const [shipments,setShipment] = useState([]);
   const [scan,setScan] = useState([]);
 
   useEffect(() => {
       Axios.post("https://f0ztti2nsk.execute-api.ap-south-1.amazonaws.com/v1/consignment/fetch",
           {email : email},
           config
       ).then(res => {
           for (let index = 0; index < res.data.length; index++) {
               if(res.data[index]["current_status_code"]==="DEL"){
                   DEL.push(res.data[index]);
               }
           }
           if(DEL.length>0){
               setScan(DEL[0]["scan"]);
           }
           setShipment(DEL);
           setApiData(res.data);
          
       });
       return () => {
       };
   }, []);
 
   for (let index = 0; index < apiData.length; index++) {
       if(apiData[index]["current_status_code"]==="DEL"){
           DEL.push(apiData[index]);
       } else if(apiData[index]["current_status_code"]==="INT"){
           INT.push(apiData[index]);
       } else if(apiData[index]["current_status_code"]==="OOD"){
           OOD.push(apiData[index]);
       } else if(apiData[index]["current_status_code"]==="DEX"){
           DEX.push(apiData[index]);
       } else {
           NFI.push(apiData[index]);
       }
   }
 
   const DELFunction = (e) => {
       if(DEL[0]["scan"]){
           setScan(DEL[0]["scan"]);
       }
       setFilter("DEL");
       setShipment(DEL);
   }
   const INTFunction = (e) => {
       if(INT[0]["scan"]){
           setScan(INT[0]["scan"]);
       }
       setFilter("INT");
       setShipment(INT);
   }
   const OODFunction = (e) => {
       if(OOD[0]["scan"]){
           setScan(OOD[0]["scan"]);
       }
       setFilter("OOD");
       setShipment(OOD);
   }
   const DEXFunction = (e) => {
       if(DEX.length>0){
           setScan(DEX[0]["scan"]);
       }
       setFilter("DEX");
       setShipment(DEX);
   }
   const NFIFunction = (e) => {
       if(NFI[0]["scan"]){
           setScan(NFI[0]["scan"]);
       }
       setFilter("NFI");
       setShipment(NFI);
   }
   return (
       <>
       <div class="mt-4 mb-4 d-flex justify-content-center container-fluid">
                <div class="text-center"> 
                        <button type="button" onClick={DELFunction} className={filter==="DEL"? "card-value":"cart-buttom-one"}>
                            <p className="cart-head">DEL</p>
                            <p className="cart-body">{DEL.length}</p>
                        </button>
                    </div>

             <div>
               <button type="button" onClick={INTFunction} className={filter==="INT"? "card-value":"cart-buttom-one"}>
                   <p className="cart-head">INT</p>
                   <p className="cart-body">{INT.length}</p>
               </button>
               </div>
               <div>
               <button type="button" onClick={OODFunction} className={filter==="OOD"? "card-value":"cart-buttom-one"}>
                   <p className="cart-head">OOD</p>
                   <p className="cart-body">{OOD.length}</p>
               </button>
               </div>
               <div>
               <button type="button" onClick={DEXFunction} className={filter==="DEX"? "card-value":"cart-buttom-one"}>
                   <p className="cart-head">DEX</p>
                   <p className="cart-body">{DEX.length}</p>
               </button>
               </div>
               <div>
               <button type="button" onClick={NFIFunction} className={filter==="NFI"? "card-value":"cart-buttom-one"}>
                   <p className="cart-head">NFI</p>
                   <p className="cart-body">{NFI.length}</p>
               </button>
               </div>
               
       </div>
       
       <Tabdisplay data={{
           shipments:shipments,
           scams:scan}}/>
       </>
   );
}

   
export default Card;
