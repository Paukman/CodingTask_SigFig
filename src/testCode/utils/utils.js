export const getCompanyById = (id, companies) => {
  const company = companies.find((company) => company._id === id);
  return company;
};

export const getEmployeeById = (id, employees) => {
  const employee = employees.find((employee) => employee._id === id);
  return employee;
};
