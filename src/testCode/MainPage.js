import React from "react";
import useCompany from "./useCompany";

const MainPage = () => {
  const { getCompanies } = useCompany();

  return <div>Main page</div>;
};

export default MainPage;
