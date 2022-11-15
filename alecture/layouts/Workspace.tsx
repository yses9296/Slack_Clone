import axios from 'axios';
import React, { FC, useCallback } from 'react'
import { Navigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher'

const Workspace: FC<React.PropsWithChildren<{}>> = ({children}) => {
    const {data, error, mutate} = useSWR('http://localhost:3095/api/users', fetcher)

    const onLogout = useCallback( () => {
        axios.post('/api/users/logout', null , {withCredentials: true})
        .then( (response) => {
            mutate()
        } )
    }
    , [])

    if(!data){
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <button onClick={onLogout}>Logout</button>
            {children}
        </div>

    )
}

export default Workspace