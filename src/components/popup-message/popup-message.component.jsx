import "../../theme/flex.scss";
import "./popup-message.component.scss";
import { Modal, Box, Typography, Input, Button } from "@mui/material";
import TranslationService from "../../services/translation.service";

const PopupMessageComponent = (props) => {
  const popupModalSettings = props.popupModalSettings;
  const translationService = new TranslationService();

  const handlePopupAlertClose = (value) => {
    props.handlePopupAlertClose(value);
  };

  return (
    <Modal open={props.popupAlert} onClose={() => handlePopupAlertClose()}>
      <Box className="popup-wrapper">
        <Typography variant="h6" component="h2">
          {popupModalSettings.title}
        </Typography>
        <div className="content qcg-flex text-align-start">
          {popupModalSettings.content?.map((card) => {
            return (
              <popupModalSettings.component
              key={card._id}
                handleCardClick={() =>
                  props.handleCardClick(
                    props.fromPlayerUserId,
                    props.toPlayerUserId,
                    card
                  )
                }
                categoryGroup={card.categoryGroup}
                cardName={card.cardName}
                imageURL={card.imageURL}
                description={card.description}
              />
            );
          })}
        </div>
        {popupModalSettings.input && (
          <div className="popup-input">
            <Input
              onChange={(e) => props.setInputValue(e.target.value)}
              className="full-width"
              type={`${popupModalSettings.input.type}`}
              placeholder={`${popupModalSettings.input.placeholder}`}
            ></Input>
          </div>
        )}
        <div className="popup-actions qcg-flex qcg-flex-h-stack qcg-flex-justify-space-evenly">
          {popupModalSettings.hasCancel && (
            <Button
              className="cancel-action"
              onClick={() => handlePopupAlertClose()}
            >
              {translationService.translate.popupModelSettings.hasCancel}
            </Button>
          )}
          {popupModalSettings.action && (
            <Button
              className="confirm-action"
              onClick={() => handlePopupAlertClose(props.inputValue)}
            >
              {popupModalSettings.action}
            </Button>
          )}
        </div>
        {props.inputValidation && (
          <div className="popup-validation-message qcg-flex qcg-flex-h-stack qcg-flex-justify-center">
            {popupModalSettings.input.errorMessage}
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default PopupMessageComponent;
