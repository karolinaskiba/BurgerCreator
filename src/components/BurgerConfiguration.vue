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

      <p class="err" v-if="validationObj.state === 'failed'">
        {{ $t(validationObj.message) }}
      </p>

      <p :class="completeBurgerListSaveStatus ? 'success' : 'err'">
        {{ completeBurgerListSaveMessage }}
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
      <template v-if="validationObj.state === 'success'">
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
import { computed, reactive, ref, watch } from 'vue';
import { QInput } from 'quasar';
import { CompleteBurgerModel } from 'src/models/CompleteBurger.model';
import { useFavouriteListStore } from '../stores/favourite-list-store';
import { IngredientModel } from 'src/models/Ingredient.model';
// import { useValidationStore } from 'src/stores/validation-configuration-store';
// import ValidationModel from 'src/models/Validation.model';
import { useConfigurationListStore } from 'src/stores/configuration-list-store';
import ValidationModel from 'src/models/Validation.model';

const props = defineProps(['configuration', 'validationObj']);
const emit = defineEmits(['clear-configuration']);

let configurationElement = reactive([...props.configuration]);
let validationObj = ref<ValidationModel>(props.validationObj);

const burgerName = ref<string>('');

let completeBurgerListSaveStatus = ref<boolean>(false);
let completeBurgerListSaveMessage = ref<string>('');

let completeBurgerList = reactive<CompleteBurgerModel[]>([]);

const favouriteListStore = useFavouriteListStore();

const configurationListStore = useConfigurationListStore();

const imageUrlToShow = computed(() => {
  const textToRm = 'ingredient-';

  return (imageUrl: string): string => {
    if (typeof imageUrl === 'string' && imageUrl.includes(textToRm)) {
      return imageUrl.replace(new RegExp(textToRm, 'g'), '');
    }

    return imageUrl;
  };
});

const saveBurger = () => {
  if (burgerName.value === '') {
    completeBurgerListSaveStatus.value = false;
    completeBurgerListSaveMessage.value = 'Name can not be empty!';
    return;
  } else {
    let completeBurger = {
      name: burgerName.value,
      ingredients: [...configurationElement],
    };
    completeBurgerList.push(completeBurger);
    favouriteListStore.addElement(completeBurger);

    completeBurgerListSaveStatus.value = true;
    completeBurgerListSaveMessage.value = 'Burger saved successfully';
  }
  emit('clear-configuration');
  configurationElement.length = 0;
  configurationListStore.setElements([]);
  validationObj.value = { state: '', message: '', valid: false };
  burgerName.value = '';
};

watch(props.configuration, (newElement: IngredientModel[]) => {
  configurationElement.length = 0;
  configurationElement.push(...newElement);
});

watch(
  () => props.validationObj,
  (newValue) => {
    validationObj.value = newValue.value;
  }
);
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
