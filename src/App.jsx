import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { movies, scheduleWeek } from './movies.js'
import styles from './App.module.css'

/* ─── helpers ────────────────────────────────────────── */
function fmtWeek(start, end) {
  const fmt = (d) => {
    const [, m, day] = d.split('-')
    return `${+day} ${['','jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'][+m]}`
  }
  return `${fmt(start)} — ${fmt(end)}`
}

function AgeBadge({ rating }) {
  const cls = rating === 'L' ? styles.badgeL : rating === '14' ? styles.badge14 : styles.badge16
  const label = rating === 'L' ? 'Livre' : `${rating} anos`
  return <span className={`${styles.badge} ${cls}`}>{label}</span>
}

/* ═══════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
      <img src="/logo-white.png" alt="Cinex Cinema" className={styles.navLogo} />
      <ul className={styles.navLinks}>
        <li><a href="#programacao">Programação</a></li>
        <li><a href="#info">Localização</a></li>
        <li><a href="#info">Contato</a></li>
      </ul>
      <div className={styles.navBadge}>
        <span className={styles.navDot} />
        Venda presencial
      </div>
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.heroGrain} />
      <motion.div
        className={styles.heroContent}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className={styles.heroEyebrow}>Cinema · Goiânia · GO</div>
        <h1 className={styles.heroTitle}>
          O Cinema<br />
          <span className={styles.heroTitleAccent}>Goiânia</span>
        </h1>
        <p className={styles.heroSub}>
          Programação {fmtWeek(scheduleWeek.start, scheduleWeek.end)}<br />
          Centro Cultural Oscar Niemeyer
        </p>
        <motion.a
          href="#programacao"
          className={styles.heroCta}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Ver programação
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>
      </motion.div>
      <div className={styles.heroScroll}>
        <span className={styles.heroScrollLabel}>Scroll</span>
        <div className={styles.heroScrollArrow} />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   POSTER CARD
═══════════════════════════════════════════════════════ */
const cardEntrance = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function PosterCard({ movie, index, onClick }) {
  const [err, setErr] = useState(false)
  return (
    <motion.article
      className={styles.card}
      custom={index}
      variants={cardEntrance}
      initial="hidden"
      animate="visible"
      onClick={() => onClick(movie)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(movie)}
      aria-label={`Ver ${movie.title}`}
    >
      {movie.poster && !err
        ? <img src={movie.poster} alt={movie.title} className={styles.cardImg} loading="lazy" onError={() => setErr(true)} />
        : <div className={styles.cardPlaceholder}>🎬</div>
      }
      <div className={styles.cardOverlay}>
        <div className={styles.cardTitle}>{movie.title}</div>
        <div className={styles.cardMeta}>
          <AgeBadge rating={movie.ageRating} />
          <span className={styles.cardGenre}>{movie.genre}</span>
        </div>
      </div>
    </motion.article>
  )
}

/* ═══════════════════════════════════════════════════════
   POSTER GRID
═══════════════════════════════════════════════════════ */
function PosterGrid({ onSelect }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section className={styles.section} id="programacao">
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Em <span>Cartaz</span></h2>
        <span className={styles.sectionWeek}>{fmtWeek(scheduleWeek.start, scheduleWeek.end)}</span>
      </div>
      <div className={styles.grid} ref={ref}>
        {inView && movies.map((m, i) => (
          <PosterCard key={m.id} movie={m} index={i} onClick={onSelect} />
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   MOVIE DETAIL — full-page overlay
═══════════════════════════════════════════════════════ */
function MovieDetail({ movie, onClose }) {
  const [playTrailer, setPlayTrailer] = useState(false)
  const [imgErr, setImgErr] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const sala1 = movie.sessions.filter((s) => s.room === 1)
  const sala2 = movie.sessions.filter((s) => s.room === 2)

  const content = (
    <motion.div
      className={styles.detailBackdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        className={styles.detailPanel}
        initial={{ opacity: 0, scale: 0.93, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Blurred poster bg */}
        <div className={styles.detailBg}>
          {movie.posterFull && <img src={movie.posterFull} alt="" className={styles.detailBgImg} aria-hidden />}
        </div>

        {/* Close */}
        <button className={styles.detailClose} onClick={onClose} aria-label="Fechar">✕</button>

        {/* Left — poster */}
        <div className={styles.detailPoster}>
          {movie.poster && !imgErr
            ? <img src={movie.poster} alt={movie.title} className={styles.detailPosterImg} onError={() => setImgErr(true)} />
            : <div className={styles.cardPlaceholder}>🎬</div>
          }
        </div>

        {/* Right — content */}
        <div className={styles.detailContent}>

          {/* Header */}
          <div className={styles.detailHeader}>
            <div className={styles.detailVersion}>{movie.version}</div>
            <h2 className={styles.detailTitle}>{movie.title}</h2>
            <div className={styles.detailMetaRow}>
              <AgeBadge rating={movie.ageRating} />
              <span className={styles.detailGenre}>{movie.genre}</span>
              <span className={styles.detailDistributor}>{movie.distributor}</span>
            </div>
          </div>

          {/* Synopsis */}
          {movie.synopsis && <p className={styles.detailSynopsis}>{movie.synopsis}</p>}

          {/* Trailer */}
          {movie.trailerKey && (
            <div className={styles.trailerBlock}>
              <div className={styles.blockLabel}>Trailer</div>
              <div className={styles.trailerBox}>
                {playTrailer ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&rel=0&modestbranding=1`}
                    title={`Trailer — ${movie.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className={styles.trailerThumb} onClick={() => setPlayTrailer(true)} role="button" aria-label="Assistir trailer">
                    <img
                      src={`https://img.youtube.com/vi/${movie.trailerKey}/maxresdefault.jpg`}
                      alt="Thumbnail do trailer"
                      className={styles.trailerThumbImg}
                    />
                    <div className={styles.playBtn}>
                      <div className={styles.playBtnInner}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                          <path d="M6 4l10 6-10 6V4z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Showtimes */}
          <div className={styles.showtimes}>
            <div className={styles.blockLabel}>Horários — semana {fmtWeek(scheduleWeek.start, scheduleWeek.end)}</div>
            {sala1.length > 0 && (
              <div className={styles.roomRow}>
                <span className={`${styles.roomTag} ${styles.sala1}`}>Sala 1</span>
                <div className={styles.timePills}>
                  {sala1.map((s, i) => (
                    <div className={styles.timePill} key={i}>
                      <span className={styles.timeHour}>{s.time}</span>
                      <span className={styles.timeVer}>{s.version}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {sala2.length > 0 && (
              <div className={styles.roomRow}>
                <span className={`${styles.roomTag} ${styles.sala2}`}>Sala 2</span>
                <div className={styles.timePills}>
                  {sala2.map((s, i) => (
                    <div className={styles.timePill} key={i}>
                      <span className={styles.timeHour}>{s.time}</span>
                      <span className={styles.timeVer}>{s.version}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Presencial */}
          <div className={styles.presencialBox}>
            <div className={styles.presencialIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a3 3 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a3 3 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"/>
              </svg>
            </div>
            <p>
              <strong>Venda somente presencial.</strong>{' '}
              Ingressos na bilheteria do Cinex — Centro Cultural Oscar Niemeyer, Goiânia.
            </p>
          </div>

        </div>
      </motion.div>
    </motion.div>
  )

  return createPortal(content, document.body)
}

/* ═══════════════════════════════════════════════════════
   INFO BAR
═══════════════════════════════════════════════════════ */
function InfoBar() {
  return (
    <section className={styles.infoBar} id="info">
      <div className={styles.infoBarInner}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Localização</span>
          <span className={styles.infoValue}>Centro Cultural Oscar Niemeyer</span>
          <span className={styles.infoSub}>Av. Dep. Jamel Cecílio, KM 01<br />Goiânia — GO, 74891-135</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Telefone</span>
          <a href="tel:+556236245147" className={styles.infoLink}>(62) 3624-5147</a>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Instagram</span>
          <a href="https://instagram.com/cinex.goiania" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>@cinex.goiania</a>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Ingressos</span>
          <span className={styles.infoValue}>Venda presencial</span>
          <span className={styles.infoSub}>Bilheteria no local</span>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <img src="/logo-white.png" alt="Cinex Cinema" className={styles.footerLogo} />
        <div className={styles.footerSocials}>
          <a href="https://instagram.com/cinex.goiania" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
          </a>
          <a href="https://wa.me/556236245147" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="WhatsApp">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
            </svg>
          </a>
        </div>
        <div className={styles.footerRight}>
          <span className={styles.footerPresencial}>Ingressos · Venda presencial</span>
          <span className={styles.footerCopy}>© 2026 Cinex Cinema · Goiânia, GO</span>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════ */
export default function App() {
  const [selected, setSelected] = useState(null)
  const open  = useCallback((m) => setSelected(m), [])
  const close = useCallback(() => setSelected(null), [])
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PosterGrid onSelect={open} />
        <InfoBar />
      </main>
      <Footer />
      <AnimatePresence>
        {selected && <MovieDetail key={selected.id} movie={selected} onClose={close} />}
      </AnimatePresence>
    </>
  )
}
