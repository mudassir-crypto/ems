import { useRef, useState, useEffect } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { createEmployee, getEmployeeById, updateEmployee } from "../services/EmployeeService"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import { fetchAllDepartments } from "../services/DepartmentService"

const CreateUpdateEmployee = () => {

  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const [empId, setEmpId] = useState()

  const [departmentId, setDepartmentId] = useState(1)
  const [departments, setDepartments] = useState([])

  const navigator = useNavigate()
  const nav = useLocation()
  const path = nav.pathname.split('/')[1]

  const { id } = useParams()

  useEffect(() => {
    (async () => {
      const { data } = await fetchAllDepartments()
      setDepartments(data)
      if(path !== "add-employee"){
        const { data } = await getEmployeeById(id)
        firstNameRef.current.value = data.firstName
        lastNameRef.current.value = data.lastName
        emailRef.current.value = data.email
        setDepartmentId(data.departmentId)
        setEmpId(data.id)
      }
    })()
  
  }, [])

  const onCreateSubmit = async(e) => {
    e.preventDefault()

    if(!firstNameRef.current.value || !lastNameRef.current.value || !emailRef.current.value){
      toast.error('Input all values', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } else {
      
      const employee = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        departmentId
      }
      const resp = await createEmployee(employee)
      
      if(resp.status === 201){
        navigator("/")
      }
    }
  }

  const onUpdateSubmit = async(e) => {
    e.preventDefault()

    if(!firstNameRef.current.value || !lastNameRef.current.value || !emailRef.current.value){
      toast.error('Input all values', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } else {
      
      const employee = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        departmentId
      }
      const resp = await updateEmployee(empId, employee)
      
      if(resp.status === 202){
        navigator("/")
      }
    }
  }


  return (
    <div className='container py-5 d-flex justify-content-center align-items-center'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Card style={{ width: '40rem' }}>
        <Card.Body>
          <Card.Title>Add Employee</Card.Title>
          
          <Form className="pt-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name:</Form.Label>
              <Form.Control ref={firstNameRef} type="text" placeholder="Enter First Name" autoComplete="off" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control ref={lastNameRef} type="text" placeholder="Enter Last Name" autoComplete="off" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address:</Form.Label>
              <Form.Control ref={emailRef} type="email" placeholder="Enter email" autoComplete="off" />
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Department:</Form.Label>
              <Form.Select aria-label="Default select example" className="mb-3" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
                {departments.map((dept) => (
                  <option value={dept.id} key={dept.id}>{dept.departmentName}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {path === "add-employee" ? (
              <Button variant="primary" onClick={onCreateSubmit}>
                Submit
              </Button>
            ) : (
              <Button variant="primary" onClick={onUpdateSubmit}>
                Submit
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
      
    </div>
  )
}

export default CreateUpdateEmployee