<template>
  <div v-if="ingredients.length > 0">
    <ul class="ingredients">
      <li v-for="(ingredient, index) in ingredientsList" :key="index">
        <ingredient-item
          :ingredient="ingredient"
          :quantity="
            configuration.filter((item) => item.name === ingredient.name).length
          "
          @ingredient-add="ingredientAdd"
          @ingredient-remove="ingredientRemove"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { IngredientModel } from 'src/models/Ingredient.model';
import IngredientItem from './IngredientItem.vue';
// import validationModel from 'src/models/Validation.model';

const emit = defineEmits(['ingredient-add', 'ingredient-remove']);
const props = defineProps(['ingredients', 'configuration']);

// const configurationListStore = useConfigurationListStore();

let ingredientsList = reactive<IngredientModel[]>([...props.ingredients]);

let configuration = reactive<IngredientModel[]>([...props.configuration]);

// let validationObj = reactive<validationModel>({
//   state: '',
//   message: '',
//   valid: true,
// });

// function clearValidationObj() {
//   validationObj.state = '';
//   validationObj.message = '';
//   validationObj.valid = false;
// }

// function checkValidationWhenAdded(ingredientName: string) {
//   const arrLength = configuration.length;

//   if (configuration[0]?.name === 'top-bun') {
//     validationObj.state = 'success';
//     validationObj.message = 'burger ready';
//     validationObj.valid = false;
//     return;
//   }

//   clearValidationObj();

//   if (arrLength === 0 && ingredientName === 'bottom-bun') {
//     validationObj.state = 'pending';
//     validationObj.message = 'ok';
//     validationObj.valid = true;
//     return;
//   }
//   if (arrLength === 0 && ingredientName !== 'bottom-bun') {
//     validationObj.state = 'failed';
//     validationObj.message = 'incorrect-first-element';
//     validationObj.valid = false;
//     return;
//   }
//   if (arrLength > 0 && ingredientName === 'bottom-bun') {
//     validationObj.state = 'failed';
//     validationObj.message = 'bad ingredient';
//     validationObj.valid = false;
//     return;
//   }
//   if (arrLength > 0 && ingredientName === 'top-bun') {
//     validationObj.state = 'success';
//     validationObj.message = 'burger ready';
//     validationObj.valid = true;
//     return;
//   }
//   if (arrLength > 1 && arrLength < 8) {
//     validationObj.state = 'pending';
//     validationObj.message = 'ok';
//     validationObj.valid = true;
//     return;
//   }
//   if (arrLength === 8 && ingredientName !== 'bottom-bun') {
//     validationObj.state = 'failed';
//     validationObj.message = 'last item must be top bun';
//     validationObj.valid = false;
//     return;
//   }
//   validationObj.state = 'pending';
//   validationObj.message = 'ok';
//   validationObj.valid = true;
// }

// function checkValidationWhenRemove(ingredientName: string) {
//   clearValidationObj();

//   const arrLength = configuration.length;

//   if (arrLength > 1 && ingredientName === 'bottom-bun') {
//     validationObj.state = 'failed';
//     validationObj.message = 'You cannot remove';
//     validationObj.valid = false;
//     return;
//   }
//   if (
//     arrLength > 1 &&
//     !configuration.some((ing: IngredientModel) => ing.name === ingredientName)
//   ) {
//     validationObj.state = 'failed';
//     validationObj.message = 'element not exist';
//     validationObj.valid = false;
//     return;
//   }
//   validationObj.state = 'pending';
//   validationObj.message = 'ok';
//   validationObj.valid = true;
// }

function ingredientAdd(ingredientName: string) {
  emit('ingredient-add', ingredientName);

  // checkValidationWhenAdded(ingredientName);

  // if (!validationObj.valid) {
  //   return;
  // }

  // let ingredientToAdd: IngredientModel | null =
  //   ingredientsList.find(
  //     (ingredient: IngredientModel) => ingredient.name === ingredientName
  //   ) || null;

  // if (ingredientToAdd !== null && ingredientToAdd !== undefined) {
  //   // configuration.unshift(ingredientToAdd);
  //   configurationListStore.addElement(ingredientToAdd);
  // }
}

function ingredientRemove(ingredientName: string) {
  emit('ingredient-remove', ingredientName);

  // checkValidationWhenRemove(ingredientName);

  // if (!validationObj.valid) {
  //   return;
  // }

  // configurationListStore.removeElement(ingredientName);

  // let index = configuration.findIndex(
  //   (ingredient: IngredientModel) => ingredient.name === ingredientName
  // );
  // if (index > -1) {
  //   configuration.splice(index, 1);
  // } else return;
}

// watch(
//   [validationObj, configuration],
//   ([newValidationObj, newConfiguration]) => {
//     emit('configuration-failed', newValidationObj);
//     emit('configuration-changed', newConfiguration);
//   }
// );

watch(props.configuration, (newElement: IngredientModel[]) => {
  configuration.length = 0;
  configuration.push(...newElement);
});
</script>
