const fetchAPI = {
    pending: true,
    success: null,
    error: null
}

const fetchReducer = (state = fetchAPI, action) => {
    switch (action.type) {
        case "FETCH_PENDING":
            return Object.assign({}, state, {
                pending: action.status
            });
        case "FETCH_SUCCESS":
            return Object.assign({}, state, {
                success: action.data
            });
        case "FETCH_ERROR":
            return Object.assign({}, state, {
                error: action.error
            });
        default:
            return state;
    };
};


export default fetchReducer;