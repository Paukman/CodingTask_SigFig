export const onCompanyPageRefresh = (
  state,
  setState,
  matchCompany,
  history
) => {
  if (
    matchCompany?.params?.id &&
    matchCompany?.isExact &&
    state &&
    state.companies &&
    state.companies.length &&
    !state.selectedCompany
  ) {
    const selectedCompany = state.companies.find(
      (company) => company._id === matchCompany.params.id
    );
    if (selectedCompany) {
      setState((prevState) => ({
        ...prevState,
        selectedCompany: selectedCompany,
      }));
    } else {
      history.push("/pageNotFound");
    }
  }
};

export const onEmployeesPageRefresh = () => {};
export const onSingleEmployeePageRefresh = () => {};
