import TranslationService from "../../../../services/translation.service";
import "../../../../theme/flex.scss";
import "../../../../theme/theme.scss";
import "./game-over-state.component.scss";

const GameOverStateComponent = ({players, currentPlayer, handleReturnToRoomClick}) => {
    const translationService = new TranslationService();

    players?.sort((a, b) => b.points - a.points);
    return (
        <div className="qcg-game-over-state qcg-flex qcg-flex-column">
            <div className="title full-width qcg-flex qcg-flex-center">{translationService.translate.gameOverStateComponent.gameOverTitle}</div>
            <div className={`subtitle full-width qcg-flex qcg-flex-center ${currentPlayer.isWin ? "current-player-winner" : "current-player-loser"}`}>{currentPlayer.isWin ? translationService.translate.gameOverStateComponent.gameOverSubTitleWin : translationService.translate.gameOverStateComponent.gameOverSubTitleLose}</div>
            <div className="players-results-wrapper qcg-flex qcg-flex-column full-height">
                {
                    players?.map((player, index) => {

                       return(
                           <div className={`player-result qcg-flex ${player.userId === currentPlayer.userId && "current-player-selected"}`} key={index}>
                                <div className="qcg-flex qcg-flex-center qcg-flex-20 full-width" >
                                    {index+1}
                                </div>
                                <div className="qcg-flex qcg-flex-align-center qcg-flex-10 full-width">
                                    <img src={player.picture}></img>
                                </div>
                                <div className="qcg-flex qcg-flex-align-center qcg-flex-25 full-width">
                                    <span>{player.fullName}</span>
                                </div>
                                <div className={`qcg-flex qcg-flex-center qcg-flex-25 full-width ${player.isWin ? "player-winner" : "player-loser"}`}>
                                    {player.isWin ? translationService.translate.gameOverStateComponent.playerWinner : translationService.translate.gameOverStateComponent.playerLoser}
                                </div>
                                <div className="qcg-flex qcg-flex-center qcg-flex-20 full-width">
                                    {player.points}
                                </div>
                            </div>
                           ) 
                    })
                }
            </div>
            <div className="qcg-flex qcg-flex-justify-content-end button-wrapper">
                <div onClick={() => handleReturnToRoomClick()} className="button">{translationService.translate.gameOverStateComponent.returnToRoomButton}</div>
            </div>
        </div>
    )
}

export default GameOverStateComponent;