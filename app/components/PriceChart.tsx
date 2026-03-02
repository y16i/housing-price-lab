'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { House } from '@/app/lib/calcStats';

export interface PriceRange {
  min: number;
  max: number;
}

interface PriceChartProps {
  data: House[];
  onBarClick?: (priceRange: PriceRange) => void;
}

export default function PriceChart({ data, onBarClick }: PriceChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  // Initialize chart only once
  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current);
    }
  }, []);

  // Update chart when data changes
  useEffect(() => {
    if (!chartInstanceRef.current || data.length === 0) {
      return;
    }

    // Create price range buckets for histogram
    const min = Math.min(...data.map((h) => h.price_million_yen));
    const max = Math.max(...data.map((h) => h.price_million_yen));
    const bucketSize = Math.ceil((max - min + 1) / 8);
    const buckets: Record<string, { count: number; min: number; max: number }> = {};

    data.forEach((house) => {
      const bucketIndex = Math.floor((house.price_million_yen - min) / bucketSize);
      const bucketMin = min + bucketIndex * bucketSize;
      const bucketMax = min + (bucketIndex + 1) * bucketSize;
      const label = `¥${Math.round(bucketMin)}-${Math.round(bucketMax)}M`;

      if (!buckets[label]) {
        buckets[label] = { count: 0, min: bucketMin, max: bucketMax };
      }
      buckets[label].count += 1;
    });

    const labels = Object.keys(buckets);
    const counts = labels.map((label) => buckets[label].count);

    const option: echarts.EChartsOption = {
      color: ['#2563eb'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: labels,
        axisLabel: {
          interval: 0,
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: counts,
          type: 'bar',
          itemStyle: {
            color: '#2563eb',
          },
        },
      ],
    };

    chartInstanceRef.current.setOption(option);

    // Add click event handler
    const clickHandler = (params: any) => {
      if (params.componentSubType === 'bar' && onBarClick) {
        const dataIndex = params.dataIndex;
        const label = labels[dataIndex];
        const range = buckets[label];
        onBarClick({ min: range.min, max: range.max });
      }
    };

    chartInstanceRef.current.off('click', clickHandler);
    chartInstanceRef.current.on('click', clickHandler);
  }, [data, onBarClick]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      chartInstanceRef.current?.resize();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  if (data.length === 0) {
    return (
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <p className="text-gray-600">No data available for the selected filters</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-xl p-6 w-full">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Price Distribution</h3>
      <div ref={chartRef} style={{ height: '300px', width: '100%' }} />
    </div>
  );
}
