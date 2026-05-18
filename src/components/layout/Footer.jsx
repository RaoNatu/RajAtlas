import { useLanguage } from "../../contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-desert-200 bg-white text-desert-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="font-black">RajAtlas</p>
          <p className="max-w-2xl text-desert-700">{t("footerCopy")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 border-t border-desert-100 pt-4 font-semibold text-desert-700">
          <span>Made with ❤️by Natu</span>
          <a
            href="https://github.com/RaoNatu"
            target="_blank"
            rel="noreferrer"
            className="text-royal-800 hover:text-royal-900"
          >
            GitHub: RaoNatu
          </a>
        </div>
      </div>
    </footer>
  );
}
