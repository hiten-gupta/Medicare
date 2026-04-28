package com.medicare.service;

import com.medicare.model.Medicine;
import com.medicare.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MedicineService {

    @Autowired private MedicineRepository medicineRepository;

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    public Medicine getMedicineById(Long id) {
        return medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));
    }

    public List<Medicine> searchMedicines(String name) {
        return medicineRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Medicine> getMedicinesByCategory(Long categoryId) {
        return medicineRepository.findByCategoryId(categoryId);
    }

    public List<Medicine> getMedicinesByPrescription(Boolean requires) {
        return medicineRepository.findByRequiresPrescription(requires);
    }

    public Medicine addMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public Medicine updateMedicine(Long id, Medicine updatedMedicine) {
        Medicine existing = getMedicineById(id);
        existing.setName(updatedMedicine.getName());
        existing.setDescription(updatedMedicine.getDescription());
        existing.setPrice(updatedMedicine.getPrice());
        existing.setStock(updatedMedicine.getStock());
        existing.setImageUrl(updatedMedicine.getImageUrl());
        existing.setRequiresPrescription(updatedMedicine.getRequiresPrescription());
        existing.setCategory(updatedMedicine.getCategory());
        return medicineRepository.save(existing);
    }

    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }
}