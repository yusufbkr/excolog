
## Kurulum

```bash
pnpm add @excolog/ui
```

## Kullanım

### Bileşenler

```tsx
import { Button } from '@excolog/ui/button';
import { Card } from '@excolog/ui/card';
import { Input } from '@excolog/ui/input';
import { Dialog } from '@excolog/ui/dialog';
import { Drawer } from '@excolog/ui/drawer';
import { Icon } from '@excolog/ui/icon';
```

### Alt Klasörlerdeki Bileşenler

```tsx
import { AsyncSelect } from '@excolog/ui/async-select';
import { LoadingState } from '@excolog/ui/async-select/components/loading-state';
import { OptionItem } from '@excolog/ui/async-select/components/option-item';
```

### Hook'lar

```tsx
import { useDebounce } from '@excolog/ui/hooks/use-debounce';
import { useIntersectionObserver } from '@excolog/ui/hooks/use-intersection-observer';
import { useIsMobile } from '@excolog/ui/hooks/use-is-mobile';
```

### Utility Fonksiyonları

```tsx
import { cn } from '@excolog/ui/utils/cn';
```

### CSS

```tsx
import '@excolog/ui/styles.css';
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
