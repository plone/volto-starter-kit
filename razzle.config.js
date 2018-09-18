module.exports = {
  modify: (config, { target, dev }, webpack) => {
    // do something to config

    if (target === 'web') {
      config.plugins.unshift(
        new webpack.DefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
        }),
      );
      console.log(config.plugins);
    }

    if (target === 'node') {
      config.plugins.unshift(
        new webpack.DefinePlugin({
          __CLIENT__: false,
          __SERVER__: true,
        }),
      );
    }

    return config;
  },
};
