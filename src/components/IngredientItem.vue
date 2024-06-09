<template>
  <div class="ingridient">
    <div class="row items-center justify-between">
      <q-btn
        round
        color="red"
        icon="add"
        size="xs"
        class="q-ma-sm"
        @click="ingredientAdd(ingredient.name)"
      />
      <span class="text-white">
        {{ quantity }}
      </span>
      <q-btn
        round
        color="green"
        icon="remove"
        size="xs"
        class="q-ma-sm"
        @click="ingredientRemove(ingredient.name)"
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
import { ref, watch } from 'vue';

const props = defineProps<{ ingredient: IngredientModel; quantity: number }>();

const emit = defineEmits(['ingredient-add', 'ingredient-remove']);

const ingredientElement = ref(props.ingredient);

watch(
  () => props.ingredient,
  (newElement) => {
    ingredientElement.value = newElement;
  }
);

function ingredientAdd(ingredientName: string) {
  emit('ingredient-add', ingredientName);
}
function ingredientRemove(ingredientName: string) {
  emit('ingredient-remove', ingredientName);
}
</script>
