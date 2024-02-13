import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    getAllContact: (state) => {
      if (typeof window != undefined) {
        const data = JSON.parse(localStorage.getItem("phonebook")) ?? [];
        state.contacts = data;
      }
    },
    addContact: ({ contacts }, action) => {
      contacts.push(action.payload);
      localStorage.setItem("phonebook", JSON.stringify([...contacts]));
    },
    deleteContact: ({ contacts }, action) => {
      const idx = contacts.findIndex((list) => list.id == action.payload);
      if (idx != -1) {
        contacts.splice(idx, 1);
        localStorage.setItem("phonebook", JSON.stringify(contacts));
      }
    },
    editContact: ({ contacts }, { payload }) => {
      const idx = contacts.findIndex((list) => list.id == payload.id);
      if (idx > -1) {
        contacts[idx] = payload.data;
      }
      localStorage.setItem("phonebook", JSON.stringify(contacts));
    },
  },
});

export const { addContact, deleteContact, getAllContact, editContact } =
  contactSlice.actions;
export default contactSlice.reducer;
