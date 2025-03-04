interface Environment {
  dundringHttpServerUrl: string;
  dundringWsServerUrl: string;
}

export const getEnv = (): Environment => {
  const envOverride = import.meta.env.VITE_ENV_OVERRIDE || null;

  switch (envOverride) {
    case 'test':
      return {
        dundringHttpServerUrl: 'https://test.dundring.com/api',
        dundringWsServerUrl: 'wss://test.dundring.com/api',
      };
    case 'prod':
      return {
        dundringHttpServerUrl: 'https://dundring.com/api',
        dundringWsServerUrl: 'wss://dundring.com/api',
      };
    default:
      if (isSecureConnection()) {
        return {
          dundringHttpServerUrl: `https://${location.hostname}/api`,
          dundringWsServerUrl: `wss://${location.hostname}/api`,
        };
      }

      return {
        dundringHttpServerUrl: 'http://localhost:8080/api',
        dundringWsServerUrl: 'ws://localhost:8080/api',
      };
  }
};

const isSecureConnection = () => location.protocol === 'https:';
