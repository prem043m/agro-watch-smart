package com.Agri.Agriculture;

import com.Agri.Agriculture.model.Farmer;
import com.Agri.Agriculture.repository.FarmerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seed(FarmerRepository farmerRepository) {
        return args -> {
            try {
                if (farmerRepository.count() == 0) {
                    farmerRepository.save(new Farmer("Rajesh Kumar", "Mandya, Karnataka"));
                }
            } catch (Exception e) {
                // Log and continue; if DB not available at startup, app will still retry later
                System.err.println("DataSeeder: could not seed data: " + e.getMessage());
            }
        };
    }
}
