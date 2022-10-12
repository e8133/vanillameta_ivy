import React, { useState } from 'react';
import { Button, IconButton, Menu, MenuItem, SvgIcon, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';

const menuWidth = 200;

const AddIconButton = ({ link = '', ...props }) => {
  return (
    <Button disableElevation component={RouterLink} to={link} color="primary" sx={{ minWidth: { xs: 0 } }} {...props}>
      <AddIcon sx={{ width: 28, height: 28, m: 0 }} />
    </Button>
  );
};

export default AddIconButton;

export const AddMenuButton = ({ menuList, label, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <React.Fragment>
      <Button
        id="styled-menu"
        aria-controls={open ? 'styled-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={matches ? <AddIcon /> : false}
        variant="outlined"
        sx={{ minWidth: { xs: 0 } }}
      >
        {matches ? label : <AddIcon />}
      </Button>
      <Menu id="styled-menu" anchorEl={anchorEl} open={open} onClose={handleClose} sx={{ width: menuWidth }}>
        {menuList.map(item => (
          <MenuItem
            key={item.name}
            component={RouterLink}
            to={item.link}
            onClick={handleClose}
            disableRipple
            sx={{ width: menuWidth }}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};
AddMenuButton.defaultProps = {
  menuList: {
    name: '',
    link: '',
  },
};

export const AddMenuIconButton = ({ menuList, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = item => {
    if (props.handleSelect) {
      props.handleSelect(item);
    }

    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button
        id="styled-menu"
        aria-controls={open ? 'styled-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="primary"
        sx={{ minWidth: { xs: 0 } }}
      >
        {<AddIcon />}
      </Button>
      <Menu id="styled-menu" anchorEl={anchorEl} open={open} onClose={handleClose} sx={{ width: menuWidth }}>
        {menuList.map(item => (
          <MenuItem key={item.name} onClick={() => handleClose(item)} disableRipple sx={{ width: menuWidth }}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};
AddMenuIconButton.defaultProps = {
  menuList: {
    name: '',
  },
};

export const SmallButton = props => {
  const { icon, ...rest } = props;

  return (
    <IconButton size="small" sx={{ width: '38px', height: '38px', flex: 'none' }} {...rest}>
      <SvgIcon fontSize="small">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          {icon}
        </svg>
      </SvgIcon>
    </IconButton>
  );
};

export const AddButton = props => {
  return (
    <SmallButton
      icon={
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
      }
      {...props}
    />
  );
};

export const RemoveButton = props => {
  return (
    <SmallButton
      icon={
        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
      }
      {...props}
    />
  );
};