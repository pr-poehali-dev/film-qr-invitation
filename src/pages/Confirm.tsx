import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useSearchParams } from 'react-router-dom';

const Confirm = () => {
  const [searchParams] = useSearchParams();
  const vipNumber = searchParams.get('vip') || '';
  const [confirmed, setConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6 bg-card border-2 border-primary/30 animate-scale-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
            <Icon name="CheckCircle2" size={40} className="text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Отлично!</h2>
            <p className="text-muted-foreground">
              Ваше присутствие подтверждено. Мы ждём вас на показе!
            </p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">VIP #{vipNumber}</p>
            <p className="text-lg font-semibold text-foreground mt-1">{formData.name}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Инструкции отправлены на {formData.email}
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
      
      <Card className="relative max-w-lg w-full p-8 bg-card border-2 border-primary/30 shadow-2xl animate-fade-in">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer"></div>
        
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
              <Icon name="Ticket" size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Подтверждение присутствия</h1>
            <p className="text-muted-foreground">Заполните форму для регистрации на закрытый показ</p>
            {vipNumber && (
              <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mt-2">
                <span className="text-primary text-sm font-medium">VIP #{vipNumber}</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Полное имя</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-muted/20 border-primary/20 focus:border-primary"
                placeholder="Иван Иванов"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-muted/20 border-primary/20 focus:border-primary"
                placeholder="ivan@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-muted/20 border-primary/20 focus:border-primary"
                placeholder="+7 (999) 123-45-67"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attendance" className="text-foreground">Подтверждаете присутствие?</Label>
              <select
                id="attendance"
                required
                value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                className="w-full px-3 py-2 bg-muted/20 border border-primary/20 rounded-md text-foreground focus:outline-none focus:border-primary"
              >
                <option value="">Выберите ответ</option>
                <option value="yes">Да, буду присутствовать</option>
                <option value="no">К сожалению, не смогу</option>
                <option value="maybe">Пока не уверен(а)</option>
              </select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
            >
              <Icon name="Send" size={20} className="mr-2" />
              Подтвердить участие
            </Button>
          </form>

          <div className="flex items-center justify-center gap-2 pt-4 border-t border-primary/10">
            <Icon name="Shield" size={16} className="text-primary" />
            <p className="text-xs text-muted-foreground">
              Ваши данные защищены и не будут переданы третьим лицам
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Confirm;
