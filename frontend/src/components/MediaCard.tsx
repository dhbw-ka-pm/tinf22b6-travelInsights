import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions, CircularProgress, Collapse, IconButton, type IconButtonProps, styled } from '@mui/material';
import { useGetCardImage, useGetCardInformation } from '../api.generated';
import { ExpandMoreOutlined } from '@mui/icons-material';

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
  name: string;
}): React.ReactElement<{ name: string }> {
  const { data: cardImage, loading: imageLoading } = useGetCardImage({ place: props.name });
  const { data: cardData, loading: dataLoading } = useGetCardInformation({ place: props.name });

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card variant='outlined'>
        {
          imageLoading ? <CircularProgress /> :
            <CardMedia
              sx={{ height: 180 }}
              image={(cardImage != null) ? cardImage.source : 'logo512.png'}
              title={'image of ' + props.name}
            />}
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {props.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Some very useful short text about the city. This definitely needs to be changed to a shorter version of the wikipedia article
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
            {dataLoading ? <CircularProgress /> :
              <Typography variant='body2' color='text.secondary'>
                {(cardData != null) ? cardData.extract : 'Text Missing'}
              </Typography>
            }
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
