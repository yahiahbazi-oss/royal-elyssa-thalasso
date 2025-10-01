import React from "react";
import { useT, T } from "../hooks/useTranslation";
import { useLanguage } from "../contexts/LanguageContext";

// Example of how easy it is to translate any component
const SimpleHeader = () => {
  const t = useT(); // Get all translations
  const { language, changeLanguage } = useLanguage(); // Get language controls

  return (
    <div className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Navigation using t() function */}
        <nav className="flex space-x-6">
          <a href="/" className="hover:text-blue-600">
            {t.home}
          </a>
          <a href="/spa" className="hover:text-blue-600">
            {t.spa}
          </a>
          <a href="/thalion" className="hover:text-blue-600">
            {t.thalion}
          </a>
          <a href="/suites" className="hover:text-blue-600">
            {t.suites}
          </a>
          <a href="/contact" className="hover:text-blue-600">
            {t.contact}
          </a>
        </nav>

        {/* Using T component for simple translation */}
        <div className="flex items-center space-x-4">
          <T k="language" className="text-sm text-gray-600" />

          {/* Language switcher */}
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="fr">🇫🇷 Français</option>
            <option value="en">🇬🇧 English</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
