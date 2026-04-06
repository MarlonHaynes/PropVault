'use client';
import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Input, Select, Checkbox } from '@/components/ui/FormElements';
import type { FilterState, PropertyType } from '@/types';

const propertyTypes: PropertyType[] = ['House', 'Condo', 'Townhouse', 'Apartment', 'Loft', 'Penthouse', 'Villa', 'Commercial'];
const cities = ['Toronto', 'Mississauga', 'Oakville', 'Vaughan', 'Markham', 'Richmond Hill', 'Brampton'];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'sqft-desc', label: 'Largest First' },
  { value: 'bedrooms-desc', label: 'Most Bedrooms' },
  { value: 'featured', label: 'Featured' },
];

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

export const defaultFilters: FilterState = {
  keyword: '', city: '', neighborhood: '', propertyType: [],
  listingType: '', minPrice: undefined, maxPrice: undefined,
  bedrooms: undefined, bathrooms: undefined, minSqft: undefined, maxSqft: undefined,
  furnished: false, petFriendly: false, parking: undefined, sort: 'newest',
};

export function AdvancedFilters({ filters, onChange }: Props) {
  const [expanded, setExpanded] = useState(false);

  function update(partial: Partial<FilterState>) { onChange({ ...filters, ...partial }); }
  function reset() { onChange(defaultFilters); }
  function toggleType(t: PropertyType) {
    update({ propertyType: filters.propertyType.includes(t) ? filters.propertyType.filter(x => x !== t) : [...filters.propertyType, t] });
  }
  const activeCount = [
    filters.city, filters.listingType, filters.keyword,
    filters.minPrice, filters.maxPrice, filters.bedrooms, filters.bathrooms,
    filters.furnished, filters.petFriendly,
    ...filters.propertyType,
  ].filter(Boolean).length;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl">
      <div className="flex flex-wrap items-center gap-3 p-4">
        <Input
          placeholder="Search by address, neighborhood, city..."
          value={filters.keyword}
          onChange={e => update({ keyword: e.target.value })}
          className="flex-1 min-w-[200px]"
        />
        <Select
          options={[{ value: 'sale', label: 'For Sale' }, { value: 'rent', label: 'For Rent' }, { value: 'new-development', label: 'New Dev' }]}
          placeholder="All Types"
          value={filters.listingType}
          onChange={e => update({ listingType: e.target.value })}
          className="w-36"
        />
        <Select
          options={sortOptions}
          value={filters.sort}
          onChange={e => update({ sort: e.target.value as FilterState['sort'] })}
          className="w-44"
        />
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-600 text-sm text-slate-300 hover:border-brand-gold hover:text-brand-gold transition-all whitespace-nowrap"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeCount > 0 && <span className="w-5 h-5 rounded-full bg-brand-gold text-slate-900 text-[10px] font-bold flex items-center justify-center">{activeCount}</span>}
        </button>
        {activeCount > 0 && (
          <button onClick={reset} className="text-slate-400 hover:text-red-400 transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {expanded && (
        <div className="border-t border-slate-700 p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Select
            label="City"
            options={cities.map(c => ({ value: c, label: c }))}
            placeholder="Any City"
            value={filters.city}
            onChange={e => update({ city: e.target.value })}
          />
          <Input
            label="Min Price"
            type="number"
            placeholder="$0"
            value={filters.minPrice || ''}
            onChange={e => update({ minPrice: e.target.value ? +e.target.value : undefined })}
          />
          <Input
            label="Max Price"
            type="number"
            placeholder="Any"
            value={filters.maxPrice || ''}
            onChange={e => update({ maxPrice: e.target.value ? +e.target.value : undefined })}
          />
          <Select
            label="Bedrooms"
            options={[1,2,3,4,5].map(n => ({ value: String(n), label: `${n}+ beds` }))}
            placeholder="Any"
            value={filters.bedrooms ? String(filters.bedrooms) : ''}
            onChange={e => update({ bedrooms: e.target.value ? +e.target.value : undefined })}
          />
          <Select
            label="Bathrooms"
            options={[1,2,3,4].map(n => ({ value: String(n), label: `${n}+ baths` }))}
            placeholder="Any"
            value={filters.bathrooms ? String(filters.bathrooms) : ''}
            onChange={e => update({ bathrooms: e.target.value ? +e.target.value : undefined })}
          />
          <Input
            label="Min Sqft"
            type="number"
            placeholder="0"
            value={filters.minSqft || ''}
            onChange={e => update({ minSqft: e.target.value ? +e.target.value : undefined })}
          />
          <div className="col-span-full">
            <p className="text-sm font-medium text-slate-300 mb-2">Property Type</p>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map(t => (
                <button key={t} onClick={() => toggleType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    filters.propertyType.includes(t) ? 'bg-brand-gold/20 border-brand-gold text-brand-gold' : 'border-slate-600 text-slate-400 hover:border-slate-400'
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-full flex flex-wrap gap-4">
            <Checkbox label="Furnished" checked={filters.furnished} onChange={v => update({ furnished: v })} />
            <Checkbox label="Pet Friendly" checked={filters.petFriendly} onChange={v => update({ petFriendly: v })} />
          </div>
        </div>
      )}
    </div>
  );
}
