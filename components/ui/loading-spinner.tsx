'use client';

import { motion } from 'framer-motion';
import type { FC } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent';
  text?: string;
}

/**
 * ローディング状態を表示するスピナーコンポーネント
 * @param {LoadingSpinnerProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} スピナーのUI
 */
export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
  text
}) => {
  // サイズに基づいてクラスを設定
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };
  
  // カラーに基づいてクラスを設定
  const colorClasses = {
    primary: 'border-primary/20 border-t-primary',
    accent: 'border-[hsl(var(--accent-2))]/20 border-t-[hsl(var(--accent-2))]'
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* 静的な円 */}
        <div className={`absolute inset-0 rounded-full border-2 ${colorClasses[color].split(' ')[0]}`} />
        
        {/* 回転する円 */}
        <div className={`absolute inset-0 rounded-full border-t-2 ${colorClasses[color].split(' ')[1]} animate-spin`} />
        
        {/* 内側の装飾的な円 */}
        <motion.div 
          className="absolute inset-[3px] rounded-full bg-gradient-accent opacity-10"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>
      
      {/* テキストが提供されている場合に表示 */}
      {text && (
        <motion.p 
          className="text-sm text-muted-foreground"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

// 型をエクスポート
export type { LoadingSpinnerProps }; 