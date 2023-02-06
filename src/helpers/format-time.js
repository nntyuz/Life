export default (seconds = 0) => {
  let measuredTime = new Date(null)
  measuredTime.setSeconds(seconds)
  let MHSTime = measuredTime.toISOString().substr(11, 8)
  return MHSTime
}
