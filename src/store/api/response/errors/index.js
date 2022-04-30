export const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}