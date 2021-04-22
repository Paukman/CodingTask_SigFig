import { useEffect } from "react";
import api from "../Api";
import useIsMounted from "../utils/useIsMounted";

const COMPANIES_URL = "http://localhost:3001/companies";

const useLoadData = (updateState) => {
  const isMounted = useIsMounted();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching data");
        if (!isMounted()) {
          console.log("returning...");
          return undefined;
        }
        const response = await api.get(COMPANIES_URL);

        if (!isMounted()) {
          console.log("returning...");
          return undefined;
        }

        console.log(response);
        console.log(response.data);
        updateState(response.data);

        console.log("Getting companies");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isMounted, updateState]);
};

export default useLoadData;
