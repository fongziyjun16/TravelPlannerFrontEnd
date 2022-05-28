import React, {useEffect, useState} from "react";
import PubSub from "pubsub-js";
import {GoogleMap, Marker, LoadScript, DirectionsService, DirectionsRenderer} from "@react-google-maps/api";
import {message} from "antd";
import {useNavigate} from "react-router-dom";

function TravelMap(props) {

    let city = {};
    const navigate = useNavigate();
    const [zoom, setZoom] = useState(12);
    const [center, setCenter] = useState({});
    const [route, setRoute] = useState(null);
    const [requestDir, setRequestDir] = useState(false);
    const [response, setResponse] = useState(null);
    const [showPointFlag, setShowPointFlag] = useState(true);
    const [showDirectionsFlag, setShowDirectionsFlag] = useState(false);

    useEffect(() => {
        city = JSON.parse(localStorage.getItem('center') === null ? 'null' : localStorage.getItem('center'));
        if (city === null) {
            message.error('Choose A CITY First!!!')
            navigate('/search');
        }
        // console.log(city);

        setCenter({
            lat: city.lat,
            lng: city.lng
        });
        setShowDirectionsFlag(false);
        setShowPointFlag(true);
    }, []);

    function directionsCallback (result, status) {
        if (status === 'OK') {
            // console.log(result);
            setRequestDir(true);
            setResponse(result);
        }
    }

    PubSub.subscribe('ShowPoint', showPoint);

    function showPoint(msg, point) {
        setShowDirectionsFlag(false);
        setZoom(14);
        setCenter({
            lat: point.lat,
            lng: point.lng
        });
        setShowPointFlag(true);
    }

    PubSub.subscribe('ShowDirections', showDirections)

    function showDirections(msg, data) {
        // console.log(data);
        setShowPointFlag(false);
        setRequestDir(false);
        setShowDirectionsFlag(true);
        setCenter(data.origin);
        setRoute(data);
    }

    return (
        <>
            <LoadScript
                googleMapsApiKey="AIzaSyA0aj2bYnzg_lALDWaRs6LMJDWH4iSslRc">
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={center}
                    zoom={zoom}>
                    { /* Child components, such as markers, info windows, etc. */ }
                    <Marker position={center} visible={showPointFlag} />
                    {
                        showDirectionsFlag && (
                            <>
                                {
                                    !requestDir &&
                                    <DirectionsService
                                        options={{
                                            origin: route.origin,
                                            destination: route.destination,
                                            waypoints: route.waypoints,
                                            travelMode: 'DRIVING'
                                        }}
                                        callback={directionsCallback}
                                    />
                                }
                                {
                                    response !== null &&
                                    <DirectionsRenderer
                                        options={{
                                            directions: response
                                        }}
                                    />
                                }
                            </>
                        )
                    }
                </GoogleMap>
            </LoadScript>
        </>
    );

}

export default TravelMap;