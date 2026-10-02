import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { isOpen: false, description: '',color: '',confirmAction: null},
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.description = action.payload.description; // Set the description from the payload
      state.color = action.payload.color
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.description = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;