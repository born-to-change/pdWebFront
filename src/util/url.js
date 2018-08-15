export {getFilter}
function getFilter(obj){
  let url = '?'
  for(let key in obj){
    url += `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}&`
  }
  return url.slice(0,-1)
};
