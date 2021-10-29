module.exports = (rawRequest) => {
  const newLineSplit = rawRequest.split('\n');
  const firstLineSplit = newLineSplit[0].split(' ');
  const [method, path] = firstLineSplit;

  const parsedRequest = { method, path };

  //check if there is an empty line before last item in array. if so, add last item as body
  if (newLineSplit[newLineSplit.length - 2] === '\r') {
    parsedRequest.body = newLineSplit[newLineSplit.length - 1];
  }

  return parsedRequest;
};
