"use client";

// =============================
// 🔥 Toast管理ライブラリ（react-hot-toast風）
// - `useToast()` でトーストを管理
// - `toast()` で新しいトーストを作成
// =============================

import * as React from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

// =============================
// 定数定義
// =============================
const TOAST_LIMIT = 1; // 最大表示トースト数
const TOAST_REMOVE_DELAY = 1000000; // トーストの自動削除時間（ms）

// =============================
// 型定義
// =============================
interface ToasterToast extends Omit<ToastProps, "title"> {
  id: string;
  title?: string; // `ReactNode` から `string` に変更
  description?: string;
  action?: ToastActionElement;
}

enum ToastActionType {
  ADD = "ADD_TOAST",
  UPDATE = "UPDATE_TOAST",
  DISMISS = "DISMISS_TOAST",
  REMOVE = "REMOVE_TOAST",
}

type ToastAction =
  | { type: ToastActionType.ADD; toast: ToasterToast }
  | { type: ToastActionType.UPDATE; toast: Partial<ToasterToast> }
  | { type: ToastActionType.DISMISS; toastId?: string }
  | { type: ToastActionType.REMOVE; toastId?: string };

interface ToastState {
  toasts: ToasterToast[];
}

// =============================
// トーストのID管理（useRefで管理）
// =============================
const toastIdRef = { count: 0 };
const generateId = () => {
  toastIdRef.count = (toastIdRef.count + 1) % Number.MAX_SAFE_INTEGER;
  return toastIdRef.count.toString();
};

// =============================
// トーストの状態管理
// =============================
const toastTimeouts = new Map<string, NodeJS.Timeout>();
const listeners: Array<(state: ToastState) => void> = [];
let memoryState: ToastState = { toasts: [] };

const dispatch = (action: ToastAction) => {
  memoryState = toastReducer(memoryState, action);
  for (const listener of listeners) {
    listener(memoryState);
  }
};

// =============================
// トースト削除処理
// =============================
const scheduleRemoval = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: ToastActionType.REMOVE, toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

// =============================
// Reducer（トーストの状態更新処理）
// =============================
const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case ToastActionType.ADD:
      return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) };

    case ToastActionType.UPDATE:
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case ToastActionType.DISMISS:
      if (action.toastId) {
        scheduleRemoval(action.toastId);
      } else {
        for (const toast of state.toasts) {
          scheduleRemoval(toast.id);
        }
      }
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          !action.toastId || t.id === action.toastId ? { ...t, open: false } : t
        ),
      };

    case ToastActionType.REMOVE:
      return { ...state, toasts: action.toastId ? state.toasts.filter((t) => t.id !== action.toastId) : [] };

    default:
      return state;
  }
};

// =============================
// トースト生成関数
// =============================
type ToastOptions = Omit<ToasterToast, "id">;

const toast = ({ ...props }: ToastOptions) => {
  const id = generateId();

  const update = (newProps: Partial<ToasterToast>) => dispatch({ type: ToastActionType.UPDATE, toast: { ...newProps, id } });
  const dismiss = () => dispatch({ type: ToastActionType.DISMISS, toastId: id });

  dispatch({
    type: ToastActionType.ADD,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => !open && dismiss(),
    },
  });

  return { id, update, dismiss };
};

// =============================
// useToast Hook（トーストの管理フック）
// =============================
const useToast = () => {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index !== -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: ToastActionType.DISMISS, toastId }),
  };
};

export { useToast, toast };
