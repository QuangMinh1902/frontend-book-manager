import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
  type: string;
}

type SearchPayload = Partial<SearchState>;

const initialState: SearchState = {
  query: "",
  type: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<SearchPayload>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
