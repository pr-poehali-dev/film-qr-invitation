import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [qrData, setQrData] = useState<{
    qr_code: string;
    full_name: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/1af444b3-f627-4468-8b72-51f3430e1df4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setQrData({
          qr_code: data.qr_code,
          full_name: data.full_name
        });
        setRegistered(true);
      } else {
        alert('Ошибка регистрации: ' + (data.error || 'Неизвестная ошибка'));
      }
    } catch (error) {
      alert('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  if (registered && qrData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6 bg-card border-2 border-primary/30 animate-scale-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
            <Icon name="CheckCircle2" size={40} className="text-primary" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Готово!</h2>
            <p className="text-muted-foreground">
              Ваш персональный QR-код готов
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg inline-block">
            <QRCodeSVG 
              value={qrData.qr_code}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>

          <div className="p-4 bg-muted/30 rounded-lg space-y-1">
            <p className="text-lg font-semibold text-foreground">{qrData.full_name}</p>
            <p className="text-sm text-muted-foreground">Покажите этот QR-код охране на входе</p>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 justify-center">
              <Icon name="AlertCircle" size={16} className="text-primary" />
              <p>QR-код одноразовый и действителен только для вас</p>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Icon name="Smartphone" size={16} className="text-primary" />
              <p>Сохраните скриншот или добавьте в избранное</p>
            </div>
          </div>

          <Button
            onClick={() => window.print()}
            variant="outline"
            className="w-full"
          >
            <Icon name="Printer" size={20} className="mr-2" />
            Распечатать QR-код
          </Button>
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
            <h1 className="text-3xl font-bold text-foreground">Регистрация на показ</h1>
            <p className="text-muted-foreground">Укажите ФИО для получения персонального QR-кода</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-foreground">Полное имя *</Label>
              <Input
                id="full_name"
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="bg-muted/20 border-primary/20 focus:border-primary"
                placeholder="Иван Иванович Петров"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email *</Label>
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
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-muted/20 border-primary/20 focus:border-primary"
                placeholder="+7 (999) 123-45-67"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
            >
              {loading ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Генерация QR-кода...
                </>
              ) : (
                <>
                  <Icon name="QrCode" size={20} className="mr-2" />
                  Получить QR-код
                </>
              )}
            </Button>
          </form>

          <div className="flex items-center justify-center gap-2 pt-4 border-t border-primary/10">
            <Icon name="Shield" size={16} className="text-primary" />
            <p className="text-xs text-muted-foreground">
              Ваши данные защищены и используются только для входа
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
