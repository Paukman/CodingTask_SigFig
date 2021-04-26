import { useEffect } from "react";
import api from "../utils/Api";
import useIsMounted from "../utils/useIsMounted";

const COMPANIES_URL = "http://localhost:3001/companies";

export const loadEmployees = async (companyId) => {
  try {
    const response = await api.get(`${COMPANIES_URL}/${companyId}/people`);

    return response.data;
  } catch (error) {
    return null;
  }
};

export const loadCompanies = async () => {
  try {
    const response = await api.get(COMPANIES_URL);
    console.log("data is loaded");
    return response.data;
  } catch (error) {
    return null;
  }
};

export const loadData = async () => {
  const companies = await loadCompanies();
  let allEmployees = [{}];
  // just grabb all employees, use map to get employees
  companies.forEach(async (company) => {
    const itemEmployees = await loadEmployees(company._id);
    for (const obj of itemEmployees) {
      allEmployees.push(obj);
    }
  });

  return { companies, allEmployees };
};

const useLoadData = (updateState, updateCompaniesAndEmployees) => {
  const isMounted = useIsMounted();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isMounted()) {
          return undefined;
        }
        const data = await loadCompanies();
        // const { companies, allEmployees } = await loadData();

        if (!isMounted()) {
          return undefined;
        }

        updateState(data);
        // updateCompaniesAndEmployees({ companies, allEmployees });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isMounted, updateState, updateCompaniesAndEmployees]);
};

export default useLoadData;
