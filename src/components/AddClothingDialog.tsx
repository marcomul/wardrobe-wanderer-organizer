
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClothingItem, Location, CLOTHING_CATEGORIES, SEASONS, COLORS } from '@/types/clothing';

interface AddClothingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<ClothingItem, 'id'>) => void;
  defaultLocation: Location;
}

const AddClothingDialog = ({ isOpen, onClose, onAdd, defaultLocation }: AddClothingDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: defaultLocation,
    color: '',
    season: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.category && formData.color && formData.season) {
      onAdd(formData);
      setFormData({
        name: '',
        category: '',
        location: defaultLocation,
        color: '',
        season: ''
      });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      category: '',
      location: defaultLocation,
      color: '',
      season: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-slate-800">Add New Clothing Item</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-slate-700">Item Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Blue Denim Jacket"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-slate-700">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CLOTHING_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="color" className="text-slate-700">Color</Label>
            <Select
              value={formData.color}
              onValueChange={(value) => setFormData({ ...formData, color: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {COLORS.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="season" className="text-slate-700">Season</Label>
            <Select
              value={formData.season}
              onValueChange={(value) => setFormData({ ...formData, season: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select season" />
              </SelectTrigger>
              <SelectContent>
                {SEASONS.map((season) => (
                  <SelectItem key={season} value={season}>
                    {season}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location" className="text-slate-700">Location</Label>
            <Select
              value={formData.location}
              onValueChange={(value: Location) => setFormData({ ...formData, location: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house1">House 1</SelectItem>
                <SelectItem value="house2">House 2</SelectItem>
                <SelectItem value="travel">Travel Bag</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Add Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClothingDialog;
