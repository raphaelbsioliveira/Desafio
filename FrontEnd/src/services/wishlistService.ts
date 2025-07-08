const WISHLIST_KEY = "wishlist";

export function getWishlist(): string[] {
  const list = localStorage.getItem(WISHLIST_KEY);
  return list ? JSON.parse(list) : [];
}

function saveWishlist(wishlist: string[]) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

export function toggleWishlist(productCode: string) {
  let list = getWishlist();
  if (list.includes(productCode)) {
    list = list.filter((code) => code !== productCode);
  } else {
    list.push(productCode);
  }
  saveWishlist(list);
}

export function isInWishlist(productCode: string) {
  return getWishlist().includes(productCode);
}
