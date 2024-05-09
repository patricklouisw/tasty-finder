import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "location.png",
  iconSize: [40, 40], // icon size
  iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
});

const Loader = () => {
  return (
    <div className="z-[10000] transform absolute top-1/2 left-1/2 -translate-x-10 -translate-y-12">
      <svg
        aria-hidden="true"
        className="w-24 h-24 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
};

const MapComponent = () => {
  const mapRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [markerList, setMarkerList] = useState([]);
  const [curRest, setCurRest] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (curRest) {
      flyToMarker(curRest["rest_coor"], zoomLevel);
    }
  }, [curRest]);

  const showError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
    }, 3000); // Remove error after 3 seconds
  };

  const flyToMarker = (coordinates, zoom) => {
    if (coordinates && typeof coordinates[0] !== "undefined") {
      mapRef.current.flyTo(coordinates, zoom, {
        animate: true,
        duration: 2,
      });
    }
  };

  const handleSubmit = async () => {
    setInputValue("");
    try {
      if (!inputValue.startsWith("https://www.youtube.com/watch?v=")) {
        throw new Error(
          "Error: URL needs to start with 'https://www.youtube.com/watch?v='"
        );
      }
      setLoading(true);

      // Parse video ID from input value
      const video_id = inputValue.split("?v=")[1].substring(0, 11);

      const backend_url =
        "https://travel-fastapi-4drm57t3ta-uc.a.run.app/video_id/";

      const url = backend_url + video_id;

      const response = await fetch(url, {
        method: "POST",
      });

      const data = await response.json();

      const rest_data = data["restaurants"].map((rest) => {
        return {
          rest_name: rest.name,
          rest_coor: [parseFloat(rest.latitude), parseFloat(rest.longitude)],
          rest_foods: rest.foods,
          rest_address: rest.address,
          rest_google_maps_link: rest.google_maps_link,
        };
      });

      setZoomLevel(12);
      setMarkerList(rest_data);
      setCurRest(rest_data[0]);
    } catch (error) {
      console.error(error);
      showError("Please make sure it is a YouTube URL to a travel video");
    } finally {
      setLoading(false);
    }
  };

  const ZoomHandler = ({ setZoomLevel }) => {
    const mapEvents = useMapEvents({
      zoomend: () => {
        setZoomLevel(mapEvents.getZoom());
      },
    });

    return null;
  };

  const FlyToHandler = ({ key, restaurant }) => {
    return (
      <Marker
        key={key}
        position={restaurant.rest_coor}
        icon={customIcon}
        eventHandlers={{
          click: () => {
            setCurRest(restaurant);
          },
        }}
      >
        <Popup>{restaurant.rest_name}</Popup>
      </Marker>
    );
  };

  const RestaurantCard = ({ key, restaurant }) => {
    return (
      <div
        key={key}
        className={`flex flex-col gap-1 p-3 shadow-md transition ease-in-out duration-300 ${
          curRest === restaurant
            ? "bg-slate-300"
            : "bg-slate-100 cursor-pointer hover:bg-slate-200 hover:translate-x-2"
        } `}
        onClick={() => {
          setCurRest(restaurant);
        }}
      >
        <h1 className="text-md font-bold text-black p-1">
          {restaurant.rest_name}
        </h1>
        <div className="flex gap-1 flex-wrap">
          {restaurant.rest_foods.map((type, i) => (
            <p
              key={i}
              className="px-2 py-1  bg-yellow-100 rounded-full text-xs"
            >
              {type}
            </p>
          ))}
        </div>
        <p className="text-xs italic bg-slate-100 p-1 rounded my-2 cursor-default">
          {restaurant.rest_address}
        </p>
        <span className="text-xs text-slate-800 font-bold">Open in</span>
        <Link
          href={restaurant.rest_google_maps_link}
          target="_blank"
          className="text-sm rounded-full bg-green-700 w-fit py-1 px-2 text-white hover:bg-green-600"
        >
          Google Maps
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="flex gap-5">
        <div className="relative">
          <div className="relative">
            {loading && <Loader />}

            <MapContainer
              center={[43.6426, -79.3871]}
              zoom={zoomLevel}
              style={{ flex: 1, width: "800px", height: "600px" }}
              ref={mapRef}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {markerList &&
                markerList.length !== 0 &&
                markerList.map((rest, i) => (
                  <FlyToHandler key={i} restaurant={rest} />
                ))}
              <ZoomHandler setZoomLevel={setZoomLevel} />
            </MapContainer>
          </div>

          <div className="flex justify-center z-[1000] p-3 relative">
            <input
              type="text"
              value={inputValue}
              placeholder="Insert a valid Youtube Url"
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow p-2 border rounded-md text-black"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
            <button
              onClick={handleSubmit}
              className="p-2 ml-2 bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>

            {error && (
              <div className="flex items-center justify-center z-[10000] absolute -top-3/4">
                <h1 className="text-sm font-bold text-red-500 p-2 bg-red-100 rounded-md">
                  {error}
                </h1>
              </div>
            )}
          </div>
        </div>

        <div
          id="restaurant-list"
          className="border border-slate-300 w-96 rounded-lg shadow-lg flex flex-col items-center gap-4 p-3 h-[650px]"
        >
          <h1 className="font-bold text-slate-800 text-lg pt-3">
            Restaurants to Visit
          </h1>
          <hr className="bg-black w-full" />

          <div className="flex flex-col gap-5 overflow-y-scroll overflow-x-hidden w-full">
            {markerList && markerList.length != 0 ? (
              markerList.map((rest, i) => (
                <RestaurantCard key={i} restaurant={rest} />
              ))
            ) : (
              <div className="p-2 flex justify-center items-center">
                <p className="italic text-sm">No Restaurants yet!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
