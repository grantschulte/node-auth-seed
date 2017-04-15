module.exports = {
  bootLog(port, env, message = "Started...") {
    console.log(`--- ${ message }`);
    console.log(`--- Up on ${ port }`);
    console.log(`--- Running in ${ env }`);
  }
};
