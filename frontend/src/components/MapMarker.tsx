import * as React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { type City } from '../api.generated';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

export default function MapMarker(props: {
  city: City;
}): React.ReactElement {
  const [innerString, setString] = useState<{ __html: string }>({ __html: "" });

  // This function => downloads the discription in the text file format
  const downloadDescriptionFunc = (): void => {
    const descString = props.city.shortDescription;
    const filename = 'description.txt';
    const element = document.createElement('a');
    const file = new Blob([descString], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  useEffect(() => {
    if (innerString.__html === "") {
      fetch('http://localhost:4567/api/weather/' + props.city.name)
        // eslint-disable-next-line @typescript-eslint/promise-function-async
        .then((response) => response.text())
        .then((weather) => {
          fetch('http://localhost:4567/api/xslt/weather.xslt')
            // eslint-disable-next-line @typescript-eslint/promise-function-async
            .then((response) => response.text())
            .then((xslt) => {
              const xsltProcessor = new XSLTProcessor();
              xsltProcessor.importStylesheet(new DOMParser().parseFromString(xslt, "application/xml"));
              const res = xsltProcessor.transformToDocument(new DOMParser().parseFromString(weather, "application/xml"))
              setString({ __html: res.documentElement.innerHTML });
            })
            .catch((error) => {
              console.error('Error occurred while searching:', error);
            });
        })
        .catch((error) => {
          console.error('Error occurred while searching:', error);
        });
    }
  }, [innerString])

  return (
    <>
      <Marker key={`${props.city.name} original`} position={{ lat: props.city.lat, lng: props.city.lng }}>
        <Popup>
          <svg dangerouslySetInnerHTML={innerString} width="100%" viewBox="0 0 390 200" />
          <Typography>
            {props.city.shortDescription}
          </Typography>
          <Button size='small' variant='contained' color='primary' onClick={downloadDescriptionFunc} >Download description</Button>
        </Popup>
      </Marker>
      {[-4, -3, -2, -1, 1, 2, 3, 4].map((offset) =>
        <Marker key={`${props.city.name} ${offset}`} position={{ lat: props.city.lat, lng: props.city.lng + (offset * 360) }}>
          <Popup>
            <Typography>
              <svg dangerouslySetInnerHTML={innerString} />
              {props.city.shortDescription}
            </Typography>
            <Button size='small' variant='contained' color='primary' onClick={downloadDescriptionFunc} >Download description</Button>
          </Popup>
        </Marker>
      )}
    </>
  );
}
