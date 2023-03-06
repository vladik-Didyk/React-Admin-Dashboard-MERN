import { createSlice } from "@reduxjs/toolkit";

// Set the initial state for the "global" Redux state slice
const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

// Create a new slice of the Redux store called "global" with a "setMode" reducer
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // Define a "setMode" reducer that toggles between "dark" and "light" mode
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

// Export the "setMode" action creator and the "global" reducer
export const { setMode } = globalSlice.actions;
export default globalSlice.reducer;


/*
The above code sets up a new Redux slice called global with a setMode reducer that toggles between dark and light mode.

Import the createSlice function from @reduxjs/toolkit for creating a new Redux slice.
Set the initial state for the global slice, which includes a mode property with a default value of dark and a userId property with a default value of "63701cc1f03239b7f700000e".
Define a new slice of the Redux store called global using the createSlice function. The slice includes a name property of "global", an initialState property with the initial state of the slice, and a reducers property with the setMode reducer.
Define the setMode reducer as a function that takes the current state as an argument and toggles the value of the mode property between dark and light.
Export the setMode action creator and the global reducer using export const { setMode } = globalSlice.actions and export default globalSlice.reducer, respectively.
The setMode action creator can then be dispatched from a React component using the useDispatch hook provided by React Redux,
*/