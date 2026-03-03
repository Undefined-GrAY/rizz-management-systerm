
import { Filter } from "./Filter";
import { SortBy } from "./SortBy";
import { Icon } from "./Icon";

export default function FilterOperations({
  showSearch = false,
  searchPlaceholder = "Search...",
  filterOptions,
  filterField = "status",
  sortOptions,
}) {
  return (
    <div>
      {/* Row 2: Search, Filter, Sort */}
      {(showSearch || filterOptions || sortOptions) && (
        <div className="flex items-center justify-between gap-4 pt-5  pb-5  dark:border-slate-800">
          {/* Left: Filter Tabs */}
          <div className="flex items-center gap-4">
            {filterOptions && (
              <Filter filterField={filterField} options={filterOptions} />
            )}
          </div>

          {/* Right: Search + Sort */}
          <div className="flex items-center gap-3">
            {showSearch && (
              <div className="relative w-80">
                <Icon
                  name="search"
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            )}

            {sortOptions && <SortBy options={sortOptions} />}
          </div>
        </div>
      )}
    </div>
  );
}
