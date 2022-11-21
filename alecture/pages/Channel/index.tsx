import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import { Container, Header } from '@pages/DirectMessage/styles';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useCallback } from 'react';

import { useParams } from 'react-router';
import useSWR from 'swr';

const Channel = () => {
  const { workspace, channel } = useParams<{
    workspace: string;
    channel: string;
  }>();
  const { data: myData, error, mutate } = useSWR<IUser | false>('/api/users', fetcher);
  const { data: channelData } = useSWR<IChannel>(`/api/workspaces/${workspace}/channels/${channel}`, fetcher);

  const [chat, onChangeChat] = useInput('');
  const onSubmitForm = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  if (!myData) {
    return null;
  }

  return (
    <Container>
      <Header>
        <span>#{channel}</span>
        <div className="header-right">
          {/* <span>{channelMembersData?.length}</span> */}
          <button
            // onClick={onClickInviteChannel}
            className="c-button-unstyled p-ia__view_header__button"
            aria-label="Add people to #react-native"
            data-sk="tooltip_parent"
            type="button"
          >
            <i className="c-icon p-ia__view_header__button_icon c-icon--add-user" aria-hidden="true" />
          </button>
        </div>
      </Header>

      {/* <ChatList /> */}
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default Channel;
