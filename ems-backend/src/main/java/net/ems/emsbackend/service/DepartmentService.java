package net.ems.emsbackend.service;

import net.ems.emsbackend.dto.DepartmentDto;
import java.util.List;

public interface DepartmentService {
    List<DepartmentDto> getAllDepartment();

    DepartmentDto getDepartmentById(Long id);
    DepartmentDto createDepartment(DepartmentDto departmentDto);
    DepartmentDto updateDepartment(Long departmentId, DepartmentDto departmentDto);
    void deleteDepartment(Long departmentId);
}
