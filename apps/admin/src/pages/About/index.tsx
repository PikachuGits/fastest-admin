import { useState } from 'react';

interface Card {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  description: string;
  isFlipped: boolean;
}

const cardData: Omit<Card, 'id' | 'isFlipped'>[] = [
  {
    name: "龙之守护者",
    rarity: "legendary",
    image: "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "传说中的龙族守护者，拥有无尽的力量和智慧。"
  },
  {
    name: "森林精灵",
    rarity: "epic",
    image: "https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "来自古老森林的神秘精灵，掌控着自然的力量。"
  },
  {
    name: "火焰法师",
    rarity: "rare",
    image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "精通火焰魔法的强大法师，能够召唤地狱之火。"
  },
  {
    name: "冰霜战士",
    rarity: "common",
    image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "来自极地的勇敢战士，武器永远不会融化。"
  },
  {
    name: "暗影刺客",
    rarity: "epic",
    image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "隐身于阴影中的致命刺客，无声无息地消灭敌人。"
  },
  {
    name: "光明圣骑士",
    rarity: "legendary",
    image: "https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "光明的化身，守护正义与和平的圣骑士。"
  }
];

function About() {
  const [drawnCards, setDrawnCards] = useState<Card[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number }>>([]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400 shadow-yellow-400/50';
      case 'epic': return 'border-purple-400 shadow-purple-400/50';
      case 'rare': return 'border-blue-400 shadow-blue-400/50';
      default: return 'border-gray-400 shadow-gray-400/50';
    }
  };

  const drawCard = () => {
    if (isDrawing) return;

    setIsDrawing(true);

    // 创建粒子效果
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setParticles(newParticles);

    // 粒子效果持续时间
    setTimeout(() => setParticles([]), 1000);

    setTimeout(() => {
      const randomCard = cardData[Math.floor(Math.random() * cardData.length)];
      const newCard: Card = {
        ...randomCard,
        id: Date.now().toString(),
        isFlipped: false
      };

      setDrawnCards(prev => [newCard, ...prev]);
      setIsDrawing(false);
    }, 1500);
  };

  const flipCard = (cardId: string) => {
    setDrawnCards(prev =>
      prev.map(card =>
        card.id === cardId
          ? { ...card, isFlipped: !card.isFlipped }
          : card
      )
    );
  };

  const resetCards = () => {
    setDrawnCards([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full blur-2xl"></div>
      </div>

      {/* 粒子效果 */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${Math.random() * 0.5}s`
          }}
        >
        </div>
      ))}

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            卡牌抽取
          </h1>
          <p className="text-gray-300 text-lg">点击抽卡按钮，获得你的专属卡牌</p>
        </div>

        {/* 抽卡按钮 */}
        <div className="text-center mb-8">
          <button
            onClick={drawCard}
            disabled={isDrawing}
            className={`
              relative overflow-hidden px-8 py-4 rounded-full font-semibold text-lg
              transition-all duration-300 transform hover:scale-105
              ${isDrawing
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
              }
            `}
          >
            {isDrawing ? (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>抽取中...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>抽取卡牌</span>
              </div>
            )}

            {!isDrawing && (
              <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            )}
          </button>
        </div>

        {/* 重置按钮 */}
        {drawnCards.length > 0 && (
          <div className="text-center mb-8">
            <button
              onClick={resetCards}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              <span>重置卡牌</span>
            </button>
          </div>
        )}

        {/* 卡牌展示区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {drawnCards.map((card, index) => (
            <div
              key={card.id}
              className={`
                relative transform transition-all duration-500 hover:scale-105
                ${index === 0 ? 'animate-bounce' : ''}
              `}
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: index === 0 ? 'slideIn 0.5s ease-out' : undefined
              }}
            >
              <div
                className="relative w-full h-96 cursor-pointer perspective-1000"
                onClick={() => flipCard(card.id)}
              >
                <div
                  className={`
                    absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d
                    ${card.isFlipped ? 'rotate-y-180' : ''}
                  `}
                >
                  {/* 卡牌正面 */}
                  <div className={`
                    absolute inset-0 w-full h-full backface-hidden
                    bg-gradient-to-br ${getRarityColor(card.rarity)}
                    rounded-xl border-2 ${getRarityBorder(card.rarity)}
                    shadow-2xl overflow-hidden
                  `}>
                    <div className="relative h-full p-4">
                      <div className="relative h-2/3 mb-4 overflow-hidden rounded-lg">
                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                      </div>

                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-2">{card.name}</h3>
                        <span className={`
                          px-3 py-1 rounded-full text-sm font-medium
                          ${card.rarity === 'legendary' ? 'bg-yellow-500 text-black' : ''}
                          ${card.rarity === 'epic' ? 'bg-purple-500 text-white' : ''}
                          ${card.rarity === 'rare' ? 'bg-blue-500 text-white' : ''}
                          ${card.rarity === 'common' ? 'bg-gray-500 text-white' : ''}
                        `}>
                          {card.rarity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 卡牌背面 */}
                  <div className={`
                    absolute inset-0 w-full h-full backface-hidden rotate-y-180
                    bg-gradient-to-br from-slate-800 to-slate-900
                    rounded-xl border-2 border-slate-600
                    shadow-2xl p-6 flex flex-col justify-center
                  `}>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-4 text-purple-300">{card.name}</h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">{card.description}</p>
                      <div className="flex justify-center">
                        <span className={`
                          px-4 py-2 rounded-full font-medium
                          ${card.rarity === 'legendary' ? 'bg-yellow-500 text-black' : ''}
                          ${card.rarity === 'epic' ? 'bg-purple-500 text-white' : ''}
                          ${card.rarity === 'rare' ? 'bg-blue-500 text-white' : ''}
                          ${card.rarity === 'common' ? 'bg-gray-500 text-white' : ''}
                        `}>
                          {card.rarity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 提示信息 */}
        {drawnCards.length === 0 && !isDrawing && (
          <div className="text-center text-gray-400 mt-16">
            <p className="text-lg">还没有抽到卡牌，快来试试手气吧！</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}

export default About;