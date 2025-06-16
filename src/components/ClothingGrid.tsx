
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Move, Trash } from 'lucide-react';
import { ClothingItem, Location } from '@/types/clothing';
import MoveItemDialog from './MoveItemDialog';
import { useState } from 'react';

interface ClothingGridProps {
  items: ClothingItem[];
  onMoveItem: (itemId: string, newLocation: Location) => void;
  onDeleteItem: (itemId: string) => void;
  currentLocation: Location;
}

const ClothingGrid = ({ items, onMoveItem, onDeleteItem, currentLocation }: ClothingGridProps) => {
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);

  const handleMoveClick = (item: ClothingItem) => {
    setSelectedItem(item);
    setMoveDialogOpen(true);
  };

  const handleMove = (newLocation: Location) => {
    if (selectedItem) {
      onMoveItem(selectedItem.id, newLocation);
      setMoveDialogOpen(false);
      setSelectedItem(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <div className="text-6xl mb-4">👕</div>
        <p className="text-lg mb-2">No clothing items here yet</p>
        <p className="text-sm">Add some items to get started!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-slate-800 text-sm">{item.name}</h3>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleMoveClick(item)}
                    className="h-8 w-8 p-0 hover:bg-blue-100"
                  >
                    <Move size={14} className="text-blue-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteItem(item.id)}
                    className="h-8 w-8 p-0 hover:bg-red-100"
                  >
                    <Trash size={14} className="text-red-600" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                    {item.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {item.color}
                  </Badge>
                </div>
                
                <div className="text-xs text-slate-600">
                  Season: {item.season}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <MoveItemDialog
        isOpen={moveDialogOpen}
        onClose={() => setMoveDialogOpen(false)}
        onMove={handleMove}
        currentLocation={currentLocation}
        itemName={selectedItem?.name || ''}
      />
    </>
  );
};

export default ClothingGrid;
