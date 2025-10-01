import { useLanguage } from "../contexts/LanguageContext";
import { useTranslations } from "../locales/translations";

// Custom hook that combines language context with translations
export const useT = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  return t;
};

// Higher Order Component for easy translation wrapping
export const withTranslation = (Component) => {
  return function TranslatedComponent(props) {
    const t = useT();
    const { language } = useLanguage();
    return <Component {...props} t={t} language={language} />;
  };
};

// Translation component for simple text translation
export const T = ({ k, fallback, ...props }) => {
  const t = useT();
  const text = t[k] || fallback || k;
  return <span {...props}>{text}</span>;
};
