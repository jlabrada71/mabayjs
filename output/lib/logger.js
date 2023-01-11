export default class Logger {
  static log (message, feature = 'main', type = 'LOG') {
    console.log(`\x1B[46m\x1B[37m${type}:${feature}\x1B[40m\x1B[37m ${message}\x1B[0m`)
  }

  static debug (message, feature = 'NONE') {
    if (process.env.NODE_ENV !== 'development') {
      return
    }
    Logger.log(message, feature, 'DEBUG')
  }
}
