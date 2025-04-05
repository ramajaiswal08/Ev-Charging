import axios from "axios";

const BASE_URL = "https://api.openchargemap.io/v3/poi/";
const API_KEY = "2095dbe0-c425-4db1-9e89-9c6728dad015"; // Replace with your valid Open Charge Map API key

const NewNearByPlace = async (latitude, longitude, radiusKm = 20, maxResults = 10) => {
  try {
    console.log("🔗 Making API Call to:", BASE_URL);

    const response = await axios.get(BASE_URL, {
      params: {
        output: "json",
        latitude,
        longitude,
        distance: radiusKm,
        distanceunit: "KM",
        maxresults: maxResults,
        key: API_KEY,
      },
    });

    console.log("📥 Response Received:", response.data);

    // ✅ Extracting relevant details
    const places = response.data.map((station) => ({
      name: station.AddressInfo.Title || "EV Charging Station",
      address: station.AddressInfo.AddressLine1 || "No Address Available",
      latitude: station.AddressInfo.Latitude,
      longitude: station.AddressInfo.Longitude,
      evChargerOptions: station.Connections
        ? station.Connections.map((conn) => ({
            type: conn.ConnectionType?.Title || "Unknown",
            powerKW: conn.PowerKW || "Unknown kW",
            status: conn.StatusType?.Title || "Unknown",
          }))
        : [],
      photoUrl: station.MediaItems?.length
        ? station.MediaItems[0].ItemURL // First available image
        : "https://via.placeholder.com/150", // Placeholder if no image found
    }));

    console.log(`✅ Processed ${places.length} EV Charging Stations`);
    return places; // Returning extracted data
  } catch (error) {
    console.error("❌ Error in API Call:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export default { NewNearByPlace };
