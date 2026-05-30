<template>
  <ModalWrapper :visible="props.visible" @close="emit('close')">
    <div class="changelog-box">
      <div class="changelog-header">
        <div class="title">更新日志</div>

        <div class="close-btn" @click="emit('close')">
          <img :src="IconClose" class="icon-close" alt="关闭" />
        </div>
      </div>

      <div class="changelog-content-box">
        <PerfectScrollbar class="changelog-scroll-wrapper">
          <div class="changelog-content">
            <section
              v-for="entry in CHANGELOG"
              :key="entry.version"
              class="changelog-entry"
            >
              <div class="entry-meta">
                <span class="version">v{{ entry.version }}</span>
                <span class="date">{{ entry.date }}</span>
              </div>

              <ul class="entry-list">
                <li v-for="item in entry.items" :key="item">{{ item }}</li>
              </ul>
            </section>
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  </ModalWrapper>
</template>

<script lang="ts" setup>
import IconClose from '@/assets/icons/icon-close.svg'
import PerfectScrollbar from '@/components/PerfectScrollbar.vue'
import { CHANGELOG } from '@/utils/changelog'

import ModalWrapper from './ModalWrapper.vue'

const props = defineProps<{ visible?: boolean }>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<style lang="scss" scoped>
@use 'src/styles/var';

.changelog-box {
  $header-height: 4rem;
  $side-padding-normal: 2rem;
  $side-padding-small: 1rem;

  position: absolute;
  top: 50%;
  left: 50%;
  width: 75%;
  max-width: 800px;
  height: min(90vh, 1000px);
  margin: 0 auto;
  padding: $header-height $side-padding-normal 2.5rem $side-padding-normal;
  overflow: hidden;
  background-color: lighten(var.$color-dark, 3);
  border-radius: 1rem;
  transform: translate(-50%, -50%);
  transition: width 0.2s;

  @media screen and (max-width: 1200px) {
    width: 75%;
  }

  @media screen and (max-width: var.$screen-md) {
    width: 80%;
  }

  @media screen and (max-width: var.$screen-sm) {
    width: 90%;
    padding: $header-height $side-padding-small 2.5rem $side-padding-small;

    .changelog-header {
      padding: 0 $side-padding-small;
    }
  }

  .changelog-header {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: $header-height;
    padding: 0 $side-padding-normal;

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

  .changelog-content-box {
    position: relative;
    height: 100%;
    padding: 1rem 0;
    background: darken(var.$color-dark, 1);
    border-radius: 0.8rem;

    .changelog-scroll-wrapper {
      height: 100%;
    }
  }

  .changelog-content {
    padding: 0 1.5rem 0.5rem;

    @media screen and (max-width: var.$screen-sm) {
      padding: 0 1rem 0.5rem;
    }
  }

  .changelog-entry {
    &:not(:last-child) {
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid lighten(var.$color-dark, 10);
    }

    .entry-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;

      .version {
        color: var.$color-accent;
        font-weight: bold;
      }

      .date {
        color: rgba(var.$color-text, 0.55);
        font-size: 0.85rem;
      }
    }

    .entry-list {
      margin: 0;
      padding-left: 1.2rem;
      color: var.$color-text;
      font-size: 1.05rem;
      line-height: 1.7;

      @media screen and (max-width: var.$screen-sm) {
        font-size: 0.95rem;
      }

      li + li {
        margin-top: 0.35rem;
      }
    }
  }
}
</style>
