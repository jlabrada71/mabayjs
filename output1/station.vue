<template>
  <div>

  <div id="form">
  <!-- station -->
    <v-form v-model="valid">
      <v-container>
        <v-row>
           <v-col
  cols="12"
  md="4"
>
  <v-text-field
    v-model="name"
    label="name"
    required
  ></v-text-field>
</v-col>
<v-col
  cols="12"
  md="4"
>
  <v-text-field
    v-model="descripcao"
    label="descripcao"
    required
  ></v-text-field>
</v-col>

        </v-row>
      </v-container>
    </v-form>
</div>
  </div>
</template>

<style>
.name {

}
.descripcao {

}
</style>

<script>
export default {
    name: 'station',
  data: () => ({
    valid: false,
    name: '',
descripcao: '',

  }),

}
</script>
