<template>
  <footer class="footer">
    <div class="changelog-trigger" @click="changelogVisible = true">更新日志</div>

    <div class="divider">|</div>

    <div class="locale" @click="switchLocale">
      {{ locale === Locale.EN ? '简体中文' : 'English' }}
    </div>

    <ChangelogModal
      :visible="changelogVisible"
      @close="changelogVisible = false"
    />
  </footer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import ChangelogModal from '@/components/Modal/ChangelogModal.vue'
import { Locale } from '@/enums'

const { locale } = useI18n()

const changelogVisible = ref(false)

function switchLocale() {
  locale.value = locale.value === Locale.EN ? Locale.ZH : Locale.EN
}
</script>

<style lang="scss" scoped>
@use 'src/styles/var';

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var.$layout-footer-height;
  padding: 0.8rem 0;
  color: rgba(var.$color-text, 0.4);
  font-weight: bold;
  font-size: 0.8rem;

  .divider {
    padding: 0 1rem;
  }

  .changelog-trigger,
  .locale {
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: var.$color-text;
    }
  }
}
</style>
