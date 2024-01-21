import * as React from "react";
import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import {
  LocalDining,
  PinSharp,
  Room,
  Star,
  StarBorderPurple500Outlined,
} from "@mui/icons-material";
import "./app.css";
import axios from "axios";
import { format } from "timeago.js";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const myStorage = window.localStorage;

  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));

  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(1);

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [viewport, setViewport] = useState({
    longitude: -100,
    latitude: 40,
  });

  useEffect(() => {
    const getPins = () => {
      axios
        .get("/pins")
        .then((res) => {
          setPins(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(res.data);
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    console.log(e);
    const lat = e.lngLat.lat;
    const long = e.lngLat.lng;
    console.log(lat, long);
    setNewPlace({
      lat,
      long,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <div className="App">
      <Map
        // {...viewport}
        mapboxAccessToken="pk.eyJ1Ijoic2FicmluYWxvdSIsImEiOiJjbHJtcXAybDUweGtxMmpwOTZhenlpeHZtIn0.RsL-gzj42VvTaEURdM_A7g"
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        dragPan={true}
        onDblClick={handleAddClick}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        // onMove={(viewport) => setViewport(viewport)}
      >
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
                  color: p.username === currentUser ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                anchor="left"
                closeOnClick={false}
                onClose={() => {
                  setCurrentPlaceId(null);
                }}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            anchor="left"
            closeOnClick={false}
            onClose={() => {
              setNewPlace(null);
            }}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="What's this place called?"
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                <label>Review</label>
                <textarea
                  placeholder="Say something about this place!"
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton">Add Pin</button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUser={setCurrentUser}
            myStorage={myStorage}
          />
        )}
      </Map>
    </div>
  );
}

export default App;
