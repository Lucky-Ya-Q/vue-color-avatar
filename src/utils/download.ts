/** 下载画质：原图（高清 PNG）或压缩（标准尺寸 PNG） */
export type DownloadQuality = 'original' | 'compressed'

/** 页面预览头像尺寸（px），与 VueColorAvatar 默认 size 保持一致 */
export const AVATAR_PREVIEW_SIZE = 280

const QUALITY_PRESETS = {
  /** 3 倍分辨率 PNG，接近矢量渲染效果 */
  original: {
    scale: 3,
    mimeType: 'image/png' as const,
    extension: 'png',
  },
  /** 预览尺寸 PNG，分辨率较低、文件更小 */
  compressed: {
    scale: 1,
    mimeType: 'image/png' as const,
    extension: 'png',
  },
} as const

export function getDownloadQualityLabel(quality: DownloadQuality) {
  const size = AVATAR_PREVIEW_SIZE * QUALITY_PRESETS[quality].scale
  return quality === 'original'
    ? `PNG 高清（${size}×${size}）`
    : `PNG 标准（${size}×${size}）`
}

/** 获取下载文件扩展名 */
export function getDownloadExtension(quality: DownloadQuality) {
  return QUALITY_PRESETS[quality].extension
}

/** 将头像 DOM 截图为 Data URL */
export async function captureAvatarElement(
  element: HTMLElement,
  quality: DownloadQuality
) {
  const preset = QUALITY_PRESETS[quality]
  const html2canvas = (await import('html2canvas')).default
  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: preset.scale,
  })

  const dataURL = canvas.toDataURL(preset.mimeType)

  return {
    dataURL,
    extension: preset.extension,
  }
}

/** 触发浏览器下载 */
export function triggerFileDownload(dataURL: string, filename: string) {
  const trigger = document.createElement('a')
  trigger.href = dataURL
  trigger.download = filename
  trigger.click()
}
