const pageSize = 100; // Must amount to a taller page than the viewport length.
const capLimit = 150;
let firstItemId;
let lastItemId;

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

  if (oldX !== 0 && newX === 0) {
    console.log('Hit left edge');
    prependMoreItems(pageSize);
   }

  if (oldX !== width && newX === width) {
    console.log('Hit right edge');
    appendMoreItems(pageSize);
  }

  if (oldY !== 0 && newY === 0) {
    console.log('Hit top edge');
    const anchor = document.querySelector(`[data-id="${firstItemId}"]`);
    const cursor = anchor.getBoundingClientRect().top;
    prependMoreItems(pageSize);
    document.documentElement.scrollTop += anchor.getBoundingClientRect().top - cursor;
  }

  if (oldY !== height && newY === height) {
    console.log('Hit bottom edge');
    const anchor = document.querySelector(`[data-id="${lastItemId}"]`);
    const cursor = anchor.getBoundingClientRect().bottom;
    appendMoreItems(pageSize);
    document.documentElement.scrollTop -= cursor - anchor.getBoundingClientRect().bottom;
  }

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

function prependMoreItems(count) {
  const fragment = document.createDocumentFragment();
  const items = [...getItemsBefore(firstItemId || 0, count)];
  for (const item of items) {
    const itemDiv = document.createElement('div');
    itemDiv.dataset['id'] = item.id;
    itemDiv.appendChild(document.createTextNode(item.id));
    fragment.appendChild(itemDiv);
  }

  // Remove items after that are over the cap limit.
  const excess = (document.body.childElementCount + items.length) - capLimit;
  for (let index = 0; index < excess; index++) {
    document.body.lastElementChild.remove();
  }

  // Guaranteed to exist after first scroll.
  document.body.insertBefore(fragment, document.body.firstElementChild);
  firstItemId = Number(document.body.firstElementChild.dataset['id']);
  lastItemId = Number(document.body.lastElementChild.dataset['id']);

  console.log(`${document.body.childElementCount} items are displayed (${firstItemId}-${lastItemId}, ${excess} items was purged)`);
}

function appendMoreItems(count) {
  const fragment = document.createDocumentFragment();
  const items = [...getItemsAfter(lastItemId || 0, count)];
  for (const item of items) {
    const itemDiv = document.createElement('div');
    itemDiv.dataset['id'] = item.id;
    itemDiv.appendChild(document.createTextNode(item.id));
    fragment.appendChild(itemDiv);
  }

  // Remove items before that are over the cap limit.
  const excess = (document.body.childElementCount + items.length) - capLimit;
  for (let index = 0; index < excess; index++) {
    document.body.firstElementChild.remove();
  }

  document.body.appendChild(fragment);
  firstItemId = Number(document.body.firstElementChild.dataset['id']);
  lastItemId = Number(document.body.lastElementChild.dataset['id']);

  console.log(`${document.body.childElementCount} items are displayed (${firstItemId}-${lastItemId}, ${excess} items was purged)`);
}
