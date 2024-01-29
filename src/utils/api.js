export default function getData(url) {
  return fetch(url).then((resp) => {
    if (!resp.ok) {
      throw Error("There was a problem fetching the data.");
    }

    return resp.json();
  });
}
