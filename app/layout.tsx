import '@/app/globals.css'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/sections/theme-provider';
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';

// =============================
// フォント設定 (Next.js のフォントローダーは直接代入する必要がある)
// =============================
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

// =============================
// メタデータ (SEO)
// =============================
export const metadata: Metadata = {
  title: 'Professional Portfolio | Video Creator & Director',
  description: 'Professional video creator and director showcasing cinematic storytelling and visual artistry.',
  keywords: [
    'video creator',
    'director',
    'cinematography',
    'portfolio',
    'visual storytelling',
  ],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

// =============================
// 型定義: ルートレイアウトの Props
// =============================
interface RootLayoutProps {
  children: React.ReactNode;
}

// =============================
// ルートレイアウトコンポーネント (デフォルトで Server Component)
// =============================
export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
