import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFarms, createFarm, deleteFarm, Farm } from "@/lib/api";
import { useNavigate } from "react-router-dom";

export default function Farms() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [farmerId, setFarmerId] = useState("");
  const [name, setName] = useState("");
  const [cropType, setCropType] = useState("");
  const [area, setArea] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [soilType, setSoilType] = useState("");
  const [irrigationType, setIrrigationType] = useState("");
  const [lastPlanted, setLastPlanted] = useState("");
  const [expectedYield, setExpectedYield] = useState("");

  const { data: farms, isLoading, isError } = useQuery<Farm[]>({
    queryKey: ["farms"],
    queryFn: fetchFarms,
  });

  const mutation = useMutation({
    mutationFn: (payload: Omit<Farm, "id">) => createFarm(payload),
      onSuccess: (data) => {
      toast({ title: "Success", description: "Farm added" });
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      setFarmerId("");
      setName("");
      setCropType("");
      setArea("");
      setLatitude("");
      setLongitude("");
      setSoilType("");
      setIrrigationType("");
      setLastPlanted("");
      setExpectedYield("");
    },
    onError: (err: any) => {
      toast({ title: "Error", description: String(err), variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteFarm(id),
    onSuccess: () => {
      toast({ title: "Deleted", description: "Farm removed" });
      queryClient.invalidateQueries({ queryKey: ["farms"] });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: String(err), variant: "destructive" });
    },
  });

  const handleAddFarm = () => {
    if (!farmerId || !name || !area) {
      return toast({ title: "Missing fields", description: "Farmer ID, Name and Area are required", variant: "destructive" });
    }

    const payload: any = {
      farmerId: Number(farmerId),
      name,
      cropType,
      area: Number(area),
    };

    if (soilType) payload.soilType = soilType;
    if (irrigationType) payload.irrigationType = irrigationType;
    if (latitude) payload.latitude = Number(latitude);
    if (longitude) payload.longitude = Number(longitude);
    if (lastPlanted) payload.lastPlanted = lastPlanted;
    if (expectedYield) payload.expectedYield = Number(expectedYield);

    mutation.mutate(payload);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Farms</h1>
          <p className="text-muted-foreground">Manage your agricultural properties</p>
        </div>

        <div className="grid gap-2 grid-cols-1 md:grid-cols-5 items-end w-full md:w-auto">
          <Input placeholder="Farmer ID" value={farmerId} onChange={(e) => setFarmerId(e.target.value)} type="number" />
          <Input placeholder="Farm Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Crop Type" value={cropType} onChange={(e) => setCropType(e.target.value)} />
          <Input placeholder="Area (hectares)" value={area} onChange={(e) => setArea(e.target.value)} type="number" />
          <Input placeholder="Soil Type" value={soilType} onChange={(e) => setSoilType(e.target.value)} />
          <Input placeholder="Irrigation Type" value={irrigationType} onChange={(e) => setIrrigationType(e.target.value)} />
          <Input placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} type="number" />
          <Input placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} type="number" />
          <Input placeholder="Last Planted (YYYY-MM-DD)" value={lastPlanted} onChange={(e) => setLastPlanted(e.target.value)} />
          <Input placeholder="Expected Yield" value={expectedYield} onChange={(e) => setExpectedYield(e.target.value)} type="number" />
          <Button onClick={handleAddFarm} disabled={mutation.status === "pending"}>
            <Plus className="mr-2 h-4 w-4" />
            {mutation.status === "pending" ? "Adding..." : "Add Farm"}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p>Loading farms...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load farms.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {farms?.map((farm) => (
            <Card key={farm.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {farm.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Crop Type:</span>
                    <span className="font-medium">{farm.cropType}</span>
                  </div>
                  {farm.soilType && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Soil:</span>
                      <span className="font-medium">{farm.soilType}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Area:</span>
                    <span className="font-medium">{farm.area} hectares</span>
                  </div>
                  {farm.expectedYield !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expected Yield:</span>
                      <span className="font-medium">{farm.expectedYield}</span>
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1" onClick={() => navigate(`/farms/${farm.id}`)}>View Details</Button>
                    <Button variant="destructive" className="flex-0" onClick={() => {
                      if (confirm('Delete farm "' + farm.name + '"? This cannot be undone.')) {
                        deleteMutation.mutate(farm.id!);
                      }
                    }}>Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
