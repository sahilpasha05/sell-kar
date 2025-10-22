import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Loader2 } from "lucide-react";
import { supabase, type DeviceVariant } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

// Define the route params type
type RouteParams = {
  brandId: string;
  deviceId: string;
  cityId: string;
};

const VariantSelection = () => {
  const { brandId, deviceId, cityId } = useParams<RouteParams>();
  const deviceType = window.location.pathname.split("/")[1].replace("sell-", "");

  const [selectedStorage, setSelectedStorage] = useState("");
  const [basePrice, setBasePrice] = useState<number | null>(null);
  const [variants, setVariants] = useState<DeviceVariant[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchVariants = async () => {
      if (!deviceId) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('device_variants')
          .select('*')
          .eq('device_id', deviceId)
          .order('base_price', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          setVariants(data);
        } else {
          toast({
            title: "No pricing data",
            description: "Pricing information is not available for this device yet.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error fetching variants:', error);
        toast({
          title: "Error",
          description: "Failed to load pricing information. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, [deviceId, toast]);

  const handleStorageSelection = (storage: string, price: number) => {
    setSelectedStorage(storage);
    setBasePrice(price);
  };

  const getDeviceName = (id: string) => {
    const deviceNames: { [key: string]: string } = {
      "iphone-15-pro-max": "iPhone 15 Pro Max",
      "iphone-15-pro": "iPhone 15 Pro",
      "iphone-15": "iPhone 15",
      "iphone-14-pro-max": "iPhone 14 Pro Max",
      "iphone-14-pro": "iPhone 14 Pro",
      "iphone-14": "iPhone 14",
      "iphone-13": "iPhone 13",
      "iphone-12": "iPhone 12",
      "iphone-11": "iPhone 11",
      "iphone-x": "iPhone X",
      "iphone-xr": "iPhone XR",
      "iphone-8": "iPhone 8",
      "galaxy-s24-ultra": "Galaxy S24 Ultra",
      "galaxy-s24-plus": "Galaxy S24 Plus",
      "galaxy-s24": "Galaxy S24",
      "galaxy-s23-ultra": "Galaxy S23 Ultra",
      "galaxy-s22-ultra": "Galaxy S22 Ultra",
      "galaxy-s21": "Galaxy S21",
      "galaxy-note-20": "Galaxy Note 20",
      "macbook-pro-16-m3": 'MacBook Pro 16" M3',
      "macbook-pro-14-m3": 'MacBook Pro 14" M3',
      "macbook-air-15": 'MacBook Air 15"',
      "macbook-air-13": 'MacBook Air 13"',
      "dell-xps-13": "Dell XPS 13",
      "dell-xps-15": "Dell XPS 15",
      "dell-inspiron-15": "Dell Inspiron 15",
      "dell-latitude-14": "Dell Latitude 14",
      "ipad-pro-12": 'iPad Pro 12.9"',
      "ipad-pro-11": 'iPad Pro 11"',
      "ipad-air": "iPad Air",
      "ipad-mini": "iPad Mini",
      "ipad-10th-gen": "iPad (10th Gen)",
      "galaxy-tab-s9-ultra": "Galaxy Tab S9 Ultra",
      "galaxy-tab-s9": "Galaxy Tab S9",
      "galaxy-tab-s8": "Galaxy Tab S8",
      "galaxy-tab-a8": "Galaxy Tab A8",
    };
    return deviceNames[id] || id;
  };

  const backPath = `/sell-${deviceType}/brand/${brandId}/device/${deviceId}/city`;

  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link to={backPath}>
              <Button variant="ghost" className="flex items-center gap-2 hover:text-foreground" style={{ color: "black" }}>
                <ChevronLeft size={20} />
                Back to Device Selection
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Choose <span style={{ color: "royalBlue" }}>Variant</span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: "black" }}>
              Select storage capacity for your {variants[0]?.device_name || getDeviceName(deviceId)}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: "royalBlue" }} />
            </div>
          ) : variants.length === 0 ? (
            <Card className="card-premium max-w-2xl mx-auto p-8 text-center">
              <p className="text-lg" style={{ color: "black" }}>No variants available for this device.</p>
            </Card>
          ) : (
            <Card className="card-premium max-w-2xl mx-auto">
              <div className="space-y-8">
                {/* Storage Selection */}
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: "black" }}>Storage Capacity</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {variants.map((variant) => (
                      <Button
                        key={variant.id}
                        variant={selectedStorage === variant.storage ? "default" : "outline"}
                        onClick={() => handleStorageSelection(variant.storage, variant.base_price)}
                        className="h-12"
                        style={{ color: "black" }}
                      >
                        {variant.storage}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Base Price Display */}
                {basePrice !== null && selectedStorage && (
                  <div className="text-center space-y-6 animate-fade-in pt-6 border-t border-border">
                    <div>
                      <p className="text-lg mb-2" style={{ color: "black" }}>
                        Base price for {variants[0]?.device_name || getDeviceName(deviceId)} ({selectedStorage})
                      </p>
                      <div className="text-5xl font-bold mb-4" style={{ color: "royalBlue" }}>₹{basePrice.toLocaleString()}</div>
                      <p className="text-sm" style={{ color: "black" }}>*Final price depends on device condition</p>
                    </div>

                    <div className="space-y-3">
                      <Link to={`/sell-${deviceType}/brand/${brandId}/device/${deviceId}/city/${cityId}/questionnaire`}>
                        <Button className="btn-hero w-full h-12" style={{ backgroundColor: "royalBlue", color: "black" }}>Get Exact Value</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default VariantSelection;
