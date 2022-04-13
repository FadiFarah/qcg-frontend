import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import LoaderCompletedComponent from "../../components/loader-completed/loader-completed.component";
import { Endpoints } from "../../constants";
import AuthenticationService from "../../services/authentication.service";
import { storage, ref, uploadBytes, getDownloadURL } from "./../../configurations/firebase";
import "./profile.page.scss";

const ProfilePage = () => {
    const authenticationService = new AuthenticationService();
    const userDetails = authenticationService.getAuthenticationInfo().userDetails;
    const [email, setEmail] = useState(userDetails.email);
    const [firstName, setFirstName] = useState(userDetails.firstName);
    const [lastName, setLastName] = useState(userDetails.lastName);
    const [profileImage, setProfileImage] = useState(userDetails.picture);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { logout } = useAuth0();
    var fileInput;

    const onEditClick = () => {
        setIsEdit(!isEdit);
    }

    const onPictureChanged = (file) => {
        const fileType = file.type.split("/")[0];
        if(fileType !== "image") return;
        const pathReference  = ref(storage, `/images/profileimage`);
        setIsLoading(true);
        uploadBytes(pathReference, file)
        .then((snapshot) => {
            getDownloadURL(pathReference)
            .then((url) => {
                setProfileImage(url);
                setIsLoading(false);
            })
        })
        .catch((error) =>{
            console.log(error);
        });
    }

    const onSaveClick = () => {
        setIsLoading(true);
        const updatedUser = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            picture: profileImage
        };
        authenticationService.put(Endpoints.UserById.replace("{0}", authenticationService.getUserId()), updatedUser)
            .then((resultData) => {
                authenticationService.updateUserDetails(resultData.data);
                setIsEdit(false);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }

    const onLogoutClick = () => {
        logout()
        localStorage.clear();
    }

    return (
        <div className="qcg-profile-page">
            <div className="profile-wrapper qcg-flex qcg-flex-column qcg-flex-align-center">
                <div onClick={onEditClick} className="edit-button">
                    <ion-icon name="create-outline"></ion-icon>
                </div>
                <div className="title-wrapper">
                    <h1>User Profile</h1>
                </div>
                <div className="email-wrapper full-width qcg-flex">
                    <label className="qcg-flex qcg-flex-20">Email</label>
                    <input type="email" disabled={!isEdit} className={`qcg-flex qcg-flex-60 ${!isEdit && 'input-disabled'}`} value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="first-name-wrapper full-width qcg-flex">
                    <label className="qcg-flex qcg-flex-20">First Name</label>
                    <input type="text" disabled={!isEdit} className={`qcg-flex qcg-flex-60 ${!isEdit && 'input-disabled'}`} value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                </div>
                <div className="last-name-wrapper full-width qcg-flex">
                    <label className="qcg-flex qcg-flex-20">Last Name</label>
                    <input type="text" disabled={!isEdit} className={`qcg-flex qcg-flex-60 ${!isEdit && 'input-disabled'}`} value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                </div>
                <div className="picture-wrapper">
                    <input ref={fileInputRef => fileInput = fileInputRef} style={{display: 'none'}} accept=".jpg, .png, .jpeg" type="file" onChange={(e) => onPictureChanged(e.target.files[0])}></input>
                    <img className={`${isEdit && 'picture-editable'}`} onClick={() => fileInput.click()} src={profileImage}></img>
                </div>
                <div className="buttons-wrapper qcg-flex qcg-flex-justify-center">
                    <button className="button full-width" onClick={onSaveClick}>Save</button>
                    <button className="button full-width" onClick={onLogoutClick}>Logout</button>
                </div>
                {
                    isLoading &&
                    <LoaderCompletedComponent></LoaderCompletedComponent>
                }
            </div>
        </div>
    );
};

export default ProfilePage;