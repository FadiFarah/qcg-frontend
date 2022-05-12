import { useAuth0 } from "@auth0/auth0-react";
import { useState ,useEffect } from 'react';
import "./leader-board.scss";
import TranslationService from '../../services/translation.service';
import AuthenticationService from '../../services/authentication.service';
import { Endpoints } from '../../constants';
const LeaderBoardPage = (props) => {
  const leaderBoardPlayers = props.leaderBoardPlayers;
    const authenticationService = new AuthenticationService();
    const translationService = new TranslationService();
    const [leaderboardUsers, setLeaderboardUsers] = useState([]);
    const { logout, loginWithRedirect, isAuthenticated } = useAuth0();

    const getAllLeaderBoard =() => {
      authenticationService.get(Endpoints.usersTopLeaderboard).then((result) => {if(result.data){setLeaderboardUsers(result.data)}}).catch((error)=>{console.log(error);});
    }
    useEffect(() =>{
      getAllLeaderBoard();
    },[null]);

  if (!isAuthenticated) loginWithRedirect();
  else {
    return (
    <div className="qcg-leader-board-page qcg-flex qcg-flex-center">
      <div className="wrapper">
        <div className="board-wrapper qcg-flex qcg-flex-column qcg-flex-align-center">
          <h1>{translationService.translate.leaderBoardPage.title}</h1>
          {leaderboardUsers.map((user, index)=> {return <div className="circle-around qcg-flex qcg-flex-row qcg-flex-align-center" key={index}>
              <div className="id">
                {index+1}
              </div>
              <img src={user.picture} alt="userProfilePicture" />
              <div className="username"> {user.firstName} </div>
              <div className="points"> {user.score}</div>
            </div>})} 
        </div>
      </div>
    </div>
    )
  }
}

export default LeaderBoardPage;