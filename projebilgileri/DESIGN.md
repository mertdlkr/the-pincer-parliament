# The Pincer Parliament - Design System

> **KISKAÇ PARLAMENTOSU** - Brütalist Endüstriyel Terminal Estetiği

---

## 🎨 Renk Sistemi

### Zemin Renkleri (Backgrounds)

| Token | Hex | Kullanım |
|-------|-----|----------|
| `--bg-black` | `#000000` | Ana arka plan, saf karanlık |
| `--bg-dark` | `#0A0A0A` | Derin mekanik siyah, kartlar |
| `--bg-elevated` | `#111111` | Yükseltilmiş yüzeyler |
| `--bg-surface` | `#1A1A1A` | Modal, dropdown |

### Ana Vurgu - Turuncu (Accent)

| Token | Hex | Kullanım |
|-------|-----|----------|
| `--accent-orange` | `#FF4500` | Ana CTA, linkler, vurgular |
| `--accent-neon` | `#FF6700` | Hover state, aktif elemanlar |
| `--accent-glow` | `rgba(255, 69, 0, 0.3)` | Text shadow, glow efekti |
| `--accent-dim` | `rgba(255, 69, 0, 0.1)` | Hafif arka plan vurgusu |

### Metin Renkleri (Text)

| Token | Hex | Kullanım |
|-------|-----|----------|
| `--text-primary` | `#FF4500` | Ana başlıklar, turuncu fosfor |
| `--text-secondary` | `#CCCCCC` | Gövde metni |
| `--text-muted` | `#666666` | Açıklamalar, yardımcı metin |
| `--text-disabled` | `#444444` | Devre dışı elemanlar |

### Sınır Renkleri (Border)

| Token | Hex | Kullanım |
|-------|-----|----------|
| `--border-dark` | `#222222` | Standart sınır |
| `--border-medium` | `#333333` | Vurgulanmış sınır |
| `--border-accent` | `#FF4500` | Aktif, odaklanmış sınır |

---

## 📝 Tipografi

### Font Ailesi

```css
--font-mono: 'JetBrains Mono', 'Roboto Mono', 'Courier New', monospace;
```

**Sadece monospace** - Terminal havası zorunlu.

### Font Boyutları

| Token | Boyut | Kullanım |
|-------|-------|----------|
| `--text-xs` | 12px | Log timestamp, badge |
| `--text-sm` | 14px | Küçük etiketler |
| `--text-base` | 16px | Gövde metni |
| `--text-lg` | 18px | Alt başlıklar |
| `--text-xl` | 20px | Section başlıkları |
| `--text-2xl` | 24px | Panel başlıkları |
| `--text-3xl` | 32px | Sayfa başlıkları |
| `--text-4xl` | 40px | Hero başlık |

### Font Ağırlıkları

| Token | Ağırlık | Kullanım |
|-------|---------|----------|
| `--font-normal` | 400 | Normal metin |
| `--font-medium` | 500 | Vurgulanmış metin |
| `--font-bold` | 700 | Başlıklar |

---

## 📐 Aralıklar (Spacing)

### 4px Tabanlı Sistem

| Token | Değer |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |

---

## 🔲 Köşe Yuvarlaklığı (Border Radius)

| Token | Değer | Kullanım |
|-------|-------|----------|
| `--radius-none` | 0px | **Tercih edilen** - Brutalist keskin köşeler |
| `--radius-sm` | 2px | Minimal yuvarlaklık |
| `--radius-md` | 4px | Butonlar (isteğe bağlı) |

> **ÖNEMLİ:** Brütalist estetik için keskin köşeler tercih edilir.

---

## 🌫️ Gölgeler

### Terminal Glow

```css
.text-glow {
  text-shadow: 
    0 0 5px var(--accent-orange),
    0 0 10px var(--accent-glow);
}
```

### Box Glow

```css
.box-glow {
  box-shadow: 
    0 0 10px var(--accent-glow),
    inset 0 0 5px var(--accent-glow);
}
```

---

## 📺 CRT Efektleri

### Scanline Overlay

```css
.crt-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
}
```

### Flicker Animasyonu

```css
@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.95; }
  75% { opacity: 0.98; }
}

.flicker {
  animation: flicker 0.1s infinite;
}
```

### Typewriter Efekti

```css
@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: var(--accent-orange); }
}

.typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid var(--accent-orange);
  animation: 
    typewriter 2s steps(40, end),
    blink-caret 0.75s step-end infinite;
}
```

---

## 🧩 Bileşen Stilleri

### Button (Brutalist)

```css
.btn-primary {
  background: transparent;
  border: 2px solid var(--accent-orange);
  color: var(--accent-orange);
  font-family: var(--font-mono);
  font-weight: var(--font-bold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: var(--space-3) var(--space-6);
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-primary:hover {
  background: var(--accent-orange);
  color: var(--bg-black);
  box-shadow: 0 0 15px var(--accent-glow);
}
```

### Card (Industrial)

```css
.card {
  background: var(--bg-dark);
  border: 1px solid var(--border-medium);
  padding: var(--space-4);
}

.card-header {
  border-bottom: 1px solid var(--border-medium);
  padding-bottom: var(--space-2);
  margin-bottom: var(--space-4);
  color: var(--accent-orange);
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
```

### Input (Terminal)

```css
.input-terminal {
  background: var(--bg-black);
  border: 1px solid var(--border-medium);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  padding: var(--space-3);
}

.input-terminal:focus {
  outline: none;
  border-color: var(--accent-orange);
  box-shadow: 0 0 5px var(--accent-glow);
}

.input-terminal::placeholder {
  color: var(--text-muted);
}
```

### Badge (Status)

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-active {
  background: var(--accent-dim);
  border: 1px solid var(--accent-orange);
  color: var(--accent-orange);
}

.badge-idle {
  background: transparent;
  border: 1px solid var(--border-medium);
  color: var(--text-muted);
}
```

---

## 🦀 Ajan Hücresi (Agent Cell)

### Hexagon Shell Design

```css
.agent-cell {
  width: 64px;
  height: 64px;
  background: var(--bg-dark);
  border: 1px solid var(--border-medium);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;
}

.agent-cell:hover {
  border-color: var(--accent-orange);
  box-shadow: 0 0 10px var(--accent-glow);
}

.agent-cell[data-status="voting"] {
  border-color: var(--accent-orange);
  animation: pulse 1s infinite;
}

.agent-cell[data-status="molting"] {
  background: var(--accent-dim);
  animation: molt-glow 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes molt-glow {
  0%, 100% { box-shadow: 0 0 5px var(--accent-glow); }
  50% { box-shadow: 0 0 20px var(--accent-orange); }
}
```

### Status Indicator LED

```css
.status-led {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  right: 4px;
}

.status-led.active {
  background: var(--accent-orange);
  box-shadow: 0 0 6px var(--accent-orange);
}

.status-led.idle {
  background: var(--text-muted);
}
```

---

## 📟 Terminal Log Stilleri

```css
.terminal-log {
  background: var(--bg-black);
  border: 1px solid var(--border-medium);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  padding: var(--space-4);
  height: 300px;
  overflow-y: auto;
}

.log-line {
  display: flex;
  gap: var(--space-2);
  color: var(--text-secondary);
  margin-bottom: var(--space-1);
}

.log-timestamp {
  color: var(--text-muted);
}

.log-agent {
  color: var(--accent-orange);
  min-width: 80px;
}

.log-message {
  color: var(--text-secondary);
}

.log-line[data-type="system"] .log-agent {
  color: var(--text-primary);
}

.log-line[data-type="error"] .log-message {
  color: #FF6B6B;
}
```

---

## 📱 Responsive Breakpoints

| Token | Değer | Açıklama |
|-------|-------|----------|
| `--breakpoint-sm` | 640px | Küçük mobil |
| `--breakpoint-md` | 768px | Tablet |
| `--breakpoint-lg` | 1024px | Desktop |
| `--breakpoint-xl` | 1280px | Geniş ekran |

---

## 🚫 Yasak Kurallar

1. **ASLA MOR RENK KULLANMA** - `#800080`, `purple`, `violet` vb.
2. **ASLA GRADYAN KULLANMA** - `linear-gradient`, `radial-gradient` vb.
3. **ASLA ROUNDED CORNERS** - Minimal radius bile tercih edilmez
4. **ASLA INTER/ROBOTO/ARIAL** - Sadece monospace fontlar
5. **ASLA EMOJİ İKON** - SVG ikonlar kullan (Lucide, Heroicons)

---

## ✅ Kontrol Listesi

Tasarım doğrulama için:

- [ ] Tüm arka planlar saf siyah (#000000 veya yakın tonlar)
- [ ] Tüm vurgular turuncu (#FF4500)
- [ ] Tüm fontlar monospace
- [ ] Keskin köşeler (no border-radius veya minimal)
- [ ] Terminal/CRT estetiği mevcut
- [ ] Gradyan yok
- [ ] Mor renk yok
- [ ] Emoji ikon yok

---

*The Pincer Parliament - Kabuk değiştiren dijital devlet simülasyonu*
