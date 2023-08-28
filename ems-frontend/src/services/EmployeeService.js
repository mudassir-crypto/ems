import axios from 'axios'

const BASE_URL = "http://localhost:8080/api/employee"

export const fetchAllEmployees = async () => await axios.get(BASE_URL + '/all')
  
export const createEmployee = async (employee) => await axios.post(
  BASE_URL + '/create',
  employee
)

export const getEmployeeById = async (empId) => await axios.get(
  `${BASE_URL}/${empId}`
)

export const updateEmployee = async (empId, employee) => await axios.put(
  `${BASE_URL}/${empId}`,
  employee
)

export const deleteEmployeeById = async (empId) => await axios.delete(
  `${BASE_URL}/${empId}`
)