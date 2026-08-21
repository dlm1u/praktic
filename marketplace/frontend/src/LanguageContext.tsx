import { createContext, useContext, useState, type ReactNode } from 'react';

type Lang = 'RU' | 'EN';

const dictionary = {
  RU: {
    main: 'Главная', catalog: 'Каталог', cart: 'Корзина', login: 'Войти', logout: 'Выйти',
    welcome: '🌟 Добро пожаловать в наш маркетплейс!',
    subWelcome: 'Полнофункциональное Fullstack-приложение на React + Hono.js + SQLite',
    btnCatalog: 'В каталог', btnAdd: 'В корзину', adminLink: '🛠️ Админка',
    parsingLog: '🔄 Данные парсинга с внешних сайтов'
  },
  EN: {
    main: 'Home', catalog: 'Catalog', cart: 'Cart', login: 'Login', logout: 'Logout',
    welcome: '🌟 Welcome to our Marketplace!',
    subWelcome: 'Full-featured Fullstack application powered by React + Hono.js + SQLite',
    btnCatalog: 'Go to Catalog', btnAdd: 'To Cart', adminLink: '🛠️ Admin',
    parsingLog: '🔄 Live data parsed from external sites'
  }
};

const LangContext = createContext<{ lang: Lang; toggleLang: () => void; t: (k: keyof typeof dictionary['RU']) => string } | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('RU');
  const toggleLang = () => setLang(l => l === 'RU' ? 'EN' : 'RU');
  const t = (key: keyof typeof dictionary['RU']) => dictionary[lang][key];

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => {
  const c = useContext(LangContext);
  if (!c) throw new Error();
  return c;
};