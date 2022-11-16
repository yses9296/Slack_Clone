import axios from 'axios';
import React, { FC, useCallback } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import loadable from '@loadable/component';
import gravatar from 'gravatar'
import { Header, RightMenu, ProfileImg, WorkspaceWrapper, Workspaces, Channels, Chats, WorkspaceName, MenuScroll } from './style'


const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

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
            <Header>
                <RightMenu>
                    <span>
                        <ProfileImg src={gravatar.url(data.email, { s: '28px', d: 'retro'})} alt={data.email}/>
                    </span>
                </RightMenu>
            </Header>


            <button onClick={onLogout}>Logout</button>

            <WorkspaceWrapper>
                <Workspaces>Workspaces</Workspaces>
                <Channels>Channels
                    <WorkspaceName>WorkspaceName</WorkspaceName>
                    <MenuScroll>MenuScroll</MenuScroll>
                </Channels>
                <Chats>
                    <Routes>
                        <Route path="/workspace/channel" element={<Channel/>}></Route>
                        <Route path="/workspace/DirectMessage" element={<DirectMessage/>}></Route>
                    </Routes>
                </Chats>
            </WorkspaceWrapper>

            {/* {children} */}
        </div>

    )
}

export default Workspace