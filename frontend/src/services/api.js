import axios from 'axios';

// The base URL for your FastAPI backend
const baseUrl = 'http://localhost:8000';  // Change to backend URL if needed

// Create an instance of axios with the base URL
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the quote
export const getQuote = async () => {
  try {
    const response = await api.get('/quote');
    return response.data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
};

// Function to get the Python tip
export const getPythonTip = async () => {
  try {
    const response = await api.get('/python-tip');
    return response.data;
  } catch (error) {
    console.error('Error fetching Python tip:', error);
    throw error;
  }
};

// Function to convert units
export const convertUnits = async (data) => {
  try {
    const response = await api.post('/convert-units', data);
    return response.data;
  } catch (error) {
    console.error('Error converting units:', error);
    throw error;
  }
};

// Function to convert currency
export const convertCurrency = async (data) => {
  try {
    const response = await api.post('/convert-currency', data);
    return response.data;
  } catch (error) {
    console.error('Error converting currency:', error);
    throw error;
  }
};

// Function to make a Tic-Tac-Toe move
export const makeTicTacToeMove = async (board, player) => {
try {
    const response = await api.post('/tic-tac-toe/move', {
    board,
    player
    });
    return response.data;
} catch (error) {
    console.error('Error making Tic-Tac-Toe move:', error);
    throw error;
}
};
  
