module.exports = {
  apps : [{
    name: 'rammerhead proxy',
    script: './rammerhead/src/server.js',
    exec_mode: "cluster",
    instances: "max"
  }]
};
