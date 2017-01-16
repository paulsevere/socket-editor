import { convertFromRaw } from 'draft-js'

export default () => convertFromRaw({
  entityMap: {},
  blocks: [

    {
      type: 'code-block',
      text: `function handleRequest(request, response){
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}
      `
    }
  ]
})
