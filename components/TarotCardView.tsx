
import React from 'react';
import { DrawnCard } from '../types';

interface TarotCardViewProps {
  drawnCard: DrawnCard;
  isRevealed: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const TarotCardView: React.FC<TarotCardViewProps> = ({ drawnCard, isRevealed, onClick, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-24 h-40',
    md: 'w-32 h-52 md:w-40 md:h-64',
    lg: 'w-48 h-72 md:w-56 md:h-88'
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`relative perspective-1000 ${sizeClasses[size]} cursor-pointer group ${isRevealed ? 'card-flipped' : ''}`}
        onClick={onClick}
      >
        <div className={`card-inner relative w-full h-full duration-700 shadow-2xl rounded-xl transform-gpu`}>
          {/* Verso da Carta */}
          <div className="card-face card-back absolute inset-0 rounded-xl flex items-center justify-center">
            <div className="text-violet-300/20 text-xl font-cinzel select-none tracking-widest uppercase">Maga</div>
          </div>

          {/* Frente da Carta */}
          <div className={`card-face card-front absolute inset-0 rounded-xl overflow-hidden border-0 ${drawnCard.isReversed ? 'rotate-180' : ''}`}>
            <img 
              src={drawnCard.card.image_url} 
              alt={drawnCard.card.name}
              className="w-full h-full object-cover transition duration-1000 brightness-75 group-hover:brightness-105 scale-100 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay sutil para textura */}
            <div className="absolute inset-0 bg-violet-900/5 pointer-events-none"></div>
          </div>
        </div>
        {onClick && (
          <div className="absolute -top-2 -right-2 w-7 h-7 bg-violet-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-[0_0_15px_rgba(124,58,237,0.5)] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:scale-110">
            ✎
          </div>
        )}
      </div>
    </div>
  );
};