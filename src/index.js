const pageSize = 100; // Must amount to a taller page than the viewport length.
const capLimit = 110;

window.addEventListener('load', event => {
  // Kickstart the list.
  appendMoreItems(pageSize);
});

let oldX = 0;
let oldY = 0;
window.addEventListener('scroll', () => {
  const width = document.documentElement.offsetWidth - window.innerWidth;
  const height = document.documentElement.offsetHeight - window.innerHeight;
  const newX = window.pageXOffset;
  const newY = window.pageYOffset;

  if (oldX !== 0 && newX === 0) { console.log('Scrolled to the left.'); prependMoreItems(pageSize); }
  if (oldX !== width && newX === width) { console.log('SCrolled to the right.'); appendMoreItems(pageSize); }
  if (oldY !== 0 && newY === 0) { console.log('Scrolled to the top.'); prependMoreItems(pageSize); }
  if (oldY !== height && newY === height) { console.log('Scrolled to the bottom.'); appendMoreItems(pageSize); }

  oldX = newX;
  oldY = newY;
});

// Simulate API response.
function* getItemsBefore(id, count) {
  for (let index = count; index > 0; index--) {
    yield { id: id - index };
  }
}

// Simulate API response.
function* getItemsAfter(id, count) {
  for (let index = 0; index < count; index++) {
    yield { id: id + index + 1 };
  }
}

let firstItemId;
let lastItemId;

function prependMoreItems(count) {
  const fragment = document.createDocumentFragment();
  const items = [...getItemsBefore(firstItemId || 0, count)];
  console.log('top', firstItemId, items);
  for (const item of items) {
    const itemDiv = document.createElement('div');
    itemDiv.appendChild(document.createTextNode(item.id));
    fragment.appendChild(itemDiv);
  }

  firstItemId = items[0].id;

  // Remove items after that are over the cap limit.
  const excess = (document.body.childElementCount + items.length) - capLimit;
  for (let index = 0; index < excess; index++) {
    document.body.lastElementChild.remove();
  }

  // TODO: Set firstItemId, lastItemId after excess removal here instead.

  const cursor = document.body.lastElementChild || document.documentElement;
  document.body.insertBefore(fragment, document.body.firstElementChild /* Guaranteed to exist after first scroll. */);
  cursor.scrollIntoView();
  document.title = `${document.body.childElementCount} items loaded`;
}

function appendMoreItems(count) {
  const fragment = document.createDocumentFragment();
  const items = [...getItemsAfter(lastItemId || 0, count)];
  for (const item of items) {
    const itemDiv = document.createElement('div');
    itemDiv.appendChild(document.createTextNode(item.id));
    fragment.appendChild(itemDiv);
  }

  if (!firstItemId) { firstItemId = items[0].id; }
  lastItemId = items[items.length - 1].id;

  // Remove items before that are over the cap limit.
  const excess = (document.body.childElementCount + items.length) - capLimit;
  for (let index = 0; index < excess; index++) {
    document.body.firstElementChild.remove();
  }

  // TODO: Set firstItemId, lastItemId after excess removal here instead.

  const cursor = document.body.lastElementChild || document.documentElement;
  document.body.appendChild(fragment);
  cursor.scrollIntoView();
  document.title = `${document.body.childElementCount} items loaded`;
}
