import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  CardActions,
  Collapse,
  IconButton,
  type IconButtonProps,
  styled
} from '@mui/material';
import { type City } from '../api.generated';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { useState } from 'react';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default function MediaCard(props: {
  city: City;
}): React.ReactElement {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  return (
    <Card variant='outlined'>
      <CardMedia
        sx={{ height: 180 }}
        image={props.city.imageSrc}
        title={'image of ' + props.city.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.city.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {props.city.shortDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreOutlined />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {props.city.longDescription}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
