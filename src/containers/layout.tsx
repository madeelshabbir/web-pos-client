import { FC } from 'react';
import { ContainerProps } from '../types/interfaces/container-props';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useAuth } from '../hooks/use-auth';

const Layout: FC<ContainerProps> = ({ children }) => {
  const { logout, user } = useAuth();

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">
            Web POS
          </Typography>
          { !Object.keys(user).length || <Button color="inherit" onClick={logout}>Logout</Button> }
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default Layout;
