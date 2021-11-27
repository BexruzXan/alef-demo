import {createContext, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import reducer, {initialState} from "./reducer";

const AppContext = createContext({
    ...initialState,
    setPage: () => Promise.resolve(),
    saveData: () => Promise.resolve(),
});

function AppProvider({children, spinner}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        const initialize = async () => {
            try {
                const data = localStorage.getItem('formValues');
                // await new Promise(resolve => setTimeout(resolve, 5000)) // loading spinner test
                dispatch({type: 'INITIALIZE', payload: JSON.parse(data)});
            } catch (err) {
                console.error(err);
            }
        };

        initialize();
    }, []);


    const setPage = page => {
        dispatch({type: 'PAGE', payload: page});
    };
    const saveData = (values) => {
        localStorage.setItem('formValues', JSON.stringify(values))
        dispatch({type: 'SAVE', payload: values})
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                setPage,
                saveData
            }}
        >
            {state.loading ? spinner : children}
        </AppContext.Provider>
    );
}

AppProvider.propTypes = {
    children: PropTypes.node,
    spinner: PropTypes.node,
}
export {AppContext, AppProvider};
