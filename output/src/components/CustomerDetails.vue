
<template>
  <div id="customer-details">
    <v-container class="grey lighten-5">
       <v-card
         class="pa-2"
         outlined
         tile
       >
         <v-card-title>Customer Details</v-card-title>
         <v-list-item three-line>
           <v-list-item-content>
             <div class="overline mb-4">OVERLINE</div>
             <v-list-item-title class="headline mb-1">{{customer.id}}</v-list-item-title>
<v-list-item-title class="headline mb-1">{{customer.name}}</v-list-item-title>
<v-list-item-title class="headline mb-1">{{customer.address}}</v-list-item-title>

           </v-list-item-content>

           <v-list-item-avatar
             tile
             size="80"
             color="grey"
           ></v-list-item-avatar>
         </v-list-item>
         <v-card-actions>
           <v-btn class="success" @click="close">Close</v-btn>
         </v-card-actions>
       </v-card>
     </v-container>
  </div>

</template>
<script>
export default {
  name: 'CustomerDetails',
  props: {
    customer: Object,
  },
  data: () => ({
    valid: false,
  }),
  methods: {
    close() {
      this.$emit('close-customer-details', this.customer);
    },
  },
};

</script>
<style>
c-customer-form {

}

c-customer-form__title {

}

c-customer-form-actions {

}


</style>
