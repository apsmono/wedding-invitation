import { motion } from 'framer-motion';
import { useInvitationStore } from '@/store/useInvitationStore';
import { Button } from '@/components/ui/Button';
import { BRIDE_NAME, COVER_IMAGE_SRC, GROOM_NAME, WEDDING_DATE } from '@/lib/constants';

export function OpeningScreen() {
  const { guestName, openInvitation, toggleMusic } = useInvitationStore();

  const handleOpen = () => {
    openInvitation();
    toggleMusic();
  };

  const displayName = guestName?.trim() || 'Tamu Undangan';
  const showCover = Boolean(COVER_IMAGE_SRC.trim());
  const openingDateLabel = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
    .format(WEDDING_DATE)
    .toUpperCase()
    .replace(/\s+/g, ' ');

  const patternBg =
    'linear-gradient(130deg, rgba(255,255,255,0.12), transparent 30%), repeating-linear-gradient(45deg, transparent 0, transparent 26px, rgba(98,71,44,0.03) 26px, rgba(98,71,44,0.03) 28px), repeating-linear-gradient(90deg, transparent 0, transparent 38px, rgba(122,95,70,0.03) 38px, rgba(122,95,70,0.03) 39px)';

  const fallbackPageBg =
    'radial-gradient(circle at top left, rgba(255,255,255,0.58), transparent 35%), radial-gradient(circle at 82% 10%, rgba(160,119,62,0.24), transparent 24%), radial-gradient(circle at 18% 88%, rgba(46,82,59,0.14), transparent 24%), linear-gradient(180deg, #f8f0e3 0%, #efe2cc 46%, #dcc6a4 100%)';

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-6 ${showCover ? 'bg-[#e5dcc8]' : ''}`}
      style={showCover ? undefined : { background: fallbackPageBg }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {showCover && (
        <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
          <img
            src={COVER_IMAGE_SRC}
            alt=""
            width={1600}
            height={2133}
            className="h-full min-h-[100dvh] w-full scale-[1.02] object-cover object-[50%_26%] min-[480px]:object-[50%_22%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0"
            style={{
              background: [
                'linear-gradient(180deg, rgba(248,240,227,0.62) 0%, rgba(248,240,227,0.12) 32%, transparent 55%)',
                'linear-gradient(0deg, rgba(248,240,227,0.99) 0%, rgba(248,240,227,0.82) 14%, rgba(55,42,30,0.18) 40%, transparent 58%)',
                'radial-gradient(ellipse 130% 80% at 50% 30%, transparent 0%, rgba(22,18,14,0.28) 100%)',
              ].join(','),
            }}
          />
        </div>
      )}

      <div
        className={`fixed inset-0 pointer-events-none z-[1] ${showCover ? 'opacity-40' : ''}`}
        style={{ background: patternBg }}
      />

      <motion.div
        className="relative z-10 text-center max-w-md drop-shadow-[0_1px_14px_rgba(248,240,227,0.55)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="flex justify-center mb-6 text-bronze-500"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" className="w-[clamp(132px,16vw,188px)] h-auto opacity-90">
            <path d="M0 20 Q30 0 60 20 Q90 40 120 20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
            <circle cx="20" cy="18" r="2" fill="currentColor" opacity="0.3"/>
            <circle cx="100" cy="22" r="2" fill="currentColor" opacity="0.3"/>
          </svg>
        </motion.div>

        <motion.p
          className="uppercase tracking-[0.22em] text-[0.74rem] text-brown-400 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Undangan Pernikahan
        </motion.p>

        <motion.div
          className="mx-auto mb-4 flex w-full max-w-[19rem] items-center justify-center gap-2.5 px-2 text-brown-500 sm:max-w-[24rem] sm:gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <span className="h-px flex-1 bg-brown-500/35" />
          <p className="whitespace-nowrap text-[0.72rem] font-medium uppercase tracking-[0.2em] leading-none sm:text-[0.8rem] sm:tracking-[0.24em]">
            {openingDateLabel} • INSYAALLAH
          </p>
          <span className="h-px flex-1 bg-brown-500/35" />
        </motion.div>

        <motion.h1
          className="mb-8 flex flex-col items-center gap-1.5 font-serif text-green-800 sm:gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-[clamp(2.35rem,9.2vw,4.7rem)] leading-[0.9] tracking-[0.01em]">{GROOM_NAME}</span>
          <span className="text-[clamp(1.05rem,3.9vw,1.5rem)] italic leading-none text-bronze-500/90">&amp;</span>
          <span className="text-[clamp(2.35rem,9.2vw,4.7rem)] leading-[0.9] tracking-[0.01em]">{BRIDE_NAME}</span>
        </motion.h1>

        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-[0.85rem] text-brown-400 mb-2">Kepada Yth.</p>
          <p className="text-[0.85rem] text-brown-400 mb-3">Bapak/Ibu/Saudara/i</p>
          <p className="font-serif text-[1.5rem] text-green-800 font-semibold" aria-live="polite">
            {displayName}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
          <Button onClick={handleOpen} className="px-8">
            Buka Undangan
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
