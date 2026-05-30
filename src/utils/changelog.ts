/** 单条更新日志 */
export interface ChangelogEntry {
  version: string
  date: string
  items: string[]
}

/** 本项目相对原版的修改记录，新增条目请写在数组最前面 */
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.0.1',
    date: '2026-05-30',
    items: [
      '侧边栏「边框颜色」新增随机生成模式：可选择「沿用此配置」或「随机」',
      '随机生成、批量生成及彩蛋头像均会遵循边框颜色模式设置',
      '页头 GitHub 链接更新为 https://github.com/Lucky-Ya-Q/vue-color-avatar',
      '页脚改为「更新日志」，点击可查看本项目的修改说明',
    ],
  },
]
