<template>
  <q-page>
    <div class="row">
      <div class="col">
        <h1 class="text-center text-h4">
          {{ $t('main-title') }}
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <ingredients-list
          :ingredients="ingredients"
          :configuration="configuration"
          @ingredient-add="ingredientAdd"
          @ingredient-remove="ingredientRemove"
        />
      </div>
      <div class="col-sm-6">
        <burger-configuration
          :validationObj="validationObjValue"
          :configuration="configuration"
          :favouriteList="favouriteList"
          @save-burger="saveBurger"
          @clear-configuration="clearConfiguration"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import IngredientsList from '../../components/IngredientsList.vue';
import BurgerConfiguration from 'src/components/BurgerConfiguration.vue';
import { IngredientModel } from 'src/models/Ingredient.model';
import ValidationModel from 'src/models/Validation.model';
import { useBurgerIngredienstListStore } from 'src/stores/burder-ingredients-list-store';
import { useConfigurationListStore } from 'src/stores/configuration-list-store';
import { useValidationStore } from 'src/stores/validation-configuration-store';
import { useFavouriteListStore } from 'src/stores/favourite-list-store';
import { CompleteBurgerModel } from 'src/models/CompleteBurger.model';

import {
  checkValidationWhenAdded,
  checkValidationWhenRemove,
} from '../../helpers/validationHelpers';
import { reactive, ref } from 'vue';

const burgerIngredienstListStore = useBurgerIngredienstListStore();
const configurationListStore = useConfigurationListStore();
const validationStore = useValidationStore();
const favouriteListStore = useFavouriteListStore();

const ingredients = reactive<IngredientModel[]>(
  burgerIngredienstListStore.allElements
);
const configuration = reactive<IngredientModel[]>(
  configurationListStore.allElements
);
const favouriteList = reactive<CompleteBurgerModel[]>(
  favouriteListStore.allElements
);

let validationObjValue = ref<ValidationModel>(validationStore.getValidationObj);

function ingredientRemove(ingredientName: string) {
  let validationResult: ValidationModel = checkValidationWhenRemove(
    ingredientName,
    configuration
  );

  validationStore.setValidationObj(validationResult);

  if (!validationStore.getValidationObj.valid) {
    validationObjValue.value.valid = validationStore.getValidationObj.valid;
    validationObjValue.value.state = validationStore.getValidationObj.state;
    validationObjValue.value.message = validationStore.getValidationObj.message;
    return;
  }

  configurationListStore.removeElement(ingredientName);
  validationObjValue.value.valid = validationStore.getValidationObj.valid;
  validationObjValue.value.state = validationStore.getValidationObj.state;
  validationObjValue.value.message = validationStore.getValidationObj.message;
}

function ingredientAdd(ingredientName: string) {
  let validationResult: ValidationModel = checkValidationWhenAdded(
    ingredientName,
    configuration
  );
  validationStore.setValidationObj(validationResult);

  if (!validationStore.getValidationObj.valid) {
    validationObjValue.value.valid = validationStore.getValidationObj.valid;
    validationObjValue.value.state = validationStore.getValidationObj.state;
    validationObjValue.value.message = validationStore.getValidationObj.message;
    return;
  }

  let ingredientToAdd: IngredientModel | null =
    ingredients.find(
      (ingredient: IngredientModel) => ingredient.name === ingredientName
    ) || null;

  if (ingredientToAdd !== null && ingredientToAdd !== undefined) {
    configurationListStore.addElement(ingredientToAdd);
  }
  validationObjValue.value.valid = validationStore.getValidationObj.valid;
  validationObjValue.value.state = validationStore.getValidationObj.state;
  validationObjValue.value.message = validationStore.getValidationObj.message;
}
function saveBurger(completeBurger: CompleteBurgerModel) {
  favouriteListStore.addElement(completeBurger);
  favouriteListStore.allElements;
}
function clearConfiguration() {
  configurationListStore.resetStore();
  validationStore.resetStore();
  configuration.length = 0;
}
</script>

<style scoped lang="scss">
.text-h4 {
  color: $light;
  font-size: clamp(1.5rem, -16.5905rem + 24.1206vw, 3.5rem);
  line-height: 1.2;
  margin: 0 auto;
}
</style>
