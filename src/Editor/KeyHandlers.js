export default function(callback) {
  console.log(keypress)
  let listener = new keypress.Listener();
  listener.simple_combo('shift enter', callback)

}
