import axios from 'axios';
import React, { VFC, useCallback, useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import loadable from '@loadable/component';
import gravatar from 'gravatar'
import { toast } from 'react-toastify';
import { Header, RightMenu, ProfileImg, WorkspaceWrapper, Workspaces, Channels, Chats, WorkspaceName, MenuScroll, ProfileModal, LogOutButton, WorkspaceButton, AddButton, WorkspaceModal } from './style';
import Menu from '@components/Menu';

import { IUser } from '@typings/db';
import { Button, Input, Label } from '@pages/SignUp/style';
import useInput from '@hooks/useInput';
import Modal from '@components/Modal';
import CreateChannelModal from '@components/CreateChannelModal';


const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: VFC = () => {
    const {data: userData, error, mutate} = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher)

    const [showUserMenu, setShowUserMenu] = useState(false)
    const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
    const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
    const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
    const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

    const onLogout = useCallback( () => {
        axios.post('/api/users/logout', null , {withCredentials: true})
        .then( (response) => {
            mutate()
        } )
    }, [])

    const onClickUserProfile = useCallback(() => {
        setShowUserMenu( (prev) => !prev )
    },[])
    const onCloseUserProfile = useCallback( (e:any) => {
        e.stopPropagation();
        setShowUserMenu(false)
    },[])

    const onClickCreateWorkspace = useCallback( () => {
        setShowCreateWorkspaceModal(true)
    },[])

    const onCreateWorkspace = useCallback( (e:any) => {
        e.preventDefault();
        if(!newWorkspace || !newWorkspace.trim()) return;
        if(!newUrl || !newUrl.trim()) return;

        axios.post('/api/workspaces', {workspace: newWorkspace, url: newUrl}, {withCredentials: true})
        .then( (response) => {
            mutate();
            setShowCreateWorkspaceModal(false);
            setNewWorkspace('');
            setNewUrl('')
        })
        .catch( (err) => {
            console.dir(error);
            toast.error(error.response?.data, { position: 'bottom-center' });
        })
    }, [newWorkspace, newUrl])
    
    const onCloseModal = useCallback( (e:any) => {
        e.stopPropagation();
        setShowCreateWorkspaceModal(false);
        setShowCreateChannelModal(false);
    }, [])

    const toggleWorkspaceModal = useCallback( () => {
        setShowWorkspaceModal((prev) => !prev);
    }, [])

    const onClickAddChannel = useCallback( ()=>{
        setShowCreateChannelModal(true);
    },[])


    if(!userData){
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span onClick={onClickUserProfile}>
                        <ProfileImg src={gravatar.url(userData.email, { s: '28px', d: 'retro'})} alt={userData.email}/>
                        {showUserMenu && (
                            <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onCloseUserProfile}>
                                <ProfileModal>
                                    <img src={gravatar.url(userData.email, { s: '28px', d: 'retro'})} alt={userData.email} />
                                    <div>
                                        <span id="profile-name">{userData.email}</span>
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
                <Workspaces>
                    {userData?.Workspaces.map( (ws) => {
                        return(
                            <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
                                <WorkspaceButton> {ws.name.slice(0,1).toUpperCase()} </WorkspaceButton>
                            </Link>
                        )
                    })}
                    <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
                </Workspaces>

                <Channels>Channels
                    <WorkspaceName onClick={toggleWorkspaceModal}>
                        WorkspaceName
                        {/* {userData?.Workspaces.find(v) => v.url === workspace} */}
                    </WorkspaceName>
                    <MenuScroll>
                        <Menu style={{ top: 95, left: 80 }} show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal}>
                            <WorkspaceModal>
                                <h2>Slact</h2>
                                <button onClick={onClickAddChannel}>채널 만들기</button>
                                <button onClick={onLogout}>로그아웃</button>
                            </WorkspaceModal>
                        </Menu>
                    </MenuScroll>
                </Channels>
                <Chats>
                    <Routes>
                        <Route path="/workspace/channel" element={<Channel/>}></Route>
                        <Route path="/workspace/DirectMessage" element={<DirectMessage/>}></Route>
                    </Routes>
                </Chats>
            </WorkspaceWrapper>

{/* POPUP */}
            <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
                <form onSubmit={onCreateWorkspace}>
                    <Label id="workspace-label">
                        <span>워크스페이스 이름</span>
                        <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace}></Input>
                    </Label>
                    <Label id="workspace-url-label">
                        <span>워크스페이스 url</span>
                        <Input id="workspace" value={newUrl} onChange={onChangeNewUrl}></Input>
                    </Label>
                    <Button type="submit">생성하기</Button>
                </form>
            </Modal>

            <CreateChannelModal 
                show={showCreateChannelModal} 
                onCloseModal={onCloseModal} 
                setShowCreateChannelModal={setShowCreateChannelModal}
            />
            
        </div>

    )
}

export default Workspace