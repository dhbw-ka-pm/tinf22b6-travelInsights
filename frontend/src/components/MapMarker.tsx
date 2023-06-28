import * as React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { type City } from '../api.generated';

export default function MapMarker(props: {
  city: City;
}): React.ReactElement {
  return (
    <Marker position={{ lat: props.city.lat, lng: props.city.lng }}>
      <Popup>{props.city.shortDescription}</Popup>
    </Marker>
  );
}
