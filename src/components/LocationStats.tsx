
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Luggage } from 'lucide-react';
import { ClothingItem } from '@/types/clothing';

interface LocationStatsProps {
  clothingItems: ClothingItem[];
}

const LocationStats = ({ clothingItems }: LocationStatsProps) => {
  const house1Count = clothingItems.filter(item => item.location === 'house1').length;
  const house2Count = clothingItems.filter(item => item.location === 'house2').length;
  const travelCount = clothingItems.filter(item => item.location === 'travel').length;
  const totalCount = clothingItems.length;

  const stats = [
    {
      label: 'House 1',
      count: house1Count,
      icon: Home,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-600'
    },
    {
      label: 'House 2',
      count: house2Count,
      icon: Home,
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      iconColor: 'text-emerald-600'
    },
    {
      label: 'Travel Bag',
      count: travelCount,
      icon: Luggage,
      color: 'amber',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      iconColor: 'text-amber-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className={`border-0 shadow-md ${stat.bgColor}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${stat.textColor}`}>{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.count}</p>
                  <p className="text-xs text-slate-600">
                    {totalCount > 0 ? Math.round((stat.count / totalCount) * 100) : 0}% of total
                  </p>
                </div>
                <Icon size={24} className={stat.iconColor} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default LocationStats;
