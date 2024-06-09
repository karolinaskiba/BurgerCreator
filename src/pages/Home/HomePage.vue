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
          @configuration-changed="configurationChanged"
          @configuration-failed="configurationFailed"
          @ingredient-add="ingredientAdd"
          @ingredient-remove="ingredientRemove"
        />
      </div>
      <div class="col-sm-6">
        <burger-configuration
          :configuration="configuration"
          :validationObj="validationObj"
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
import validationModel from 'src/models/Validation.model';
import { useBurgerIngredienstListStore } from 'src/stores/burder-ingredients-list-store';
import { useConfigurationListStore } from 'src/stores/configuration-list-store';
import { reactive, ref } from 'vue';

const favouriteListStore = useBurgerIngredienstListStore();
const configurationListStore = useConfigurationListStore();

const ingredients = reactive(favouriteListStore.allElements);
const configuration = reactive(configurationListStore.allElements);

let validationObj = reactive<validationModel>({
  state: '',
  message: '',
  valid: true,
});

let config = ref<IngredientModel[]>([]);

function configurationChanged(newConfiguration: IngredientModel[]) {
  config.value = newConfiguration.filter((ing: IngredientModel) => ing);
}
function clearConfiguration() {
  config.value = [];
}

function configurationFailed(newValidationObj: validationModel) {
  validationObj.state = newValidationObj.state;
  validationObj.message = newValidationObj.message;
  validationObj.valid = newValidationObj.valid;
}

function ingredientRemove(ingredientName: string) {
  // checkValidationWhenRemove(ingredientName);

  // if (!validationObj.valid) {
  //   return;
  // }

  configurationListStore.removeElement(ingredientName);
}

function ingredientAdd(ingredientName: string) {
  let ingredientToAdd: IngredientModel | null =
    ingredients.find(
      (ingredient: IngredientModel) => ingredient.name === ingredientName
    ) || null;

  if (ingredientToAdd !== null && ingredientToAdd !== undefined) {
    configurationListStore.addElement(ingredientToAdd);
  }
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
