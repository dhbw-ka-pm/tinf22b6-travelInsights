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
  const cityName = props.city.name;
  const cityDescription = props.city.shortDescription;

  // Extract the weather data
  const weatherDataRegex = /<text xmlns="http:\/\/www.w3.org\/2000\/svg" x="(\d+)" y="30" font-size="16">(\d{4}-\d{2}-\d{2})<\/text>[\s\S]*?<text xmlns="http:\/\/www.w3.org\/2000\/svg" x="\1" y="160" font-size="14" fill="red">Max\.: (\d+\.\d+)°C<\/text>[\s\S]*?<text xmlns="http:\/\/www.w3.org\/2000\/svg" x="\1" y="180" font-size="14" fill="#272a53">Min\.: (\d+\.\d+)°C<\/text>/g;
  let weatherDataMatch;
  const weatherData = [];
  while ((weatherDataMatch = weatherDataRegex.exec(innerString.__html)) !== null) {
    weatherData.push({
      date: weatherDataMatch[2],
      high: weatherDataMatch[3],
      low: weatherDataMatch[4]
    });
  }

  // Generate new XML
    const newXml =
        `<traveldestination>
            <Name>${cityName}</Name>
            <Description>${cityDescription}</Description>
            <Weather>
                ${weatherData.slice(0, 3).map(day =>
                `<Day date="${day.date}">
                    <High>${day.high}</High>
                    <Low>${day.low}</Low>
                </Day>`
                ).join('\n')}
            </Weather>
        </traveldestination>`;


  // Download the new XML
  const filename = 'description.xml';
  const element = document.createElement('a');
  const file = new Blob([newXml], { type: 'application/xml' });
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