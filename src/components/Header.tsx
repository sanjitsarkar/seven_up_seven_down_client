import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth", { replace: true });
  };

  return (
    <AppBar position="static" >
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          7 UP 7 DOWN Game
        </Typography>
        {isLoggedIn && (
          <span>
            <i>{user?.username}</i>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
