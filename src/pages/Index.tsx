
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Home, Luggage, Move } from 'lucide-react';
import ClothingGrid from '@/components/ClothingGrid';
import AddClothingDialog from '@/components/AddClothingDialog';
import LocationStats from '@/components/LocationStats';
import { ClothingItem, Location } from '@/types/clothing';

const Index = () => {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([
    {
      id: '1',
      name: 'Blue Denim Jacket',
      category: 'Outerwear',
      location: 'house1',
      color: 'Blue',
      season: 'Spring/Fall'
    },
    {
      id: '2',
      name: 'White Cotton T-Shirt',
      category: 'Tops',
      location: 'house2',
      color: 'White',
      season: 'All Seasons'
    },
    {
      id: '3',
      name: 'Black Jeans',
      category: 'Bottoms',
      location: 'travel',
      color: 'Black',
      season: 'All Seasons'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location>('house1');

  const addClothingItem = (item: Omit<ClothingItem, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString()
    };
    setClothingItems([...clothingItems, newItem]);
  };

  const moveItem = (itemId: string, newLocation: Location) => {
    setClothingItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, location: newLocation } : item
      )
    );
  };

  const deleteItem = (itemId: string) => {
    setClothingItems(prev => prev.filter(item => item.id !== itemId));
  };

  const filteredItems = clothingItems.filter(item => item.location === selectedLocation);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Travel Wardrobe</h1>
          <p className="text-slate-600">Organize your clothing across multiple homes</p>
        </div>

        {/* Stats Overview */}
        <LocationStats clothingItems={clothingItems} />

        {/* Location Selector */}
        <Card className="mb-6 border-0 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-slate-700">Select Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 flex-wrap">
              <Button
                variant={selectedLocation === 'house1' ? 'default' : 'outline'}
                onClick={() => setSelectedLocation('house1')}
                className={`flex items-center gap-2 ${
                  selectedLocation === 'house1' 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'hover:bg-blue-50'
                }`}
              >
                <Home size={16} />
                House 1
              </Button>
              <Button
                variant={selectedLocation === 'house2' ? 'default' : 'outline'}
                onClick={() => setSelectedLocation('house2')}
                className={`flex items-center gap-2 ${
                  selectedLocation === 'house2' 
                    ? 'bg-emerald-600 hover:bg-emerald-700' 
                    : 'hover:bg-emerald-50'
                }`}
              >
                <Home size={16} />
                House 2
              </Button>
              <Button
                variant={selectedLocation === 'travel' ? 'default' : 'outline'}
                onClick={() => setSelectedLocation('travel')}
                className={`flex items-center gap-2 ${
                  selectedLocation === 'travel' 
                    ? 'bg-amber-600 hover:bg-amber-700' 
                    : 'hover:bg-amber-50'
                }`}
              >
                <Luggage size={16} />
                Travel Bag
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Location Inventory */}
        <Card className="mb-6 border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg text-slate-700">
              {selectedLocation === 'house1' && 'House 1 Inventory'}
              {selectedLocation === 'house2' && 'House 2 Inventory'}
              {selectedLocation === 'travel' && 'Travel Bag'}
            </CardTitle>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus size={16} className="mr-2" />
              Add Item
            </Button>
          </CardHeader>
          <CardContent>
            <ClothingGrid
              items={filteredItems}
              onMoveItem={moveItem}
              onDeleteItem={deleteItem}
              currentLocation={selectedLocation}
            />
          </CardContent>
        </Card>

        {/* Add Clothing Dialog */}
        <AddClothingDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAdd={addClothingItem}
          defaultLocation={selectedLocation}
        />
      </div>
    </div>
  );
};

export default Index;
