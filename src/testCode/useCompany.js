import axios from "axios";
import { useEffect, useState } from "react";
import api from "./Api";

const COMPANIES_URL = "http://localhost:3001/companies";

const useCompany = async () => {
  const [companies, setCompanies] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      console.log("Getting companies");
      await getCompanies();
    };
    fetchData();
  }, []);

  const getCompanies = async () => {
    try {
      const response = await api.get(COMPANIES_URL);
      console.log(response);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return getCompanies;
};

export default useCompany;
