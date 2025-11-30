import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface MessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  streamerName: string;
  streamerAvatar: string;
}

export default function MessageDialog({ open, onOpenChange, streamerName, streamerAvatar }: MessageDialogProps) {
  const [message, setMessage] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите текст сообщения',
        variant: 'destructive',
      });
      return;
    }

    setIsSending(true);

    setTimeout(() => {
      toast({
        title: '✉️ Сообщение отправлено!',
        description: `Ваше сообщение для ${streamerName} доставлено. Ждите ответа!`,
        className: 'gradient-orange-hover',
      });
      
      setIsSending(false);
      setMessage('');
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-primary/20 fade-slide-up">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gradient flex items-center gap-2">
            <Icon name="MessageCircle" size={24} className="text-primary" />
            Личное сообщение
          </DialogTitle>
          <DialogDescription className="text-base flex items-center gap-2 mt-3">
            <Avatar className="border-2 border-primary w-8 h-8">
              <AvatarFallback className="bg-primary text-black font-bold text-xs">
                {streamerAvatar}
              </AvatarFallback>
            </Avatar>
            <span>
              Отправить сообщение для <span className="text-primary font-semibold">{streamerName}</span>
            </span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="message" className="text-base font-semibold">
              Ваше сообщение
            </Label>
            <Textarea
              id="message"
              placeholder="Напишите ваш вопрос, пожелание или комментарий... 💌"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[150px] border-primary/30 focus:border-primary transition-all duration-300"
              maxLength={500}
              required
            />
            <p className="text-xs text-muted-foreground text-right">
              {message.length}/500
            </p>
          </div>

          <div className="bg-secondary/50 rounded-lg p-4 space-y-2 border border-primary/20">
            <h4 className="font-semibold flex items-center gap-2">
              <Icon name="Info" size={18} className="text-primary" />
              Правила общения
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>✅ Будьте вежливы и уважительны</li>
              <li>✅ Пишите конкретные вопросы или комментарии</li>
              <li>✅ Стример ответит, когда будет время</li>
              <li>✅ Не отправляйте спам или оскорбления</li>
            </ul>
          </div>

          <div className="bg-primary/10 rounded-lg p-4 space-y-2 border border-primary/30">
            <h4 className="font-semibold flex items-center gap-2 text-primary">
              <Icon name="Heart" size={18} />
              Почему это важно?
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>💬 Прямая связь со стримером</li>
              <li>🤝 Возможность дать обратную связь</li>
              <li>⭐ Поддержка и дружеское общение</li>
              <li>🎉 Станьте частью сообщества!</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 hover:bg-secondary transition-all duration-300"
              onClick={() => onOpenChange(false)}
              disabled={isSending}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="flex-1 gradient-orange-hover button-pulse hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить сообщение
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Пожалуйста, будьте терпеливы — стримеры отвечают, когда у них есть время ⏳
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
