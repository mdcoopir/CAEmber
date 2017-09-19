module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'christian-abide',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
