package com.Agri.Agriculture.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "farm")
public class Farm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "farmer_id")
    private Long farmerId;

    @Column(name = "name")
    private String name;

    @Column(name = "crop_type")
    private String cropType;

    @Column(name = "area")
    private Integer area;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "soil_type")
    private String soilType;

    @Column(name = "irrigation_type")
    private String irrigationType;

    @Column(name = "last_planted")
    private LocalDate lastPlanted;

    @Column(name = "expected_yield")
    private Double expectedYield;

    public Farm() {}

    public Farm(Long farmerId, String name, String cropType, Integer area) {
        this.farmerId = farmerId;
        this.name = name;
        this.cropType = cropType;
        this.area = area;
    }

    public Farm(Long farmerId, String name, String cropType, Integer area, Double latitude, Double longitude,
                String soilType, String irrigationType, LocalDate lastPlanted, Double expectedYield) {
        this.farmerId = farmerId;
        this.name = name;
        this.cropType = cropType;
        this.area = area;
        this.latitude = latitude;
        this.longitude = longitude;
        this.soilType = soilType;
        this.irrigationType = irrigationType;
        this.lastPlanted = lastPlanted;
        this.expectedYield = expectedYield;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getFarmerId() { return farmerId; }
    public void setFarmerId(Long farmerId) { this.farmerId = farmerId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCropType() { return cropType; }
    public void setCropType(String cropType) { this.cropType = cropType; }
    public Integer getArea() { return area; }
    public void setArea(Integer area) { this.area = area; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }
    public String getIrrigationType() { return irrigationType; }
    public void setIrrigationType(String irrigationType) { this.irrigationType = irrigationType; }
    public LocalDate getLastPlanted() { return lastPlanted; }
    public void setLastPlanted(LocalDate lastPlanted) { this.lastPlanted = lastPlanted; }
    public Double getExpectedYield() { return expectedYield; }
    public void setExpectedYield(Double expectedYield) { this.expectedYield = expectedYield; }
}
