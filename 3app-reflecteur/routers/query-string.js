


export async function queryString(req, res) {

  const queryParams = req.query;

  const hiddenParams = req._parsedUrl.query ; 
  console.log("hiddenParams:", hiddenParams);


  return res.send(
    `
    Hello <br> World! <br> 
    ${Object.entries(queryParams).map(([key, value]) => `${key}: ${value}`).join('<br>')}
    
    `
  )
}