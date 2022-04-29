import "./pop-over.component.scss";
const PopOverComponent = (props) => {
  return (
    <div className="qcg-pop-over">
      <ion-popover trigger={props.id} is-open={props.isOpen} mode="ios">
        <ion-content>
          <ion-list>
            {
              props.categoryGroups?.map(c => {
                return <ion-item>{c}</ion-item>
              })
            }
          </ion-list>
        </ion-content>
      </ion-popover>
    </div>
  );
};

export default PopOverComponent;
