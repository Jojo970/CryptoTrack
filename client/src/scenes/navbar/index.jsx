import { useState } from "react";
import { 
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  DarkMode,
  LightMode,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setMode } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  const theme = useTheme();
  const dark = theme.palette.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;


  return (
    <FlexBetween padding ="1rem 6%" backgroundColor = {alt}>
      <FlexBetween gap="1.75rem">
        <Typography 
          fontWeight = "bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color = "primary"
          onClick={() => navigate(`/crypto-by-user/${user}`)}
          sx = {{
            "&:hover": {
              color:primaryLight,
              cursor: "pointer"
            }
          }}
            >
            CryptoWatcher
          </Typography>
      </FlexBetween>

        {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx ={{ fontSize: '25px' }}/>
            ): (
              <LightMode sx ={{ color: dark, fontSize: '25px' }}/>
            )}
          </IconButton>
          <IconButton onClick={() => {
                navigate(`/add/${user}`);
                }}>
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
          <IconButton onClick={() => {
                navigate("/")
                }}>
                  <ExitToAppOutlinedIcon />
                </IconButton>
        </FlexBetween>
        ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>)}

        {/* Mobile Navigation */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height= "100%"
            zIndex= "10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor= {background}
          >
            {/* Close icon */}
            <Box display="flex" justifyContent="flex-end" p = "1rem">
              <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                <Close />
              </IconButton>
            </Box>

            {/* Menu */}

            <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx ={{ fontSize: '25px' }}/>
            ): (
              <LightMode sx ={{ color: dark, fontSize: '25px' }}/>
            )}
          </IconButton>
          
          
              <IconButton onClick={() => {
                navigate("/")
                dispatch(setLogout())
                }}>
                  <ExitToAppOutlinedIcon />
                </IconButton>
            
          
        </FlexBetween>
          </Box>
        )}
    </FlexBetween>
  )
}

export default Navbar