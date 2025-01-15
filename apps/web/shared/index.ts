export function convertDDtoDMS(D: number | undefined) {
  if (D === undefined) return { degree: 0, minute: 0, second: 0 };
  return {
    degree: 0 | D,
    minute: 0 | (((D = (D < 0 ? -D : D) + 1e-4) % 1) * 60),
    second: Math.floor(((D * 60) % 1) * 60 * 1000000) / 1000000,
  };
}

export function convertDDtoDM(D: number | undefined) {
  if (D === undefined) return { degree: 0, minute: 0 };
  const absolute = Math.abs(D);
  const degree = Math.floor(absolute);
  const minute = parseFloat(((absolute - degree) * 60).toFixed(6));
  return { degree, minute };
}

export function geopositionToObject(geoposition: GeolocationPosition) {
  return {
    timestamp: geoposition.timestamp,
    coords: {
      accuracy: geoposition.coords.accuracy,
      altitude: geoposition.coords.altitude,
      altitudeAccuracy: geoposition.coords.altitudeAccuracy,
      heading: geoposition.coords.heading,
      latitude: geoposition.coords.latitude,
      longitude: geoposition.coords.longitude,
      speed: geoposition.coords.speed,
    },
  };
}
