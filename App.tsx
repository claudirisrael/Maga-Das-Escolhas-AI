
import React, { useState, useEffect } from 'react';
import { SpreadType, DrawnCard, TarotCard, SavedReading } from './types';
import { DECK, SPREAD_CONFIGS } from './constants';
import { TarotCardView } from './components/TarotCardView';
import { getTarotInterpretation } from './services/geminiService';

const HISTORY_KEY = 'magadas_escolhas_history_v1';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const App: React.FC = () => {
  const [spreadType, setSpreadType] = useState<SpreadType | null>(null);
  const [selectedCards, setSelectedCards] = useState<(DrawnCard | null)[]>([]);
  const [question, setQuestion] = useState<string>('');
  const [isReading, setIsReading] = useState(false);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [step, setStep] = useState<'selection' | 'input' | 'result' | 'history'>('selection');
  const [isSelectorOpen, setIsSelectorOpen] = useState<{ index: number } | null>(null);
  const [history, setHistory] = useState<SavedReading[]>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<SavedReading | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) {
      try {
        const parsed: SavedReading[] = JSON.parse(raw);
        const now = Date.now();
        const validHistory = parsed.filter(item => (now - item.timestamp) < SEVEN_DAYS_MS);
        setHistory(validHistory);
      } catch (e) {
        console.error("Erro ao carregar histórico", e);
      }
    }
  }, []);

  const saveToHistory = (newReading: SavedReading) => {
    const updated = [newReading, ...history].slice(0, 50);
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const initInputMode = (type: SpreadType) => {
    setSpreadType(type);
    const config = SPREAD_CONFIGS[type];
    setSelectedCards(new Array(config.positions.length).fill(null));
    setStep('input');
    setInterpretation(null);
    setCopied(false);
  };

  const assignCard = (deckCard: TarotCard, isReversed: boolean) => {
    if (isSelectorOpen === null) return;
    const newSelected = [...selectedCards];
    newSelected[isSelectorOpen.index] = {
      card: deckCard,
      isReversed,
      position: SPREAD_CONFIGS[spreadType!].positions[isSelectorOpen.index]
    };
    setSelectedCards(newSelected);
    setIsSelectorOpen(null);
  };

  const isComplete = selectedCards.every(card => card !== null);
  const usedCardIds = selectedCards.filter(c => c !== null).map(c => c!.card.id);

  const performReading = async () => {
    if (!spreadType || !isComplete) return;
    setIsReading(true);
    setStep('result');
    const result = await getTarotInterpretation(spreadType, selectedCards as DrawnCard[], question);
    setInterpretation(result);
    setIsReading(false);

    const newReading: SavedReading = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      question: question || "Consulta Geral",
      spreadType: spreadType,
      drawnCards: selectedCards as DrawnCard[],
      interpretation: result
    };
    saveToHistory(newReading);
  };

  const handleCopy = async () => {
    if (!interpretation) return;
    try {
      await navigator.clipboard.writeText(interpretation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  const reset = () => {
    setStep('selection');
    setSpreadType(null);
    setSelectedCards([]);
    setInterpretation(null);
    setQuestion('');
    setSelectedHistoryItem(null);
    setCopied(false);
  };

  const openHistoryItem = (item: SavedReading) => {
    setSelectedHistoryItem(item);
    setSpreadType(item.spreadType);
    setSelectedCards(item.drawnCards);
    setQuestion(item.question);
    setInterpretation(item.interpretation);
    setStep('result');
    setCopied(false);
  };

  const renderAphroditeLayout = (cards: (DrawnCard | null)[], isInput: boolean = false) => {
    const getCard = (idx: number) => {
      const cardData = cards[idx];
      return (
        <div key={idx} className="flex flex-col items-center">
          {cardData ? (
            <TarotCardView 
              drawnCard={cardData} 
              isRevealed={true} 
              size="sm" 
              onClick={isInput ? () => setIsSelectorOpen({ index: idx }) : undefined}
            />
          ) : (
            <button 
              onClick={() => setIsSelectorOpen({ index: idx })}
              className="w-24 h-40 border-2 border-dashed border-violet-500/40 rounded-xl flex items-center justify-center hover:border-violet-400 transition group bg-violet-950/20"
            >
              <span className="text-3xl text-violet-500/40 group-hover:text-violet-400">+</span>
            </button>
          )}
          <span className="text-[9px] text-violet-400 mt-2 font-cinzel text-center leading-none uppercase tracking-tighter h-6 flex items-center">
            {SPREAD_CONFIGS[SpreadType.APHRODITE].positions[idx].name}
          </span>
        </div>
      );
    };

    return (
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto py-6">
        <div className="grid grid-cols-3 gap-x-4 md:gap-x-12 gap-y-4 items-center">
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-cinzel text-violet-300 text-center mb-1 opacity-70">Consulente</h4>
            {getCard(0)}
            {getCard(2)}
            {getCard(4)}
          </div>
          <div className="flex flex-col items-center justify-center">
             <h4 className="text-[10px] font-cinzel text-violet-100 text-center mb-1 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">O Destino</h4>
             {getCard(6)}
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-cinzel text-indigo-300 text-center mb-1 opacity-70">Parceiro</h4>
            {getCard(1)}
            {getCard(3)}
            {getCard(5)}
          </div>
        </div>
      </div>
    );
  };

  const renderStandardLayout = (cards: (DrawnCard | null)[], isInput: boolean = false) => {
    return (
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 py-6">
        {cards.map((card, idx) => (
          <div key={idx} className="flex flex-col items-center">
            {card ? (
              <TarotCardView 
                drawnCard={card} 
                isRevealed={true} 
                size="md" 
                onClick={isInput ? () => setIsSelectorOpen({ index: idx }) : undefined}
              />
            ) : (
              <button 
                onClick={() => setIsSelectorOpen({ index: idx })}
                className="w-32 h-52 md:w-40 md:h-64 border-2 border-dashed border-violet-500/40 rounded-xl flex items-center justify-center hover:border-violet-400 transition group bg-violet-950/20"
              >
                <span className="text-4xl text-violet-500/40 group-hover:text-violet-400">+</span>
              </button>
            )}
            <span className="text-[10px] text-violet-300 mt-4 font-cinzel uppercase tracking-widest text-center opacity-80">
              {SPREAD_CONFIGS[spreadType!].positions[idx].name}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen mystic-gradient flex flex-col items-center p-4 md:p-8">
      <header className="mb-12 md:mb-16 text-center w-full relative max-w-4xl">
        <h1 
          className="text-4xl md:text-6xl font-cinzel text-violet-200 mb-2 drop-shadow-[0_0_20px_rgba(167,139,250,0.6)] tracking-[0.2em] cursor-pointer floating glow-text" 
          onClick={reset}
        >
          Maga Das Escolhas AI
        </h1>
        <p className="text-violet-400/60 italic text-sm md:text-base tracking-widest font-light">Desvendando caminhos, um arcano por vez</p>
        
        {step !== 'history' && (
          <button 
            onClick={() => setStep('history')}
            className="absolute right-0 top-1/2 -translate-y-1/2 px-5 py-2 border border-violet-500/20 rounded-full text-[10px] font-cinzel text-violet-300 hover:bg-violet-900/20 hover:border-violet-400 transition-all duration-300"
          >
            Memórias
          </button>
        )}
      </header>

      <main className="w-full max-w-6xl flex-1 flex flex-col items-center">
        {step === 'selection' && (
          <div className="flex flex-col items-center space-y-10 animate-fadeIn w-full">
            <h2 className="text-xl md:text-2xl font-cinzel text-violet-100 tracking-wider">Qual jornada iniciaremos agora?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
              {Object.values(SPREAD_CONFIGS).map((config) => (
                <button 
                  key={config.id}
                  onClick={() => initInputMode(config.id)}
                  className="p-8 bg-slate-900/40 maga-border rounded-2xl transition-all duration-500 group text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                     <span className="text-6xl font-cinzel">✧</span>
                  </div>
                  <div className="text-violet-200 group-hover:text-violet-50 group-hover:glow-text transition-all duration-300 mb-3 font-cinzel text-xl">
                    {config.title}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">{config.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'history' && (
          <div className="w-full max-w-4xl animate-fadeIn space-y-8">
            <div className="flex justify-between items-center border-b border-violet-500/10 pb-6">
               <h2 className="text-2xl font-cinzel text-violet-200 tracking-widest">Memórias do Oráculo</h2>
               <button onClick={reset} className="text-violet-400 hover:text-white text-xs font-cinzel uppercase tracking-widest border border-violet-500/20 px-4 py-2 rounded-full transition-colors">Voltar</button>
            </div>
            
            {history.length === 0 ? (
              <div className="py-24 text-center text-slate-500 italic font-cinzel opacity-40">O silêncio do passado ainda não foi rompido.</div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {history.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => openHistoryItem(item)}
                    className="p-6 bg-slate-900/20 border border-violet-500/10 rounded-2xl hover:border-violet-500/40 transition-all cursor-pointer group hover:bg-violet-900/5"
                  >
                    <div className="flex justify-between items-start mb-3">
                       <span className="text-[10px] text-violet-400 font-cinzel uppercase tracking-[0.2em]">{SPREAD_CONFIGS[item.spreadType].title}</span>
                       <span className="text-[10px] text-slate-600 font-light">{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-200 text-sm font-light italic truncate group-hover:text-white transition">"{item.question}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 'input' && (
          <div className="flex flex-col items-center space-y-12 w-full animate-fadeIn">
            <div className="w-full max-w-2xl px-4">
              <label className="block text-violet-300 font-cinzel text-[10px] mb-3 uppercase tracking-[0.3em] opacity-80">Sua Intenção ou Pergunta</label>
              <textarea 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ex: O que o destino reserva para minha carreira?"
                className="w-full bg-slate-900/40 border border-violet-500/20 rounded-2xl p-6 text-slate-100 focus:border-violet-400 focus:ring-1 focus:ring-violet-400/20 focus:outline-none transition-all h-28 text-sm placeholder:text-violet-900/40"
              />
            </div>

            <div className="w-full">
              {spreadType === SpreadType.APHRODITE ? renderAphroditeLayout(selectedCards, true) : renderStandardLayout(selectedCards, true)}
            </div>

            <div className="flex gap-6 pt-4">
               <button onClick={reset} className="px-10 py-3 border border-slate-800 text-slate-500 rounded-full hover:bg-slate-900 hover:text-slate-300 transition-all text-[10px] font-cinzel tracking-widest uppercase">
                  Desistir
               </button>
               <button 
                disabled={!isComplete}
                onClick={performReading}
                className={`px-12 py-3 rounded-full font-cinzel uppercase tracking-[0.2em] text-[10px] shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-500 ${isComplete ? 'bg-violet-600 text-white hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]' : 'bg-slate-900 text-slate-700 cursor-not-allowed border border-slate-800'}`}
               >
                  Consultar Maga
               </button>
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="w-full animate-fadeIn px-2 md:px-0 max-w-5xl">
            <div className="mb-10 text-center">
              <span className="text-[9px] text-violet-500 font-cinzel uppercase tracking-[0.5em] mb-4 block">Manifestação Concluída</span>
              <div className="inline-block px-8 py-3 bg-violet-950/20 rounded-2xl border border-violet-500/10 italic text-slate-300">
                "{question || "Consulta Geral"}"
              </div>
            </div>

            <div className="py-4">
              {spreadType === SpreadType.APHRODITE ? renderAphroditeLayout(selectedCards) : renderStandardLayout(selectedCards)}
            </div>

            <div className="bg-slate-900/60 border border-violet-500/10 rounded-3xl p-8 md:p-16 shadow-2xl relative mt-16 backdrop-blur-sm">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050508] px-10 py-2 border border-violet-500/30 rounded-full text-violet-200 font-cinzel text-[10px] uppercase tracking-[0.4em] glow-text">
                Voz da Maga
              </div>
              
              {isReading ? (
                <div className="flex flex-col items-center space-y-8 py-20">
                   <div className="relative">
                      <div className="w-12 h-12 border-2 border-violet-500/20 rounded-full animate-ping absolute inset-0"></div>
                      <div className="w-12 h-12 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                   </div>
                   <p className="text-violet-300/40 animate-pulse font-cinzel tracking-[0.3em] text-[10px] uppercase">Lendo as energias do universo...</p>
                </div>
              ) : (
                <div className="animate-fadeIn">
                  <div className="text-violet-100/90 leading-[2] font-light text-lg whitespace-pre-line text-justify px-2 md:px-8 selection:bg-violet-500/30">
                    {interpretation}
                  </div>
                  
                  <div className="mt-16 pt-10 border-t border-violet-500/5 flex flex-wrap justify-center gap-6">
                    <button 
                      onClick={handleCopy} 
                      className={`px-10 py-4 border transition-all duration-500 rounded-full font-cinzel uppercase tracking-[0.2em] text-[10px] font-bold ${copied ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' : 'border-violet-500/20 text-violet-400 hover:bg-violet-900/10 hover:border-violet-400'}`}
                    >
                      {copied ? '✧ Guardado' : 'Transcrever'}
                    </button>
                    <button onClick={reset} className="px-10 py-4 bg-violet-600 text-white hover:bg-violet-500 transition-all duration-300 rounded-full font-cinzel uppercase tracking-[0.2em] text-[10px] font-bold shadow-lg">
                      Nova Escolha
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modal Seletor */}
      {isSelectorOpen !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#0c0a0f] border border-violet-500/20 rounded-3xl w-full max-w-5xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-fadeIn">
            <div className="p-8 border-b border-violet-500/10 flex justify-between items-center">
              <h3 className="text-xl font-cinzel text-violet-200 tracking-widest uppercase">O Chamado das Cartas</h3>
              <button onClick={() => setIsSelectorOpen(null)} className="text-slate-600 hover:text-white text-3xl transition-colors">&times;</button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6">
                {DECK.map(card => {
                  const isUsed = usedCardIds.includes(card.id);
                  return (
                    <button 
                      key={card.id}
                      disabled={isUsed}
                      onClick={() => assignCard(card, false)}
                      className={`relative aspect-[1/1.6] rounded-xl overflow-hidden border-2 transition-all duration-500 ${isUsed ? 'border-slate-900 opacity-5 grayscale cursor-not-allowed' : 'border-violet-900/40 hover:border-violet-400 group hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]'}`}
                    >
                      <img src={card.image_url} alt={card.name} className="w-full h-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-700" />
                      {!isUsed && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-violet-900/20">
                          <span className="text-white font-cinzel text-[8px] uppercase tracking-widest border border-white/30 px-2 py-1 rounded backdrop-blur-sm">Sentir</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="p-6 bg-[#08070b] text-center border-t border-violet-500/5">
               <p className="text-[9px] text-violet-800 uppercase tracking-[0.5em] font-light">Os Arcanos Maiores • Intuição e Destino</p>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-20 text-violet-900/40 text-[9px] uppercase tracking-[0.6em] text-center border-t border-violet-900/10 pt-10 w-full max-w-3xl pb-10">
        Maga Das Escolhas AI &copy; 2025 • Violet Intuition Engine
      </footer>
    </div>
  );
};

export default App;