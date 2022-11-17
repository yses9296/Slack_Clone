import React, { FC, useCallback } from 'react';
import axios from 'axios';
import Modal from '@components/Modal';
import { Button, Input, Label } from '@pages/SignUp/style';
import useInput from '@hooks/useInput';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';


interface Props {
    show: boolean;
    onCloseModal: (e: any) => void,
    setShowCreateChannelModal: (flag: boolean) => void;
}

const CreateChannelModal: FC<Props> = ({ show, onCloseModal, setShowCreateChannelModal }) => {
    
    const [newChannel, onChangeNewChannel, setNewChannel] = useInput('')
    const { workspace, channel } = useParams<{workspace: string; channel: string}>()

    const {data: userData, error } = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher)
    const { data: channelData, mutate } = useSWR<IChannel[]>(
        userData ? `/api/workspaces/${workspace}/channels` : null,
        fetcher,
      );

    const onCreateChannel = useCallback( (e:any) => {
        e.preventDefault();
        axios.post(`/api/workspaces/${workspace}/channels`, {name: newChannel}, {withCredentials: true})
        .then( () => {
            setShowCreateChannelModal(false);
            setNewChannel('')
            mutate();
        })
        .catch( (err) => {
            console.dir(err);
            toast.error(err.response?.data, { position: 'bottom-center' })
        })
    }
    , [newChannel] )

    return (
        <Modal show={show} onCloseModal={onCloseModal}>
            <form onSubmit={onCreateChannel}>
                <Label id="workspace-label">
                    <span>채널</span>
                    <Input id="channel" value={newChannel} onChange={onChangeNewChannel}></Input>
                </Label>
                <Button type="submit">생성하기</Button>
            </form>
        </Modal>
    )
}

export default CreateChannelModal