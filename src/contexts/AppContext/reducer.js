const initialState = {
    loading: true,
    page: 'form',
    formValues: {
        name: '',
        age: '',
        children: []
    }
};

const handlers = {
    INITIALIZE: (state, action) => {
        return {
            ...state,
            loading: false,
            formValues: {...state.formValues, ...action.payload}
        };
    },
    PAGE: (state, action) => {
        return {
            ...state,
            page: action.payload
        };
    },
    SAVE: (state, action) => {
        return {
            ...state,
            formValues: action.payload
        };
    },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

export {initialState}

export default reducer