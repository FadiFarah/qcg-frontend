import "../../theme/flex.scss";
import "./popup-message.component.scss";
import { Modal, Box, Typography, Input, Button } from "@mui/material";

const PopupMessageComponent = (props) => {
  const popupModalSettings = props.popupModalSettings;

  const handlePopupAlertClose = (value) => {
      props.handlePopupAlertClose(value);
  }

  return (
    <Modal open={props.popupAlert} onClose={() => handlePopupAlertClose()}>
      <Box className="popup-wrapper">
        <Typography variant="h6" component="h2">
          {popupModalSettings.title}
        </Typography>
        {popupModalSettings.input &&
              <div className="popup-input">
                <Input
                  onChange={(e) => props.setInputValue(e.target.value)}
                  className="full-width"
                  type={`${popupModalSettings.input.type}`}
                  placeholder={`${popupModalSettings.input.placeholder}`}
                ></Input>
              </div>
            
          }
        <div className="popup-actions qcg-flex qcg-flex-h-stack qcg-flex-justify-space-evenly">
          {popupModalSettings.hasCancel && (
            <Button
              className="cancel-action"
              onClick={() => handlePopupAlertClose()}
            >
              Cancel
            </Button>
          )}
          <Button
            className="confirm-action"
            onClick={() => handlePopupAlertClose(props.inputValue)}
          >
            {popupModalSettings.action}
          </Button>
        </div>
        {props.inputValidation && (
          <div className="popup-validation-message qcg-flex qcg-flex-h-stack qcg-flex-justify-center">
            {popupModalSettings.input.errorMessage}
          </div>
        )}
      </Box>
    </Modal>
  )
}

export default PopupMessageComponent;