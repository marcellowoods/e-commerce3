import React from "react";
import { LoadProducts } from "../forms/LoadProducts";

const BestSellers = () => <LoadProducts sort={"sold"} order={"desc"} limit={3}/>;

export default BestSellers;
