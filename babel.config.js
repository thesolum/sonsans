module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@/components': './src/components',
            '@/screens': './src/screens',
            '@/theme': './src/theme',
            '@/types': './src/types',
            '@/utils': './src/utils',
          },
        },
      ],
    ],
  };
};