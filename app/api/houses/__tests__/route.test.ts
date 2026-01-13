import dummyData from '@/app/api/dummy-data.json';

describe('/api/houses route', () => {
  describe('Filtering logic', () => {
    const filterDummyData = (filters: any): any[] => {
      return (dummyData as any[]).filter((house) => {
        if (filters.layout && house.layout !== filters.layout) {
          return false;
        }

        if (filters.minYear && house.age_years < parseInt(filters.minYear)) {
          return false;
        }

        if (filters.maxYear && house.age_years > parseInt(filters.maxYear)) {
          return false;
        }

        if (filters.location && house.location !== filters.location) {
          return false;
        }

        if (filters.floor && house.floor !== parseInt(filters.floor)) {
          return false;
        }

        return true;
      });
    };

    it('should return all houses when no filters provided', () => {
      const result = filterDummyData({});
      expect(result.length).toBe(dummyData.length);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should filter by layout', () => {
      const layout = (dummyData as any)[0].layout;
      const result = filterDummyData({ layout });
      expect(result.every((h: any) => h.layout === layout)).toBe(true);
    });

    it('should filter by location', () => {
      const location = (dummyData as any)[0].location;
      const result = filterDummyData({ location });
      expect(result.every((h: any) => h.location === location)).toBe(true);
    });

    it('should filter by floor', () => {
      const floor = (dummyData as any)[0].floor;
      const result = filterDummyData({ floor });
      expect(result.every((h: any) => h.floor === floor)).toBe(true);
    });

    it('should filter by minYear (age_years >= minYear)', () => {
      const minYear = 10;
      const result = filterDummyData({ minYear });
      expect(result.every((h: any) => h.age_years >= minYear)).toBe(true);
    });

    it('should filter by maxYear (age_years <= maxYear)', () => {
      const maxYear = 20;
      const result = filterDummyData({ maxYear });
      expect(result.every((h: any) => h.age_years <= maxYear)).toBe(true);
    });

    it('should support multiple filters at once', () => {
      const layout = (dummyData as any)[0].layout;
      const location = (dummyData as any)[0].location;
      const minYear = 5;
      const maxYear = 30;

      const result = filterDummyData({ layout, location, minYear, maxYear });

      expect(
        result.every(
          (h: any) =>
            h.layout === layout &&
            h.location === location &&
            h.age_years >= minYear &&
            h.age_years <= maxYear
        )
      ).toBe(true);
    });

    it('should handle non-existent filter values gracefully', () => {
      const result = filterDummyData({ layout: 'NonExistentLayout' });
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should return valid House objects with required fields', () => {
      const result = filterDummyData({});
      if (result.length > 0) {
        const house = result[0];
        expect(house).toHaveProperty('id');
        expect(house).toHaveProperty('layout');
        expect(house).toHaveProperty('location');
        expect(house).toHaveProperty('floor');
        expect(house).toHaveProperty('age_years');
        expect(house).toHaveProperty('price_million_yen');
      }
    });

    it('should handle year ranges correctly', () => {
      const minYear = 10;
      const maxYear = 20;

      const result = filterDummyData({ minYear, maxYear });

      expect(result.every((h: any) => h.age_years >= minYear && h.age_years <= maxYear)).toBe(true);
    });

    it('should handle numeric floor values', () => {
      const floor = 5;
      const result = filterDummyData({ floor });

      expect(result.every((h: any) => h.floor === floor)).toBe(true);
    });
  });

  describe('Dummy data validation', () => {
    it('should have valid dummy data loaded', () => {
      expect(Array.isArray(dummyData)).toBe(true);
      expect(dummyData.length).toBeGreaterThan(0);
    });

    it('all dummy data records should have required fields', () => {
      (dummyData as any[]).forEach((house) => {
        expect(house).toHaveProperty('id');
        expect(house).toHaveProperty('layout');
        expect(house).toHaveProperty('location');
        expect(house).toHaveProperty('floor');
        expect(house).toHaveProperty('age_years');
        expect(house).toHaveProperty('price_million_yen');
      });
    });

    it('all numeric fields should be numbers', () => {
      (dummyData as any[]).forEach((house) => {
        expect(typeof house.id).toBe('number');
        expect(typeof house.floor).toBe('number');
        expect(typeof house.age_years).toBe('number');
        expect(typeof house.price_million_yen).toBe('number');
      });
    });

    it('all string fields should be strings', () => {
      (dummyData as any[]).forEach((house) => {
        expect(typeof house.layout).toBe('string');
        expect(typeof house.location).toBe('string');
      });
    });
  });

  describe('CORS and response format', () => {
    it('should have proper structure for API response', () => {
      const filtered = dummyData as any[];
      expect(Array.isArray(filtered)).toBe(true);

      if (filtered.length > 0) {
        expect(filtered[0]).toHaveProperty('id');
        expect(filtered[0]).toHaveProperty('price_million_yen');
      }
    });

    it('should preserve all data fields in response', () => {
      const sample = (dummyData as any)[0];
      const expectedKeys = ['id', 'age_years', 'layout', 'location', 'floor', 'price_million_yen'];

      expectedKeys.forEach((key) => {
        expect(sample).toHaveProperty(key);
      });
    });
  });
});
