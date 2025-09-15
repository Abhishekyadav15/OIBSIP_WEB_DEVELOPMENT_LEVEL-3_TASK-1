import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_SERVER_URL}/pizzas`;

// Helper function to get token
const getAuthToken = (getState, isAdmin = false) => {
  const {
    admin: { adminUserInfo },
    user: { userInfo },
  } = getState();

  if (isAdmin) return adminUserInfo?.token;
  return adminUserInfo?.token || userInfo?.token;
};

// Create Pizza
export const createPizza = createAsyncThunk(
  'pizza/createPizza',
  async (pizzaData, { rejectWithValue, getState }) => {
    try {
      const token = getAuthToken(getState);
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.post(API_URL, pizzaData, config);
      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });
    }
  }
);

// Fetch All Pizzas
export const listPizzas = createAsyncThunk(
  'pizza/listPizzas',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API_URL, {
        headers: { 'Cache-Control': 'no-cache' }, // prevent caching
      });
      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });
    }
  }
);

// Fetch Single Pizza
export const getPizzaById = createAsyncThunk(
  'pizza/getPizzaById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });
    }
  }
);

// Update Pizza By Id
export const updatePizzaById = createAsyncThunk(
  'pizza/updatePizzaById',
  async (pizzaData, { rejectWithValue, getState }) => {
    try {
      const token = getAuthToken(getState, true); // admin only
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.put(`${API_URL}/${pizzaData.id}`, pizzaData, config);
      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });
    }
  }
);

// Delete Pizza By Id
export const deletePizzaById = createAsyncThunk(
  'pizza/deletePizzaById',
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getAuthToken(getState, true); // admin only
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.delete(`${API_URL}/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });
    }
  }
);
