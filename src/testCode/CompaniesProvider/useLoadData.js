import { useEffect } from "react";
import api from "../Api";
import useIsMounted from "../utils/useIsMounted";

const COMPANIES_URL = "http://localhost:3001/companies";

const useLoadData = (updateState) => {
  const isMounted = useIsMounted();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isMounted()) {
          return undefined;
        }
        const response = await api.get(COMPANIES_URL);

        if (!isMounted()) {
          return undefined;
        }

        updateState(response.data);
        

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isMounted, updateState]);
};

export default useLoadData;
