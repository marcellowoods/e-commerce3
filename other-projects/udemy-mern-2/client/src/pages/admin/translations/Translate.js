import React from "react";
import AdminNav from "../../../components/nav/AdminNav";
import TranslateModel from "./TranslateModel";

const Translate = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <TranslateModel />
        {/* <div className="col">
          <h4>Admin Dashboard</h4>
        </div> */}
      </div>
    </div>
  );
};

export default Translate;

