package net.ems.emsbackend.controller;

import lombok.AllArgsConstructor;
import net.ems.emsbackend.dto.DepartmentDto;
import net.ems.emsbackend.entity.Department;
import net.ems.emsbackend.service.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/department")
public class DepartmentController {
    private DepartmentService departmentService;

    @PostMapping("/create")
    public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto){
        DepartmentDto savedDepartment = departmentService.createDepartment(departmentDto);
        return new ResponseEntity<>(savedDepartment, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<DepartmentDto>> getAllDepartment(){
        List<DepartmentDto> departments = departmentService.getAllDepartment();
        return ResponseEntity.ok(departments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable(name = "id") Long departmentId){
        DepartmentDto department = departmentService.getDepartmentById(departmentId);
        return ResponseEntity.ok(department);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable(name = "id") Long departmentId, @RequestBody DepartmentDto updatedDepartmentDetails){
        DepartmentDto savedDepartment = departmentService.updateDepartment(departmentId, updatedDepartmentDetails);
        return new ResponseEntity<>(savedDepartment, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable(name = "id") Long departmentId){
        departmentService.deleteDepartment(departmentId);
        return ResponseEntity.ok("Department is deleted successfully");
    }
}
