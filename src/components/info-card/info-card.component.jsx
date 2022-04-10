import "./../../theme/flex.scss";
import "./../../theme/theme.scss";
import "./info-card.component.scss";
import { IonIcon } from "@ionic/react";

const InfoCardComponent = (props) => {
    const handleClick = (event) => {
        props.handleClick(props.id);
        event.preventDefault();
    }

    return(
        <div onClick={handleClick} className="qcg-info-card qcg-flex qcg-flex-center">
            <div className="info-card-wrapper qcg-flex qcg-flex-h-stack">
                <div className="ribbon-wrapper qcg-flex qcg-flex-column qcg-flex-20 qcg-flex-justify-center">
                    <div className="ribbon-value ribbon-title">{props.data.ribbonTitle}</div>
                    
                    <div className={`ribbon-value ribbon-icon ribbon-icon-${props.data.ribbonIcon.style}`}>
                        <IonIcon icon={props.data.ribbonIcon.value}></IonIcon>
                    </div>
                    
                </div>

                <div className="content-wrapper qcg-flex qcg-flex-column qcg-flex-v-stack full-width">

                    <div className="qcg-flex info-card-title">{props.data.cardTitle}</div>

                    <div className="info-wrapper qcg-flex qcg-flex-column qcg-flex-auto qcg-flex-justify-center">
                        {
                            props.data.infoList.map((info, index) => {
                                return (
                                    <div key={index} className="info-content single-line-ellipsis">
                                        <span className="info-title">{info.title}</span>
                                        <span>: </span>
                                        <span className={`info-value info-value-${info.style}`}>{info.value}</span>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default InfoCardComponent;