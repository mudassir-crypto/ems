package net.ems.emsbackend.service.impl;

import lombok.AllArgsConstructor;
import net.ems.emsbackend.dto.EmployeeDto;
import net.ems.emsbackend.entity.Department;
import net.ems.emsbackend.entity.Employee;
import net.ems.emsbackend.exception.ResourceNotFoundException;
import net.ems.emsbackend.mapper.EmployeeMapper;
import net.ems.emsbackend.repository.DepartmentRepository;
import net.ems.emsbackend.repository.EmployeeRepository;
import net.ems.emsbackend.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    private DepartmentRepository departmentRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);

        Department department = departmentRepository.findById(employeeDto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist withe the given id: " + employeeDto.getDepartmentId()));
        employee.setDepartment(department);

        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist withe the given id: " + employeeId));

        return EmployeeMapper.mapToEmployeeDto(employee);

    }

    @Override
    public List<EmployeeDto> getAllEmployee() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployeeDetails) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist withe the given id: " + employeeId));

        employee.setFirstName(updatedEmployeeDetails.getFirstName());
        employee.setLastName(updatedEmployeeDetails.getLastName());
        employee.setEmail(updatedEmployeeDetails.getEmail());


        Department department = departmentRepository.findById(updatedEmployeeDetails.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist withe the given id: " + updatedEmployeeDetails.getDepartmentId()));
        employee.setDepartment(department);

        Employee updatedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist withe the given id: " + employeeId));

        employeeRepository.deleteById(employee.getId());
    }
}
