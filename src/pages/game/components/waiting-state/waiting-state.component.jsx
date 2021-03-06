import "./waiting-state.component.scss";
import "../../../../theme/theme.scss";
import "../../../../theme/flex.scss";
import * as image from "../../../../assets/exports/images"
import TranslationService from "../../../../services/translation.service";
import { Limitations } from "../../../../constants";

const WaitingStateComponent = ({ players, isMaster, handleStartClick, roomName }) => {
    const translationService = new TranslationService();

    return (
        <div className="qcg-waiting-state qcg-flex qcg-flex-column full-width full-height">
            <div className="qcg-flex qcg-flex-column full-width full-height">
                <div className="page-title">{translationService.translate.waitingStateComponent.waitingPageTitle}</div>
                <div className="qcg-flex qcg-flex-column qcg-flex-align-center full-height">
                    <div className="room-name">
                        {roomName}
                    </div>
                    <div className="qcg-flex-wrap full-width full-height">
                        {
                            players.map(player => {
                                return <div key={player.userId} className="player qcg-flex-column qcg-flex-50 qcg-flex-justify-center">
                                    <div className="qcg-flex full-width qcg-flex-justify-center">
                                        <div className="image-wrapper">
                                            <img className="player-image" src={player.picture}></img>
                                        </div>
                                    </div>
                                    <div className={`qcg-flex qcg-flex-center player-info  ${player.isMaster && 'room-master'} `}>
                                        <div className="name">{`${player.fullName}`}</div>
                                        {
                                            player.isMaster &&
                                            <div className="master-crown-image">
                                                <img src={image.crown}></img>
                                            </div>
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>

            </div>
            {
                isMaster &&
                <div onClick={() => handleStartClick()} className="button-wrapper qcg-flex">
                    <button disabled={players.length < Limitations.MinPlayers} className={`qcg-flex qcg-flex-20 qcg-flex-center ${players.length < Limitations.MinPlayers && 'button-disabled'}`}>{translationService.translate.waitingStateComponent.hostStartGameButton}</button>
                </div>
            }
        </div>
    );
};

export default WaitingStateComponent;