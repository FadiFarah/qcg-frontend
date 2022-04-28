import "./hand-card.component.scss";
import "./../../../../theme/flex.scss";
import "./../../../../theme/theme.scss";
import * as image from "../../../../assets/exports/images";

const HandCardComponent = ({ cardCategoryImages, cardName, categoryGroup, imageURL, description, handleInfoButtonClick }) => {
  const handleInfoButtonClicked = () => {
    handleInfoButtonClick(description);
  };
  return (
    <div className="qcg-hand-card qcg-flex qcg-flex-column">
      <div className="header-wrapper full-width qcg-flex qcg-flex-align-center">
        <div className="header full-width single-line-ellipsis">
          {categoryGroup}
        </div>
        <div
          onClick={handleInfoButtonClicked}
          className="icon full-width qcg-flex-20 qcg-flex-justify-content-end"
        >
          <ion-icon name="information-circle-sharp"></ion-icon>
        </div>
      </div>
      <div className="card-name-wrapper qcg-flex qcg-flex-row-reverse single-line-ellipsis">
        {cardName}
      </div>
      <div className="image-wrapper">
        <img src={imageURL}></img>
      </div>
      <div className="the-whole-cards-four-options qcg-flex qcg-flex-justify-center">
        {
          cardCategoryImages?.map(image => {
            return <div className={`${image.isActive && 'active-image'}`}>
              <img
                src={image?.imageURL}
              />
            </div>
          })
        }

      </div>
      <div className="card-description-wrapper">
        {description?.slice(0, 60)}...
      </div>
    </div>
  );
};

export default HandCardComponent;
