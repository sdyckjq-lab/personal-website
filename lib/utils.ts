import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 验证外部URL安全性 - 防止javascript:注入
 * 只允许 http: 和 https: 协议
 */
export function isValidExternalUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

/**
 * 验证邮箱URL安全性
 */
export function isValidEmailUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  // 支持 mailto: 前缀或纯邮箱格式
  if (url.startsWith('mailto:')) {
    return /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(url)
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(url)
}

/**
 * 获取安全的href - 验证后返回URL，无效则返回undefined
 */
export function getSafeHref(url: string, type: 'external' | 'email' = 'external'): string | undefined {
  if (type === 'email') {
    if (!isValidEmailUrl(url)) return undefined
    return url.startsWith('mailto:') ? url : `mailto:${url}`
  }
  return isValidExternalUrl(url) ? url : undefined
}
