import {
  createContext,
  useEffect,
  useContext,
  ReactNode,
  useState,
} from "react";
import { fetchConfig } from "./fetchConfig";

interface Config {
  REACT_APP_endpoint?: string;
  REACT_APP_corpus_id?: string;
  REACT_APP_customer_id?: string;
  REACT_APP_auth_api_key?: string;
  REACT_APP_search_title_pre?: string;
  REACT_APP_search_title_inner?: string;
  REACT_APP_search_title_post?: string;
  REACT_APP_search_title_url?: string;
  REACT_APP_Q1?: string;
  REACT_APP_Q2?: string;
  REACT_APP_Q3?: string;
  REACT_APP_Q4?: string;
}

interface ConfigContextType extends Config {
  isConfigLoaded: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const ConfigContextProvider = ({ children }: Props) => {
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);
  const [configState, setConfigState] = useState<Config>({});

  useEffect(() => {
    const loadConfig = async () => {
      if (process.env.NODE_ENV === "production") {
        const result = await fetchConfig();
        setConfigState(result.data);
      } else {
        setConfigState(process.env as Config);
      }

      setIsConfigLoaded(true);
    };
    loadConfig();
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        isConfigLoaded,
        ...configState,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfigContext = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error(
      "useConfigContext must be used within a ConfigContextProvider"
    );
  }
  return context;
};
