import { defineStore } from 'pinia'

import { WrapperShape } from '@/enums'
import type { AvatarOption } from '@/types'
import { getRandomAvatarOption } from '@/utils'
import { SCREEN } from '@/utils/constant'

import {
  REDO,
  SET_AVATAR_OPTION,
  SET_BORDER_COLOR_RANDOM_MODE,
  SET_SIDER_STATUS,
  UNDO,
} from './mutation-type'

/** 随机生成时边框颜色的处理模式 */
export type BorderColorRandomMode = 'keep' | 'random'

export interface State {
  history: {
    past: AvatarOption[]
    present: AvatarOption
    future: AvatarOption[]
  }
  isSiderCollapsed: boolean
  /** 随机生成时是否沿用当前边框颜色 */
  borderColorRandomMode: BorderColorRandomMode
}

export const useStore = defineStore('store', {
  state: () =>
    ({
      history: {
        past: [],
        present: getRandomAvatarOption({ wrapperShape: WrapperShape.Squircle }),
        future: [],
      },
      isSiderCollapsed: window.innerWidth <= SCREEN.lg,
      // 默认随机边框颜色，与改动前行为一致
      borderColorRandomMode: 'random',
    } as State),
  actions: {
    [SET_AVATAR_OPTION](data: AvatarOption) {
      this.history = {
        past: [...this.history.past, this.history.present],
        present: data,
        future: [],
      }
    },

    [UNDO]() {
      if (this.history.past.length > 0) {
        const previous = this.history.past[this.history.past.length - 1]
        const newPast = this.history.past.slice(0, this.history.past.length - 1)
        this.history = {
          past: newPast,
          present: previous,
          future: [this.history.present, ...this.history.future],
        }
      }
    },

    [REDO]() {
      if (this.history.future.length > 0) {
        const next = this.history.future[0]
        const newFuture = this.history.future.slice(1)
        this.history = {
          past: [...this.history.past, this.history.present],
          present: next,
          future: newFuture,
        }
      }
    },

    [SET_SIDER_STATUS](collapsed: boolean) {
      if (collapsed !== this.isSiderCollapsed) {
        this.isSiderCollapsed = collapsed
      }
    },

    /** 切换随机生成时的边框颜色模式 */
    [SET_BORDER_COLOR_RANDOM_MODE](mode: BorderColorRandomMode) {
      this.borderColorRandomMode = mode
    },
  },
})
