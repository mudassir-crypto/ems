import { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { deleteEmployeeById, fetchAllEmployees } from '../services/EmployeeService'
import { Link, useNavigate } from 'react-router-dom'
import { fetchAllDepartments } from '../services/DepartmentService'

const ListEmployee = () => {

  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  
  useEffect(() => {
    getAllEmployees()
    getAllDepartments()
  }, [])

  const getAllEmployees = async () => {
    const { data } = await fetchAllEmployees();
    setEmployees(data)
  }

  const getAllDepartments = async () => {
    const { data } = await fetchAllDepartments()
    setDepartments(data)
  }

  const navigator = useNavigate()
  const updateEmployee = (empId) => {
    navigator(`/update-employee/${empId}`)
  }

  const deleteEmployee = async (empId) => {
    try {
      await deleteEmployeeById(empId)
      
      getAllEmployees()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='pt-2 my-5 px-5'>
      <h2 className='pb-4 text-center'>List Employees</h2>
      <Link to="/add-employee">
        <Button variant="primary" className='mb-3'>Add Employee</Button>{' '}
      </Link>
      <Table striped bordered hover size='sm' className='text-center'>
        <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {employees.map((employee) => (
          <tr key={employee.email}>
            <td>{employee.id}</td>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.email}</td>
            <td>
              {departments.map((dept) => {
                if(dept.id === employee.departmentId){
                  return dept.departmentName
                }
              })}
            </td>
            <td className='m-2'>
              <Button variant="info" onClick={() => updateEmployee(employee.id)}>Update</Button>{' '}
              <Button variant="danger" onClick={() => deleteEmployee(employee.id)}>Delete</Button>{' '}
            </td>
          </tr>
        ))}
        
        </tbody>
      </Table>
    </div>
  )
}

export default ListEmployee