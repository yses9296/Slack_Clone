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
  onCloseModal: (e: any) => void;
  setShowInviteWorkspaceModal: (flag: boolean) => void;
}

const InviteWorkspaceModal: FC<Props> = ({ show, onCloseModal, setShowInviteWorkspaceModal }) => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();
  const [newMember, onChangeNewMember, setNewMember] = useInput('');

  const { data: userData, error } = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher);
  const { mutate } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/members` : null, fetcher);

  const onInviteMember = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) {
        return;
      }
      axios
        .post(`/api/workspaces/${workspace}/members`, { email: newMember }, { withCredentials: true })
        .then((response) => {
          setShowInviteWorkspaceModal(false);
          setNewMember('');
          mutate();
        })
        .catch((err) => {
          console.dir(err);
          toast.error(err.response?.data, { position: 'bottom-center' });
        });
    },
    [workspace, newMember],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="workspace-label">
          <span>이메일</span>
          <Input id="member" value={newMember} onChange={onChangeNewMember}></Input>
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;
