import "./pop-over.component.scss";
import { Button, Popover } from "@mui/material";
const PopOverComponent = (props) => {
  return (
    <div className="qcg-pop-over">
      <Popover
        id={props.id}
        open={props.isOpen}
        anchorEl={props.anchorEl}
        onClose={(e) => props.handleClose(e)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div>
          {props.categoryGroups?.map((c, index) => {
            return (
              <div className="item" key={index}>
                <Button
                  variant="contained"
                  onClick={() => props.onCategoryGroupClick(props.id, c)}
                  >
                  {c}
                </Button> 
              </div>
            );
          })}
        </div>
      </Popover>
    </div>
  );
};

export default PopOverComponent;
