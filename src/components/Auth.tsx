import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";
import styled from "@emotion/styled";

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

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleAuth = async () => {
    const endpoint = isLogin ? "/users/login" : "/users/register";
    try {
      const response = await axios.post(endpoint, { username, password });
      localStorage.setItem("token", response.data.token);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Typography variant="h4" gutterBottom>
          {isLogin ? "Login" : "Register"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
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
              onClick={handleAuth}
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
    </Container>
  );
};

export default Auth;
