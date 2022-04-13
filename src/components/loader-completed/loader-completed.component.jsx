import "./../../theme/flex.scss";
import "./../../theme/theme.scss";
import "./loader-completed.component.scss";

const LoaderCompletedComponent = (props) => {
  return (
    <div className="qcg-loader-completed qcg-flex qcg-flex-center">
        <ion-spinner name="crescent" color="primary"></ion-spinner>
        <div className="background-opacity"></div>
    </div>
  );
};

export default LoaderCompletedComponent;
