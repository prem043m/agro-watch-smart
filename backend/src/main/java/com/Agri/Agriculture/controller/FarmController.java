package com.Agri.Agriculture.controller;

import com.Agri.Agriculture.model.Farm;
import com.Agri.Agriculture.repository.FarmRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farms")
public class FarmController {

    private final FarmRepository farmRepository;

    public FarmController(FarmRepository farmRepository) {
        this.farmRepository = farmRepository;
    }

    @GetMapping
    public List<Farm> list() {
        return farmRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Farm> get(@PathVariable Long id) {
        return farmRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/by-farmer/{farmerId}")
    public List<Farm> listByFarmer(@PathVariable Long farmerId) {
        return farmRepository.findByFarmerId(farmerId);
    }

    @PostMapping
    public ResponseEntity<Farm> create(@RequestBody Farm farm) {
        // Ensure incoming payload cannot force a merge by providing an id.
        // Treat POST as create: clear id if present so JPA will insert.
        farm.setId(null);
        Farm saved = farmRepository.save(farm);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Farm> update(@PathVariable Long id, @RequestBody Farm farm) {
        return farmRepository.findById(id).map(existing -> {
            // Copy allowed fields from incoming payload to existing entity
            existing.setFarmerId(farm.getFarmerId());
            existing.setName(farm.getName());
            existing.setCropType(farm.getCropType());
            existing.setArea(farm.getArea());
            existing.setLatitude(farm.getLatitude());
            existing.setLongitude(farm.getLongitude());
            existing.setSoilType(farm.getSoilType());
            existing.setIrrigationType(farm.getIrrigationType());
            existing.setLastPlanted(farm.getLastPlanted());
            existing.setExpectedYield(farm.getExpectedYield());
            Farm saved = farmRepository.save(existing);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!farmRepository.existsById(id)) return ResponseEntity.notFound().build();
        farmRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
