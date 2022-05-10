import AuthenticationService from "./authentication.service";
import english from "../assets/translations/english.json";
import hebrew from "../assets/translations/hebrew.json";

interface translation {
  general: {
    direction: string;
  };

  navbarComponent: {
    home: string;
    about: string;
    rules: string;
    profile: string;
    leaderBoard: string;
    loginUserName: string;
    welcomeUserName: string;
  };

  homePage: {
    welcomeTitle: string;
    welcomeDescription: string;
    rulesTitle: string;
    rulesDescription: string;
    aboutDescription: string;
    aboutUsImage: string;
  };

  profilePage: {
    profileTitle: string;
    profileEmail: string;
    profileFirstName: string;
    profileLastName: string;
    profileLanguage: string;
    saveButton: string;
    logoutButton: string;
  };

  leaderBoardPage: {
    title: string;
  };

  roomsListPage: {
    roomListCreate: string;
    roomsListTitle: string;
    roomsListAllRooms: string;
    roomsListPublicRooms: string;
    roomsListPrivateRooms: string;
    roomCurrentUsers: string;
    roomStatus: {
      statusTitle: string;
      statusWaiting: string;
      statusStarted: string;
    };
    privateRoomPasswordPopup: {
      title: string;
      inputPlaceholder: string;
      errorMessage: string;
    };
    popupModelRoomsList: {
      title: string;
      inputPlaceholderPassword: string;
      errorMessage: string;
    };
    popupRoomFull: {
      title: string;
      action: string;
    };
    popupRoomStarted: {
      title: string;
      action: string;
    };
  };

  roomCreationPage: {
    roomCreationTitle: string;
    backToPageButton: string;
    roomNameInput: string;
    categorySelect: string;
    validationInputsMessage: string;
    roomStatus: {
      statusTitle: string;
      statusPublic: string;
      statusPrivate: string;
      privateStatusPasswordInput: string;
    };
    createRoomButton: string;
  };

  waitingStateComponent: {
    waitingPageTitle: string;
    hostStartGameButton: string;
  };

  startedStateComponent: {
    requestMessage: string;
    dontHaveCardRequestMessage: string;
  };

  gameOverStateComponent: {
    gameOverTitle: string;
    gameOverSubTitleWin: string;
    gameOverSubTitleLose: string;
    playerWinner: string;
    playerLoser: string;
    returnToRoomButton: string;
  };

  gamePage: {
    sidaBar: {
      mainMenu: string;
      leaveGame: string;
    };
    chatMessages: {
      newMessageInputPlaceholder: string;
      sendButton: string;
    };
    popupForCardRequest: {
      title: string;
    };
  };

  popupModelSettings: {
    confimAction: string;
    hasCancel: string;
  };
}

class TranslationService {
  private authenticationService: AuthenticationService;
  public translate: translation = null;

  constructor() {
    this.authenticationService = new AuthenticationService();
    this.initialize();
  }

  public initialize() {
    this.setLocale();

    if (this.getLocale() === "en") {
      this.translate = english.translation;
    } else {
      this.translate = hebrew.translation;
    }
  }

  public setLocale() {
    var locale = this.authenticationService
      .getAuthenticationInfo()
      ?.userDetails?.locale.split("-")[0];
    localStorage.setItem("locale", locale);
  }

  public getLocale(): string {
    return localStorage.getItem("locale");
  }
}

export default TranslationService;
