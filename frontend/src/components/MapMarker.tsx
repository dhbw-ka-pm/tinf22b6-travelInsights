import * as React from 'react';
import { useGetLocationFromString } from '../api.generated';
import { Marker, Popup } from 'react-leaflet';
import { type LatLngLiteral } from 'leaflet';

export default function MapMarker(props: {
  name: string;
}): React.ReactElement<{ name: string }> {
  const { loading, data } = useGetLocationFromString({ place: props.name });
  const [position, setPosition] = React.useState<LatLngLiteral>({
    lat: 0,
    lng: 0
  });

  React.useEffect(() => {
    if (!loading) if (data != null) setPosition(data);
  }, [data]);

  return (
    <Marker position={position}>
      <Popup>{props.name}</Popup>
    </Marker>
  );
}
