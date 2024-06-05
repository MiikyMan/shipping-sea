import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import SendIcon from '@mui/icons-material/Send';
import LinkIcon from '@mui/icons-material/Link';
import IosShareIcon from '@mui/icons-material/IosShare';
import XIcon from '@mui/icons-material/X';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
  },
}));

const actions = [
    { icon: <LinkIcon />, name: 'Copy link' },
    { icon: <SendIcon />, name: 'Send to chat' },
    { icon: <InstagramIcon />, name: 'Share to Instargram' },
    { icon: <FacebookIcon />, name: 'Share to Facebook' },
    { icon: <XIcon />, name: 'Share to X' },
];

export default function ControlledOpenSpeedDial() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    
    <Box sx={{transform: 'translateZ(0px)', flexGrow: 1 }}>
    <SpeedDial
        ariaLabel="Share SpeedDial"
        sx={{ position: 'absolute', right: 0 }}
        icon={<IosShareIcon sx={{color: "#000000"}} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="down"
        FabProps={{
            sx: {
              bgcolor: '#ffffff',
              '&:hover': {
                bgcolor: '#eeeeee',
              }
            },
            size: "small"
          }}

    >
      {actions.map((action) => (
        <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
        />
      ))}
    </SpeedDial>
  </Box>
  );
}