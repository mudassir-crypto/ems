import axios from 'axios'

const BASE_URL = "http://localhost:8080/api/department"

export const fetchAllDepartments = async () => await axios.get(BASE_URL + '/all')
  
export const createDepartment = async (department) => axios.post(
  BASE_URL + '/create',
  department
)

export const getDepartmentById = async (deptId) => await axios.get(
  `${BASE_URL}/${deptId}`
)

export const updateDepartment = async (deptId, department) => await axios.put(
  `${BASE_URL}/${deptId}`,
  department
)

export const deleteDepartmentById = async (deptId) => await axios.delete(
  `${BASE_URL}/${deptId}`
)