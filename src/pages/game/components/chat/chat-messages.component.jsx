import "./chat-messages.component.scss";
import "./../../../../theme/flex.scss";
import "./../../../../theme/theme.scss";
import { Popover, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import TranslationService from "../../../../services/translation.service";

const ChatMessages = (props) => {
  const translationService = new TranslationService();
  const [message, setMessage] = useState();

  const handleNewChatMessageClick = () => {
    props.handleNewChatMessageClick(message);
    setMessage("");
  };

  return (
    <div className="qcg-game-chat-messages qcg-flex qcg-flex-center">
      <Popover
        id={props.id}
        open={props.open}
        anchorEl={props.anchorEl}
        onClose={(e) => props.onClose(e)}
      >
        <div className="wrapper">
          <div className="chat-wrapper qcg-flex qcg-flex-column qcg-flex-align-center">
            <div className="chat-background-wrapper qcg-flex qcg-flex-column-reverse">
              <div className="chat-message-wrapper-bottom">
                <TextField
                  id="chatMessageInput"
                  variant="standard"
                  placeholder={translationService.translate.gamePage.chatMessages.newMessageInputPlaceholder}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    e.key === "Enter" && handleNewChatMessageClick();
                  }}
                  value={message ?? ""}
                />

                <div className="send-button qcg-flex">
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => {
                      handleNewChatMessageClick();
                    }}
                  >
                    {translationService.translate.gamePage.chatMessages.sendButton}
                  </Button>
                </div>
              </div>
              <div
                className="new-messages-wrapper qcg-flex qcg-flex-column qcg-flex-col-1 full-height full-width"
                ref={props.chatBoxRef}
              >
                {props.chatMessagesList.map((message, index) => {
                  return <div key={index}>{message}</div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default ChatMessages;
