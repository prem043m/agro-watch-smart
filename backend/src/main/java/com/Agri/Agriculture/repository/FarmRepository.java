package com.Agri.Agriculture.repository;

import com.Agri.Agriculture.model.Farm;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FarmRepository extends JpaRepository<Farm, Long> {
	List<Farm> findByFarmerId(Long farmerId);
}
