
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Home, Luggage } from 'lucide-react';
import { Location } from '@/types/clothing';

interface MoveItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onMove: (newLocation: Location) => void;
  currentLocation: Location;
  itemName: string;
}

const MoveItemDialog = ({ isOpen, onClose, onMove, currentLocation, itemName }: MoveItemDialogProps) => {
  const locations = [
    { key: 'house1' as Location, label: 'House 1', icon: Home, color: 'blue' },
    { key: 'house2' as Location, label: 'House 2', icon: Home, color: 'emerald' },
    { key: 'travel' as Location, label: 'Travel Bag', icon: Luggage, color: 'amber' }
  ];

  const availableLocations = locations.filter(loc => loc.key !== currentLocation);

  const handleMove = (location: Location) => {
    onMove(location);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-slate-800">Move "{itemName}"</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          <p className="text-slate-600 text-sm mb-4">Where would you like to move this item?</p>
          
          {availableLocations.map((location) => {
            const Icon = location.icon;
            return (
              <Button
                key={location.key}
                onClick={() => handleMove(location.key)}
                variant="outline"
                className={`w-full justify-start gap-3 h-12 hover:bg-${location.color}-50 border-${location.color}-200`}
              >
                <Icon size={20} className={`text-${location.color}-600`} />
                <span className="text-slate-700">Move to {location.label}</span>
              </Button>
            );
          })}
          
          <Button onClick={onClose} variant="ghost" className="w-full mt-4">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoveItemDialog;
