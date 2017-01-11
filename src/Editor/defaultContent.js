import { convertFromRaw } from 'draft-js'

export default () => convertFromRaw({
  entityMap: {},
  blocks: [

    {
      type: 'code-block',
      text: `var message = "This is awesome!";
        function radical(){
          console.log("coool")
        }
      `
    }
  ]
})
