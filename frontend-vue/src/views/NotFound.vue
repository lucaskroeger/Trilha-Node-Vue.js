<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="text-center pa-6">
          <v-icon size="120" color="grey" class="mb-4">mdi-alert-circle-outline</v-icon>
          
          <h1 class="text-h3 font-weight-bold mb-4">404</h1>
          <h2 class="text-h5 mb-4">Página não encontrada</h2>
          
          <p class="text-body-1 mb-6">
            A página que você está procurando não existe ou foi movida.
          </p>
          
          <v-btn
            color="primary"
            size="large"
            @click="$router.push('/')"
            prepend-icon="mdi-home"
          >
            Voltar ao Início
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Componente para página 404
</script> 