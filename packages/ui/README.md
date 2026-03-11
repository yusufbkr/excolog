
## Kurulum

```bash
pnpm add @repo/ui
```

## Kullanım

### Bileşenler

```tsx
import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import { Input } from '@repo/ui/input';
import { Dialog } from '@repo/ui/dialog';
import { Drawer } from '@repo/ui/drawer';
import { Icon } from '@repo/ui/icon';
```

### Alt Klasörlerdeki Bileşenler

```tsx
import { AsyncSelect } from '@repo/ui/async-select';
import { LoadingState } from '@repo/ui/async-select/components/loading-state';
import { OptionItem } from '@repo/ui/async-select/components/option-item';
```

### Hook'lar

```tsx
import { useDebounce } from '@repo/ui/hooks/use-debounce';
import { useIntersectionObserver } from '@repo/ui/hooks/use-intersection-observer';
import { useIsMobile } from '@repo/ui/hooks/use-is-mobile';
```

### Utility Fonksiyonları

```tsx
import { cn } from '@repo/ui/utils/cn';
```

### CSS

```tsx
import '@repo/ui/styles.css';
```

## Geliştirme

```bash
# Type check
pnpm type-check

# Lint
pnpm lint

# Build
pnpm build

# Dev mode (watch)
pnpm dev
```

## Yapı

- `components/` - UI bileşenleri (recursive olarak tüm alt klasörler dahil)
- `hooks/` - React hook'ları
- `utils/` - Utility fonksiyonları
- `styles/` - CSS dosyaları
- `components.json` - shadcn/ui konfigürasyonu

## Export Pattern

Package wildcard pattern kullanarak otomatik export yapar:

- `./components/*` - Ana components klasörü
- `./components/**/*` - Tüm alt klasörler (recursive)
- `./hooks/*` - Hooks klasörü
- `./utils/*` - Utils klasörü

Bu sayede yeni component eklediğinde otomatik olarak export edilir!
