<template>
  <div class="ingridient">
    <div class="row items-center justify-between">
      <q-btn
        round
        color="red"
        icon="add"
        size="xs"
        class="q-ma-sm"
        @click="ingredientAdd(ingredientElement.name)"
      />
      <span class="text-white">
        {{ quantityValue }}
      </span>
      <q-btn
        round
        color="green"
        icon="remove"
        size="xs"
        class="q-ma-sm"
        @click="ingredientRemove(ingredientElement.name)"
      />
    </div>
    <div class="row">
      <q-img
        v-if="ingredient.imageUrl !== null"
        :src="ingredient.imageUrl"
        :ratio="1"
        class="ingridient-img"
      />
    </div>
    <div>
      <p class="ingridient-name">{{ ingredient.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IngredientModel } from 'src/models/Ingredient.model';
import { reactive, ref, watch } from 'vue';

const props = defineProps<{ ingredient: IngredientModel; quantity: number }>();

const emit = defineEmits(['ingredient-add', 'ingredient-remove']);

let ingredientElement = reactive({ ...props.ingredient });
let quantityValue = ref(props.quantity);

watch(
  [() => props.ingredient, () => props.quantity], // Dodajemy props.quantity do tablicy z funkcjami reaktywnymi
  ([newIngredient, newQuantity]) => {
    ingredientElement = { ...newIngredient };
    quantityValue.value = newQuantity;
  }
);

// watch(
//   [() => props.ingredient, () => props.quantity], // Dodajemy props.quantity do tablicy z funkcjami reaktywnymi
//   ([newIngredient, newQuantity], [oldIngredient, oldQuantity]) => {
//     // Logika do wykonania po zmianie props.ingredient lub props.quantity
//     console.log('Nowy składnik:', oldIngredient);
//     console.log('Nowa ilość:', oldQuantity);

//     // Przykładowa operacja zaktualizowania ingredientElement

//     ingredientElement = { ...newIngredient };
//     quantityValue.value = newQuantity;
//   }
// );

function ingredientAdd(ingredientName: string) {
  emit('ingredient-add', ingredientName);
}
function ingredientRemove(ingredientName: string) {
  emit('ingredient-remove', ingredientName);
}
</script>
