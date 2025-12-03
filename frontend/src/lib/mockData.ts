export const mockFarmer = {
  id: 1,
  name: "Rajesh Kumar",
  location: "Mandya, Karnataka"
};

export const mockFarms = [
  { id: 1, farmerId: 1, name: "Mysuru Fields", cropType: "Sugarcane", area: 50, soilType: "Loam", irrigationType: "Drip", latitude: 12.305, longitude: 76.655, lastPlanted: "2025-06-15", expectedYield: 72.5 },
  { id: 2, farmerId: 1, name: "Hassan Valley", cropType: "Ragi", area: 75, soilType: "Sandy", irrigationType: "Flood", latitude: 13.005, longitude: 75.925, lastPlanted: "2025-05-20", expectedYield: 3.1 },
  { id: 3, farmerId: 1, name: "Tumkur Plains", cropType: "Rice", area: 60, soilType: "Clay", irrigationType: "Surface", latitude: 13.330, longitude: 77.110, lastPlanted: "2025-07-01", expectedYield: 4.7 }
];

export const generateSensorData = (farmId: number) => {
  const now = new Date();
  const data = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      id: Math.random(),
      farmId,
      date: date.toISOString().split('T')[0],
      soilMoisture: Math.floor(Math.random() * 40) + 20,
      temperature: Math.floor(Math.random() * 15) + 18
    });
  }
  
  return data;
};

export const mockIrrigations = [
  { id: 1, farmId: 1, startTime: "2024-11-01 06:00", duration: 60, status: "Completed" },
  { id: 2, farmId: 2, startTime: "2024-11-02 07:00", duration: 45, status: "Completed" },
  { id: 3, farmId: 1, startTime: "2024-11-03 06:30", duration: 60, status: "Scheduled" }
];

export const calculateYieldPrediction = (cropType: string, avgTemp: number, avgMoisture: number) => {
  const baseYields: Record<string, number> = {
    "Sugarcane": 70.0,
    "Ragi": 2.5,
    "Rice": 4.5,
    "Cotton": 2.0,
    "Groundnut": 2.8
  };
  
  const base = baseYields[cropType] || 3.0;
  const tempFactor = avgTemp > 25 ? 0.9 : 1.0;
  const moistureFactor = avgMoisture < 30 ? 0.85 : avgMoisture > 50 ? 1.1 : 1.0;
  
  return (base * tempFactor * moistureFactor).toFixed(2);
};
