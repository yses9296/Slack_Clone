import { ChatArea, EachMention, Form, MentionsTextarea, SendButton, Toolbox } from '@components/ChatBox/style';
import React, { useCallback, useEffect, useRef, VFC } from 'react';
import { Mention, SuggestionDataItem } from 'react-mentions';
import autosize from 'autosize';
import { useParams } from 'react-router';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import gravatar from 'gravatar';

interface Props {
  chat: string;
  onSubmitForm: (e: any) => void;
  onChangeChat: (e: any) => void;
  textareaPlaceholder?: string;
}

const ChatBox: VFC<Props> = ({ chat, onSubmitForm, onChangeChat, textareaPlaceholder }) => {
  const { workspace } = useParams<{ workspace: string }>();
  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher, { dedupingInterval: 2000 });
  const { data: memberData } = useSWR<IUser[]>(userData ? `/api/workspaces/${workspace}/members` : null, fetcher);

  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  const onKeydownChat = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          onSubmitForm(e);
        }
      }
    },
    [onSubmitForm],
  );

  const renderSuggestion = useCallback(
    (
      suggestion: SuggestionDataItem,
      search: string,
      highlightedDisplay: React.ReactNode,
      index: number,
      focused: boolean,
    ): React.ReactNode => {
      if (!memberData) return;
      return (
        <EachMention focus={focused}>
          <img
            src={gravatar.url(memberData[index].email, { s: '20px', d: 'retro' })}
            alt={memberData[index].nickname}
          />
          <span>{highlightedDisplay}</span>
        </EachMention>
      );
    },
    [memberData],
  );

  return (
    <ChatArea onSubmit={onSubmitForm}>
      <Form>
        <MentionsTextarea
          id="editor-chat"
          value={chat}
          onChange={onChangeChat}
          onKeyDown={onKeydownChat}
          placeholder={textareaPlaceholder}
          ref={textareaRef}
        >
          <Mention
            appendSpaceOnAdd
            trigger="@"
            data={memberData?.map((member) => ({ id: member.id, display: member.nickname })) || []}
            renderSuggestion={renderSuggestion}
          />
        </MentionsTextarea>
        <Toolbox>
          <SendButton
            className={
              'c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send' +
              (chat?.trim() ? '' : ' c-texty_input__button--disabled')
            }
          >
            <i className="c-icon c-icon--paperplane-filled" aria-hidden="true" />
          </SendButton>
        </Toolbox>
      </Form>
    </ChatArea>
  );
};

export default ChatBox;
