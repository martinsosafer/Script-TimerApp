interface AdminFiltersProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedPlan: string;
  handlePlanChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  minCredits: number | "";
  handleMinCreditsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minDaysWithPlanAsc: number | "";
  handleMinDaysWithPlanAscChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  minDaysWithPlanDesc: number | "";
  handleMinDaysWithPlanDescChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  minDaysSinceCreationAsc: number | "";
  handleMinDaysSinceCreationAscChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  minDaysSinceCreationDesc: number | "";
  handleMinDaysSinceCreationDescChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

export default function AdminFilters({
  searchTerm,
  handleSearch,
  selectedPlan,
  handlePlanChange,
  minCredits,
  handleMinCreditsChange,
  minDaysWithPlanAsc,
  handleMinDaysWithPlanAscChange,
  minDaysWithPlanDesc,
  handleMinDaysWithPlanDescChange,
  minDaysSinceCreationAsc,
  handleMinDaysSinceCreationAscChange,
  minDaysSinceCreationDesc,
  handleMinDaysSinceCreationDescChange,
}: AdminFiltersProps) {
  return (
    <div className="mb-4 flex flex-wrap">
      <div className="mb-4 flex w-full flex-wrap md:mb-0 md:w-1/2">
        <input
          type="text"
          placeholder="Search by email, name or id"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      <div className="mb-4 flex w-full flex-wrap md:mb-0 md:w-1/4">
        <select
          value={selectedPlan}
          onChange={handlePlanChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        >
          <option value="">All Plans</option>
          <option value="student">Student</option>
          <option value="creator">Creator</option>
          <option value="business">Business</option>
        </select>
      </div>
      <div className="mb-4 flex w-full flex-wrap md:mb-0 md:w-1/4">
        <input
          type="number"
          placeholder="Min Credits"
          value={minCredits === "" ? "" : minCredits}
          onChange={handleMinCreditsChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      <div className="mb-4 flex w-full flex-wrap md:mb-0 md:w-1/4">
        <input
          type="number"
          placeholder="Min Days with Current Plan Asc"
          value={minDaysWithPlanAsc === "" ? "" : minDaysWithPlanAsc}
          onChange={handleMinDaysWithPlanAscChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      <div className="mb-4 flex w-full flex-wrap md:mb-0 md:w-1/4">
        <input
          type="number"
          placeholder="Max Days with Current Plan Desc"
          value={minDaysWithPlanDesc === "" ? "" : minDaysWithPlanDesc}
          onChange={handleMinDaysWithPlanDescChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      <div className="mb-4 flex w-full flex-wrap md:mb-0 md:w-1/4">
        <input
          type="number"
          placeholder="Min Days Since Creation Asc"
          value={minDaysSinceCreationAsc === "" ? "" : minDaysSinceCreationAsc}
          onChange={handleMinDaysSinceCreationAscChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
      <div className="mb-4 flex w-full flex-wrap md:mb-0 md:w-1/4">
        <input
          type="number"
          placeholder="Max Days Since Creation Desc"
          value={
            minDaysSinceCreationDesc === "" ? "" : minDaysSinceCreationDesc
          }
          onChange={handleMinDaysSinceCreationDescChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
    </div>
  );
}
