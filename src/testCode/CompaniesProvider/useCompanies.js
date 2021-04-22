import axios from "axios";
import { useEffect, useState } from "react";
import api from "../Api";

const COMPANIES_URL = "http://localhost:3001/companies";

const useCompanies = () => {
  const [state, updateState] = useState([]);

  return {
    state,
    updateState,
  };
};

export default useCompanies;
