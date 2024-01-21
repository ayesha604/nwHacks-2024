import * as React from "react";
import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import {
  PinSharp,
  Room,
  Star,
  StarBorderPurple500Outlined,
} from "@mui/icons-material";
import "./app.css";
import axios from "axios";

function App() {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const getPins = () => {
      axios
        .get("/pins")
        .then((res) => {
          console.log(res.data);
          setPins(res.data);
          console.log(pins);
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(res.data);
    };
    getPins();
  }, []);

  useEffect(() => {
    console.log("hiii" + pins);
    console.log(pins);
  }, [pins]);

  return (
    <div className="App">
      <Map
        mapboxAccessToken="pk.eyJ1Ijoic2FicmluYWxvdSIsImEiOiJjbHJtcXAybDUweGtxMmpwOTZhenlpeHZtIn0.RsL-gzj42VvTaEURdM_A7g"
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {/* <Marker longitude={-74.0445} latitude={40.6892} anchor="bottom">
          <Room
            style={{
              fontSize: visualViewport.zoom * 10,
              color: "slateblue",
            }}
          />
        </Marker> */}
        {pins.map((p) => (
          <>
            <Marker
              key={p._id}
              longitude={p.long}
              latitude={p.lat}
              anchor="bottom"
            >
              <Room
                style={{
                  fontSize: visualViewport.zoom * 10,
                  color: "slateblue",
                }}
              />
            </Marker>

            {/* <Popup
        longitude={-100}
        latitude={40}
          anchor="left"
          closeOnClick={false}
        >
          <div className="card">
          <label>Place</label>
            <h4 className="place">Eiffel Tower</h4>
            <label>Review</label>
            <p className="desc">Beautiful</p>
            <label>Rating</label>
            <div className="stars">
              <Star className="star" />
              <Star className="star" />
              <Star className="star" />
              <Star className="star" />
              <Star className="star" />
              </div>
              <label>Information</label>
              <span className="username">
              Created by <b>sadak</b>
              </span>
              <span className="date">1 hour ago</span>
              </div>
            </Popup> */}
          </>
        ))}
      </Map>
    </div>
  );
}

export default App;
