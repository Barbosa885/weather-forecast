import { useState, useEffect } from 'react'

export const useGeolocation = () => {
    const [currentLocation, setCurrentLocation] = useState({
        loaded: false,
        coordinate: { lat: "", long: ""}
    });

    const onSuccess = (currentLocation) => {
        setCurrentLocation({
            loaded: true,
            coordinates: {
                lat: currentLocation.coords.latitude,
                long: currentLocation.coords.longitude
            }
        });
    }

    const onError = error => {
        setCurrentLocation({
            loaded: true,
            error
        });
    }

    useEffect(() => {
        if( (!"geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported"
            })
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, [])

    return currentLocation;
}