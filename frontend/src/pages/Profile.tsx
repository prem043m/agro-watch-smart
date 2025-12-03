import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, MapPin } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFarmer, updateFarmer, Farmer } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const farmerId = 1; // default/demo farmer id; replace with auth user id when available

  const { data: farmer, isLoading, isError } = useQuery<Farmer, Error>({
    queryKey: ["farmer", farmerId],
    queryFn: () => fetchFarmer(farmerId),
  });

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const mutation = useMutation<Farmer, Error, Partial<Farmer>>({
    mutationFn: (payload: Partial<Farmer>) => updateFarmer(farmerId, payload),
    onSuccess: (data) => {
      toast({ title: "Profile updated", description: "Your changes were saved." });
      queryClient.setQueryData(["farmer", farmerId], data);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update profile.", variant: "destructive" });
    },
  });

  // sync local form state when farmer data arrives
  useEffect(() => {
    if (farmer) {
      setName(farmer.name ?? "");
      setLocation(farmer.location ?? "");
    }
  }, [farmer]);

  const handleSave = () => {
    mutation.mutate({ name, location });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Farmer Profile</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError || !farmer ? (
            <p className="text-red-500">Failed to load profile.</p>
          ) : (
            <>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <User className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Name</p>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Location</p>
                    <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleSave}
                  disabled={mutation.status === "pending"}
                >
                  {mutation.status === "pending" ? "Saving..." : "Save Profile"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
