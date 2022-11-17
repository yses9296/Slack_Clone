import React, { FC, useCallback } from 'react';
import Modal from '@components/Modal';
import { Button, Input, Label } from '@pages/SignUp/style';
import useInput from '@hooks/useInput';

interface Props {
    show: boolean;
    onCloseModal: (e: any) => void,
    setShowCreateChannelModal: (flag: boolean) => void;
}

const CreateChannelModal: FC<Props> = ({ show, onCloseModal }) => {

    const [newChannel, onChangeNewChannel] = useInput('')
    const onCreateChannel = useCallback( () => {}
    , [] )

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