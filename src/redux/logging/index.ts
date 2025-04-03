import { createSlice } from "@reduxjs/toolkit";

type LoggingType = {
  logs: {
    type: "error" | "success";
    text: string;
  };
};

const initialState: LoggingType = {
  logs: {
    text: "",
    type: "success",
  },
};

const loggingSlice = createSlice({
  name: "logging",
  initialState,
  reducers: {
    removeLogs: (state) => {
      state.logs = {
        text: "",
        type: "success",
      };
    },
    addLogs: (state, { payload }) => {
      state.logs = payload;
    },
  },
});

export const { removeLogs, addLogs } = loggingSlice.actions;

export default loggingSlice.reducer;
