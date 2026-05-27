/** City hero images — skylines and recognizable landmarks per GTA municipality. */

const city = (unsplashId: string) =>
  `https://images.unsplash.com/photo-${unsplashId}?w=800&h=600&fit=crop`;

export const CITY_IMAGES: Record<string, string> = {
  Toronto: city('1517090504586-fde19ea6066f'), // Toronto skyline / CN Tower
  Mississauga: city('1561154464-82e9adf32764'), // Mississauga city centre towers
  Oakville: city('1506905925346-21bda4d32df4'), // Lake Ontario waterfront
  Vaughan: city('1613490493576-7fde63acd811'), // Modern suburban cityscape
  Markham: city('1625244724120-1fd1d34d00f6'), // Contemporary urban district
  'Richmond Hill': city('1597047084897-51e81819a499'), // York Region community
  Brampton: city('1582063289852-62e3ba2747f8'), // Suburban streetscape
};

export function getCityImage(cityName: string): string {
  return CITY_IMAGES[cityName] ?? city('1486325212027-8081e485255e');
}
