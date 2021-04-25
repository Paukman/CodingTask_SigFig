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
    return response.data;
  } catch (error) {
    return null;
  }
};

const useLoadCompanies = (updateState) => {
  const isMounted = useIsMounted();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isMounted()) {
          return undefined;
        }
        const data = await loadCompanies();

        if (!isMounted()) {
          return undefined;
        }

        updateState(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isMounted, updateState]);
};

export default useLoadCompanies;
