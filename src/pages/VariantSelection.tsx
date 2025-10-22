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
  const [variantPrices, setVariantPrices] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const storageOptions: Record<string, string[]> = {
    phone: ["64GB", "128GB", "256GB", "512GB", "1TB"],
    laptop: ["256GB SSD", "512GB SSD", "1TB SSD", "2TB SSD"],
    ipad: ["64GB", "128GB", "256GB", "512GB", "1TB", "2TB"],
  };

  const availableStorageOptions = storageOptions[deviceType as keyof typeof storageOptions] || [];

  useEffect(() => {
    const fetchPrices = async () => {
      if (!deviceId) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('device_variants')
          .select('storage, base_price')
          .eq('device_id', deviceId);

        if (error) throw error;

        if (data && data.length > 0) {
          const priceMap = new Map<string, number>();
          data.forEach(variant => {
            priceMap.set(variant.storage, variant.base_price);
          });
          setVariantPrices(priceMap);
        }
      } catch (error) {
        console.error('Error fetching prices:', error);
        toast({
          title: "Error",
          description: "Failed to load pricing information. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [deviceId, toast]);

  const handleStorageSelection = (storage: string) => {
    setSelectedStorage(storage);
    const price = variantPrices.get(storage);
    if (price !== undefined) {
      setBasePrice(price);
    } else {
      setBasePrice(null);
      toast({
        title: "Price not available",
        description: `Pricing for ${storage} variant is not yet available in the database.`,
        variant: "destructive",
      });
    }
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
              Select storage capacity for your {getDeviceName(deviceId)}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: "royalBlue" }} />
            </div>
          ) : (
            <Card className="card-premium max-w-2xl mx-auto">
              <div className="space-y-8">
                {/* Storage Selection */}
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: "black" }}>Storage Capacity</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableStorageOptions.map((storage) => {
                      const hasPrice = variantPrices.has(storage);
                      return (
                        <Button
                          key={storage}
                          variant={selectedStorage === storage ? "default" : "outline"}
                          onClick={() => handleStorageSelection(storage)}
                          className="h-12 relative"
                          style={{ color: "black" }}
                        >
                          {storage}
                          {!hasPrice && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-500 rounded-full" title="Price not available"></span>
                          )}
                        </Button>
                      );
                    })}
                  </div>
                  {variantPrices.size === 0 && (
                    <p className="text-sm text-muted-foreground mt-2 text-center">
                      Pricing information is not yet available for this device.
                    </p>
                  )}
                </div>

                {/* Base Price Display */}
                {basePrice !== null && selectedStorage && (
                  <div className="text-center space-y-6 animate-fade-in pt-6 border-t border-border">
                    <div>
                      <p className="text-lg mb-2" style={{ color: "black" }}>
                        Base price for {getDeviceName(deviceId)} ({selectedStorage})
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
