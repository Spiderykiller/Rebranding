import { mergeConfig } from 'vite';

// Use `any` for config type to avoid type errors if Vite types are missing
export default (config: any) => {
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
};

