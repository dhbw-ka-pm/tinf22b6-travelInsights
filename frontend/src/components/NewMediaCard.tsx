import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  CardActions,
  CircularProgress,
  Collapse,
  IconButton,
  type IconButtonProps,
  styled
} from '@mui/material';
import { useGetMediaCard } from '../api.generated';
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

export default function NewMediaCard(props: {
  name: string;
}): React.ReactElement<{ name: string }> {
  const { data, loading, error } = useGetMediaCard({ place: props.name });

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  return (
    <>
      {error?.status ?? (
        <Card variant="outlined">
          {loading ? (
            <CircularProgress />
          ) : (
            <CardMedia
              sx={{ height: 180 }}
              image={data?.imageUrl}
              title={'image of ' + props.name}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data?.description.short}
            </Typography>
          </CardContent>
          <CardActions>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreOutlined />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {loading ? (
                <CircularProgress />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {data?.description.long}
                </Typography>
              )}
            </CardContent>
          </Collapse>
        </Card>
      )}
    </>
  );
}
