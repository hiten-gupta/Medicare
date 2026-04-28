package com.medicare.repository;

import com.medicare.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    List<Medicine> findByNameContainingIgnoreCase(String name);
    List<Medicine> findByCategoryId(Long categoryId);
    List<Medicine> findByRequiresPrescription(Boolean requires);
}