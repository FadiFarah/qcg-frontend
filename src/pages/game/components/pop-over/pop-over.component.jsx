import "./pop-over.component.scss";
import { Popover } from "@mui/material";
const PopOverComponent = (props) => {
  return (
    <div className="qcg-pop-over">
      <Popover
        id={props.id}
        open={props.isOpen}
        anchorEl={props.anchorEl}
        onClose={(e) => props.handleClose(e)}
      >
        <div>
          {props.categoryGroups?.map((c) => {
            return (
              <div
                className="item"
                onClick={() => props.onCategoryGroupClick(props.id, c)}
              >
                {c}
              </div>
            );
          })}
        </div>
      </Popover>
    </div>
  );
};

export default PopOverComponent;
