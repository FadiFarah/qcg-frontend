import { useAuth0 } from "@auth0/auth0-react";
import "./profile.page.scss";

const ProfilePage = () => {
    const { logout } = useAuth0();
    return (
        <div className="qcg-profile-page">
            <div>Profile Page</div>
            <button onClick={() => {
                logout()
                localStorage.clear();
            }}>Logout</button>
        </div>
    );
};

export default ProfilePage;