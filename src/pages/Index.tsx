import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import DonationDialog from '@/components/DonationDialog';
import MessageDialog from '@/components/MessageDialog';

type Section = 'home' | 'streams' | 'categories' | 'subscriptions' | 'favorites' | 'chat' | 'notifications' | 'profile';

interface Stream {
  id: number;
  title: string;
  streamer: string;
  avatar: string;
  viewers: number;
  category: string;
  thumbnail: string;
  isLive: boolean;
}

const mockStreams: Stream[] = [
  {
    id: 1,
    title: 'Прохождение новой RPG | Легенда продолжается',
    streamer: 'GameMaster',
    avatar: 'GM',
    viewers: 1234,
    category: 'RPG',
    thumbnail: '🎮',
    isLive: true,
  },
  {
    id: 2,
    title: 'Турнир по CS2 | Финал чемпионата',
    streamer: 'ProGamer',
    avatar: 'PG',
    viewers: 5678,
    category: 'Шутеры',
    thumbnail: '🎯',
    isLive: true,
  },
  {
    id: 3,
    title: 'Рисую концепт-арты | Фэнтези мир',
    streamer: 'ArtStream',
    avatar: 'AS',
    viewers: 892,
    category: 'Творчество',
    thumbnail: '🎨',
    isLive: true,
  },
  {
    id: 4,
    title: 'Создание музыки в реальном времени',
    streamer: 'BeatMaker',
    avatar: 'BM',
    viewers: 445,
    category: 'Музыка',
    thumbnail: '🎵',
    isLive: true,
  },
  {
    id: 5,
    title: 'Разговоры обо всём | Just Chatting',
    streamer: 'TalkShow',
    avatar: 'TS',
    viewers: 2341,
    category: 'Общение',
    thumbnail: '💬',
    isLive: true,
  },
  {
    id: 6,
    title: 'Speedrun Dark Souls 3 | Мировой рекорд?',
    streamer: 'SpeedRunner',
    avatar: 'SR',
    viewers: 3567,
    category: 'Спидраны',
    thumbnail: '⚡',
    isLive: true,
  },
];

const categories = [
  { name: 'Шутеры', icon: '🎯', viewers: '15K' },
  { name: 'RPG', icon: '⚔️', viewers: '12K' },
  { name: 'Стратегии', icon: '🏰', viewers: '8K' },
  { name: 'Творчество', icon: '🎨', viewers: '5K' },
  { name: 'Музыка', icon: '🎵', viewers: '3K' },
  { name: 'Общение', icon: '💬', viewers: '10K' },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [donationDialogOpen, setDonationDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedStreamer, setSelectedStreamer] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');

  const handleDonateClick = (streamerName: string) => {
    setSelectedStreamer(streamerName);
    setDonationDialogOpen(true);
  };

  const handleMessageClick = (streamerName: string, avatar: string) => {
    setSelectedStreamer(streamerName);
    setSelectedAvatar(avatar);
    setMessageDialogOpen(true);
  };

  const navItems = [
    { id: 'home' as Section, label: 'Главная', icon: 'Home' },
    { id: 'streams' as Section, label: 'Стримы', icon: 'Video' },
    { id: 'categories' as Section, label: 'Категории', icon: 'Grid3x3' },
    { id: 'subscriptions' as Section, label: 'Подписки', icon: 'Bell' },
    { id: 'favorites' as Section, label: 'Избранное', icon: 'Heart' },
    { id: 'chat' as Section, label: 'Чат', icon: 'MessageCircle' },
    { id: 'notifications' as Section, label: 'Уведомления', icon: 'BellRing' },
    { id: 'profile' as Section, label: 'Профиль', icon: 'User' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-8">
            <div className="relative h-[400px] rounded-2xl overflow-hidden gradient-orange p-12 flex items-end shimmer-effect">
              <div className="space-y-4 fade-slide-up relative z-10">
                <h1 className="text-6xl font-bold">Добро пожаловать!</h1>
                <p className="text-xl text-white/90 max-w-2xl">
                  Смотри любимых стримеров, общайся с сообществом и получай эмоции в реальном времени
                </p>
                <Button size="lg" className="bg-black text-primary hover:bg-black/80 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                  Начать просмотр
                  <Icon name="Play" className="ml-2" size={20} />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between slide-in-left">
                <h2 className="text-3xl font-bold">🔴 Сейчас в эфире</h2>
                <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10 transition-all duration-300">
                  Показать всё
                  <Icon name="ArrowRight" className="ml-2" size={16} />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockStreams.map((stream, index) => (
                  <Card
                    key={stream.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer card-hover-lift fade-slide-up"
                  >
                    <div className="relative h-48 bg-secondary flex items-center justify-center text-6xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{stream.thumbnail}</span>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-red-600 text-white animate-pulse-glow shadow-lg shadow-red-600/50">
                          <Icon name="Radio" size={12} className="mr-1" />
                          LIVE
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
                          <Icon name="Users" size={12} className="mr-1" />
                          {stream.viewers.toLocaleString()}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex gap-3">
                        <Avatar className="border-2 border-primary group-hover:scale-110 transition-transform duration-300">
                          <AvatarFallback className="bg-primary text-black font-bold">
                            {stream.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors duration-300">
                            {stream.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">{stream.streamer}</p>
                          <Badge variant="outline" className="mt-1 text-xs border-primary/30 text-primary group-hover:bg-primary/10 transition-colors duration-300">
                            {stream.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMessageClick(stream.streamer, stream.avatar);
                          }}
                          variant="outline"
                          className="border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300"
                          size="sm"
                        >
                          <Icon name="MessageCircle" size={14} className="mr-1" />
                          Написать
                        </Button>
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDonateClick(stream.streamer);
                          }}
                          className="gradient-orange-hover hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                          size="sm"
                        >
                          <Icon name="Heart" size={14} className="mr-1" />
                          Донат
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold slide-in-right">🎯 Популярные категории</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat, index) => (
                  <Card
                    key={cat.name}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    className="group p-6 text-center cursor-pointer hover:border-primary/50 transition-all duration-300 card-hover-lift fade-slide-up"
                  >
                    <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300">{cat.icon}</div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{cat.viewers} зрителей</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'streams':
        return (
          <div className="space-y-6 slide-in-right">
            <h1 className="text-4xl font-bold text-gradient">Все стримы</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockStreams.map((stream, index) => (
                <Card
                  key={stream.id}
                  style={{ animationDelay: `${index * 0.08}s` }}
                  className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer card-hover-lift fade-slide-up"
                >
                  <div className="relative h-48 bg-secondary flex items-center justify-center text-6xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{stream.thumbnail}</span>
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-red-600 text-white animate-pulse-glow shadow-lg shadow-red-600/50">
                        <Icon name="Radio" size={12} className="mr-1" />
                        LIVE
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
                        <Icon name="Users" size={12} className="mr-1" />
                        {stream.viewers.toLocaleString()}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex gap-3">
                      <Avatar className="border-2 border-primary group-hover:scale-110 transition-transform duration-300">
                        <AvatarFallback className="bg-primary text-black font-bold">
                          {stream.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors duration-300">
                          {stream.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">{stream.streamer}</p>
                        <Badge variant="outline" className="mt-1 text-xs border-primary/30 text-primary group-hover:bg-primary/10 transition-colors duration-300">
                          {stream.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMessageClick(stream.streamer, stream.avatar);
                        }}
                        variant="outline"
                        className="border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300"
                        size="sm"
                      >
                        <Icon name="MessageCircle" size={14} className="mr-1" />
                        Написать
                      </Button>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDonateClick(stream.streamer);
                        }}
                        className="gradient-orange-hover hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                        size="sm"
                      >
                        <Icon name="Heart" size={14} className="mr-1" />
                        Донат
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'categories':
        return (
          <div className="space-y-6 slide-in-left">
            <h1 className="text-4xl font-bold text-gradient">Категории</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((cat, index) => (
                <Card
                  key={cat.name}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="group p-8 text-center cursor-pointer hover:border-primary/50 transition-all duration-300 card-hover-lift fade-slide-up"
                >
                  <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">{cat.icon}</div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-muted-foreground">{cat.viewers} зрителей</p>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'subscriptions':
        return (
          <div className="space-y-6 fade-slide-up">
            <h1 className="text-4xl font-bold text-gradient">Мои подписки</h1>
            <div className="text-center py-20">
              <Icon name="Bell" size={80} className="mx-auto text-muted-foreground mb-4 animate-scale-in" />
              <h2 className="text-2xl font-bold mb-2">Нет активных подписок</h2>
              <p className="text-muted-foreground mb-6">Подпишитесь на стримеров, чтобы не пропустить их трансляции</p>
              <Button className="gradient-orange-hover button-pulse hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                Найти стримеров
                <Icon name="Search" className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div className="space-y-6 fade-slide-up">
            <h1 className="text-4xl font-bold text-gradient">Избранное</h1>
            <div className="text-center py-20">
              <Icon name="Heart" size={80} className="mx-auto text-muted-foreground mb-4 animate-scale-in" />
              <h2 className="text-2xl font-bold mb-2">Список избранного пуст</h2>
              <p className="text-muted-foreground mb-6">Добавляйте любимые стримы в избранное для быстрого доступа</p>
              <Button className="gradient-orange-hover button-pulse hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                Посмотреть стримы
                <Icon name="Video" className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="space-y-6 slide-in-right">
            <h1 className="text-4xl font-bold text-gradient">Личные сообщения</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1 p-4 space-y-3">
                <h3 className="font-bold flex items-center gap-2">
                  <Icon name="MessageSquare" size={18} className="text-primary" />
                  Ваши чаты
                </h3>
                <div className="space-y-2">
                  {mockStreams.slice(0, 4).map((stream) => (
                    <button
                      key={stream.id}
                      onClick={() => handleMessageClick(stream.streamer, stream.avatar)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all duration-300 text-left"
                    >
                      <Avatar className="border-2 border-primary">
                        <AvatarFallback className="bg-primary text-black font-bold text-xs">
                          {stream.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{stream.streamer}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          Нажмите, чтобы написать...
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        <Icon name="Send" size={10} className="mr-1" />
                      </Badge>
                    </button>
                  ))}
                </div>
              </Card>
              
              <Card className="lg:col-span-2 p-6">
                <div className="h-[500px] flex items-center justify-center">
                  <div className="text-center fade-slide-up">
                    <Icon name="MessageCircle" size={80} className="mx-auto text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Начните общение</h2>
                    <p className="text-muted-foreground mb-6">
                      Выберите стримера слева или нажмите "Написать" на карточке стрима
                    </p>
                    <div className="flex flex-col gap-3 max-w-xs mx-auto">
                      <div className="bg-secondary/50 rounded-lg p-3 text-sm">
                        <Icon name="Info" size={16} className="inline mr-2 text-primary" />
                        Прямая связь со стримерами
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-3 text-sm">
                        <Icon name="Heart" size={16} className="inline mr-2 text-primary" />
                        Дружеское общение и поддержка
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6 fade-slide-up">
            <h1 className="text-4xl font-bold text-gradient">Уведомления</h1>
            <div className="text-center py-20">
              <Icon name="BellRing" size={80} className="mx-auto text-muted-foreground mb-4 animate-scale-in" />
              <h2 className="text-2xl font-bold mb-2">Нет новых уведомлений</h2>
              <p className="text-muted-foreground">Здесь будут появляться важные обновления от ваших стримеров</p>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6 slide-in-left">
            <h1 className="text-4xl font-bold text-gradient">Профиль</h1>
            <Card className="p-8 card-hover-lift">
              <div className="flex items-start gap-6 fade-slide-up">
                <Avatar className="w-32 h-32 border-4 border-primary animate-pulse-glow">
                  <AvatarFallback className="bg-primary text-black font-bold text-4xl">U</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-1">User123</h2>
                    <p className="text-muted-foreground">Зритель</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-all duration-300 hover:scale-105">
                      <div className="text-2xl font-bold text-primary">0</div>
                      <div className="text-sm text-muted-foreground">Подписок</div>
                    </div>
                    <div className="text-center p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-all duration-300 hover:scale-105">
                      <div className="text-2xl font-bold text-primary">0</div>
                      <div className="text-sm text-muted-foreground">Избранных</div>
                    </div>
                    <div className="text-center p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-all duration-300 hover:scale-105">
                      <div className="text-2xl font-bold text-primary">0</div>
                      <div className="text-sm text-muted-foreground">Просмотров</div>
                    </div>
                  </div>
                  <Button className="gradient-orange-hover button-pulse hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                    Редактировать профиль
                    <Icon name="Settings" className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-lg bg-background/80 shimmer-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Icon name="Play" size={24} className="text-black" />
              </div>
              <h1 className="text-2xl font-bold text-gradient">StreamHub</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110">
                <Icon name="Search" size={20} />
              </Button>
              <Button className="gradient-orange-hover button-pulse hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                <Icon name="Video" className="mr-2" size={16} />
                Начать стрим
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 border-r border-border/50 min-h-[calc(100vh-73px)] p-4 space-y-2 sticky top-[73px] slide-in-left">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'default' : 'ghost'}
              className={`w-full justify-start transition-all duration-300 ${
                activeSection === item.id
                  ? 'gradient-orange-hover shadow-lg shadow-primary/30'
                  : 'hover:bg-secondary hover:text-primary hover:translate-x-1'
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <Icon name={item.icon as any} className="mr-3" size={20} />
              {item.label}
            </Button>
          ))}
        </aside>

        <main className="flex-1 p-8">{renderContent()}</main>
      </div>

      <DonationDialog 
        open={donationDialogOpen} 
        onOpenChange={setDonationDialogOpen}
        streamerName={selectedStreamer}
      />

      <MessageDialog 
        open={messageDialogOpen} 
        onOpenChange={setMessageDialogOpen}
        streamerName={selectedStreamer}
        streamerAvatar={selectedAvatar}
      />
    </div>
  );
}