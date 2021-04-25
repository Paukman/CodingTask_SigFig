export const getCompanyById = (id, companies) => {
  const company = companies.find((company) => company._id === id);
  console.log("Found compnany is ", company);
  return company;
};

export const getEmployeeById = (id, employees) => {
  const employee = employees.find((employee) => employee._id === id);
  console.log("Found employee is ", employee);
  return employee;
};
