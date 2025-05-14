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
      <h3 className="mb-3 font-medium">Advanced Settings</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="stability">Voice Stability: {stability}</Label>
          <Slider
            id="stability"
            value={[stability]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={(value) => onStabilityChange(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Higher values make the voice more stable and consistent
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="similarity">Voice Similarity: {similarity}</Label>
          <Slider
            id="similarity"
            value={[similarity]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={(value) => onSimilarityChange(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Higher values make the voice more similar to the original
          </p>
        </div>

        <div className="space-y-2">
          <Label>Merge Type</Label>
          <Select
            value={mergeType}
            onValueChange={(value: MergeType) => onMergeTypeChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select merge type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sequential">
                Sequential (One after another)
              </SelectItem>
              <SelectItem value="overlap">Overlap (Mix together)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Choose how to combine multiple audio clips
          </p>
        </div>

        {mergeType === "overlap" && (
          <div className="space-y-2">
            <Label htmlFor="overlap">
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
            <p className="text-xs text-muted-foreground">
              How much audio clips should overlap when merging
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <Label>Voice Filters</Label>
        <div className="flex flex-wrap gap-2">
          <Select
            value={filterType}
            onValueChange={(value: FilterType) => {
              onFilterTypeChange(value);
              onFilterValueChange("");
            }}
          >
            <SelectTrigger className="w-[150px]">
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
              <SelectTrigger className="w-[150px]">
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
              <SelectTrigger className="w-[150px]">
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

          <div className="flex items-center space-x-2">
            <Switch
              id="favorites-only"
              checked={favoriteVoicesOnly}
              onCheckedChange={onFavoriteVoicesOnlyChange}
            />
            <Label htmlFor="favorites-only">Favorites only</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
