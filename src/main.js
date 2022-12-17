const loadXMLFeed = () => {
  const url = 'https://m.highwaysengland.co.uk/feeds/rss/UnplannedEvents.xml';
  fetch(`https://allorigins.hexlet.app/raw?url=${url}`)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'application/xml');
      displayTrafficList(xml);
    });
};

document.addEventListener('DOMContentLoaded', loadXMLFeed());

function displayTrafficList(x) {
  let list = document.getElementById('item');
  let item = x.getElementsByTagName('item');
  let itemNum = x.getElementsByTagName('item').length;

  

  for (let i = 0; i < itemNum; i += 1) {
    let li = document.createElement('li');
    li.className = 'listItem';

    li.innerHTML = `
    <h3>${item[i].getElementsByTagName('title')[0].innerHTML}</h3>
    <p>${item[i].getElementsByTagName('description')[0].innerHTML}</p>
    `;

    list.appendChild(li);
  }

}
