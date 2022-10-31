// import "./Titlebar.css";
// import { BsFillPlusCircleFill } from "react-icons/bs";

// export default function TitleBar() {
//   return (
//     <>
//       <div className="titlebar_top">
//            <div className="titlebar_top_col1">
                             
//                       <div className="titlebar_bagIcon_Products" > Tasks</div>
//                       <div className="titlebar_bagIcon_Active" >Active</div>
//                         <div className="titlebar_bagIcon_Draft"> Draft</div>
//                       <div className="titlebar_bagIcon_Assembly">All</div> 
//                       </div>
//                 <div className="titlebar_top_col2">
            
//                        <div className="titlebar_top_col22">
//                         <BsFillPlusCircleFill className="titlebar_plusIcon" />
//                       <label>Add Lead</label>
//                     </div>
//                </div>
               
//       </div>
//       <div className="titlebar_underline" >____</div>
//     </>
//   );
// }

import "./Titlebar.css";
// import axios from "axios";
import { GiBeachBag } from "react-icons/gi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";


export default function TitleBar({
  SaveLead,
  titlebar_name,
  button_value,
  bulkimportshow,
  savebuttonshow,
  middledivshow,
  titlebar_value1,
  titlebar_value2,
  titlebar_value3
}) {


  return (
    <>
      <div className="titlebar_top">
        <div className="titlebar_top_col1">
          <div className="titlebaddlead_ar_bagSquare">
            <GiBeachBag className="titlebar_bagIcon" />
          </div>
          <label>{titlebar_name}</label>
        </div>
        {middledivshow ? (
          <div className="addlead_titlebar_prospectlist">
            <div className="titlebar_bagIcon_Active">{titlebar_value1}</div>
            <div className="titlebar_bagIcon_Draft"> {titlebar_value2}</div>
            <div className="titlebar_bagIcon_Assembly">{titlebar_value3}</div>
          </div>
        ) : (
          <></>
        )}
        {/* <div className="addlead_titlebar_prospectlist">
            <div className="titlebar_bagIcon_Active">Active</div>
            <div className="titlebar_bagIcon_Draft"> Draft</div>
            <div className="titlebar_bagIcon_Assembly">Assembly</div>
          </div> */}
        <div className="titlebar_top_col2">
          {bulkimportshow?<div className="titlebar_top_col21">
            <HiDownload className="titlebar_downloadIcon" />
            <label>Bulk Import</label>
          </div>:<></>}
          {savebuttonshow?<div className="titlebar_top_col22" onClick={SaveLead}>
            <BsFillPlusCircleFill className="titlebar_plusIcon" />
            <label>{button_value}</label>
          </div>:<></>}
        </div>
        {/* <div className="titlebar_top_col2">
          <div className="titlebar_top_col21">
            <HiDownload className="titlebar_downloadIcon" />
            <label>Bulk Import</label>
          </div>
          <div className="titlebar_top_col22" onClick={SaveLead}>
            <BsFillPlusCircleFill className="titlebar_plusIcon" />
            <label>{button_value}</label>
          </div>
        </div> */}
      </div>
    </>
  );
}