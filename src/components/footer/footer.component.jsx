import "./../../theme/flex.scss";
import "./../../theme/theme.scss";
import "./footer.component.scss";
import TranslationService from "../../services/translation.service";
 
const FooterComponent = () => {
  const translationService = new TranslationService();

  return (
    <div className={`qcg-footer qcg-flex qcg-flex-center text-align-center ${translationService.translate.general.direction}`}>
        {translationService.translate.homePage.footer.rights} {new Date().getFullYear()} ©
    </div>
  );
};

export default FooterComponent;
