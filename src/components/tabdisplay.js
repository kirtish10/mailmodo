import React, { useEffect, useState } from 'react';
import destination from '../assets/img/destination.svg';
import home from '../assets/img/warehouse.svg'
import moment from 'moment';
import arrow from '../assets/img/arrow.svg';

 
import Delivery from './delivery';
 
function Tabdisplay(props) {
 
   const apiData = props.data.shipments;
   const delivery = props.data.scams;
   const [deliverys,setDelivery] = useState(props.data.scams);
   let line = {
       position: 'absolute',
       zIndex: -1,
       top: 20,
       bottom: deliverys.length>0?170 - deliverys.length*35:170 - delivery.length*35,
       borderLeft: '2px dashed rgb(12, 228, 48)'
     };
   return (
       <div style={{'overflow-x':'auto'}} className="container">
           <div className="row">
               <div className="col-3 left-table">
                   <div className="border shadow-sm">
                       <img src={destination} width="35" height="35" className="rounded-circle img-back" alt="img-background" loading="lazy"/>
                      
                       <div className="container-fluid">
                           <div style={line}></div>
                           {deliverys.length>0?deliverys.map((item,index) => (
                               <Delivery key={index} data={item}/>
                           )): delivery.map((item,index) => (
                               <Delivery key={index} data={item}/>
                           ))
                           }
                       </div>
                       <img src={home} width="35" height="35" className="rounded-circle home-back" alt="home-background" loading="lazy"/>
                   </div>
               </div>
               <div  className="col-8">
               <div className="table-wrapper-scroll-y my-custom-scrollbar border">
                   <table className="table">
                       <tr className="m-2 table-head">
                           <td>AWB NUMBER  </td>
                           <td>TRANSPORTER</td>
                           <td>SOURCE</td>
                           <td>DESTINATION</td>
                           <td>BRAND</td>
                           <td>START DATE</td>
                           <td>ETD</td>
                           <td>STATUS</td>
                       </tr>
                       <tbody>
                       {apiData.map((item,index) => (
                       <tr key={index} className="table-body" onClick={() => item.scan? setDelivery(item.scan):[]}>
                           <td>#{item.awbno}</td>
                           <td>{item.carrier}</td>
                           <td>{item.from}</td>
                           <td>{item.to}</td>
                           <td>{item.carrier}</td>
                           <td>{moment.utc(item.pickup_date).local().format("DD/MM/YYYY")}</td>
                           <td>{item.extra_fields?moment.utc(item.extra_fields.expected_delivery_date).local().format("DD/MM/YYYY"):""}</td>
                           <td className={item.current_status==="Delivered"?"green-status":""}>{item.current_status}</td>
                       </tr>
                       ))}
                      
                       </tbody>
                   </table>
 
                   </div>
               </div>
           </div>
       </div>
   );
}
 
export default Tabdisplay;
