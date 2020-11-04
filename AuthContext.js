import React, { useState, createContext, useContext } from 'react';
import AsyncStorage from "@react-native-community/async-storage";

// Login & Logout을 모든 APP Navigation에서 확인

//context --> object, useContext를 사용해서 어디에서든 접근 가능
export const AuthContext = createContext();

export const AuthProvider = ({isLoggedIn:isLoggedInProp,children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
    const logUserIn = async () => {
        try{
            await AsyncStorage.setItem("isLoggedIn","true");
            setIsLoggedIn(true);
        }catch(e){
            console.log(e);
        }
    };

    const logUserOut = async () => {
        try{
            await AsyncStorage.setItem("isLoggedIn","false");
            setIsLoggedIn(false);
        }catch(e){
            console.log(e);
        }
    };    

    return (
        <AuthContext.Provider value={{isLoggedIn, logUserIn, logUserOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useIsLoggedIn = () => {
    const {isLoggedIn} = useContext(AuthContext);
    return isLoggedIn;
};

export const useLogIn = () => {
    const {logUserIn} = useContext(AuthContext);
    return logUserIn;
};

export const useLogOut = () => {
    const {logUserOut} = useContext(AuthContext);
    return logUserOut;
};