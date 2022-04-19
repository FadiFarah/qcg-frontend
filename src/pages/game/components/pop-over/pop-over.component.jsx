import "./pop-over.component.scss";
const PopOverComponent = (props) => {
  return (
    <div className="qcg-pop-over">
      <ion-popover trigger={props.id} is-open={props.isOpen} mode="ios">
        <ion-content>
          <ion-list>
            <ion-item>test1</ion-item>
            <ion-item>test2</ion-item>
            <ion-item>test3</ion-item>
            <ion-item>test4</ion-item>
          </ion-list>
        </ion-content>
      </ion-popover>
    </div>
  );
};

export default PopOverComponent;
