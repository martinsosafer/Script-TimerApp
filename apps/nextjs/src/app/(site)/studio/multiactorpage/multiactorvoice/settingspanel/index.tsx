// components/SettingsPanel.tsx
"use client";

import { Label } from "@voiceai/ui/@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@voiceai/ui/@/components/ui/select";
import { Slider } from "@voiceai/ui/@/components/ui/slider";
import { Switch } from "@voiceai/ui/@/components/ui/switch";

import type { FilterType, MergeType } from "~/constants/types/voice";

interface SettingsPanelProps {
  isOpen: boolean;
  stability: number;
  similarity: number;
  mergeType: MergeType;
  overlapDuration: number;
  filterType: FilterType;
  filterValue: string;
  favoriteVoicesOnly: boolean;
  genderOptions: string[];
  typeOptions: string[];
  onStabilityChange: (value: number) => void;
  onSimilarityChange: (value: number) => void;
  onMergeTypeChange: (value: MergeType) => void;
  onOverlapDurationChange: (value: number) => void;
  onFilterTypeChange: (value: FilterType) => void;
  onFilterValueChange: (value: string) => void;
  onFavoriteVoicesOnlyChange: (value: boolean) => void;
}

export function SettingsPanel({
  isOpen,
  stability,
  similarity,
  mergeType,
  overlapDuration,
  filterType,
  filterValue,
  favoriteVoicesOnly,
  genderOptions,
  typeOptions,
  onStabilityChange,
  onSimilarityChange,
  onMergeTypeChange,
  onOverlapDurationChange,
  onFilterTypeChange,
  onFilterValueChange,
  onFavoriteVoicesOnlyChange,
}: SettingsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="mb-6 rounded-lg border bg-card p-4 shadow-sm">
      <h3 className="mb-3 text-lg lg:text-xl font-medium">Advanced Settings</h3>
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Stability */}
        <div className="space-y-2 px-2 lg:px-0">
          <Label className="text-sm lg:text-base" htmlFor="stability">
            Voice Stability: {stability}
          </Label>
          <Slider
            id="stability"
            value={[stability]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={(value) => onStabilityChange(value[0])}
          />
          <p className="text-xs lg:text-sm text-muted-foreground">
            Higher values make the voice more stable and consistent
          </p>
        </div>

        {/* Similarity */}
        <div className="space-y-2 px-2 lg:px-0">
          <Label className="text-sm lg:text-base" htmlFor="similarity">
            Voice Similarity: {similarity}
          </Label>
          <Slider
            id="similarity"
            value={[similarity]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={(value) => onSimilarityChange(value[0])}
          />
          <p className="text-xs lg:text-sm text-muted-foreground">
            Higher values make the voice more similar to the original
          </p>
        </div>

        {/* Merge Type */}
        <div className="space-y-2 px-2 lg:px-0">
          <Label className="text-sm lg:text-base">Merge Type</Label>
          <Select
            value={mergeType}
            onValueChange={(value: MergeType) => onMergeTypeChange(value)}
          >
            <SelectTrigger className="w-full lg:w-[200px]">
              <SelectValue placeholder="Select merge type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sequential">
                Sequential (One after another)
              </SelectItem>
              <SelectItem value="overlap">Overlap (Mix together)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs lg:text-sm text-muted-foreground">
            Choose how to combine multiple audio clips
          </p>
        </div>

        {/* Overlap Duration */}
        {mergeType === "overlap" && (
          <div className="space-y-2 px-2 lg:px-0">
            <Label className="text-sm lg:text-base" htmlFor="overlap">
              Overlap Duration: {overlapDuration}ms
            </Label>
            <Slider
              id="overlap"
              value={[overlapDuration]}
              min={0}
              max={2000}
              step={50}
              onValueChange={(value) => onOverlapDurationChange(value[0])}
            />
            <p className="text-xs lg:text-sm text-muted-foreground">
              How much audio clips should overlap when merging
            </p>
          </div>
        )}
      </div>

      {/* Voice Filters */}
      <div className="mt-4 space-y-2">
        <Label className="text-sm lg:text-base">Voice Filters</Label>
        <div className="flex flex-wrap gap-2">
          <Select
            value={filterType}
            onValueChange={(value: FilterType) => {
              onFilterTypeChange(value);
              onFilterValueChange("");
            }}
          >
            <SelectTrigger className="w-full lg:w-[150px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Voices</SelectItem>
              <SelectItem value="gender">By Gender</SelectItem>
              <SelectItem value="type">By Type</SelectItem>
            </SelectContent>
          </Select>

          {filterType === "gender" && (
            <Select value={filterValue} onValueChange={onFilterValueChange}>
              <SelectTrigger className="w-full lg:w-[150px]">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((gender) => (
                  <SelectItem key={gender} value={gender.toLowerCase()}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {filterType === "type" && (
            <Select value={filterValue} onValueChange={onFilterValueChange}>
              <SelectTrigger className="w-full lg:w-[150px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <div className="flex w-full lg:w-auto items-center space-x-2">
            <Switch
              id="favorites-only"
              checked={favoriteVoicesOnly}
              onCheckedChange={onFavoriteVoicesOnlyChange}
            />
            <Label className="text-sm lg:text-base" htmlFor="favorites-only">
              Favorites only
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
