import { QRCodeSVG } from 'qrcode.react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface MovieInvitationProps {
  guestName: string;
  vipNumber: string;
  movieTitle: string;
  tagline: string;
  date: string;
  time: string;
  venue: string;
  posterUrl: string;
}

const MovieInvitation = ({
  guestName,
  vipNumber,
  movieTitle,
  tagline,
  date,
  time,
  venue,
  posterUrl
}: MovieInvitationProps) => {
  const qrUrl = `${window.location.origin}/confirm?vip=${vipNumber}`;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
      
      <Card className="relative max-w-2xl w-full bg-card border-2 border-primary/30 shadow-2xl overflow-hidden animate-fade-in">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer"></div>
        
        <div className="p-8 md:p-12 space-y-8">
          <div className="text-center space-y-3 animate-scale-in">
            <div className="inline-block px-6 py-2 bg-primary/10 border border-primary/30 rounded-full">
              <span className="text-primary text-sm font-medium tracking-widest uppercase">Закрытый показ</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">{movieTitle}</h1>
            <p className="text-lg text-muted-foreground italic">{tagline}</p>
          </div>

          <div className="relative aspect-[2/3] max-w-sm mx-auto rounded-lg overflow-hidden shadow-2xl border-2 border-primary/20 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <img 
              src={posterUrl} 
              alt={movieTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-primary/10">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="Calendar" size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Дата</p>
                <p className="text-sm font-semibold text-foreground">{date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-primary/10">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="Clock" size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Время</p>
                <p className="text-sm font-semibold text-foreground">{time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-primary/10">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="MapPin" size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Место</p>
                <p className="text-sm font-semibold text-foreground">{venue}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-muted/50 to-muted/20 p-6 rounded-lg border-2 border-primary/20 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Персональное приглашение</p>
                <h3 className="text-2xl font-bold text-foreground">{guestName}</h3>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-primary rounded-full">
                    <span className="text-xs font-bold text-primary-foreground">VIP #{vipNumber}</span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="p-4 bg-white rounded-lg shadow-lg">
                  <QRCodeSVG 
                    value={qrUrl}
                    size={120}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <p className="text-center text-xs text-muted-foreground mt-2">Отсканируйте для подтверждения</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
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

export default MovieInvitation;
