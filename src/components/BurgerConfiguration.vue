<template>
  <div class="row">
    <div class="col">
      <h2 class="text-center text-h4">
        {{ $t('burger-configuration-title') }}
      </h2>
      <h3
        v-if="configurationElement.length === 0"
        class="text-center text-subtitle1 text-secondary"
      >
        {{ $t('burger-configuration-text') }}
      </h3>

      <p class="err" v-if="state === 'failed'">
        {{ $t(message) }}
      </p>

      <template v-if="configurationElement.length > 0">
        <div
          v-for="(ingredient, index) in configurationElement"
          :key="index"
          class="burger"
        >
          <img
            :src="imageUrlToShow(ingredient.imageUrl)"
            :ratio="1"
            class="ingredient-img"
            :class="ingredient.name"
            :style="{ zIndex: 50 - index }"
          />
        </div>
      </template>
      <template v-if="state === 'success'">
        <div class="row">
          <div class="col">
            <form
              @submit.prevent="saveBurger"
              class="q-mx-auto q-my-md text-center"
            >
              <q-input
                ref="inputRef"
                filled
                v-model="burgerName"
                label="Nazwa burgera"
              />
              <br />

              <br />
              <q-btn
                size="xl"
                rounded
                color="white"
                text-color="primary"
                type="submit"
                class="q-my-md q-px-xl"
                >{{ $t('button.save') }}</q-btn
              >
            </form>
          </div>
        </div>
      </template>
      <p
        v-if="completeBurgerListSaveMessage"
        :class="completeBurgerListSaveStatus ? 'success' : 'err'"
      >
        {{ $t(completeBurgerListSaveMessage) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import { QInput } from 'quasar';
import { IngredientModel } from 'src/models/Ingredient.model';
import { CompleteBurgerModel } from 'src/models/CompleteBurger.model';

const emit = defineEmits(['clear-configuration', 'save-burger']);

const props = defineProps<{
  configuration: IngredientModel[];
  favouriteList: CompleteBurgerModel[];
  message: string;
  state: string;
}>();

const configurationElement = ref<IngredientModel[]>(props.configuration);
const favouriteListElement = ref<CompleteBurgerModel[]>(props.favouriteList);
const message = ref<string>(props.message);
const state = ref<string>(props.state);

const burgerName = ref<string>('');
let completeBurgerListSaveStatus = ref<boolean>(false);
let completeBurgerListSaveMessage = ref<string>('');

const saveBurger = () => {
  if (
    favouriteListElement.value
      .map((burger) => burger.name)
      .includes(burgerName.value)
  ) {
    completeBurgerListSaveStatus.value = false;
    completeBurgerListSaveMessage.value = 'Validation-messages.already exists';
    return;
  }

  if (burgerName.value === '') {
    completeBurgerListSaveStatus.value = false;
    completeBurgerListSaveMessage.value =
      'Validation-messages.name field empty';
    return;
  } else {
    emit('save-burger', {
      name: burgerName.value,
      ingredients: [...configurationElement.value],
    });

    completeBurgerListSaveStatus.value = true;
    completeBurgerListSaveMessage.value = 'Validation-messages.burger saved';
  }

  emit('clear-configuration');

  burgerName.value = '';
  configurationElement.value.length = 0;
  // completeBurgerListSaveStatus.value = false;
  // completeBurgerListSaveMessage.value = '';
  state.value = '';
  message.value = '';
};

//replacing images from the ingredient list with images for configuration
const imageUrlToShow = computed(() => {
  const textToRm = 'ingredient-';
  return (imageUrl: string): string => {
    if (typeof imageUrl === 'string' && imageUrl.includes(textToRm)) {
      return imageUrl.replace(new RegExp(textToRm, 'g'), '');
    }

    return imageUrl;
  };
});

//observing changes in props
watch(
  () => props.configuration,
  (newElement: IngredientModel[]) => {
    configurationElement.value.length = 0;
    configurationElement.value = newElement;
  }
);
watchEffect(() => {
  message.value = props.message;
  state.value = props.state;
  favouriteListElement.value = props.favouriteList;
});
</script>

<style scoped lang="scss">
.text-h4 {
  color: $light;
  font-size: clamp(1.5rem, -3.5rem + 6.6667vw, 4.5rem);
  line-height: 1;
  line-break: strict;
}

.text-subtitle1 {
  width: 300px;
  max-width: 75%;
  margin: auto;
  font-size: clamp(0.875rem, 0.8173rem + 0.2564vw, 1.125rem);
}

form {
  width: 100%;
  max-width: 20rem;
}
.burger {
  max-width: 30vw;
  margin: auto;
}
.ingredient-img {
  position: relative;
  max-width: 100%;
  &.lettuce {
    margin-bottom: calc(-100% / 20);
  }

  &.cheese {
    margin-bottom: calc(-100% / 12);
  }

  &.tomato {
    margin-bottom: calc(-100% / 12);
  }
}
</style>
