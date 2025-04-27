import { createSlice } from '@reduxjs/toolkit';

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    newsItems: [],
  },
  reducers: {
    setNews: (state, action) => {
      state.newsItems = action.payload;
    },
  },
});

export const { setNews } = newsSlice.actions;
export default newsSlice.reducer;