package net.ems.emsbackend.service.impl;

import lombok.AllArgsConstructor;
import net.ems.emsbackend.dto.DepartmentDto;
import net.ems.emsbackend.entity.Department;
import net.ems.emsbackend.exception.ResourceNotFoundException;
import net.ems.emsbackend.mapper.DepartmentMapper;
import net.ems.emsbackend.repository.DepartmentRepository;
import net.ems.emsbackend.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;

    @Override
    public List<DepartmentDto> getAllDepartment() {
        List<Department> departments = departmentRepository.findAll();

        return departments.stream().map((dept) -> DepartmentMapper.mapToDepartmentDto(dept))
                .collect(Collectors.toList());
    }

    @Override
    public DepartmentDto getDepartmentById(Long departmentId) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department does not exist withe the given id: " + departmentId));
        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        Department savedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto updatedDepartmentDetails) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department does not exist withe the given id: " + departmentId));

        department.setDepartmentName(updatedDepartmentDetails.getDepartmentName());
        department.setDepartmentDescription(updatedDepartmentDetails.getDepartmentDescription());
        Department savedDepartment = departmentRepository.save(department);

        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public void deleteDepartment(Long departmentId) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department does not exist withe the given id: " + departmentId));

        departmentRepository.deleteById(department.getId());
    }
}
