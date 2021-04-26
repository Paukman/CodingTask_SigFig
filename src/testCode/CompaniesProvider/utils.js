export const onCompanyPageRefresh = (state, setState, match, history) => {
  if (
    match?.params?.id &&
    match?.isExact &&
    state &&
    state.companies &&
    state.companies.length &&
    !state.selectedCompany
  ) {
    const selectedCompany = state.companies.find(
      (company) => company._id === match.params.id
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

// TODO
export const onEmployeesPageRefresh = (state, setState, match, history) => {};
export const onSingleEmployeePageRefresh = (
  state,
  setState,
  match,
  history
) => {};
