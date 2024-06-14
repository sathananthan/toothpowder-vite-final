/*eslint-disable*/
import React, { useReducer, createContext, useContext } from 'react'

export const StateContext = createContext()

const StateProvider = ({ reducer, initialstate, children }) => {       // or use straight () without return
    return (
    <StateContext.Provider value={ useReducer(reducer, initialstate) }>
        {children}
    </StateContext.Provider>
)}

export const useStateValue = () => useContext(StateContext)

export default StateProvider
