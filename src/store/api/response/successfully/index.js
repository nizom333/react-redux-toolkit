export const setSuccessfully = (state, action) => {
    state.status = 'resolved';
    state.todosSliceStore = action.payload;
}