import { useEffect, useRef, useState } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { createDepartment, getDepartmentById, updateDepartment } from "../services/DepartmentService"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'

const CreateUpdateDepartment = () => {

  const departmentNameRef = useRef()
  const departmentDescriptionRef = useRef()
  const [deptId, setDeptId] = useState(0)

  const { id } = useParams()

  const nav = useLocation()
  const path = nav.pathname.split('/')[1]

  useEffect(() => {
    (async () => {
      if(path !== "add-department"){
        const { data } = await getDepartmentById(id)
        departmentNameRef.current.value = data.departmentName
        departmentDescriptionRef.current.value = data.departmentDescription
        setDeptId(data.id)
      }
    })()
  
  }, [])

  const navigator = useNavigate()

  const onCreateSubmit = async(e) => {
    e.preventDefault()

    if(!departmentNameRef.current.value || !departmentDescriptionRef.current.value){
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
      
      const department = {
        departmentName: departmentNameRef.current.value,
        departmentDescription: departmentDescriptionRef.current.value
      }
      const resp = await createDepartment(department)
      
      if(resp.status === 201){
        navigator("/departments")
      }
    }
  }

  const onUpdateSubmit = async(e) => {
    e.preventDefault()

    if(!departmentNameRef.current.value || !departmentDescriptionRef.current.value){
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
      
      const department = {
        departmentName: departmentNameRef.current.value,
        departmentDescription: departmentDescriptionRef.current.value
      }
      const resp = await updateDepartment(deptId, department)
      
      if(resp.status === 202){
        navigator("/departments")
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
          <Card.Title>{path ==="add-department" ? "Add Department" : "Update Department"}</Card.Title>
          
          <Form className="pt-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Department Name:</Form.Label>
              <Form.Control ref={departmentNameRef} type="text" placeholder="Enter Department Name" autoComplete="off" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Department Description:</Form.Label>
              <Form.Control ref={departmentDescriptionRef} type="text" placeholder="Enter Department Description" autoComplete="off" />
            </Form.Group>

            {path === "add-department" ? (
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

export default CreateUpdateDepartment