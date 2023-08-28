import { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { deleteDepartmentById, fetchAllDepartments } from '../services/DepartmentService'
import { Link, useLocation, useNavigate, useNavigation } from 'react-router-dom'

const ListDepartment = () => {

  const [departments, setDepartments] = useState([])
  
  useEffect(() => {
    getAllDepartments()
  }, [])

  const getAllDepartments = async () => {
    const { data } = await fetchAllDepartments();
    setDepartments(data)
  }

  const navigator = useNavigate()
  const updateDepartment = (deptId) => {
    navigator(`/update-department/${deptId}`)
  }

  const deleteDepartment = async (deptId) => {
    try {
      await deleteDepartmentById(deptId)
      
      getAllDepartments()
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='pt-2 my-5 px-5'>
      <h2 className='pb-4 text-center'>List Departments</h2>
      <Link to="/add-department">
        <Button variant="primary" className='mb-3'>Add Department</Button>{' '}
      </Link>
      <Table striped bordered hover size='sm' className='text-center'>
        <thead>
        <tr>
          <th>#</th>
          <th>Department Name</th>
          <th>Department Description</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {departments.map((department) => (
          <tr key={department.id}>
            <td>{department.id}</td>
            <td>{department.departmentName}</td>
            <td>{department.departmentDescription}</td>
            <td className='m-2'>
              <Button variant="info" onClick={() => updateDepartment(department.id)}>Update</Button>{' '}
              <Button variant="danger" onClick={() => deleteDepartment(department.id)}>Delete</Button>{' '}
            </td>
          </tr>
        ))}
        
        </tbody>
      </Table>
    </div>
  )
}

export default ListDepartment