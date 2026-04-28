package com.medicare.controller;

import com.medicare.model.Medicine;
import com.medicare.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    @Autowired private MedicineService medicineService;

    @GetMapping
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        return ResponseEntity.ok(medicineService.getAllMedicines());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicineById(@PathVariable Long id) {
        return ResponseEntity.ok(medicineService.getMedicineById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Medicine>> searchMedicines(@RequestParam String name) {
        return ResponseEntity.ok(medicineService.searchMedicines(name));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Medicine>> getByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(medicineService.getMedicinesByCategory(categoryId));
    }

    @GetMapping("/prescription/{requires}")
    public ResponseEntity<List<Medicine>> getByPrescription(@PathVariable Boolean requires) {
        return ResponseEntity.ok(medicineService.getMedicinesByPrescription(requires));
    }

    @PostMapping("/admin/add")
    public ResponseEntity<Medicine> addMedicine(@RequestBody Medicine medicine) {
        return ResponseEntity.ok(medicineService.addMedicine(medicine));
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<Medicine> updateMedicine(@PathVariable Long id,
                                                    @RequestBody Medicine medicine) {
        return ResponseEntity.ok(medicineService.updateMedicine(id, medicine));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<String> deleteMedicine(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
        return ResponseEntity.ok("Medicine deleted successfully!");
    }
}