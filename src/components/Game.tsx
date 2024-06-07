import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePoints } from "../redux/pointsSlice";
import axios from "../utils/axios";
import {
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { fetchUser } from "../redux/userSlice";

const rollAnimation = keyframes`
  0% { transform: rotate(0); }
  25% { transform: rotate(90deg); }
  50% { transform: rotate(180deg); }
  75% { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
`;

const Dice = styled.div`
  display: inline-block;
  font-size: 2rem;
  margin: 0 10px;
  animation: ${(props) =>
    props.animate ? `${rollAnimation} 0.5s ease-in-out` : "none"};
`;

const Game = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { points } = useSelector((state) => state.points);
  const [bet, setBet] = useState(100);
  const [choice, setChoice] = useState("7down");
  const [dice, setDice] = useState([]);
  const [message, setMessage] = useState("");
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?.points) {
      dispatch(updatePoints(user.points));
    }
  }, [user, dispatch]);

  const handleBetChange = (event) => {
    setBet(event.target.value);
  };

  const handleChoiceChange = (event) => {
    setChoice(event.target.value);
  };

  const handleRoll = async () => {
    setRolling(true);
    setDice([]);
    try {
      const response = await axios.post("/game/roll", { bet, choice });
      setTimeout(() => {
        setDice(response.data.dice);
        dispatch(updatePoints(response.data.newPoints));
        const resultMessage = calculateResultMessage(response.data.dice);
        setMessage(resultMessage);
        setRolling(false);
      }, 500);
    } catch (err) {
      console.error(err);
      setMessage("An error occurred. Please try again.");
      setRolling(false);
    }
  };

  const calculateResultMessage = (dice: number[]) => {
    const sum = dice[0] + dice[1];
    if (sum < 7 && choice === "7down") return "You won! Double your bet!";
    if (sum > 7 && choice === "7up") return "You won! Double your bet!";
    if (sum === 7 && choice === "7") return "Lucky 7! Five times your bet!";
    return "You lost the bet.";
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">7 UP 7 DOWN Game</Typography>
      <Typography variant="h6">Points: {points || 5000}</Typography>
      <Grid
        container
        spacing={2}
        style={{ marginTop: 20, color: "white !important" }}
      >
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Bet Amount</InputLabel>
            <Select value={bet} onChange={handleBetChange}>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={200}>200</MenuItem>
              <MenuItem value={500}>500</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Choice</InputLabel>
            <Select value={choice} onChange={handleChoiceChange}>
              <MenuItem value={"7down"}>7 Down</MenuItem>
              <MenuItem value={"7up"}>7 Up</MenuItem>
              <MenuItem value={"7"}>Lucky 7</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRoll}
            disabled={rolling}
          >
            {rolling ? "Rolling..." : "Roll Dice"}
          </Button>
        </Grid>
      </Grid>
      {dice.length > 0 && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Dice animate={rolling}>{dice[0]}</Dice>
          <Dice animate={rolling}>{dice[1]}</Dice>
          <Typography variant="h6">{message}</Typography>
        </div>
      )}
    </div>
  );
};

export default Game;
