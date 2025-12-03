import { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFarms, updateFarm, deleteFarm } from "@/lib/api";
import { generateSensorData } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function FarmDetails() {
  const { id } = useParams();
  const farmId = Number(id);

  const { data: farms, isLoading, isError } = useQuery({ queryKey: ["farms"], queryFn: fetchFarms });

  const farm = useMemo(() => farms?.find((f) => f.id === farmId), [farms, farmId]);

  const sensorData = useMemo(() => (farm ? generateSensorData(farm.id) : []), [farm]);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editCropType, setEditCropType] = useState("");
  const [editArea, setEditArea] = useState("");
  const [editLatitude, setEditLatitude] = useState("");
  const [editLongitude, setEditLongitude] = useState("");
  const [editSoilType, setEditSoilType] = useState("");
  const [editIrrigationType, setEditIrrigationType] = useState("");
  const [editLastPlanted, setEditLastPlanted] = useState("");
  const [editExpectedYield, setEditExpectedYield] = useState("");

  useEffect(() => {
    if (farm) {
      setEditName(farm.name ?? "");
      setEditCropType(farm.cropType ?? "");
      setEditArea(String(farm.area ?? ""));
      setEditLatitude(farm.latitude !== undefined ? String(farm.latitude) : "");
      setEditLongitude(farm.longitude !== undefined ? String(farm.longitude) : "");
      setEditSoilType(farm.soilType ?? "");
      setEditIrrigationType(farm.irrigationType ?? "");
      setEditLastPlanted(farm.lastPlanted ?? "");
      setEditExpectedYield(farm.expectedYield !== undefined ? String(farm.expectedYield) : "");
    }
  }, [farm]);

  const updateMutation = useMutation({
    mutationFn: (payload: any) => updateFarm(farm!.id, payload),
    onSuccess: (data) => {
      toast({ title: "Saved", description: "Farm updated" });
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      setIsEditing(false);
    },
    onError: (err: any) => toast({ title: "Error", description: String(err), variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteFarm(id),
    onSuccess: () => {
      toast({ title: "Deleted", description: "Farm removed" });
      queryClient.invalidateQueries({ queryKey: ["farms"] });
      navigate("/farms");
    },
    onError: (err: any) => toast({ title: "Error", description: String(err), variant: "destructive" }),
  });

  const handleSave = () => {
    if (!farm) return;
    const payload: any = {
      farmerId: farm.farmerId,
      name: editName,
      cropType: editCropType,
      area: Number(editArea || 0),
    };
    if (editSoilType) payload.soilType = editSoilType;
    if (editIrrigationType) payload.irrigationType = editIrrigationType;
    if (editLatitude) payload.latitude = Number(editLatitude);
    if (editLongitude) payload.longitude = Number(editLongitude);
    if (editLastPlanted) payload.lastPlanted = editLastPlanted;
    if (editExpectedYield) payload.expectedYield = Number(editExpectedYield);

    updateMutation.mutate(payload);
  };

  const handleDelete = () => {
    if (!farm) return;
    if (!confirm(`Delete farm "${farm.name}"? This cannot be undone.`)) return;
    deleteMutation.mutate(farm.id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Failed to load farm.</p>;
  if (!farm) return <p className="text-muted-foreground">Farm not found.</p>;

  return (
    <div className="space-y-6">
      <div>
        {!isEditing ? (
          <>
            <h1 className="text-3xl font-bold text-foreground">{farm.name}</h1>
            <p className="text-muted-foreground">{farm.cropType} — {farm.area} ha</p>
          </>
        ) : (
          <div className="grid gap-2 md:grid-cols-3">
            <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
            <Input value={editCropType} onChange={(e) => setEditCropType(e.target.value)} />
            <Input value={editArea} onChange={(e) => setEditArea(e.target.value)} type="number" />
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="text-muted-foreground">Farmer ID</span><span>{farm.farmerId ?? '—'}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Crop Type</span><span>{farm.cropType}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Area</span><span>{farm.area} ha</span></div>
            {farm.soilType && (<div className="flex justify-between"><span className="text-muted-foreground">Soil Type</span><span>{farm.soilType}</span></div>)}
            {farm.irrigationType && (<div className="flex justify-between"><span className="text-muted-foreground">Irrigation</span><span>{farm.irrigationType}</span></div>)}
            {(farm.latitude !== undefined && farm.longitude !== undefined) && (
              <div className="flex justify-between"><span className="text-muted-foreground">Coordinates</span><span>{farm.latitude}, {farm.longitude}</span></div>
            )}
            {farm.lastPlanted && (<div className="flex justify-between"><span className="text-muted-foreground">Last Planted</span><span>{farm.lastPlanted}</span></div>)}
            {farm.expectedYield !== undefined && (<div className="flex justify-between"><span className="text-muted-foreground">Expected Yield</span><span>{farm.expectedYield}</span></div>)}
          </div>
          <div className="flex gap-2 mt-4">
            {!isEditing ? (
              <>
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
                <Button variant="destructive" onClick={handleDelete}>Delete</Button>
              </>
            ) : (
              <>
                <Button onClick={handleSave} disabled={updateMutation.isLoading}>{updateMutation.isLoading ? 'Saving...' : 'Save'}</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sensor Readings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sensorData.map((s, i) => (
              <div key={i} className="flex justify-between border-b pb-2">
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{new Date(s.timestamp).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Moisture</p>
                  <p className={s.soilMoisture < 30 ? "text-destructive font-medium" : "text-foreground"}>{s.soilMoisture}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
