import { Github } from "lucide-react";
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
        <div className="flex flex-col items-center gap-2 border-t border-desert-100 pt-4 text-center font-semibold text-desert-700">
          <span>Made with ❤️ by Natu</span>
          <a
            href="https://github.com/RaoNatu"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile for RaoNatu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-desert-200 bg-white text-royal-800 transition hover:border-royal-300 hover:text-royal-950"
          >
            <Github className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
