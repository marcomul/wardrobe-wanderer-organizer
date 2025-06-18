
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
      <div className="text-center py-8 md:py-12 text-slate-500">
        <div className="text-4xl md:text-6xl mb-3 md:mb-4">👕</div>
        <p className="text-base md:text-lg mb-2">No clothing items here yet</p>
        <p className="text-xs md:text-sm">Add some items to get started!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow border-0 shadow-sm">
            <CardContent className="p-3 md:p-4">
              <div className="flex justify-between items-start mb-2 md:mb-3">
                <h3 className="font-semibold text-slate-800 text-sm leading-tight flex-1 mr-2">{item.name}</h3>
                <div className="flex gap-1 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleMoveClick(item)}
                    className="h-7 w-7 md:h-8 md:w-8 p-0 hover:bg-blue-100"
                  >
                    <Move size={12} className="text-blue-600 md:size-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteItem(item.id)}
                    className="h-7 w-7 md:h-8 md:w-8 p-0 hover:bg-red-100"
                  >
                    <Trash size={12} className="text-red-600 md:size-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex gap-1 md:gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5">
                    {item.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
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
