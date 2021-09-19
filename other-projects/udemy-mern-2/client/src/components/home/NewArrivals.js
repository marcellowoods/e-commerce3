import React from "react";
import { LoadProducts } from "../forms/LoadProducts";

const NewArrivals = () => <LoadProducts sort={"createdAt"} order={"desc"} limit={3}/>;

export default NewArrivals;
