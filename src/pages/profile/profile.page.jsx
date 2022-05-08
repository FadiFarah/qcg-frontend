import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import LoaderCompletedComponent from "../../components/loader-completed/loader-completed.component";
import { Endpoints } from "../../constants";
import AuthenticationService from "../../services/authentication.service";
import TranslationService from "../../services/translation.service";
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "./../../configurations/firebase";
import "./profile.page.scss";

const ProfilePage = () => {
  const translationService = new TranslationService();
  const authenticationService = new AuthenticationService();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [sub, setSub] = useState("");
  const [language, setLanguage] = useState("");
  const [translationsList, setTranslationsList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0();
  var fileInput;


  useEffect(() => {
    authenticationService
      .get(Endpoints.LanguageByIsoCode.replace("{0}", localStorage.getItem("locale")))
      .then((result) => {
        setLanguage(result.data);
        setTranslationsList(result.data.translations);
      });
    authenticationService
      .get(Endpoints.UserById.replace("{0}", authenticationService.getUserId()))
      .then((user) => {
        setEmail(user.data.email);
        setFirstName(user.data.firstName);
        setLastName(user.data.lastName);
        setProfileImage(user.data.picture);
        setSub(user.data.sub.split("|")[0]);
        setIsLoading(false);
      });
  }, [null]);

  const onEditClick = () => {
    setIsEdit(!isEdit);
  };

  const onLanguageChanged = (e) => {
    var userDetails = authenticationService.getAuthenticationInfo().userDetails;
    userDetails.locale = e.target.value;
    authenticationService.updateUserDetails(userDetails);
    localStorage.setItem("locale", e.target.value);
    authenticationService
      .get(Endpoints.LanguageByIsoCode.replace("{0}", e.target.value))
      .then((result) => {
        setLanguage(result.data);
        setTranslationsList(result.data.translations);
      });
  }

  const onPictureChanged = (file) => {
    const fileType = file.type.split("/")[0];
    if (fileType !== "image") return;
    const pathReference = ref(
      storage,
      `/images/${authenticationService.getUserId()}`
    );
    setIsLoading(true);
    uploadBytes(pathReference, file)
      .then((snapshot) => {
        getDownloadURL(pathReference).then((url) => {
          setProfileImage(url);
          setIsLoading(false);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSaveClick = () => {
    setIsLoading(true);
    const updatedUser = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      picture: profileImage,
      locale: localStorage.getItem("locale")
    };
    authenticationService
      .put(
        Endpoints.UserById.replace("{0}", authenticationService.getUserId()),
        updatedUser
      )
      .then((resultData) => {
        authenticationService.updateUserDetails(resultData.data);
        setIsEdit(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const onLogoutClick = () => {
    logout();
    localStorage.clear();
  };

  if (!isAuthenticated) loginWithRedirect();
  else {
    return (
      <div className={`qcg-profile-page ${translationService.translate.general.direction}`}>
        <div className="profile-wrapper qcg-flex qcg-flex-column qcg-flex-align-center">
          <div onClick={onEditClick} className="edit-button">
            <ion-icon name="create-outline"></ion-icon>
          </div>
          <div className="title-wrapper">
            <h1>{translationService.translate.profilePage.profileTitle}</h1>
          </div>
          <div className="email-wrapper full-width qcg-flex qcg-flex-align-center">
            <label className="qcg-flex qcg-flex-20">{translationService.translate.profilePage.profileEmail}</label>
            <input
              type="email"
              disabled={!isEdit || sub !== "auth0"}
              className={`qcg-flex qcg-flex-60 ${(!isEdit || sub !== "auth0") && "input-disabled"
                }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="first-name-wrapper full-width qcg-flex qcg-flex-align-center">
            <label className="qcg-flex qcg-flex-20">{translationService.translate.profilePage.profileFirstName}</label>
            <input
              type="text"
              disabled={!isEdit}
              className={`qcg-flex qcg-flex-60 ${!isEdit && "input-disabled"}`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>
          <div className="last-name-wrapper full-width qcg-flex qcg-flex-align-center">
            <label className="qcg-flex qcg-flex-20">{translationService.translate.profilePage.profileLastName}</label>
            <input
              type="text"
              disabled={!isEdit}
              className={`qcg-flex qcg-flex-60 ${!isEdit && "input-disabled"}`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>
          <div className="languages-wrapper full-width qcg-flex qcg-flex-align-center">
            <label className="qcg-flex qcg-flex-20">{translationService.translate.profilePage.profileLanguage}</label>
            <select value={localStorage.getItem("locale")} onChange={(e) => onLanguageChanged(e)} className={`qcg-flex qcg-flex-60 ${!isEdit && "input-disabled"}`} name="languages" id="languages">
              {
                translationsList?.map(translation => {
                  return <option value={translation.isoCode}>{translation.title}</option>
                })
              }
          </select>
          </div>
          <div className="picture-wrapper">
            <input
              ref={(fileInputRef) => (fileInput = fileInputRef)}
              style={{ display: "none" }}
              accept=".jpg, .png, .jpeg"
              type="file"
              onChange={(e) => onPictureChanged(e.target.files[0])}
            ></input>
            <img
              className={`${isEdit && "picture-editable"}`}
              onClick={() => fileInput.click()}
              src={profileImage}
            ></img>
          </div>
          <div className="buttons-wrapper qcg-flex qcg-flex-justify-center">
            <button className="button full-width" onClick={onSaveClick}>
              {translationService.translate.profilePage.saveButton}
            </button>
            <button className="button full-width" onClick={onLogoutClick}>
              {translationService.translate.profilePage.logoutButton}
            </button>
          </div>
          {isLoading && <LoaderCompletedComponent></LoaderCompletedComponent>}
        </div>
      </div>
    );
  };
}

export default ProfilePage;
