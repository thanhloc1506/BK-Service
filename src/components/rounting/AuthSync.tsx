import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import cookies from "js-cookie";
import {loadEnterprise} from "../../redux/slices/auth";

export const AuthSync = ({children}: any) => {
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.user);
    useEffect(() => {
        if (cookies.get("token")) {
            dispatch(loadEnterprise());
        }
    }, [dispatch, authState.isAuthenticated]);
    return children;
}