export const Red = '#C13E37';
export const White = '#FFFFFF';

export const ZoneColors = ['#d63865', '#4350af', '#d1dc59', '#e15141'] as const;

export const colorForZoneIndex = (zoneIndex: number): string => {
  return ZoneColors[zoneIndex % ZoneColors.length];
};
