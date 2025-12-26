import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Security = () => {
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [result, setResult] = useState<{
    valid: boolean;
    used?: boolean;
    guest?: {
      full_name: string;
      email: string;
      phone: string;
    };
    error?: string;
  } | null>(null);

  const handleCheck = async () => {
    if (!qrCode.trim()) {
      alert('Введите QR-код');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`https://functions.poehali.dev/d6560aec-ce17-409c-936b-d99e319bed79?code=${encodeURIComponent(qrCode)}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async () => {
    if (!qrCode.trim()) return;

    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/d6560aec-ce17-409c-936b-d99e319bed79', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: qrCode })
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          valid: false,
          used: true,
          error: 'QR-код успешно активирован'
        });
        setQrCode('');
      } else {
        alert('Ошибка активации: ' + data.error);
      }
    } catch (error) {
      alert('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
      
      <Card className="relative max-w-lg w-full p-8 bg-card border-2 border-primary/30 shadow-2xl animate-fade-in">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer"></div>
        
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
              <Icon name="ShieldCheck" size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Проверка QR-кода</h1>
            <p className="text-muted-foreground">Панель охраны</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="qr_code" className="text-foreground">QR-код гостя</Label>
              <Input
                id="qr_code"
                type="text"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                className="bg-muted/20 border-primary/20 focus:border-primary font-mono"
                placeholder="Введите или отсканируйте код"
                onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              />
            </div>

            <Button 
              onClick={handleCheck}
              disabled={loading || !qrCode.trim()}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
            >
              {loading ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Проверка...
                </>
              ) : (
                <>
                  <Icon name="Search" size={20} className="mr-2" />
                  Проверить код
                </>
              )}
            </Button>
          </div>

          {result && (
            <div className={`p-6 rounded-lg border-2 animate-scale-in ${
              result.valid 
                ? 'bg-green-500/10 border-green-500/50' 
                : 'bg-red-500/10 border-red-500/50'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  result.valid ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  <Icon 
                    name={result.valid ? 'CheckCircle2' : 'XCircle'} 
                    size={24} 
                    className={result.valid ? 'text-green-500' : 'text-red-500'}
                  />
                </div>
                
                <div className="flex-1 space-y-3">
                  {result.valid ? (
                    <>
                      <h3 className="text-xl font-bold text-green-500">QR-код действителен</h3>
                      {result.guest && (
                        <div className="space-y-1 text-foreground">
                          <p className="text-lg font-semibold">{result.guest.full_name}</p>
                          <p className="text-sm text-muted-foreground">{result.guest.email}</p>
                          {result.guest.phone && (
                            <p className="text-sm text-muted-foreground">{result.guest.phone}</p>
                          )}
                        </div>
                      )}
                      <Button
                        onClick={handleActivate}
                        disabled={loading}
                        className="w-full bg-green-500 hover:bg-green-600 text-white"
                      >
                        <Icon name="UserCheck" size={20} className="mr-2" />
                        Активировать и пропустить
                      </Button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-red-500">
                        {result.used ? 'QR-код уже использован' : 'QR-код недействителен'}
                      </h3>
                      <p className="text-muted-foreground">{result.error}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 pt-4 border-t border-primary/10">
            <Icon name="Info" size={16} className="text-primary" />
            <p className="text-xs text-muted-foreground">
              Каждый QR-код можно использовать только один раз
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Security;
