import { MultiSeries, SingleSeries } from '@swimlane/ngx-charts';

import { createMultiSeries, createSingleSeries } from './mock-data.factory';

export const mockMultiSeriesSmall: MultiSeries = createMultiSeries(3);
export const mockMultiSeriesMedium: MultiSeries = createMultiSeries(10);
export const mockMultiSeriesLarge: MultiSeries = createMultiSeries(25);

export const mockSingleSeriesSmall: SingleSeries = createSingleSeries(3);
export const mockSingleSeriesMedium: SingleSeries = createSingleSeries(10);
export const mockSingleSeriesLarge: SingleSeries = createSingleSeries(25);
