
import { Card, CardContent } from '@/components/ui/card';
import { Music, Mic, Users, Volume2 } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  count: number;
  onClick: () => void;
}

const CategoryCard = ({ title, description, icon, count, onClick }: CategoryCardProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'music':
        return <Music className="h-8 w-8 text-purple-600" />;
      case 'mic':
        return <Mic className="h-8 w-8 text-purple-600" />;
      case 'users':
        return <Users className="h-8 w-8 text-purple-600" />;
      case 'volume':
        return <Volume2 className="h-8 w-8 text-purple-600" />;
      default:
        return <Music className="h-8 w-8 text-purple-600" />;
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4">
          {getIcon(icon)}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-sm text-purple-600 font-medium">
          {count}+ Artists Available
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
