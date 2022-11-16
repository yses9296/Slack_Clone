import axios from 'axios';
import React, { FC, useCallback, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import loadable from '@loadable/component';
import gravatar from 'gravatar'
import { Header, RightMenu, ProfileImg, WorkspaceWrapper, Workspaces, Channels, Chats, WorkspaceName, MenuScroll, ProfileModal, LogOutButton } from './style'
import Menu from '@components/Menu';


const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: FC<React.PropsWithChildren<{}>> = ({children}) => {
    const {data, error, mutate} = useSWR('http://localhost:3095/api/users', fetcher)

    const [showUserMenu, setShowUserMenu] = useState(false)

    const onLogout = useCallback( () => {
        axios.post('/api/users/logout', null , {withCredentials: true})
        .then( (response) => {
            mutate()
        } )
    }
    , [])

    const onClickUserProfile = useCallback(() => {
        setShowUserMenu( (prev) => !prev )
    },[])
    const onCloseUserProfile = useCallback( (e:any) => {
        e.stopPropagation();
        setShowUserMenu(false)
    },[])


    if(!data){
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span onClick={onClickUserProfile}>
                        <ProfileImg src={gravatar.url(data.email, { s: '28px', d: 'retro'})} alt={data.email}/>
                        {showUserMenu && (
                            <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onCloseUserProfile}>
                                <ProfileModal>
                                    <img src={gravatar.url(data.email, { s: '28px', d: 'retro'})} alt={data.email} />
                                    <div>
                                        <span id="profile-name">{data.email}</span>
                                        <span id="profile-active">Active</span>
                                    </div>
                                </ProfileModal>
                                <LogOutButton onClick={onLogout}>Logout</LogOutButton>
                            </Menu>
                        )}
                    </span>
                </RightMenu>
            </Header>




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