<template>
  <div class="row">
    <div class="col q-mx-sm">
      <h2 class="text-center text-h4">
        {{ $t('burger-configuration-title') }}
      </h2>
      <h3
        v-if="configurationElement.length === 0"
        class="text-center text-subtitle1 text-secondary"
      >
        {{ $t('burger-configuration-text') }}
      </h3>

      <p
        v-if="validationstate !== ValidationStatusEnum.PENDING"
        :class="
          validationstate === ValidationStatusEnum.FAILED ? 'err' : 'success'
        "
      >
        {{ $t(message) }}
      </p>

      <p v-if="message === '' && completeBurgerListSaveValid" class="success">
        {{ $t(completeBurgerListSaveMessage) }}
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
      <template v-if="validationstate === ValidationStatusEnum.READY_TO_SAVE">
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
                @focus="clearValidation"
              />
              <br />
              <p v-if="!completeBurgerListSaveValid" class="err">
                {{ $t(completeBurgerListSaveMessage) }}
              </p>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import { QInput } from 'quasar';
import { IngredientModel } from 'src/models/Ingredient.model';
import { CompleteBurgerModel } from 'src/models/CompleteBurger.model';
import { ValidationStatusEnum } from 'src/enums/ValidationStatus.enum';

const emit = defineEmits(['clear-configuration', 'save-burger']);

const props = defineProps<{
  configuration: IngredientModel[];
  favouriteList: CompleteBurgerModel[];
  message: string;
  validationstate: string;
}>();

const configurationElement = ref<IngredientModel[]>(props.configuration);
const favouriteListElement = ref<CompleteBurgerModel[]>(props.favouriteList);
const message = ref<string>(props.message);
const validationstate = ref<string>(props.validationstate);

const burgerName = ref<string>('');
let completeBurgerListSaveValid = ref<boolean>(false);
let completeBurgerListSaveMessage = ref<string>('');

const saveBurger = () => {
  clearValidation();

  if (
    favouriteListElement.value
      .map((burger) => burger.name)
      .includes(burgerName.value)
  ) {
    completeBurgerListSaveValid.value = false;
    completeBurgerListSaveMessage.value = 'Validation-messages.already exists';
    return;
  }

  if (burgerName.value === '' || burgerName.value.trim() === '') {
    completeBurgerListSaveValid.value = false;
    completeBurgerListSaveMessage.value =
      'Validation-messages.name field empty';
    return;
  } else {
    emit('save-burger', {
      name: burgerName.value,
      ingredients: [...configurationElement.value],
    });

    completeBurgerListSaveValid.value = true;
    completeBurgerListSaveMessage.value = 'Validation-messages.burger saved';
  }

  emit('clear-configuration');

  burgerName.value = '';
  configurationElement.value.length = 0;
  validationstate.value = '';
  message.value = '';
};

const clearValidation = () => {
  completeBurgerListSaveValid.value = false;
  completeBurgerListSaveMessage.value = '';
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
  validationstate.value = props.validationstate;
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
  width: 75%;
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
    margin-bottom: calc(-100% / 20.5);
  }

  &.cheese {
    margin-bottom: calc(-100% / 14.8);
  }

  &.tomato {
    margin-bottom: calc(-100% / 12.5);
  }
}
</style>
