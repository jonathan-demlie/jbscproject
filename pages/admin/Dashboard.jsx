import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom'
import GroupIcon from '@mui/icons-material/Group';
import Users from './Users';
import Subjects from './Subjects';
import SubjectIcon from '@mui/icons-material/Subject';
import ReportIcon from '@mui/icons-material/Report';
import Reports from './Reports';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice'
import { reset as eduReset} from '../../features/education/educationSlice'
import { reset as proReset } from '../../features/profile/profileSlice'
import { reset as aboutReset} from '../../features/about/aboutSlice'
import AddIcon from '@mui/icons-material/Add';
import AddSubject from './AddSubject';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedDash,setSelectedDash]=React.useState('users')

  const navigate=useNavigate();
  const navToHome=()=>{
    navigate('/')
  }
  const changeSelected =(name)=>{
    setSelectedDash(name);
    console.log(selectedDash);
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch=useDispatch()
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    dispatch(eduReset())
    dispatch(proReset())
    dispatch(aboutReset())
    navigate('/')
  }
  return (
    <div>
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem button onClick={navToHome}> 
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
            <ListItem button onClick={()=>changeSelected('users')}>
              <ListItemIcon><GroupIcon/></ListItemIcon>
              <ListItemText>Users</ListItemText>
            </ListItem>
            <ListItem button onClick={()=>changeSelected('subjects')}>
              <ListItemIcon><SubjectIcon /></ListItemIcon>
              <ListItemText>Subjects</ListItemText>
            </ListItem>
            <ListItem button onClick={()=>changeSelected('create')}>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText>Add Subject</ListItemText>
            </ListItem>
            <ListItem button onClick={()=>changeSelected('reports')}>
              <ListItemIcon><ReportIcon /></ListItemIcon>
              <ListItemText>Reports</ListItemText>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={onLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <>{selectedDash==='users'&&<Users/>}</>
          <>{selectedDash==='subjects'&&<Subjects/>}</>
          <>{selectedDash==='reports'&&<Reports/>}</>
          <>{selectedDash==='create'&&<AddSubject/>}</>
        </Main>
      </Box>
    </div>
  )
}

