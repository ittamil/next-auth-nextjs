export const login = (username, password) => async (dispatch) => {
    try {
        const body = JSON.stringify({
            username,
            password
        });
        const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        const sss = await apiRes.json();
        const access_token = sss.access;
        const refresh_token = sss.refresh
        dispatch({ type: 'LOGIN_SUCCESS', payload: { access_token, refresh_token } });
    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', payload: error.response.data.error });
    }
};

export const logout = () => {
    return { type: 'LOGOUT' };
};
