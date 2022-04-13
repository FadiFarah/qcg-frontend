import "./hand-card.component.scss";
import "./../../../../theme/flex.scss";
import "./../../../../theme/theme.scss";
import * as image from "../../../../assets/exports/images";

const HandCardComponent = (props) => {
    const handleInfoButtonClick = () => {
        props.handleInfoButtonClick();
    }

    const description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been";
    return (
        <div className="qcg-hand-card qcg-flex qcg-flex-column">
            <div className="header-wrapper full-width qcg-flex qcg-flex-align-center">
                <div className="header full-width single-line-ellipsis">
                    CategoryGroup
                </div>
                <div onClick={handleInfoButtonClick} className="icon full-width qcg-flex-20 qcg-flex-justify-content-end">
                    <ion-icon name="information-circle-sharp"></ion-icon>
                </div>
            </div>
            <div className="card-name-wrapper qcg-flex qcg-flex-row-reverse single-line-ellipsis">
                CardName
            </div>
            <div className="image-wrapper">
                <img src="https://www.freecodecamp.org/news/content/images/2021/06/w-qjCHPZbeXCQ-unsplash.jpg"></img>
            </div>
            <div className="card-description-wrapper">
                {description.slice(0,60)}...
            </div>
        </div>
    );
};

export default HandCardComponent;