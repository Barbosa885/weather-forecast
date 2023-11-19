import { usestate, useeffect } from 'react'

export const usegeolocation = () => {
  const [currentlocation, setcurrentlocation] = usestate({
    loaded: false,
    coordinate: { lat: "", lon: ""}
  });

  useeffect(() => {
    if( !("geolocation" in navigator) ) {
      onerror({
        code: 0,
        message: "geolocation not supported"
      })
    }
    navigator.geolocation.getcurrentposition(onsuccess, onerror);
  }, [])

  const onsuccess = (currentlocation) => {
    setcurrentlocation({
      loaded: true,
      coordinate: {
        lat: currentlocation.coords.latitude,
        lon: currentlocation.coords.longitude
      }
    });
  }

  const onerror = error => {
    setcurrentlocation({
      loaded: true,
      error
    });
  }

  return currentlocation;
}
