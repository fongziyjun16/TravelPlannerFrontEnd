import React, {useEffect, useState} from "react";
import PubSub from "pubsub-js";
import {GoogleMap, Marker, LoadScript, DirectionsService, DirectionsRenderer} from "@react-google-maps/api";
import {message} from "antd";
import {useNavigate} from "react-router-dom";

function TravelMap(props) {

    const navigate = useNavigate();
    const [zoom, setZoom] = useState(12);
    const [center, setCenter] = useState({
        lat: 39.904202,
        lng: 116.407394
    });
    const [route, setRoute] = useState(null);
    const [requestDir, setRequestDir] = useState(false);
    const [response, setResponse] = useState(null);
    const [showDirectionsFlag, setShowDirectionsFlag] = useState(false);
    const [showPointFlag, setShowPointFlag] = useState(true);

    useEffect(() => {
        let city = JSON.parse(localStorage.getItem('center') === null ? 'null' : localStorage.getItem('center'));
        if (city === null) {
            message.error('Choose A CITY First!!!')
            navigate('/search');
        }
        // console.log(city);

        PubSub.subscribe('ShowPoint', (msg, point) => {
            // console.log(point);
            setShowDirectionsFlag(false);
            setResponse(null);
            setZoom(14);
            setCenter({
                lat: point.lat,
                lng: point.lng
            });
            setShowPointFlag(true);
        });

        PubSub.subscribe('ShowDirections', (msg, data) => {
            // console.log(data);
            setShowPointFlag(false);
            setZoom(12);
            setRequestDir(false);
            setResponse(null);
            setCenter(data.origin);
            setRoute(data);
            setShowDirectionsFlag(true);
        });

        PubSub.publish('ShowPoint', {
            lat: city.lat,
            lng: city.lng,
        });

        return () =>{
            PubSub.unsubscribe('ShowPoint');
            PubSub.unsubscribe('ShowDirections');
        }
    }, []);

    function directionsCallback (result, status) {
        if (status === 'OK') {
            console.log(result);
            setRequestDir(true);
            setResponse(result);
        }
    }

    return (
        <>
            <LoadScript
                googleMapsApiKey="AIzaSyCtdpUYxLPw3EnxfIy5T1G8eAUSbt41s1M"
            >
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={center}
                    zoom={zoom}>
                    { /* Child components, such as markers, info windows, etc. */ }
                    <Marker
                        position={center}
                        visible={showPointFlag}
                    />
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