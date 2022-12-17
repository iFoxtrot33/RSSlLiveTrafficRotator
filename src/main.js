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
  const list = document.getElementById('item');
  const item = x.getElementsByTagName('item');
  const itemNum = x.getElementsByTagName('item').length;

  if (itemNum === 0) {
    list.innerHTML = '<li><h3>No Planned Roadworks</h3><li>';

    setTimeout(() => {
      loadXMLFeed();
      console.log('No new data...');
    }, 7000);
  } else {
    for (let i = 0; i < itemNum; i += 1) {
      const li = document.createElement('li');
      li.className = 'listItem';

      li.innerHTML = `
        <h3>${item[i].getElementsByTagName('title')[0].innerHTML}</h3>
        <p>${item[i].getElementsByTagName('description')[0].innerHTML}</p>
        `;

      list.appendChild(li);
    }
  }
  setTimeout(() => {
    startAnimation(item);
  }, 7000);
}

const startAnimation = (x) => {
  const listItem = document.getElementsByClassName('listItem');

  for (let i = 0; i < x.length; i += 1) {
    setTimeout(() => {
      listItem[0].remove();

      if (i === x.length - 1) {
        loadXMLFeed();
        console.log('Loading New Data...');
      }
    }, i * 3000);
  }
};
