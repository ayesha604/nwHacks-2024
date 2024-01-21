import * as React from "react";
import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import {
  Bolt,
  BrowseGallery,
  Check,
  Edit,
  Female,
  Power,
  Room,
  SoupKitchen,
  Star,
  ThumbDown,
  ThumbUp,
  Wc,
  Wifi,
} from "@mui/icons-material";
import "./app.css";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const myStorage = window.localStorage;

  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));

  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [currentEditPlaceId, setEditCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(1);

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [wifiYes, setWifiYes] = useState(false);
  const [wifiNo, setWifiNo] = useState(false);
  const [washroomsYes, setWashroomsYes] = useState(false);
  const [washroomsNo, setWashroomsNo] = useState(false);
  const [outletsYes, setOutletsYes] = useState(false);
  const [outletsNo, setOutletsNo] = useState(false);
  const [foodYes, setFoodYes] = useState(false);
  const [foodNo, setFoodNo] = useState(false);
  const [hrsYes, setHrsYes] = useState(false);
  const [hrsNo, setHrsNo] = useState(false);
  const [menstrualYes, setMenstrualYes] = useState(false);
  const [menstrualNo, setMenstrualNo] = useState(false);

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
  }, [currentEditPlaceId]);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setEditCurrentPlaceId(null);
    setWifiNo(false);
    setWifiYes(false);
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

  const handleSubmitRating = async (id) => {
    setCurrentPlaceId(null);
    setEditCurrentPlaceId(null);

    const updatedPin = {
      _id: id,
      resources: {
        wifiYes,
        wifiNo,
        washroomsYes,
        washroomsNo,
        outletsYes,
        outletsNo,
        hrsYes,
        hrsNo,
        menstrualYes,
        menstrualNo,
        foodYes,
        foodNo,
      },
    };

    setWifiYes(false);
    setWifiNo(false);
    setWashroomsYes(false);
    setWashroomsNo(false);
    setOutletsYes(false);
    setOutletsNo(false);
    setHrsYes(false);
    setHrsNo(false);
    setMenstrualYes(false);
    setMenstrualNo(false);
    setFoodYes(false);
    setFoodNo(false);

    try {
      const res = await axios.put("/pins", updatedPin);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };

  const handlePinEdit = (id) => {
    setEditCurrentPlaceId(id);
    setCurrentPlaceId(null);
  };

  const handleWifiThumbsUp = () => {
    if (!wifiYes) {
      setWifiNo(false);
    }
    setWifiYes(!wifiYes);
  };
  const handleWifiThumbsDown = () => {
    if (!wifiNo) {
      setWifiYes(false);
    }
    setWifiNo(!wifiNo);
  };

  const handleWashroomsThumbsUp = () => {
    if (!washroomsYes) {
      setWashroomsNo(false);
    }
    setWashroomsYes(!washroomsYes);
  };
  const handleWashroomsThumbsDown = () => {
    if (!washroomsNo) {
      setWashroomsYes(false);
    }
    setWashroomsNo(!washroomsNo);
  };

  const handleOutletsThumbsUp = () => {
    if (!outletsYes) {
      setOutletsNo(false);
    }
    setOutletsYes(!outletsYes);
  };
  const handleOutletsThumbsDown = () => {
    if (!outletsNo) {
      setOutletsYes(false);
    }
    setOutletsNo(!outletsNo);
  };

  const handleMenstrualThumbsUp = () => {
    if (!menstrualYes) {
      setMenstrualNo(false);
    }
    setMenstrualYes(!menstrualYes);
  };
  const handleMenstrualThumbsDown = () => {
    if (!menstrualNo) {
      setMenstrualYes(false);
    }
    setMenstrualNo(!menstrualNo);
  };

  const handleFoodThumbsUp = () => {
    if (!foodYes) {
      setFoodNo(false);
    }
    setFoodYes(!foodYes);
  };
  const handleFoodThumbsDown = () => {
    if (!foodNo) {
      setFoodYes(false);
    }
    setFoodNo(!foodNo);
  };

  const handleHrsThumbsUp = () => {
    if (!hrsYes) {
      setHrsNo(false);
    }
    setHrsYes(!hrsYes);
  };
  const handleHrsThumbsDown = () => {
    if (!hrsNo) {
      setHrsYes(false);
    }
    setHrsNo(!hrsNo);
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
                  <h4 className="title">{p.title}</h4>
                  <div className="icons">
                    {p.resources.wifi.yes/(p.resources.wifi.yes + p.resources.wifi.no) > 0.6 && <Wifi />}
                    {p.resources.outlets.yes/(p.resources.outlets.yes + p.resources.outlets.no) > 0.6 && <Bolt />}
                    {p.resources.washroom.yes/(p.resources.washroom.yes + p.resources.washroom.no) > 0.6 && <Wc />}
                    {p.resources.food.yes/(p.resources.food.yes + p.resources.food.no) > 0.6 && <SoupKitchen />}
                    {p.resources.twentyfourhr.yes/(p.resources.twentyfourhr.yes + p.resources.twentyfourhr.no) > 0.6 && <BrowseGallery />}
                    {p.resources.menstrual.yes/(p.resources.menstrual.yes + p.resources.menstrual.no) > 0.6 && <Female />}
                  </div>
                  <div className="editBtnContainer">
                    <Edit
                      className="editBtn"
                      onClick={() => handlePinEdit(p._id)}
                    />
                  </div>
                </div>
              </Popup>
            )}
            {p._id === currentEditPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                anchor="left"
                closeOnClick={false}
                onClose={() => {
                  setEditCurrentPlaceId(null);
                }}
              >
                <div className="ratingCard">
                  <h4 className="title">{p.title}</h4>
                  <form className="rating">
                    <div className="ratingContainer">
                      <p>Wifi</p>
                      <p>
                        {Math.floor(
                          (p.resources.wifi.yes * 100) /
                            (p.resources.wifi.yes + p.resources.wifi.no)
                        )}
                        %
                      </p>
                      <ThumbDown
                        style={{ color: wifiNo ? "red" : "gray" }}
                        onClick={() => handleWifiThumbsDown()}
                      />
                      <ThumbUp
                        style={{ color: wifiYes ? "green" : "gray" }}
                        onClick={() => handleWifiThumbsUp()}
                      />
                    </div>
                    <div className="ratingContainer">
                      <p>Chargers</p>
                      <p>
                        {Math.floor(
                          (p.resources.outlets.yes * 100) /
                            (p.resources.outlets.yes + p.resources.outlets.no)
                        )}
                        %
                      </p>
                      <ThumbDown
                        style={{ color: outletsNo ? "red" : "gray" }}
                        onClick={() => handleOutletsThumbsDown()}
                      />
                      <ThumbUp
                        style={{ color: outletsYes ? "green" : "gray" }}
                        onClick={() => handleOutletsThumbsUp()}
                      />
                    </div>
                    <div className="ratingContainer">
                      <p>Washrooms</p>
                      <p>
                        {Math.floor(
                          (p.resources.washroom.yes * 100) /
                          (p.resources.washroom.yes + p.resources.washroom.no)
                          )}
                        %
                      </p>
                      <ThumbDown
                        style={{ color: washroomsNo ? "red" : "gray" }}
                        onClick={() => handleWashroomsThumbsDown()}
                      />
                      <ThumbUp
                        style={{ color: washroomsYes ? "green" : "gray" }}
                        onClick={() => handleWashroomsThumbsUp()}
                      />
                    </div>
                    <div className="ratingContainer">
                      <p>Food</p>
                      <p>
                      {Math.floor(
                        (p.resources.food.yes * 100) /
                        (p.resources.food.yes + p.resources.food.no)
                        )}
                        %
                      </p>
                      <ThumbDown
                        style={{ color: foodNo ? "red" : "gray" }}
                        onClick={() => handleFoodThumbsDown()}
                      />
                      <ThumbUp
                        style={{ color: foodYes ? "green" : "gray" }}
                        onClick={() => handleFoodThumbsUp()}
                      />
                    </div>
                    <div className="ratingContainer">
                      <p>Open 24h</p>
                      <p>
                      {Math.floor(
                        (p.resources.twentyfourhr.yes * 100) /
                        (p.resources.twentyfourhr.yes +
                        p.resources.twentyfourhr.no)
                        )}
                        %
                      </p>
                      <ThumbDown
                        style={{ color: hrsNo ? "red" : "gray" }}
                        onClick={() => handleHrsThumbsDown()}
                      />
                      <ThumbUp
                        style={{ color: hrsYes ? "green" : "gray" }}
                        onClick={() => handleHrsThumbsUp()}
                      />
                    </div>
                    <div className="ratingContainer">
                      <p>Mentrual</p>
                      <p>
                      {Math.floor((p.resources.menstrual.yes * 100) /
                        (p.resources.menstrual.yes +
                        p.resources.menstrual.no)
                        )}
                        %
                      </p>
                      <ThumbDown
                        style={{ color: menstrualNo ? "red" : "gray" }}
                        onClick={() => handleMenstrualThumbsDown()}
                      />
                      <ThumbUp
                        style={{ color: menstrualYes ? "green" : "gray" }}
                        onClick={() => handleMenstrualThumbsUp()}
                      />
                    </div>
                  </form>
                  <div className="editBtnContainer">
                    <Check
                      className="checkBtn"
                      onClick={() => handleSubmitRating(p._id)}
                    />
                  </div>
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
