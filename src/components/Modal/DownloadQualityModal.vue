<template>
  <ModalWrapper :visible="props.visible" @close="emit('close')">
    <div class="quality-box">
      <div class="quality-header">
        <div class="title">{{ t('text.downloadQualityTitle') }}</div>

        <div class="close-btn" @click="emit('close')">
          <img :src="IconClose" class="icon-close" :alt="t('action.close')" />
        </div>
      </div>

      <p class="tip">{{ t('text.downloadQualityTip') }}</p>

      <div class="quality-options">
        <button
          type="button"
          class="quality-btn"
          @click="emit('select', 'original')"
        >
          <span class="label">{{ t('text.downloadQualityOriginal') }}</span>
          <span class="desc">{{ originalDesc }}</span>
        </button>

        <button
          type="button"
          class="quality-btn"
          @click="emit('select', 'compressed')"
        >
          <span class="label">{{ t('text.downloadQualityCompressed') }}</span>
          <span class="desc">{{ compressedDesc }}</span>
        </button>
      </div>
    </div>
  </ModalWrapper>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import IconClose from '@/assets/icons/icon-close.svg'
import {
  getDownloadQualityLabel,
  type DownloadQuality,
} from '@/utils/download'

import ModalWrapper from './ModalWrapper.vue'

const props = defineProps<{ visible?: boolean }>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', quality: DownloadQuality): void
}>()

const { t } = useI18n()

const originalDesc = computed(() => getDownloadQualityLabel('original'))
const compressedDesc = computed(() => getDownloadQualityLabel('compressed'))
</script>

<style lang="scss" scoped>
@use 'src/styles/var';

.quality-box {
  $header-height: 4rem;
  $side-padding: 2rem;

  position: absolute;
  top: 50%;
  left: 50%;
  width: min(90%, 480px);
  padding: $header-height $side-padding 2rem;
  background-color: lighten(var.$color-dark, 3);
  border-radius: 1rem;
  transform: translate(-50%, -50%);

  @media screen and (max-width: var.$screen-sm) {
    width: 92%;
    padding: $header-height 1rem 1.5rem;
  }

  .quality-header {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: $header-height;
    padding: 0 $side-padding;

    @media screen and (max-width: var.$screen-sm) {
      padding: 0 1rem;
    }

    .title {
      font-weight: bold;
    }

    .close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      margin-left: auto;
      background-color: lighten(var.$color-dark, 8);
      border-radius: 50%;
      cursor: pointer;

      .icon-close {
        width: 45%;
        opacity: 0.6;
        transition: opacity 0.2s;
      }

      &:hover {
        .icon-close {
          opacity: 1;
        }
      }
    }
  }

  .tip {
    margin: 0 0 1.25rem;
    color: rgba(var.$color-text, 0.65);
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .quality-options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .quality-btn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 1.1rem;
    text-align: left;
    background: darken(var.$color-dark, 1);
    border: 1px solid transparent;
    border-radius: 0.8rem;
    cursor: pointer;
    transition: border-color 0.2s, background-color 0.2s;

    &:hover {
      background-color: lighten(var.$color-dark, 1);
      border-color: rgba(var.$color-accent, 0.5);
    }

    .label {
      color: var.$color-text;
      font-weight: bold;
      font-size: 1rem;
    }

    .desc {
      margin-top: 0.35rem;
      color: rgba(var.$color-text, 0.6);
      font-size: 0.85rem;
    }
  }
}
</style>
