import { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import { Input } from "@material-tailwind/react";

export const Map = () => {
  const [map, setMap] = useState(null);
  console.log(map);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [longitude, setLongitude] = useState(35.90789079666138);
  const [latitude, setLatitude] = useState(31.956085682020397);
  const [markerPosition, setMarkerPosition] = useState({
    lat: 31.963158,
    lng: 35.930359,
  });
  const [markerKey, setMarkerKey] = useState(0); // Added markerKey state

  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCin20Um_kf5R-sj9QADNLFA_Kro06A8Mw",
    libraries,
  });

  useEffect(() => {
    if (latitude && longitude) {
      setMarkerPosition({ lat: latitude, lng: longitude });
      setMarkerKey((prevKey) => prevKey + 1); // Update markerKey to trigger re-rendering of Marker
    }
  }, [latitude, longitude]);

  const handleMapLoad = (map) => {
    setMap(map);
  };

  const handleAutocompleteLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const handlePlaceSelect = () => {
    if (autocomplete !== null) {
      const addressObject = autocomplete.getPlace();
      const address = addressObject.formatted_address;
      setSelectedLocation(address);

      const { lat, lng } = addressObject.geometry.location;
      setLatitude(lat);
      setLongitude(lng);
      setMarkerPosition({ lat, lng });
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLatitude(lat);
    setLongitude(lng);
    setMarkerPosition({ lat, lng });
  };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className="p-4   h-auto pt-4 mt-2">
        <form>
          <div>
            <div>
              <GoogleMap
                onLoad={handleMapLoad}
                mapContainerStyle={{ width: "100%", height: "500px" }}
                center={{ lat: latitude, lng: longitude }}
                zoom={15}
                onClick={handleMapClick}
              >
                {latitude && longitude && (
                  <Marker key={markerKey} position={markerPosition} />
                )}
              </GoogleMap>
              <div>
                Selected Location:{" "}
                {`${selectedLocation} ,${latitude},${longitude}`}
              </div>
              <h3>Please enter a place name</h3>
              <Autocomplete
                onLoad={handleAutocompleteLoad}
                onPlaceChanged={handlePlaceSelect}
              >
                <Input type="text" placeholder="Enter your location" />
              </Autocomplete>
            </div>
          </div>

          {/* location */}

          {/* location */}
        </form>
      </main>
    </>
  );
};
