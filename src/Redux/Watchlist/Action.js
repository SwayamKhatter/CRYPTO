import * as types from './ActionTypes';
import api from '@/Api/api';

// Action Creators
export const getUserWatchlist = () => async (dispatch) => {
  dispatch({ type: types.GET_USER_WATCHLIST_REQUEST });

  try {
    const response = await api.get('/api/watchlist/user');

    dispatch({
      type: types.GET_USER_WATCHLIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_USER_WATCHLIST_FAILURE,
      error: error.message,
    });
  }
};





export const addItemToWatchlist = (coinId, token) => async (dispatch) => {
  console.log("Received Token:", token); // Log the token to check if it's correct

  dispatch({ type: types.ADD_COIN_TO_WATCHLIST_REQUEST });

  try {
    const response = await api.patch(
      `/api/watchlist/add/coin/${coinId}`,
      {}, // Body can be empty for a PATCH request
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: types.ADD_COIN_TO_WATCHLIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log("Error adding to watchlist:", error);
    console.log("Error details:", error.response?.data || error.message); // Log full error details for debugging

    dispatch({
      type: types.ADD_COIN_TO_WATCHLIST_FAILURE,
      error: error.response?.data?.message || error.message,
    });
  }
};
