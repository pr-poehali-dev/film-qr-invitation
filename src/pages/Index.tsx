import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
      
      <Card className="relative max-w-3xl w-full p-12 bg-card border-2 border-primary/30 shadow-2xl animate-fade-in">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer"></div>
        
        <div className="space-y-8 text-center">
          <div className="space-y-4">
            <div className="inline-block px-6 py-2 bg-primary/10 border border-primary/30 rounded-full">
              <span className="text-primary text-sm font-medium tracking-widest uppercase">Закрытый показ</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">Тени прошлого</h1>
            <p className="text-xl text-muted-foreground italic">Некоторые секреты лучше оставить в темноте</p>
          </div>

          <div className="relative aspect-[2/3] max-w-md mx-auto rounded-lg overflow-hidden shadow-2xl border-2 border-primary/20">
            <img 
              src="https://cdn.poehali.dev/projects/5470209c-7cec-4199-aa23-b4ddcfef0eac/files/738f4e54-ba38-4731-a98d-dce8190b24f7.jpg"
              alt="Тени прошлого"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-primary/10">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="Calendar" size={20} className="text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Дата</p>
                <p className="text-sm font-semibold text-foreground">15 января 2025</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-primary/10">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="Clock" size={20} className="text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Время</p>
                <p className="text-sm font-semibold text-foreground">19:00</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-primary/10">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="MapPin" size={20} className="text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Место</p>
                <p className="text-sm font-semibold text-foreground">Кинотеатр Премьер</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <Button 
              onClick={() => navigate('/register')}
              className="w-full max-w-md bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
            >
              <Icon name="Ticket" size={24} className="mr-2" />
              Зарегистрироваться на показ
            </Button>

            <Button 
              onClick={() => navigate('/security')}
              variant="outline"
              className="w-full max-w-md border-primary/30 hover:bg-primary/10 py-6"
            >
              <Icon name="ShieldCheck" size={20} className="mr-2" />
              Панель охраны
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 pt-4">
            <Icon name="Sparkles" size={16} className="text-primary" />
            <p className="text-sm text-muted-foreground">
              Будьте первым, кто увидит эту историю на большом экране
            </p>
            <Icon name="Sparkles" size={16} className="text-primary" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;