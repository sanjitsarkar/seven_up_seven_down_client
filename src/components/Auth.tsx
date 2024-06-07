import styled from "@emotion/styled";
import {
  Alert,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/users/login" : "/users/register";
    try {
      const response = await axios.post(endpoint, { username, password });
      localStorage.setItem("token", response.data.token);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "An error occurred. Please try again.",
        severity: "error",
      });
    }
  };
  return (
    <Container>
      <form onSubmit={handleAuth}>
        <FormWrapper>
          <Typography variant="h4" gutterBottom alignContent={"center"}>
            {isLogin ? "Login" : "Register"}
          </Typography>
          <Grid container spacing={2} xs={4}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                required
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                {isLogin ? "Login" : "Register"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="text"
                color="secondary"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Need to Register?" : "Already have an account?"}
              </Button>
            </Grid>
          </Grid>
        </FormWrapper>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={snackbar.open}
          onClose={handleClose}
          key={vertical + horizontal}
          autoHideDuration={6000}
        >
          <Alert
            onClose={handleClose}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </form>
    </Container>
  );
};

export default Auth;
