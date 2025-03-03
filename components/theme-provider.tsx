"use client";

import { FC } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types"; // 型専用のインポートに修正

// =============================
// **テーマプロバイダー**
// - `next-themes` の ThemeProvider をラップ
// - デフォルトのテーマ設定を適用
// =============================
export const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }) => {
  return (
    <NextThemesProvider
      attribute="class" // HTML `class` 属性にダークモードを適用
      defaultTheme="system" // システムのテーマをデフォルトに設定
      enableSystem // OS のダーク / ライト設定に自動適用
      disableTransitionOnChange // テーマ変更時のチラつきを防ぐ
      {...props} // ユーザーがカスタム設定を上書きできるようにする
    >
      {children}
    </NextThemesProvider>
  );
};
