import { useState } from 'react';
import { defaultFeaturedOffer, type FeaturedOffer } from '../data/featuredOffer';

const storageKey = 'cmm-featured-offer';

function readOffer(): FeaturedOffer {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? { ...defaultFeaturedOffer, ...JSON.parse(stored) } : defaultFeaturedOffer;
  } catch {
    return defaultFeaturedOffer;
  }
}

export function useFeaturedOffer() {
  const [offer, setOffer] = useState<FeaturedOffer>(readOffer);

  const saveOffer = (nextOffer: FeaturedOffer) => {
    setOffer(nextOffer);
    window.localStorage.setItem(storageKey, JSON.stringify(nextOffer));
  };

  return { offer, saveOffer };
}
