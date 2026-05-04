import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import { BRIDE_NAME, GROOM_NAME, WEDDING_DATE_LABEL_LONG } from '@/lib/constants';

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="text-center pt-14 pb-12 relative scroll-mt-[var(--nav-offset,5rem)]"
    >
      <AnimatedSection>
        <div className="flex flex-col items-center gap-3.5 mb-6 sm:mb-8 text-bronze-500">
          <svg
            viewBox="0 0 120 40"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[clamp(132px,16vw,188px)] h-auto opacity-90"
          >
            <path
              d="M0 20 Q30 0 60 20 Q90 40 120 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
            />
            <circle cx="20" cy="18" r="2" fill="currentColor" opacity="0.3" />
            <circle cx="100" cy="22" r="2" fill="currentColor" opacity="0.3" />
          </svg>

          <div className="flex items-center justify-center gap-3 text-brown-600 w-full max-w-[22rem] sm:max-w-md mx-auto px-3 sm:px-0">
            <span className="h-px flex-1 bg-brown-500/35" />
            <p className="uppercase tracking-[0.16em] sm:tracking-[0.2em] font-medium text-[0.78rem] sm:text-[0.88rem] md:text-[0.94rem] whitespace-nowrap leading-none">
              {WEDDING_DATE_LABEL_LONG}
            </p>
            <span className="h-px flex-1 bg-brown-500/35" />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <h1 className="flex flex-col items-center gap-1 sm:gap-1.5 mb-6 sm:mb-7">
          <span className="text-[clamp(2.9rem,8vw,6.4rem)] leading-[0.92] tracking-[0.01em]">{GROOM_NAME}</span>
          <span className="italic font-normal text-[clamp(1.35rem,3vw,1.9rem)] text-bronze-500/90 leading-none">&amp;</span>
          <span className="text-[clamp(2.9rem,8vw,6.4rem)] leading-[0.92] tracking-[0.01em]">{BRIDE_NAME}</span>
        </h1>
      </AnimatedSection>

      <AnimatedSection delay={0.25}>
        <p className="max-w-[36rem] mx-auto px-2 text-[0.98rem] sm:text-[1.05rem] text-brown-500 leading-relaxed">
          Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada
          hari bahagia kami. Kehadiran serta doa restu panjenengan akan menjadi kebahagiaan yang sangat kami syukuri.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <Button href="#rsvp">Isi Konfirmasi</Button>
          <Button variant="secondary" href="#acara">
            Informasi Acara
          </Button>
        </div>
      </AnimatedSection>
    </section>
  );
}
