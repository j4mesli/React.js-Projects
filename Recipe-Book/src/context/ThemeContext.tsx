import { createContext, useReducer } from "react";

export const ThemeContext = createContext<any>(undefined);

const themeReducer = (state: any, action: { type: string, payload: string }) => {
    switch (action.type) {
        case 'CHANGE_COLOR': 
            return { ...state, color: action.payload };
        case 'CHANGE_MODE':
            return { ...state, mode: action.payload };
        default:
            return state;
    }
}

export const ThemeProvider = ({ children }: any) => {
    // THESE VALUES ARE ALSO EXPORTED FROM THE FILE, 
    // ABLE TO ACCESS THESE TO SEE IF COLOR BLUE CHANGE TO SMTH SPECIFIC
    const [state, dispatch] = useReducer(themeReducer, { color: 'blue', mode: 'dark' });

    const changeColor = (color: string) => {
        // this IS THE DISPATCH OBJECT, WITH TYPE AND PAYLOAD (WHATS CHANGING AND WHAT ELEM ITS CHANGING TO)
        dispatch({ type: 'CHANGE_COLOR', payload: color })
    }

    const changeMode = (mode: string) => {
        // this IS THE DISPATCH OBJECT, WITH TYPE AND PAYLOAD (WHATS CHANGING AND WHAT ELEM ITS CHANGING TO)
        dispatch({ type: 'CHANGE_MODE', payload: mode });
    }

    return (
        <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
            { children }
        </ThemeContext.Provider>
    );
}