import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface DonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  streamerName: string;
}

const suggestedAmounts = [50, 100, 200, 500, 1000];

export default function DonationDialog({ open, onOpenChange, streamerName }: DonationDialogProps) {
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleAmountClick = (value: number) => {
    setAmount(value.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: 'Ошибка',
        description: 'Введите корректную сумму доната',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      toast({
        title: '🎉 Донат отправлен!',
        description: `Спасибо за поддержку ${streamerName}! Ваш донат ${amount} ₽ получен.`,
        className: 'gradient-orange-hover',
      });
      
      setIsProcessing(false);
      setAmount('');
      setMessage('');
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-primary/20 fade-slide-up">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gradient flex items-center gap-2">
            <Icon name="Heart" size={24} className="text-primary" />
            Поддержать стримера
          </DialogTitle>
          <DialogDescription className="text-base">
            Отправьте донат <span className="text-primary font-semibold">{streamerName}</span> и станьте частью сообщества! 💖
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="amount" className="text-base font-semibold">
              Сумма доната (₽)
            </Label>
            <div className="grid grid-cols-5 gap-2 mb-3">
              {suggestedAmounts.map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant="outline"
                  className={`transition-all duration-300 hover:scale-105 ${
                    amount === value.toString()
                      ? 'gradient-orange-hover border-primary'
                      : 'border-primary/30 hover:border-primary/50'
                  }`}
                  onClick={() => handleAmountClick(value)}
                >
                  {value}
                </Button>
              ))}
            </div>
            <Input
              id="amount"
              type="number"
              placeholder="Введите сумму"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg border-primary/30 focus:border-primary transition-all duration-300"
              min="1"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="message" className="text-base font-semibold">
              Сообщение для стримера (необязательно)
            </Label>
            <Textarea
              id="message"
              placeholder="Напишите личное сообщение или пожелание... 🎤"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px] border-primary/30 focus:border-primary transition-all duration-300"
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground text-right">
              {message.length}/200
            </p>
          </div>

          <div className="bg-secondary/50 rounded-lg p-4 space-y-2 border border-primary/20">
            <h4 className="font-semibold flex items-center gap-2">
              <Icon name="CreditCard" size={18} className="text-primary" />
              Способы оплаты
            </h4>
            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>💳 Карты</span>
              <span>•</span>
              <span>PayPal</span>
              <span>•</span>
              <span>СБП</span>
              <span>•</span>
              <span>ЮMoney</span>
            </div>
          </div>

          <div className="bg-primary/10 rounded-lg p-4 space-y-2 border border-primary/30">
            <h4 className="font-semibold flex items-center gap-2 text-primary">
              <Icon name="Gift" size={18} />
              Почему это важно?
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>✅ Улучшение качества стримов</li>
              <li>✅ Новое оборудование и контент</li>
              <li>✅ Организация турниров и ивентов</li>
              <li>✅ Ваше сообщение появится в эфире!</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 hover:bg-secondary transition-all duration-300"
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="flex-1 gradient-orange-hover button-pulse hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                  Обработка...
                </>
              ) : (
                <>
                  <Icon name="Heart" size={18} className="mr-2" />
                  Отправить {amount ? `${amount} ₽` : 'донат'}
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Нажимая "Отправить", вы соглашаетесь с безопасной обработкой платежа
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
