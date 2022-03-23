import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {loadUser} from "../../redux/slices/auth";
import {showWaiting} from "../../redux/slices/loading";

export const AuthSync = ({children}: any) => {
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.user);
    useEffect(() => {
        if (authState.isAuthenticated) {
            dispatch(loadUser());
        }
    }, [dispatch, authState.isAuthenticated]);
    return children;
}