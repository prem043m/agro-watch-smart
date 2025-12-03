package com.Agri.Agriculture.controller;

import com.Agri.Agriculture.model.Farmer;
import com.Agri.Agriculture.repository.FarmerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/farmers")
public class FarmerController {

    private final FarmerRepository farmerRepository;

    public FarmerController(FarmerRepository farmerRepository) {
        this.farmerRepository = farmerRepository;
    }

    @GetMapping
    public List<Farmer> list() {
        return farmerRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Farmer> get(@PathVariable Long id) {
        return farmerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Farmer> create(@RequestBody Farmer farmer) {
        // Reject client-supplied id on create to avoid accidental merges
        if (farmer.getId() != null) {
            return ResponseEntity.badRequest().build();
        }
        Farmer saved = farmerRepository.save(farmer);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Farmer> update(@PathVariable Long id, @RequestBody Farmer updates) {
        return farmerRepository.findById(id).map(existing -> {
            if (updates.getName() != null) existing.setName(updates.getName());
            if (updates.getLocation() != null) existing.setLocation(updates.getLocation());
            Farmer saved = farmerRepository.save(existing);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }
}
