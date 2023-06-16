import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useGetMediaImage } from '../api.generated';
import { CardActions, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';

export default function MediaCard(props: {
  name: string;
}): React.ReactElement<{ name: string }> {
  const { data, loading } = useGetMediaImage({ place: props.name });

  return (
    <>
      <Card variant='outlined'>
        {
          loading ? <CircularProgress /> :
            <CardMedia
              sx={{ height: 140 }}
              image={(data != null) ? data.source : 'logo512.png'}
              title='green iguana'
            />}
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {props.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>Share</Button>
          <Button size='small'>Learn More</Button>
        </CardActions>
      </Card>
    </>
  );
}
