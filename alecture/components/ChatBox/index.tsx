import { ChatArea, EachMention, Form, MentionsTextarea, SendButton, Toolbox } from '@components/ChatBox/style';
import React, { useCallback, VFC } from 'react';
import { Mention, SuggestionDataItem } from 'react-mentions';

interface Props {
    chat: string
}

const ChatBox:VFC<Props> = ( {chat} ) => {
    const onSubmitForm = useCallback( () => {

    },[])
    return (
        <ChatArea onSubmit={onSubmitForm}>
            <Form>
                {/* <MentionsTextarea>
                    <textarea></textarea>
                </MentionsTextarea> */}
                <Toolbox>
                    <SendButton 
                        className={
                            'c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send' +
                            (chat?.trim() ? '' : ' c-texty_input__button--disabled')
                        }>
                        <i className="c-icon c-icon--paperplane-filled" aria-hidden="true" />
                    </SendButton>
                </Toolbox>
            </Form>
        </ChatArea>
    )
}

export default ChatBox;
